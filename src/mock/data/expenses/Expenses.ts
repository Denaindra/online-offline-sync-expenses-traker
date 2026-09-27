import type { Expense } from '../../../features/expenses/expense.types';

export const MOCK_EXPENSES: Expense[] = [
  { id: '1', title: 'Supermarket run', amount: 8450, date: '2026-09-25', category: 'Food', notes: 'Weekly groceries' },
  { id: '2', title: 'Taxi to office', amount: 1260, date: '2026-09-24', category: 'Travel' },
  { id: '3', title: 'Electricity bill', amount: 6980, date: '2026-09-22', category: 'Bills' },
  { id: '4', title: 'Coffee beans', category: 'Food', date: '10 Sep 2026', amount: 3100.00 },
  { id: '5', title: 'Lunch with team',category: 'Food', date: '21 Sep 2026', amount: 4200.00 },
  { id: '6', title: 'Home internet',category: 'Bills', date: '12 Sep 2026', amount: 5490.00 },
];