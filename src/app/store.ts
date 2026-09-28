import { configureStore } from "@reduxjs/toolkit";
import networkReducer, { setOnline,setOffline } from "../features/sync/networkSlice";
import { syncMiddleware } from "../features/sync/store/syncMiddleware";

export const store = configureStore({
  reducer: {
    network: networkReducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncMiddleware),
});

window.addEventListener('online', () => store.dispatch(setOnline()));
window.addEventListener('offline', () => store.dispatch(setOffline()));