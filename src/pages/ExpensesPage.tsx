import Button from "@mui/material/Button";
import { StatusCard } from "../features/expenses/componets/cards/StatusCard";
import styles from "./ExpensesPage.module.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { Sort } from "@mui/icons-material";
import { SortControl } from "../features/expenses/componets/sortControler/SortControl";
import { CategoryFilter } from "../features/expenses/componets/categoryFilters/CategoryFilter";
import { ExpenseTable } from "../features/expenses/componets/expenseTables/ExpenseTable";
import { ExpenseFormModal } from "../features/expenses/componets/expenseFormModal/ExpenseFormModal";

function ExpensesPage() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const OpenAddExpensesPopup = () => {
    setIsAddExpenseOpen(true);
  };
  const CloseAddExpensesPopup = () => {
    setIsAddExpenseOpen(false);
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
          <ExpenseTable />
        </section>
      </main>

      {/* Modals and toast render here, outside the main flow */}
      <ExpenseFormModal
        open={isAddExpenseOpen}
        onClose={CloseAddExpensesPopup}
      />
      {/* <DeleteExpenseDialog /> */}
      {/* <Toast /> */}
    </div>
  );
}

export default ExpensesPage;
