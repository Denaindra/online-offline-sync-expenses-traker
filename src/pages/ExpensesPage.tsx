import Button from "@mui/material/Button";
import { StatusCard } from "../features/expenses/componets/cards/StatusCard";
import styles from "./ExpensesPage.module.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useState } from "react";
import { SortControl } from "../features/expenses/componets/sortControler/SortControl";
import { CategoryFilter } from "../features/expenses/componets/categoryFilters/CategoryFilter";
import { ExpenseTable } from "../features/expenses/componets/expenseTables/ExpenseTable";
import { expensesApi } from "../features/expenses/api/expenses.api";
import type { AddExpenseFormValues, Expense } from "../features/expenses/expense.types";
import { ExpenseFormModal } from "../features/expenses/componets/expenseFormModal/ExpenseFormModal";
import { DeleteExpenses } from "../features/expenses/componets/deleteExpensesModal/DeleteExpenses";

function ExpensesPage() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const[isEdit, setIsEdit] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<AddExpenseFormValues | null>(null);
  const [isDeleteExpenseOpen, setIsDeleteExpenseOpen] = useState(false);

  const OpenAddExpensesPopup = () => {
    setIsAddExpenseOpen(true);
  };
  const CloseAddExpensesPopup = () => {
    setIsAddExpenseOpen(false);
    if (isEdit) {
      setIsEdit(false);
    }
  };


useEffect(() => {
  const fetchExpenses = async () => {
    console.log('Fetching expenses...');
    try {
      const ExpenseData = await expensesApi.getAll();
      setExpenses(ExpenseData);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };
  fetchExpenses();
}, []);

const AddExpenses = async (expense: AddExpenseFormValues) => {
  console.log('Adding expense:', expense);
  const created = await expensesApi.create({
    ...expense,
    amount: Number(expense.amount),
  });
  setExpenses((prev) => [...prev, created]);
};

const EditExpenses = async (expense: AddExpenseFormValues) => {
  console.log('Editing expense:', expense);
  try {
              const updated = await expensesApi.update(expense.id, {
                ...expense,
                amount: Number(expense.amount),
              });
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  } catch (error) {
    console.error('Failed to edit expense:', error);
  }
};

const SelectExpenseForEdit = (expense: Expense) =>{
  setIsEdit(true);
  setSelectedExpense({
    id: expense.id,
    title: expense.title,
    amount: String(expense.amount),
    date: expense.date,
    category: expense.category,
    notes: expense.notes ?? '',
  });
  setIsAddExpenseOpen(true);
}

const SelectExpenseForDelete = (expense: Expense) =>{
  console.log('Selecting expense for delete:', expense);
  setSelectedExpense({
    id: expense.id,
    title: expense.title,
    amount: String(expense.amount),
    date: expense.date,
    category: expense.category,
    notes: expense.notes ?? '',
  });
setIsDeleteExpenseOpen(true);
}


const DeleteExpense = async () => {
  if (!selectedExpense) return;
  try {
    await expensesApi.delete(selectedExpense.id);
    setExpenses((prev) => prev.filter((e) => e.id !== selectedExpense.id));
    setIsDeleteExpenseOpen(false);
  } catch (error) {
    console.error('Failed to delete expense:', error);
  }
};

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <h1 className={styles.title}>Expenses</h1>
            <p className={styles.subtitle}>September 2026</p>
          </div>

          <div className={styles.headerActions}>
            <span>All Changes Sychronized</span>
            <Button
              variant="contained"
              startIcon={<AddOutlinedIcon />}
              onClick={() => OpenAddExpensesPopup()}
            >
              Add expense
            </Button>
            {/* <SyncStatus /> */}
            {/* <Button onClick={openAddModal}>Add expense</Button> */}
          </div>
        </header>

        {/* <OfflineBanner /> */}

        <section className={styles.summary} aria-label="Summary">
          <StatusCard />
          <StatusCard />
          <StatusCard />
          {/* <span>SummaryCard</span>
            <span>SummaryCard</span>     */}
          {/* <SummaryCard label="Spent this month" value={...} /> x3 */}
        </section>

        <div className={styles.toolbar}>
          <CategoryFilter />
          <SortControl />
        </div>

        <section className={styles.listSection} aria-label="Expense history">
          <ExpenseTable expenses={expenses} selectExpenseForEdit={SelectExpenseForEdit} SelectExpenseForDelete={SelectExpenseForDelete} />
        </section>
      </main>

      {/* Modals and toast render here, outside the main flow */}
      <ExpenseFormModal
        open={isAddExpenseOpen}
        onClose={CloseAddExpensesPopup}
        isEddit = {isEdit}
        AddExpenses={AddExpenses}
        EditExpenses={EditExpenses}
        selectedExpense={selectedExpense}
      />

    <DeleteExpenses
      open={isDeleteExpenseOpen}
      onClose={() => setIsDeleteExpenseOpen(false)}
      onConfirm={DeleteExpense}
      expenseTitle={selectedExpense?.title ?? ''}
      expenseAmount={selectedExpense?.amount ?? ''}
    />
      {/* <DeleteExpenseDialog /> */}
      {/* <Toast /> */}
    </div>
  );
}

export default ExpensesPage;
