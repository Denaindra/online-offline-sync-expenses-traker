import Button from "@mui/material/Button";
import { Card } from "../features/expenses/componets/cards/Card";
import styles from "./ExpensesPage.module.css";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useState } from "react";
const ExpensesPage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <h1 className={styles.title}>Expenses</h1>
            <p className={styles.subtitle}>September 2026</p>
          </div>

          <div className={styles.headerActions}>
            <span>Offline</span>
            <span>SyncStatus</span>
            <Button variant="contained" startIcon={<AddOutlinedIcon />}>
              Add expense
            </Button>
            {/* <SyncStatus /> */}
            {/* <Button onClick={openAddModal}>Add expense</Button> */}
          </div>
        </header>

        {/* <OfflineBanner /> */}

        <section className={styles.summary} aria-label="Summary">
          <Card />
          <Card />
          <Card />
          {/* <span>SummaryCard</span>
            <span>SummaryCard</span>     */}
          {/* <SummaryCard label="Spent this month" value={...} /> x3 */}
        </section>

        <div className={styles.toolbar}>
          {/* <CategoryFilter /> */}
          {/* <SortSelect /> */}
          <span>CategoryFilter</span>
          <span>SortSelect</span>
        </div>

        <section className={styles.listSection} aria-label="Expense history">
          {/* <ExpenseList /> */}
          <span>ExpenseList</span>
        </section>
      </main>

      {/* Modals and toast render here, outside the main flow */}
      {/* <ExpenseFormModal /> */}
      {/* <DeleteExpenseDialog /> */}
      {/* <Toast /> */}
    </div>
  );
};

export default ExpensesPage;
