# TDD tests by architectural boundary

## Core use-case tests

Scope: real store, reducers, thunks, listeners, RTK Query; fake only external gateway. Dispatch actions and assert domain state / selector output. Cover success, rejection, duplicate requests and effects such as invalidating a query when an outcome is successful.

## React component tests

Scope: DOM -> React -> real store -> stub gateway. Use `userEvent` with `getByRole`, `findByRole`, `findByText` and `waitFor` to verify what a user sees. Never couple tests to action names, component internal state or implementation-only `data-testid` when accessible queries work.

## Adapter tests

Scope: real mapping adapter -> stub HTTP transport. Assert DTO-to-domain translation, invalid inputs, transport errors, empty batches and termination behavior. Guard against unbounded retries: when no valid candidate exists, enforce a finite retry or pagination policy and test the termination condition.

## Selector tests

Create store state through actions rather than mutating state directly. Assert full view-model output and unchanged identity when relevant state is unchanged.

## Test lifecycle

Prefer a fresh store, freshly created listener instance and fresh gateway per test. Unsubscribe RTK Query subscriptions, reset caches/cleanup where needed. Avoid global state and real API keys.

## Given/When/Then vocabulary

```text
Given a pending order and a stub gateway configured to confirm it
When confirmOrder(orderId) is dispatched
Then the order status is confirmed and the UI shows success
```

Each test should make one behavior obvious. When a workflow spans mechanisms, keep a small number of integration tests that prove the complete observable outcome.
