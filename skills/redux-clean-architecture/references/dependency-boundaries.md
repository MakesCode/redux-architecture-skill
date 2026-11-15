# Dependency boundaries

## Core idea

Clean Architecture is a dependency direction rule, not a mandated folder tree. Source imports point **inward** toward domain policy. React can be a primary (driving) adapter; API implementations, storage and test doubles are secondary (driven) adapters. Domain defines contracts in its own language.

```text
React UI ----> Redux application/use cases ----> Domain types & ports
                       ^                              ^
                       |                              |
              bootstrap injects               secondary adapter
                dependencies                     implements port
```

Arrows above represent source imports/dependencies, not the runtime calling direction. At runtime a use case calls an injected port and the concrete adapter handles the operation.

## Two legitimate placements for Redux Toolkit

1. **Strict framework-independent domain:** pure domain types, policies and port interfaces; `application/` contains Redux slices, thunks, query configuration and selectors. Best when independent domain reuse matters.
2. **Pragmatic Redux-centric core:** a `core-logic/` package can contain Redux use cases and reducers without importing infrastructure adapters or UI components. Choose this when Redux is an accepted application dependency. It remains infrastructure-decoupled, but not Redux-independent.

Do **not** claim the Redux-centric variant is wholly framework-agnostic. In particular, importing `@reduxjs/toolkit/query/react` creates a React-specific build-time dependency; isolate generated hooks to the UI-facing layer if strict React independence is required.

## Review checklist

- Search imports from `domain/` or `core-logic/` to `adapters/` and HTTP clients.
- Search React components for `fetch`, persistence or API DTO parsing.
- Check that ports return stable domain models, not `AxiosResponse`.
- Inspect bootstrap for wiring; no module-level singleton gateways in use cases.
- Ask whether a new abstraction is justified by variation or testing.
