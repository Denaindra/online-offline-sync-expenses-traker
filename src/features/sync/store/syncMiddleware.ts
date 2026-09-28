import type { Middleware } from "@reduxjs/toolkit";
import {
  saveToStorage,
  QUEUE_STORAGE_KEY,
} from "../../../shared/utility/storage";
import { expensesApi } from "../../expenses/api/expenses.api";
import type { QueueItem } from "../sync.types";

const sendToServer = async (item: QueueItem) => {
  try {
    switch (item.type) {
      case "create":
        await expensesApi.create(item.expense);
        break;
    //   case "update": {
    //     const { id, ...values } = item.expense;
    //     await expensesApi.update(id, values);
    //     break;
    //   }
    //   case "delete":
    //     await expensesApi.delete(item.expense.id);
    //     break;
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

const syncQueue = async (queue: QueueItem[], store: any) => {
  for (const item of queue) {
    const result = await sendToServer(item);
    if (result.ok) {
      console.log("Successfully synced queued expense:", result);
      store.dispatch({ type: "network/removeFromQueue", payload: item });
    } else {
      console.error("Failed to sync queued expense:", result.error);
    }
  }
};

export const syncMiddleware: Middleware = (store) => {
  return (next) => (action) => {
    const result = next(action);
    const isOnline = store.getState().network.isOnline;
    if (isOnline) {
      syncQueue(store.getState().network.queue,store);
    } else {
      saveToStorage(QUEUE_STORAGE_KEY, store.getState().network.queue);
    }
    return result;
  };
};
