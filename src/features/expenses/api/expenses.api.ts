import type { Expense } from '../expense.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export type NewExpense = Omit<Expense, 'id'>;

export const expensesApi = {
  async getAll(): Promise<Expense[]> {
    const res = await fetch(`${BASE_URL}/expenses`);
    if (!res.ok) {
      throw new Error(`Failed to load expenses (${res.status})`);
    }
    return res.json();
  },
  async create(expense: NewExpense): Promise<Expense> {
    const res = await fetch(`${BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    if (!res.ok) {
      throw new Error(`Failed to add expense (${res.status})`);
    }
    return res.json();
  },
   async update(id: string, expense: NewExpense): Promise<Expense> {
    const res = await fetch(`${BASE_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error(`Failed to update expense (${res.status})`);
    return res.json();
  },
    async delete(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/expenses/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Failed to delete expense (${res.status})`);
  },
};