export type Category = 'Food' | 'Travel' | 'Shopping' | 'Bills' | 'Health' | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string; // ISO format, e.g. 2026-09-24
  category: Category;
  notes?: string;
}