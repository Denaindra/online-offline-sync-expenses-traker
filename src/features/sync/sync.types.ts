import type { Expense } from "../expenses/expense.types";

export type QueueItem = {
  type: "create" | "update" | "delete";
  expense: Expense;
};
