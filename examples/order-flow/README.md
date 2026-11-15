# Order confirmation — executable Redux + TypeScript + React example

A deliberately **small** production-shaped feature demonstrating a pure domain port, Redux Toolkit application orchestration, strong TypeScript types, adapters, a composition root, a thin React UI, and behavior-driven tests. **No `createEntityAdapter`**: a single current order doesn't need collection normalization.

## Run

```bash
cd examples/order-flow
npm install
npm test
npm run typecheck
```

Node.js 20+ is recommended. The tests do not use a real server: HTTP is supplied by a stub `fetch`, and the business use case uses a stub `OrderGateway`.

## Directory map

```text
src/
  domain/order.ts                      Domain type + OrderGateway port
  application/dependencies.ts          Typed dependency contract
  application/createAppAsyncThunk.ts   Pre-typed thunk factory
  application/confirmOrder.ts          Order confirmation use case + typed errors
  application/ordersSlice.ts           Business state and request ID race guard
  application/ordersSelectors.ts       Typed primitive selectors
  application/store.ts                 Store factory, RootState, AppDispatch
  adapters/httpOrderGateway.ts         HTTP transport and DTO mapping
  adapters/stubOrderGateway.ts         Deterministic stub for tests
  ui/hooks.ts                          Typed React Redux hooks
  ui/OrderConfirmation.tsx             Thin UI adapter
  ui/OrderExample.tsx                  Provider wired with an injected store
  boot.ts                              Production composition root
test/
  orderFlow.test.ts                    Store, race-condition and HTTP adapter tests
  OrderConfirmation.test.tsx           User-facing React component tests
```

## What to inspect

- `confirmOrder()` never imports `fetch`; it calls a domain-owned port provided by `extraArgument`.
- `ordersSlice` reacts to pending/fulfilled/rejected and ignores late results by comparing `requestId`.
- `RootState` and `AppDispatch` are inferred from the store factory; React hooks use `.withTypes<...>()`.
- Rejected actions use a typed `rejectWithValue` payload, with a fallback for unexpected errors.
- `OrderConfirmation` reads selectors and dispatches a use case; it does not parse API DTOs or manually update state.
- Tests exercise the real store with a stubbed gateway, plus DOM-level behavior via accessible roles.

This is intentionally not a comprehensive commerce application: authentication, server-side validation, multi-order collection caches, persistence, optimistic writes and RTK Query belong in larger examples where a real behavior requires them.
