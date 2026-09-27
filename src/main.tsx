import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ExpensesPage from './pages/ExpensesPage.tsx';



async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCKS !== 'true') return;
  const { worker } = await import('./mock/browser.ts');
  await worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
  <ExpensesPage />
    </StrictMode>
  );
});
