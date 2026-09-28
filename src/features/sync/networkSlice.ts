// networkSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage, QUEUE_STORAGE_KEY } from "../../shared/utility/storage";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { QueueItem } from "./sync.types";


const networkSlice = createSlice({
  name: "network",
  initialState: {
    queue: loadFromStorage<QueueItem[]>(QUEUE_STORAGE_KEY, []),
    isOnline: navigator.onLine,
  },
  reducers: {

    setOnline: (state) => {
      state.isOnline = true;
    },
    setOffline: (state) => {
      state.isOnline = false;
    },
    addToQueue: (state, action: PayloadAction<QueueItem>) => {
      state.queue.push(action.payload);
      console.log('Queue after adding:', state.queue.length);
    },
  }
});

export const { setOnline, setOffline, addToQueue } = networkSlice.actions;

export default networkSlice.reducer;