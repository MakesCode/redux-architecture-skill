---
name: redux-rtk-query
description: Build or review Redux Toolkit RTK Query endpoints, caching, tags, invalidation, loading and error handling with optional domain-owned gateway ports. Use when integrating REST/GraphQL, replacing providers, testing data access without network, designing queryFn/fakeBaseQuery, or deciding whether fetching belongs behind an adapter.
license: MIT
---

# RTK Query with explicit boundaries

## Workflow

1. Determine whether this is **server-cache state**, **durable client/domain state**, or local UI state. Don't duplicate server caches in slices without a concrete need.
2. Choose transport strategy:
   - Ordinary application API without isolation needs: `createApi` + `fetchBaseQuery` in the application/data layer.
   - Transport-independent use case with a real boundary: `createApi` + `fakeBaseQuery()` + endpoint `queryFn` calling an injected gateway.
3. Keep transport URLs, headers and external DTOs out of a pure domain layer. Map external shapes at the gateway/adapter boundary.
4. Return `{ data }` for success and `{ error }` for failure from `queryFn`. Model rejected promises and provider failures explicitly.
5. Design tag types, `providesTags`, `invalidatesTags` / `util.invalidateTags` based on actual cache lifetime, subscription and refetch needs.
6. Avoid uncontrolled refetch loops, stale cross-user caches, hidden network calls and excessive invalidations.
7. Test endpoint caching, error state and invalidation using real middleware/reducer configuration with stub gateways, without calling a real API.

## Gateway-backed example

```ts
// Application-level RTK Query definition; no concrete fetch dependency.
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fakeBaseQuery<{ message: string }>(),
  tagTypes: ['Order'],
  endpoints: builder => ({
    getOrder: builder.query<Order, string>({
      async queryFn(id, { extra }) {
        const gateway = (extra as { orderGateway: OrderGateway }).orderGateway;
        try {
          return { data: await gateway.get(id) };
        } catch (error) {
          return { error: { message: error instanceof Error ? error.message : 'Unknown error' } };
        }
      },
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
  }),
});
```

`extra` must be injected by your store factory. Keep runtime failure handling consistent with the project's error contract. This example uses a TypeScript assertion at a known composition boundary; validate required dependencies at bootstrap.

## Important distinctions

- `fakeBaseQuery` is **not** universally better than `fetchBaseQuery`.
- RTK Query caching and generated React hooks are distinct concerns. Using `@reduxjs/toolkit/query/react` in a module makes that module React-dependent; keep a strictly pure domain separate from it.
- Invalidation of an actively subscribed query can initiate a refetch. It does not promise that every invalidated query will make an immediate network request.
- Query tag invalidation is not a substitute for explicit handling of optimistic updates, transactions or error states.

Read: [Cache, gateway, and invalidation patterns](references/query-boundaries.md).
