# Normalized relationships (load only when needed)

Use a separate entity adapter for relationships when many-to-many membership, follow/unfollow or repeated ID-based relationship updates require it. Do not force this pattern on simple one-to-many data that can stay in a single owner record.

```ts
import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Membership = { memberId: string; teamId: string };
const membershipId = ({ memberId, teamId }: Membership) =>
  JSON.stringify([memberId, teamId]);

const membershipsAdapter = createEntityAdapter<Membership>({
  selectId: membershipId,
});

export const membershipsSlice = createSlice({
  name: 'memberships',
  initialState: membershipsAdapter.getInitialState(),
  reducers: {
    membershipAdded: membershipsAdapter.addOne,
    membershipRemoved: (state, action: PayloadAction<Membership>) => {
      membershipsAdapter.removeOne(state, membershipId(action.payload));
    },
  },
});

export const { membershipAdded, membershipRemoved } = membershipsSlice.actions;
```

- An unambiguous composite key avoids collisions between arbitrary strings.
- Use `getSelectors((root: RootState) => root.memberships)` with the actual feature path. For joins, map relationship IDs to member records; handle references to members not yet loaded.
- Prefer stable IDs to array indexes. Use `upsertMany` for incremental pages; `setAll` only for a complete replacement.
- Memoize derived result arrays where referential stability matters, not every primitive selector.
- Test duplicate IDs, add/remove, missing referenced records and repeated fetches.
- A single active order in `examples/order-flow` intentionally uses a plain slice, not `createEntityAdapter`.
