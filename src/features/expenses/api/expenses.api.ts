import type { Expense } from '../expense.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const expensesApi = {
  async getAll(): Promise<Expense[]> {
    const res = await fetch(`${BASE_URL}/expenses`);
    if (!res.ok) {
      throw new Error(`Failed to load expenses (${res.status})`);
    }
    return res.json();
  },
};