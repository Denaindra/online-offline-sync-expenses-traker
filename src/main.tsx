import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import ExpensesPage from './pages/ExpensesPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExpensesPage />
  </StrictMode>,
)
