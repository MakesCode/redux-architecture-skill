# Read models, memoization and selector tests

## Three levels

1. Simple selector: `(state) => state.cart.lines`.
2. Memoized derivation: `createSelector(selectLines, lines => lines.map(...))` when stable references and/or expensive computation matter.
3. Composed view model: use multiple input selectors across slices and server-cache data.

A result function generally recomputes when input values change according to its memoization implementation. Keep input selectors stable and avoid freshly allocated array/object inputs that defeat memoization.

## Example assertion

```ts
const before = selectCartSummary(store.getState());
store.dispatch(unrelatedAction());
const after = selectCartSummary(store.getState());
expect(after).toBe(before); // derived reference stable for unchanged relevant inputs

store.dispatch(cartItemAdded({ sku: 'p1', price: 5, quantity: 2 }));
expect(selectCartSummary(store.getState())).toEqual({
  itemCount: 2,
  total: 10,
  canCheckout: true,
});
```

When selecting from RTK Query, read endpoint cache data via its provided selectors and account for `undefined` until a successful response. Avoid recreating endpoint selectors gratuitously inside hot paths if stable composition matters.

## Placement

- Single slice field or derivative: near the slice.
- Cross-slice view-model composition: `selectors/`.
- Pure domain computation independent of Redux: domain module, invoked by selectors.

Test the full returned model, not only one property, to catch collateral derivation bugs.
