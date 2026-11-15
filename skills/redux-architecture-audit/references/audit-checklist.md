# Evidence-first audit checklist

## Import direction

- Does domain/core import React, transport DTOs, concrete HTTP/storage adapters, or bootstrap code?
- Are gateway interfaces owned by the consumer domain/application layer?
- Is infrastructure implementation injected in the composition root or hard-coded in a use case?

## State and effects

- Does a reducer contain network calls, clocks, randomness or navigation?
- Does UI make business decisions and dispatch several mechanical updates after fetching?
- Are facts and intents distinguished? Do independent slices react to shared outcomes?
- Do listeners subscribe and clean up correctly when multiple stores exist?

## RTK Query

- Are caches correctly keyed, tagged and invalidated?
- Are errors/rejections handled in adapters, endpoints and UI?
- Is `fakeBaseQuery` used for a justified port, rather than by default?
- Is per-user cached data cleared on logout when relevant?

## Selectors and UI

- Does a selector produce fresh arrays/objects for unchanged inputs?
- Are business flags duplicated in components rather than derived in one read model?
- Could a local `useState` replace store complexity?

## Tests

- Are use-case tests real-store-based with stub gateways?
- Do component tests assert accessible DOM outcomes?
- Are ACL mappings, malformed data, and async error paths verified?
- Does the refactor plan start with a failing regression test?

## Heuristic scripts

A regular-expression-only import checker is insufficient to validate aliases and module graphs. Verify actual dependencies in the relevant project and flag uncertain cases.
