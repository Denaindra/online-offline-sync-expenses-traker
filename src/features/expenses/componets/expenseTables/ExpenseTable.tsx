import React  from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "./ExpenseTable.module.css";
import FooterContainer from "../expensesFooterContainer/FooterContainer";
import { DeleteExpenses } from "../deleteExpensesModal/DeleteExpenses";
import { useState } from "react";
import { ExpenseFormModal } from "../expenseFormModal/ExpenseFormModal";
import type { Expense } from "../../expense.types";



interface ExpenseTableProps {
  expenses: Expense[];
}

export const ExpenseTable = ({ expenses }: ExpenseTableProps) => {
  const [isDeleteExpenseOpen, setIsDeleteExpenseOpen] = useState(false);
  const [isEdditExpenseOpen, setIsEdditExpenseOpen] = useState(false);

  
const formatCurrency = (amount: number) => {
  return `LKR ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const handleDelete = (isOpen: boolean) => {
  setIsDeleteExpenseOpen(isOpen);
};

  return (
    <div> 
    <TableContainer
      component={Paper}
      className={styles.tableContainer}
      elevation={0}
    >
      <Table sx={{ minWidth: 650 }} aria-label="expense table">
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell className={styles.headerCell}>EXPENSE</TableCell>
            <TableCell className={styles.headerCell}>CATEGORY</TableCell>
            <TableCell className={styles.headerCell}>DATE</TableCell>
            <TableCell className={styles.headerCell} align="right">
              AMOUNT
            </TableCell>
            <TableCell className={styles.headerCell} align="right">
              ACTIONS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((row) => (
            <TableRow key={row.id} className={styles.tableRow}>
              <TableCell className={styles.cell}>
                <div className={styles.expenseTitle}>{row.title}</div>
              </TableCell>

              <TableCell className={styles.cell}>
                <div
                  className={`${styles.categoryChip} ${styles[`category${row.category}`]}`}
                >
                  <span className={styles.categoryDot}></span>
                  {row.category}
                </div>
              </TableCell>

              <TableCell className={styles.cell}>
                <span className={styles.dateText}>{row.date}</span>
              </TableCell>

              <TableCell className={styles.cell} align="right">
                <span className={styles.amountText}>
                  {formatCurrency(row.amount)}
                </span>
              </TableCell>

              <TableCell className={styles.cell} align="right">
                <IconButton
                  size="small"
                  aria-label="edit"
                  className={styles.actionIcon}
                >
                  <EditOutlinedIcon fontSize="small" onClick={() => setIsEdditExpenseOpen(true)} />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="delete"
                  className={styles.deleteIcon}
                >
                  <DeleteOutlineOutlinedIcon fontSize="small" onClick={() => handleDelete(true)} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FooterContainer />
    </TableContainer>

    <DeleteExpenses
      open={isDeleteExpenseOpen}
      onClose={() => handleDelete(false)}
      onConfirm={()=> console.log('Close delete expense dialog')}
      expenseTitle="health insurance"
      expenseAmount="$200"
    />
      <ExpenseFormModal
        open={isEdditExpenseOpen}
        onClose={() => setIsEdditExpenseOpen(false)}
        isEddit = {true}
      />
    </div>
  );
};
