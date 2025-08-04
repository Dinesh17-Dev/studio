"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Lightbulb, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { layoutSuggestion } from "@/ai/flows/layout-suggestion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  userPreferences: z
    .string()
    .min(10, {
      message: "Please describe your preferences in at least 10 characters.",
    })
    .max(500, {
      message: "Preferences cannot be longer than 500 characters.",
    }),
});

type LayoutSuggestionModalProps = {
  dataSummary: string;
};

export default function LayoutSuggestionModal({ dataSummary }: LayoutSuggestionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userPreferences: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await layoutSuggestion({
        userPreferences: data.userPreferences,
        dataSummary,
      });
      setSuggestion(result.suggestions);
    } catch (error) {
      console.error("AI suggestion failed:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "Failed to get AI suggestions. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Lightbulb className="mr-2 h-4 w-4" />
          AI Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Layout Suggestions</DialogTitle>
          <DialogDescription>
            Describe your ideal dashboard layout, and our AI will provide customization ideas.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>My Preferences</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'I want to focus on revenue growth and see my top-performing campaigns at a glance.'"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Suggestions
              </Button>
            </DialogFooter>
          </form>
        </Form>
        {suggestion && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Suggestion</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap font-sans">
              {suggestion}
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
