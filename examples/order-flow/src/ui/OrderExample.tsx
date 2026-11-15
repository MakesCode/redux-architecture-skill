import { Provider } from 'react-redux';
import type { AppStore } from '../application/store.js';
import { OrderConfirmation } from './OrderConfirmation.js';

/** Inject the real or stubbed Redux store from the application's composition root. */
export function OrderExample({ store, orderId }: { store: AppStore; orderId: string }) {
  return (
    <Provider store={store}>
      <OrderConfirmation orderId={orderId} />
    </Provider>
  );
}
