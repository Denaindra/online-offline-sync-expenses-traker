export type Category = 'Food' | 'Travel' | 'Shopping' | 'Bills' | 'Health' | 'Other';
export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string; 
  category: Category;
  notes?: string;
}

export interface AddExpenseFormValues {
  id: string;
  title: string;
  amount: string;
  date: string;
  category: Category;
  notes: string;
}

export interface ExpensePage {
  data: Expense[];
  total: number;
  hasMore: boolean;
}