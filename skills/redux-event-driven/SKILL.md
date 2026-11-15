---
name: redux-event-driven
description: Implement or refactor Redux Toolkit slices, actions, async thunks, extraReducers, and listener middleware with meaningful business events and decoupled reactions. Use when UI handlers dispatch multiple mechanical updates, business logic leaks into components, async validation requires guards, or multiple state slices react to the same outcome.
license: MIT
---

# Redux Toolkit: think in business events

## Workflow

1. Write the behavioral story: **user intent -> work -> observable outcome**.
2. Separate **request/intent** (`confirmOrder(id)`) from **completed fact** (`orderConfirmed` or a thunk's `fulfilled` action). Event naming applies to facts, not indiscriminately to every action or thunk.
3. Put business state transitions in `createSlice` reducers or `extraReducers`; reducers must remain synchronous, deterministic and side-effect free.
4. Use `createAsyncThunk` for an async use case through injected ports. Use `condition` only for a specific duplicate/race guard, tested against intended behavior.
5. When several slices react to the same fact, use independent `extraReducers` instead of a UI handler dispatching a sequence of mechanical commands.
6. Put follow-up work such as cache invalidation, navigation integrations, delays or orchestrated effects in listener middleware or another explicit application orchestrator; **never** inside reducers.
7. Test state consequences and error paths using a real store and a stub boundary.

## Preferred example

```ts
export const confirmOrder = createAsyncThunk<
  Order,
  string,
  { extra: { orderGateway: OrderGateway } }
>('orders/orderConfirmed', (id, { extra }) => extra.orderGateway.confirm(id));

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { current: null as Order | null, status: 'idle' as 'idle' | 'loading' | 'error' },
  reducers: {},
  extraReducers: builder => builder
    .addCase(confirmOrder.pending, state => { state.status = 'loading'; })
    .addCase(confirmOrder.fulfilled, (state, action) => {
      state.current = action.payload;
      state.status = 'idle';
    })
    .addCase(confirmOrder.rejected, state => { state.status = 'error'; }),
});
```

A second slice may react to `confirmOrder.fulfilled` independently. Use an event-like prefix for a completed outcome only when the team finds that naming understandable. Redux is **not automatically event sourcing**: action logs are not durable, replayable event stores by default.

## Avoid

- `onClick` code that fetches data, branches on business rules and dispatches four `setX` actions.
- Reducers that perform HTTP calls, timeouts, random behavior or navigation.
- Treating every setter-like action as inherently wrong: explicit commands/intents are appropriate when they express a request or simple UI event.
- Creating listener chains for simple synchronous state updates.
- Disabling serializable state checks to store promises, callbacks or infrastructure clients.

## Reporting

Explain what fact occurred, which reducers independently react, which side effects run, and what tests prove the behavior.

Further details: [Event and effect boundaries](references/events-and-effects.md).
