import type { Order } from '../domain/order.js';
import { createAppAsyncThunk } from './createAppAsyncThunk.js';

/** A request (intent); the fulfilled action describes the confirmed outcome. */
export const confirmOrder = createAppAsyncThunk<Order, string>(
  'orders/orderConfirmed',
  async (orderId, { extra, rejectWithValue }) => {
    try {
      return await extra.orderGateway.confirm(orderId);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not confirm order';
      return rejectWithValue({ message });
    }
  },
);
