import { createSlice } from '@reduxjs/toolkit';
import type { Order } from '../domain/order.js';
import { confirmOrder } from './confirmOrder.js';

export type OrdersState = {
  current: Order | null;
  status: 'idle' | 'pending' | 'failed';
  error: string | null;
  /** Prevent stale results from overwriting the latest request. */
  activeRequestId: string | null;
};

const initialState: OrdersState = {
  current: null, status: 'idle', error: null, activeRequestId: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(confirmOrder.pending, (state, action) => {
      state.status = 'pending';
      state.error = null;
      state.activeRequestId = action.meta.requestId;
    })
    .addCase(confirmOrder.fulfilled, (state, action) => {
      if (state.activeRequestId !== action.meta.requestId) return;
      state.current = action.payload;
      state.status = 'idle';
      state.activeRequestId = null;
    })
    .addCase(confirmOrder.rejected, (state, action) => {
      if (state.activeRequestId !== action.meta.requestId) return;
      state.status = 'failed';
      state.error = action.payload?.message ?? action.error.message ?? 'Could not confirm order';
      state.activeRequestId = null;
    }),
});
