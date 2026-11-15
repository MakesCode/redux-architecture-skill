---
name: redux-architecture-audit
description: Audit an existing Redux Toolkit, RTK Query, React, or TypeScript feature for architecture coupling, dependency direction, transport leakage, event design, selectors, side effects and test coverage. Use for code review, technical debt assessment, PR review, clean architecture health checks, or a safe incremental refactor plan with file-and-line evidence.
license: MIT
---

# Audit a Redux architecture

## Steps

1. Map actual directories, imports, store factory, app bootstrap, slices, endpoints, selectors, components, adapters and tests. **Do not** assume the template directory names are used.
2. Identify business/domain boundaries versus Redux application code and infrastructure; decide whether the repository claims a pure domain or pragmatic Redux-centric core.
3. Confirm every finding against **a concrete file and line**, not only a stylistic preference.
4. Check in order:
   - **P0:** domain imports concrete secondary adapters or API clients; credentials in source; unsafe mutations/side effects in reducers.
   - **P1:** UI performs business/HTTP orchestration; untestable singleton gateways; DTO leakage across a stable domain boundary; missing error handling; async duplication/races; inappropriate cache invalidation.
   - **P2:** selectors return fresh derived arrays/objects and cause avoidable renders; duplicated business derivations; brittle tests of implementation rather than behavior; unnecessary Redux state or layers.
5. For every issue give: severity, `path:line`, observed behavior, why it matters, smallest repair, and a focused regression test.
6. Distinguish actual issues from optional architecture preferences. Don't demand ports for every API, memoization for primitives, or Redux for one local field.
7. If asked to refactor, make incremental changes and run available checks. Otherwise only report and propose a plan.
8. Note any scope or tests that could not be inspected or run; do not invent findings.

## Output format

```text
## Findings
[P1] UI fetches and maps transport DTOs — src/features/orders/OrderPage.tsx:42
Evidence: ...
Impact: Changing API contract requires changing UI and makes tests network-coupled.
Smallest fix: Extract an OrderGateway adapter and call it from an injected thunk.
Regression test: Confirm the order through a real store with StubOrderGateway.

## Proposed refactor order
1. Establish a regression test for the current behavior.
2. Introduce the domain port and adapter behind the same public UI behavior.
3. Move orchestration into use case and verify selectors/components.

## Verified / not verified
- Executed: ...
- Not executed: ...
```

Read [the audit checklist](references/audit-checklist.md) for prompts and counterexamples.
