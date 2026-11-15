---
name: redux-selectors
description: Design, compose, test and optimize Redux selectors and memoized read models using Redux Toolkit createSelector. Use when React components derive business flags or view models from state, selectors return fresh arrays/objects, multiple slices or RTK Query caches must be combined, or unnecessary rerenders are observed.
license: MIT
---

# Redux selectors as read models

## Workflow

1. Identify the consumer's **view model** (what it needs to render), not the shape of the raw store.
2. Define input selectors that read the minimum relevant state. Co-locate simple selectors with their slice when it suits the repository.
3. Keep simple primitive selectors plain functions; use `createSelector` when recomputation or referential instability is meaningful, especially for derived arrays/objects.
4. Compose selectors where a calculation reuses other stable derived values. Avoid unnecessary creation of selector instances in render functions.
5. Keep derivation pure: no dispatch, network, mutation or hidden clock state.
6. Check selectors' return-reference behavior when inputs stay unchanged, and business interpretation when inputs change.
7. Test through realistic store actions and final view-model assertions. Include no-data and edge cases.

## Example

```ts
import { createSelector } from '@reduxjs/toolkit';

type State = {
  cart: { lines: Array<{ sku: string; price: number; quantity: number }> };
  checkout: { pending: boolean };
};

const selectLines = (s: State) => s.cart.lines;
const selectCheckoutPending = (s: State) => s.checkout.pending;

export const selectCartSummary = createSelector(
  [selectLines, selectCheckoutPending],
  (lines, pending) => ({
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    canCheckout: !pending && lines.length > 0,
  }),
);
```

The UI receives `itemCount`, `total` and `canCheckout`; it does not recalculate domain rules on every render.

## Avoid

- Returning `items.map(...)` from a `useSelector` callback without memoization when it creates a new reference on every store change.
- `createSelector` for a single boolean or primitive read with negligible cost.
- Selectors reading broad root objects when narrow fields suffice.
- Side effects, state mutation or random values in selectors.
- Blindly claiming selector memoization makes expensive code free; measure and verify identity.

Read: [Composition, memoization and tests](references/read-models.md).
