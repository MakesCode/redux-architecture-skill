# Typed Redux Toolkit in practice

## Types derived from a store factory

```ts
export const makeStore = (deps: Dependencies) => configureStore({
  reducer: { orders: ordersReducer },
  middleware: getDefault => getDefault({ thunk: { extraArgument: deps } }),
});
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

Types derive from the *factory*, not a shared singleton used by tests and production. Tests can construct fresh instances with stub gateways. In a React adapter:

```ts
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, RootState, AppStore } from '../application/store';
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
```

For React Redux versions prior to 9.1, use appropriately typed wrappers instead of `.withTypes()`.

## Pre-typed thunks and known failures

```ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Dependencies } from './deps';

type ConfirmProblem = { code: 'REJECTED' | 'UNAVAILABLE'; message: string };
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  extra: Dependencies;
  rejectValue: ConfirmProblem;
}>();

export const confirmOrder = createAppAsyncThunk<Order, string>(
  'orders/orderConfirmed',
  async (id, { extra, rejectWithValue, signal }) => {
    try {
      return await extra.orderGateway.confirm(id, { signal });
    } catch (error) {
      if (signal.aborted) throw error;
      return rejectWithValue({ code: 'UNAVAILABLE', message: 'Unable to confirm order' });
    }
  },
);
```

This is **a pattern**, not an API contract for the `examples/order-flow` gateway (which intentionally keeps a simpler `confirm(id)` method). Do not introduce a `signal` parameter unless the gateway implementation and the adapter actually forward it. In reducers, `action.payload` may be undefined on unexpected thrown errors; check before reading its fields.

## Better application state choices

- Small state: `type Status = 'idle' | 'pending' | 'failed'` is sufficient.
- Mutually exclusive result states: `type RequestState<T> = {status:'idle'} | {status:'pending'} | {status:'success';data:T} | {status:'failed';error:string}`; reducers can model transitions in one place.
- Errors from network: parse to `unknown`, validate, then convert to a safe UI-friendly error. Never expose credentials or unsafe server messages unfiltered.
- Imported JSON: do not bypass validation with `as User` or `as Order`.
- Multiple asynchronous operations: use request IDs, abort signals or `condition` when necessary; test out-of-order responses.

## Typed actions and selectors

```ts
import { createSelector, isAnyOf, type UnknownAction } from '@reduxjs/toolkit';

function isSuccess(action: UnknownAction) {
  return confirmOrder.fulfilled.match(action);
}

const selectCurrentOrder = (state: RootState) => state.orders.current;
const selectOrderId = createSelector([selectCurrentOrder], order => order?.id ?? null);
```

Do not memoize `selectOrderId` by default; its return is a primitive. The example only demonstrates the typed `createSelector` signature. Use memoization to stabilize derived arrays/objects or expensive calculations.

Apply these patterns to the Redux Toolkit and React Redux versions installed in the project; inspect local types when a version-specific API differs.
