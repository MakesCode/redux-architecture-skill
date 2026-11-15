import { configureStore } from '@reduxjs/toolkit';
import type { Dependencies } from './dependencies.js';
import { ordersSlice } from './ordersSlice.js';

/** Production and tests use the same factory, with different gateway adapters. */
export function makeStore(dependencies: Dependencies) {
  return configureStore({
    reducer: { orders: ordersSlice.reducer },
    middleware: getDefault => getDefault({
      thunk: { extraArgument: dependencies },
    }),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
