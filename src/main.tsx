import { StrictMode } from 'react'
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client'
import './index.css'
import ExpensesPage from './pages/ExpensesPage.tsx';
import { store } from './app/store.ts';



async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCKS !== 'true') return;
  const { worker } = await import('./mock/browser.ts');
  await worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
     <Provider store={store}>
      <StrictMode>
        <ExpensesPage />
      </StrictMode>
     </Provider>
  );
});
