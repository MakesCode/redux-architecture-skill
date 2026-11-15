---
name: redux-entity-modeling
description: Use Redux Toolkit createEntityAdapter for a collection that genuinely needs lookup by stable ID, deduplication, repeated CRUD updates, or normalized relationships. Choose IDs, state ownership, reducers and selectors. Do not add entity adapters for one current object or duplicate RTK Query caches. Use only when entity modeling is relevant.
license: MIT
---

# Redux entity modeling

## Decision (do this first)

1. Identify the exact feature and state involved. Inspect only the relevant files; do not scan unrelated modules or browse external repositories or documentation unless asked or blocked.
2. **One object or local UI state:** use a plain value or slice; stop here. **Server data already owned by RTK Query:** keep its cache unless a separate normalized store is justified; stop here if not needed.
3. **Collection with stable IDs and repeated lookup, merging or CRUD:** use `createEntityAdapter<T>()`. Define a stable `selectId` if the type has no `id` property.
4. **Many-to-many relationship:** model a separate collection only when relationship lookup/updates require it. For composite IDs, encode parts unambiguously (e.g. `JSON.stringify([leftId, rightId])`).
5. Use `getInitialState` with request metadata if needed, reducers (`upsertMany`, `updateOne`, `removeOne`, etc.) and typed selectors from `getSelectors`. Choose `setAll` only when replacing the entire collection.
6. Test duplicate IDs, upserts/updates, removals and any relation keys. Return only the necessary changes and tests, not a generic architecture lecture.

## Minimal implementation

```ts
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

type Member = { id: string; displayName: string };
const membersAdapter = createEntityAdapter<Member>();

export const membersSlice = createSlice({
  name: 'members',
  initialState: membersAdapter.getInitialState({ loading: false }),
  reducers: {
    membersReceived: membersAdapter.upsertMany,
    memberRemoved: membersAdapter.removeOne,
  },
});

export const { membersReceived, memberRemoved } = membersSlice.actions;
export const selectMemberById = membersAdapter.getSelectors(
  (state: { members: ReturnType<typeof membersSlice.reducer> }) => state.members,
).selectById;
```

## Guardrails

- Entity types describe the application; map external API DTOs at an adapter boundary when needed.
- Do not create duplicate sources of truth across Redux slices and RTK Query caches.
- `upsertMany` merges; `setAll` replaces all entities; `updateOne` is shallow.
- Keep request status outside individual entities, unless explicitly part of their domain state.
- Never normalize a single current order merely to demonstrate `createEntityAdapter`.

For *nontrivial* composite keys and relationship selectors, read [Normalized relationships](references/normalized-relations.md). Otherwise stop here.
