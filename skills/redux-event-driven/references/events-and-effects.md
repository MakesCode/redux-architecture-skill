# Event names and independent reactions

## Think in transitions, not mechanical mutations

Prefer domain-level, past-tense facts where appropriate: `orderConfirmed`, `paymentRejected`, `modalDismissed`. A reducer can update `order`, another can close a confirmation dialog, a listener can invalidate cached orders. The UI only requests the operation and renders results.

But a user's action is often an **intent**, not a completed event. `confirmOrder` can be a thunk request; `confirmOrder.fulfilled` is the completed outcome. Avoid renaming requests as if they were already successful.

## Responsibilities

- `createSlice.reducers`: own synchronous transitions.
- `extraReducers`: react to facts/actions defined elsewhere without tight coupling between slices.
- `createAsyncThunk`: run async use cases and emit pending/fulfilled/rejected actions.
- `createListenerMiddleware`: react to actions with side effects (RTK Query invalidation, async follow-ups).
- Selectors: derive read models without mutating state.

## Checklist

- Does the action log describe meaningful outcomes?
- Can each slice react without importing another slice's mutable internals?
- Are retries, loading and errors handled with explicit state?
- Could duplicate requests cause duplicate operations? Test the guard and concurrency behavior.
- Does a listener's lifetime match the store's lifetime? Avoid cross-test listener leakage.

## Do not equate Redux to event sourcing

Redux actions are messages dispatched to reducers. Durable event sourcing requires a persisted event log, replay strategy, schema evolution and other guarantees; Redux does not give these automatically.
