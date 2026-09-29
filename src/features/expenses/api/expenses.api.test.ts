import { describe, it, expect } from 'vitest';
import { expensesApi } from './expenses.api';

const newExpense = {
  title: 'Test lunch',
  amount: 1500,
  date: '2026-09-20',
  category: 'Food' as const,
};

const getAllExpenses = async () => {
  const page = await expensesApi.getPage(1, 100);
  return page.data;
};

describe('expensesApi', () => {
  it('adds a new expense', async () => {
    const created = await expensesApi.create(newExpense);

    expect(created.id).toBeDefined();
    expect(created.title).toBe('Test lunch');

    const all = await getAllExpenses();
    expect(all.some((e) => e.id === created.id)).toBe(true);
  });

  it('edits an existing expense', async () => {
    const created = await expensesApi.create(newExpense);

    const updated = await expensesApi.update(created.id, {
      ...newExpense,
      title: 'Test dinner',
      amount: 2500,
    });

    expect(updated.id).toBe(created.id);
    expect(updated.title).toBe('Test dinner');
    expect(updated.amount).toBe(2500);
  });

  it('deletes an expense', async () => {
    const created = await expensesApi.create(newExpense);

    await expensesApi.delete(created.id);

    const all = await getAllExpenses();
    expect(all.some((e) => e.id === created.id)).toBe(false);
  });
});