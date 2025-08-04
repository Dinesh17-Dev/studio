"use client";

import { LeafyGreen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import LayoutSuggestionModal from "./layout-suggestion-modal";

type HeaderProps = {
  dataSummary: string;
};

export default function Header({ dataSummary }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex items-center gap-2">
        <LeafyGreen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold font-headline tracking-tight">
          InsightBrand
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <LayoutSuggestionModal dataSummary={dataSummary} />
        <ThemeToggle />
      </div>
    </header>
  );
}
