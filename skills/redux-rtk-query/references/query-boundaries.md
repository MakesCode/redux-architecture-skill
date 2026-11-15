# Cache, gateway and error boundaries

## Why a gateway-backed query?

Use an injected gateway in `queryFn` only when the application needs a replaceable transport or a testable external boundary. Resolve the gateway through the store's typed `extra` dependency and substitute a stub in tests. `fakeBaseQuery()` provides no default HTTP transport; RTK Query still manages request state, cache, subscriptions, deduplication and tags. Prefer `fetchBaseQuery` when a separate gateway adds no value.

Use it **when required by an architectural boundary**, not as a default for every network request.

## Cache lifecycle checklist

1. Identify cache identity: endpoint + serialized query argument.
2. Provide entity-oriented tags when mutations affect a specific ID.
3. Invalidate when a relevant domain outcome completes.
4. Decide whether a subscriber exists at invalidation time.
5. Handle `loading`, `success`, `error`, and retry explicitly in UI.
6. Test both invalidated and non-invalidated paths.
7. Isolate per-user cache when authentication context changes; reset API state on logout when appropriate.

## Test through the store

```ts
const store = makeStore({ orderGateway: stubOrderGateway });
const subscription = store.dispatch(orderApi.endpoints.getOrder.initiate('order-1'));
await subscription;
const result = orderApi.endpoints.getOrder.select('order-1')(store.getState());
expect(result.data).toEqual(expectedOrder);
subscription.unsubscribe();
store.dispatch(orderApi.util.resetApiState());
```

An invalidation + refetch assertion should use async waiting appropriate to the test environment and verify the final cache value, not rely on an arbitrary `setTimeout(0)` when a reliable wait can be used.

## Don't over-generalize

- Standard RTK Query endpoints using `fetchBaseQuery` are reasonable for small/medium apps.
- A strict domain module should not import React-specific hooks.
- Derived business policies usually belong to domain selectors/use cases, not data-fetch response transforms, unless transformation is purely adapter mapping.
