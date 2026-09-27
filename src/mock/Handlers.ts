import { http, HttpResponse, delay } from 'msw';
import { MOCK_EXPENSES } from './data/expenses/expenses';
import type { Expense } from '../features/expenses/expense.types';
import type { NewExpense } from '../features/expenses/api/expenses.api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
let expenses: Expense[] = [...MOCK_EXPENSES];

export const handlers = [
  http.get(`${BASE_URL}/expenses`, async ({ request }) => {
  await delay(300);

  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? 1);
  const pageSize = Number(url.searchParams.get('pageSize') ?? 6);

  const start = (page - 1) * pageSize;
  const data = expenses.slice(start, start + pageSize);

  return HttpResponse.json({
    data,
    total: expenses.length,
    hasMore: start + pageSize < expenses.length,
  });
}),

  http.post(`${BASE_URL}/expenses`, async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as Omit<Expense, 'id'>;
    const newExpense: Expense = { ...body, id: crypto.randomUUID() };
    expenses = [newExpense, ...expenses];
    return HttpResponse.json(newExpense, { status: 201 });
  }),
  
   http.put(`${BASE_URL}/expenses/:id`, async ({ params, request }) => {
    await delay(300);
    const id = String(params.id);
    const exists = expenses.some((e) => e.id === id);
    if (!exists) {
      return HttpResponse.json({ message: 'Expense not found' }, { status: 404 });
    }

    const body = (await request.json()) as NewExpense;
    const updated: Expense = { ...body, id };
    expenses = expenses.map((e) => (e.id === id ? updated : e));
    return HttpResponse.json(updated);
  }),

   http.delete(`${BASE_URL}/expenses/:id`, async ({ params }) => {
    await delay(300);
    const id = String(params.id);
    if (!expenses.some((e) => e.id === id)) {
      return HttpResponse.json({ message: 'Expense not found' }, { status: 404 });
    }
    expenses = expenses.filter((e) => e.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),
];