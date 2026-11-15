import type { RootState } from './store.js';

/** Primitive selectors require no memoization. UI components don't inspect slice internals. */
export const selectCurrentOrder = (state: RootState) => state.orders.current;
export const selectOrderStatus = (state: RootState) => state.orders.status;
export const selectOrderError = (state: RootState) => state.orders.error;
export const selectCanConfirmOrder = (state: RootState) => state.orders.status !== 'pending';
