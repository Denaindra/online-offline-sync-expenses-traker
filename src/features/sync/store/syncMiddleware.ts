import type { Middleware } from "@reduxjs/toolkit";


// const sendToServer = (item: QueueItem) => {

// };


export const syncMiddleware: Middleware = (store) => {
 return (next) => (action) => {
    const result = next(action);
    const isOnline = store.getState().network.isOnline;

    if (isOnline) {
      console.log("Online - action dispatched:", action);
    } else {
      console.log("Offline - action dispatched:", action);
    }

    return result;
  };

  };

