---
name: redux-typescript-advanced
description: Improve TypeScript type safety in Redux Toolkit and React Redux with inferred RootState and AppDispatch, typed useDispatch/useSelector hooks, createAsyncThunk.withTypes, injected gateway dependencies, typed rejectWithValue errors, matching action payloads, and safe typed selectors. Use for typed store setup, async operations, reusable application types, discriminated statuses, or TypeScript inference and circular dependency issues.
license: MIT
---

# Advanced TypeScript for Redux Toolkit

## Workflow

1. Inspect the Redux Toolkit and React Redux versions, existing type conventions and middleware before adding manual generics. Prefer inference to duplicated state types.
2. Define a store **factory** accepting typed dependencies; export `AppStore`, `RootState = ReturnType<AppStore['getState']>` and `AppDispatch = AppStore['dispatch']`. Do not write a parallel hand-maintained `RootState` unless a circular type dependency requires a focused workaround.
3. For React Redux v9.1+, expose `useAppDispatch = useDispatch.withTypes<AppDispatch>()`, `useAppSelector = useSelector.withTypes<RootState>()`, and optionally `useAppStore`. Keep React-specific hooks outside pure domain modules.
4. For repeated thunks, define `createAppAsyncThunk = createAsyncThunk.withTypes<{ extra: Dependencies; rejectValue: DomainError }>()`. Include `state: RootState` and `dispatch: AppDispatch` **when needed and when they do not create circular type inference**.
5. Use `rejectWithValue` for expected, typed failures; use `.unwrap()` in the *caller* only when it needs to act on rejection. In reducers, handle both `action.payload` (typed rejection) and `action.error` (unexpected rejection).
6. Type reducer payloads with `PayloadAction<T>` when inference is not sufficient; use builder-style `extraReducers`, which infers thunk lifecycle actions.
7. Prefer discriminated unions or literal status types to loosely-related booleans when states are mutually exclusive. Treat HTTP JSON as `unknown` and validate in the adapter; never `as DomainType` on untrusted JSON.
8. Use `actionCreator.match(action)` / `isAnyOf` for type-safe action narrowing. Do not replace matching with repeated unsafe casts.
9. Run `tsc --noEmit` with `strict` and behavioral tests. Avoid `any`, non-null assertions, broad casts and disabling Redux serializability checking to hide type problems.

## Typed wiring (abbreviated)

```ts
// application/store.ts
export function makeStore(deps: Dependencies) {
  return configureStore({
    reducer: { orders: ordersReducer },
    middleware: (getDefault) => getDefault({ thunk: { extraArgument: deps } }),
  });
}
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

```ts
// ui/hooks.ts — React Redux >= 9.1
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

See [Typed store, hooks, thunks and failure modeling](references/typed-redux.md) and the working [`examples/order-flow`](../../examples/order-flow/README.md).

## Guardrails

- A `type` import is not a runtime import, but a circular *inference* can still occur when a thunk config references `AppDispatch` and the store's reducer imports that same thunk. Break the cycle by typing only `extra` and `rejectValue` in the shared thunk helper or by introducing an explicit narrow state interface at the boundary.
- Use `.concat()` / `.prepend()` for Redux middleware instead of a spread that may widen tuple types.
- Use the actual store's inferred dispatch so thunk dispatches remain typed.
- Hooks are UI adapters; do not import React Redux from a pure domain module.
- Do not over-engineer the simplest cases: standard inference is usually enough.

