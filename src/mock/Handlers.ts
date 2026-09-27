import { http, HttpResponse, delay } from 'msw';
import { MOCK_EXPENSES } from './data/expenses/expenses';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.get(`${BASE_URL}/expenses`, async () => {
    await delay(300);
    return HttpResponse.json(MOCK_EXPENSES);
  }),
];