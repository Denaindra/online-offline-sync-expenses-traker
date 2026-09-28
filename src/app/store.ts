import { configureStore } from "@reduxjs/toolkit";
import networkReducer, { setOnline,setOffline } from "../features/sync/networkSlice";

export const store = configureStore({
  reducer: {
    network: networkReducer
  }
});

window.addEventListener('online', () => store.dispatch(setOnline()));
window.addEventListener('offline', () => store.dispatch(setOffline()));