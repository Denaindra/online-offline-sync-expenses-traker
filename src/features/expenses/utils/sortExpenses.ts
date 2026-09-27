// features/expenses/utils/sortExpenses.ts
import type { Expense, SortOption } from '../expense.types';

const sorters: Record<SortOption, (a: Expense, b: Expense) => number> = {
  'date-desc': (a, b) => b.date.localeCompare(a.date),
  'date-asc': (a, b) => a.date.localeCompare(b.date),
  'amount-desc': (a, b) => b.amount - a.amount,
  'amount-asc': (a, b) => a.amount - b.amount,
};

export const sortExpenses = (expenses: Expense[], sort: SortOption): Expense[] =>
  [...expenses].sort(sorters[sort]);