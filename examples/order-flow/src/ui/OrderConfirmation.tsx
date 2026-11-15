import { confirmOrder } from '../application/confirmOrder.js';
import {
  selectCanConfirmOrder,
  selectCurrentOrder,
  selectOrderError,
  selectOrderStatus,
} from '../application/ordersSelectors.js';
import { useAppDispatch, useAppSelector } from './hooks.js';

/** The React adapter only dispatches intent and renders selector results. */
export function OrderConfirmation({ orderId }: { orderId: string }) {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectCurrentOrder);
  const status = useAppSelector(selectOrderStatus);
  const error = useAppSelector(selectOrderError);
  const canConfirm = useAppSelector(selectCanConfirmOrder);

  return (
    <section aria-label="Order confirmation">
      <button disabled={!canConfirm} onClick={() => { void dispatch(confirmOrder(orderId)); }}>
        {status === 'pending' ? 'Confirming…' : 'Confirm order'}
      </button>
      {current?.id === orderId && current.status === 'confirmed' && (
        <p role="status">Confirmed order: {current.id}</p>
      )}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
