# Redux architecture: decision guide

This document helps choose the **smallest architecture that meets the feature's actual needs**. It is not required reading for every agent task. Open only the relevant skill and reference files.

## Pick the relevant skill

| Situation | Skill | Primary decision |
| --- | --- | --- |
| Business logic is coupled to React or HTTP | `redux-clean-architecture` | Introduce a domain-owned port only for a meaningful external boundary. |
| Multiple reducers react to a business fact | `redux-event-driven` | Distinguish intent, lifecycle actions and completed domain events. |
| Large collections need lookup and updates by ID | `redux-entity-modeling` | Use `createEntityAdapter` only if normalization is beneficial. |
| Store and async logic need consistent types | `redux-typescript-advanced` | Infer `RootState`/`AppDispatch`, type hooks and injected dependencies. |
| Server data requires caching and invalidation | `redux-rtk-query` | Choose `fetchBaseQuery` or a gateway-backed `queryFn` deliberately. |
| UI needs derived data or stable references | `redux-selectors` | Derive data in selectors; memoize only when it solves a problem. |
| A new behavior needs reliable tests | `redux-tdd` | Start with the narrowest failing behavior test. |
| Existing architecture needs review | `redux-architecture-audit` | Report specific file-and-line evidence and minimal fixes. |

## Boundary decisions

- A **strict domain** contains business types, rules and ports without importing Redux, React or infrastructure. Put Redux slices/thunks in the application layer.
- A **Redux-centric application core** can contain Redux use cases and reducers, while still prohibiting imports from React UI or concrete infrastructure. Do not call it framework-independent.
- A gateway is useful when external API contracts differ from domain models, implementations may vary, or deterministic tests need an external seam. Otherwise, avoid needless abstraction.
- Redux actions can represent intent, async lifecycle stages or completed business facts. Redux is not automatically Event Sourcing.
- Keep Redux serializability checks enabled by default; justify narrow exceptions.
- For TDD, start from observable UI behavior when UX is the requirement; start from store/use-case behavior when UI is irrelevant.

## Avoid unnecessary agent work

1. Inspect only the relevant files and existing project conventions.
2. Load the selected skill's `SKILL.md`; open one linked reference only if its detail is needed.
3. Do not add Redux, adapters, normalized entities, or tests at unrelated layers by default.
4. Implement the smallest change that meets the requested behavior and verify with focused tests.
5. State any unverified behavior or trade-off without inventing results.
