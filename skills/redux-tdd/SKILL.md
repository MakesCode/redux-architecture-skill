---
name: redux-tdd
description: Implement Redux Toolkit / React features with test-driven development and behavior-oriented tests. Use when adding business rules, use cases, RTK Query endpoints, ports/adapters, selector view models, or React components; prefer real store tests with stub gateways, integration tests through DOM interactions, and Red-Green-Refactor cycles.
license: MIT
---

# Redux TDD: Red → Green → Refactor

## Workflow

1. Select **one observable behavior** and express its given/when/then acceptance criteria.
2. Write a test before production code and observe the correct failure (Red); do not invent passing results.
3. Write only enough production code to satisfy the test (Green).
4. Refactor without changing behavior; rerun the relevant tests.
5. Repeat for errors, duplication guards, cache invalidation and boundary translation.
6. For use-case tests, instantiate **the real Redux store**, real reducers/thunks/listeners/RTK Query middleware, replacing only externally controlled gateways with stubs.
7. For adapter tests, stub the lower transport and assert normalized domain results, invalid-input handling and failures.
8. For component tests, mount a real component with a real store and stubbed gateway, use Testing Library user interactions, accessible roles/names and visible results. Avoid asserting dispatch internals.
9. If tests cannot be executed, state that clearly and provide exact commands and expected assertions.

## TDD entry point

Choose the narrowest useful entry point for the requested behavior: outside-in when user-visible React behavior drives the design, or a store-level test when the change is a use case, reducer or selector. In both cases, start with a failing test, implement the minimal change and verify the result. Do not add UI tests for unrelated core-only changes.

## Store-level example

```ts
it('confirms an order using the injected gateway', async () => {
  const gateway = new StubOrderGateway();
  gateway.confirmedOrder = { id: 'o-1', status: 'confirmed' };
  const store = makeStore({ orderGateway: gateway });

  await store.dispatch(confirmOrder('o-1'));

  expect(store.getState().orders.current).toEqual({
    id: 'o-1', status: 'confirmed',
  });
});
```

## Component-level example

```tsx
render(<Provider store={store}><OrderPage /></Provider>);
await user.click(screen.getByRole('button', { name: /confirm order/i }));
expect(await screen.findByText(/order confirmed/i)).toBeVisible();
```

## Red flags

- Mocking all Redux mechanics instead of the external boundary.
- Asserting “the component dispatched action X” instead of what the user can observe.
- Real network requests in deterministic core tests.
- Arbitrary `setTimeout` sleeps instead of waiting for an observable condition.
- Introducing infrastructure without a test that needs it.

Read: [Tests by boundary](references/testing-levels.md).
