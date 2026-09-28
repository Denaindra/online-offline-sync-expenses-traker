import Button from "@mui/material/Button";
import { StatusCard } from "../features/expenses/componets/cards/StatusCard";
import styles from "./ExpensesPage.module.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SortControl } from "../features/expenses/componets/sortControler/SortControl";
import { CategoryFilter } from "../features/expenses/componets/categoryFilters/CategoryFilter";
import { ExpenseTable } from "../features/expenses/componets/expenseTables/ExpenseTable";
import { expensesApi } from "../features/expenses/api/expenses.api";
import type { AddExpenseFormValues, Category, Expense, SortOption } from "../features/expenses/expense.types";
import { ExpenseFormModal } from "../features/expenses/componets/expenseFormModal/ExpenseFormModal";
import { DeleteExpenses } from "../features/expenses/componets/deleteExpensesModal/DeleteExpenses";
import FooterContainer from "../features/expenses/componets/expensesFooterContainer/FooterContainer";
import { filterExpensesByCategory, sortExpenses } from "../features/expenses/utils/sortExpenses";
import { OfflineBanner } from "../features/expenses/componets/onlineAndOfflineSync/offlineBanner";
import { addToQueue } from "../features/sync/networkSlice";
import { useDispatch, useSelector } from "react-redux";

function ExpensesPage() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const[isEdit, setIsEdit] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<AddExpenseFormValues | null>(null);
  const [isDeleteExpenseOpen, setIsDeleteExpenseOpen] = useState(false);
  const PAGE_SIZE = 6;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sort, setSort] = useState<SortOption>("date-desc");
  const [category, setCategory] = useState<Category | 'All'>('All');
  const isOnline = useSelector(
    (state: { network: { isOnline: boolean } }) => state.network.isOnline,
  );
  const dispatch = useDispatch();
  
  const filteredExpenses = useMemo(
    () => filterExpensesByCategory(expenses, category),
    [expenses, category],
  );
  const sortedExpenses = useMemo(
    () => sortExpenses(filteredExpenses, sort),
    [filteredExpenses, sort],
  );
  
  const OpenAddExpensesPopup = () => {
    setIsAddExpenseOpen(true);
  };
  const CloseAddExpensesPopup = () => {
    setIsAddExpenseOpen(false);
    if (isEdit) {
      setIsEdit(false);
    }
  };

  const loadExpenses = useCallback(async () => {
    try {
      const result = await expensesApi.getPage(1, PAGE_SIZE);
      setExpenses(result.data);
      setTotal(result.total);
      setHasMore(result.hasMore);
      setPage(1);
    } catch {
    } finally {
    }
  }, []);

  const loadMore = useCallback(async () => {
  if (loadingMore || !hasMore) return;
  setLoadingMore(true);
  try {
    const nextPage = page + 1;
    const result = await expensesApi.getPage(nextPage, PAGE_SIZE);
    setExpenses((prev) => {
      const existingIds = new Set(prev.map((e) => e.id));
      return [...prev, ...result.data.filter((e) => !existingIds.has(e.id))];
    });
    setTotal(result.total);
    setHasMore(result.hasMore);
    setPage(nextPage);
  } finally {
    setLoadingMore(false);
  }
}, [page, hasMore, loadingMore]);

// useEffect(() => {
//   const fetchExpenses = async () => {
//     console.log('Fetching expenses...');
//     try {
//       const ExpenseData = await expensesApi.getAll();
//       setExpenses(ExpenseData);
//     } catch (error) {
//       console.error('Failed to fetch expenses:', error);
//     }
//   };
//   fetchExpenses();
// }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

const AddExpenses = async (expense: AddExpenseFormValues) => {
  if (!isOnline) {
    dispatch(addToQueue({
      type: "create",
      expense: {
        ...expense,
        id: crypto.randomUUID(),
        amount: Number(expense.amount),
      },
    }));

     setExpenses((prev) => [...prev, {
       ...expense,
       id: crypto.randomUUID(),
       amount: Number(expense.amount),
     }]);
     
    return;
  }
  else
    {
      const created = await expensesApi.create({
        ...expense,
        amount: Number(expense.amount),
      });
      setExpenses((prev) => [...prev, created]);
    }
};

const EditExpenses = async (expense: AddExpenseFormValues) => {
  try {
    if (!isOnline) {
      dispatch(addToQueue({
        type: "update",
        expense: {
          ...expense,
          amount: Number(expense.amount),
        },
      }));
      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? { ...e, ...expense, amount: Number(expense.amount) } : e)),
      );
    } else {
      const updated = await expensesApi.update(expense.id, {
        ...expense,
        amount: Number(expense.amount),
      });
      setExpenses((prev) =>
        prev.map((e) => (e.id === updated.id ? updated : e)),
      );
    }
  } catch (error) {
    console.error("Failed to edit expense:", error);
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
  console.log("Deleting expense:", selectedExpense);
  if (!selectedExpense) return;
  try {
    if (!isOnline) {
      dispatch(
        addToQueue({
          type: "delete",
          expense: {
            ...selectedExpense,
            amount: Number(selectedExpense.amount),
          },
        }),
      );
    } else {
      await expensesApi.delete(selectedExpense.id);
    }
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
              <OfflineBanner />
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
          <CategoryFilter activeCategory={category} onCategoryChange={setCategory} />
          <SortControl setSort={setSort} />
        </div>

        <section className={styles.listSection} aria-label="Expense history">
          <ExpenseTable expenses={sortedExpenses} selectExpenseForEdit={SelectExpenseForEdit} SelectExpenseForDelete={SelectExpenseForDelete} />
          <FooterContainer loadMore={loadMore} page={page} total={total}/>
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
