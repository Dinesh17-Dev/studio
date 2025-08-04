import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ColumnDef } from "@tanstack/react-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- EXPORT FUNCTIONS ---

// Function to export data to CSV
export function exportToCsv<TData>(data: TData[], columns: ColumnDef<TData, any>[], filename: string) {
  const headers = columns
    .map(col => col.header && typeof col.header === 'string' ? col.header : (col as any).accessorKey)
    .filter(Boolean);
    
  const csvRows = [
    headers.join(','), 
    ...data.map(row => 
      headers.map(header => {
        const value = (row as any)[header];
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Function to export data to PDF
export function exportToPdf<TData>(data: TData[], columns: ColumnDef<TData, any>[], filename: string, title: string) {
  const doc = new jsPDF();
  
  const headers = columns
    .map(col => col.header && typeof col.header === 'string' ? col.header : (col as any).accessorKey)
    .filter(Boolean);
    
  const body = data.map(row => 
    headers.map(header => (row as any)[header] ?? '')
  );

  doc.text(title, 14, 16);
  autoTable(doc, {
    head: [headers],
    body: body,
    startY: 20
  });

  doc.save(`${filename}.pdf`);
}
