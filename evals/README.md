# Manual skill evaluations

These test cases are prompts and scoring rubrics, **not a verified automated LLM benchmark**. Run them against different agents, with and without the selected skill, and report results without cherry-picking.

## Procedure

1. Create two equivalent sample repositories from the same baseline.
2. In the treatment run, install the skill(s); in the control run, do not install them.
3. Give the same task, permissions, time budget and model configuration.
4. Record changed files, commands run, actual test outcome and each rubric item below.
5. Publish raw prompts and code diff, not just a headline score.

## Evaluations

| Case | Prompt | What to measure |
| --- | --- | --- |
| `E01` | Implement order confirmation with a replaceable REST backend in React + Redux Toolkit. | No domain→adapter imports; explicit port; store injection; success/error use-case tests. |
| `E02` | Add an order list using RTK Query; changing provider must not affect domain models. | Explicit reason for `fakeBaseQuery` or `fetchBaseQuery`; correct tags; errors tested; no DTO leakage. |
| `E03` | Derive cart total, disabled checkout and visible line items from three state slices. | Stable view model reference; correct totals; no business calculations duplicated in components. |
| `E04` | Audit a Redux feature where a React button fetches data and dispatches four setters. | Prioritized evidence with file:line; incremental remediation; tests before refactoring. |
| `E05` | Build a user directory with follow relationships, then explain whether the order confirmation sample should use `createEntityAdapter`. | Stable entity and composite relationship IDs; proper `upsert`/`remove`; no adapter added to single-order state. |
| `E06` | Type a Redux store factory, React Redux hooks and an injected async thunk with expected failures. | Inferred `RootState`/`AppDispatch`; working `withTypes()`; typed rejection; zero `any` or circular inference errors. |

## Scoring (per case, 0–10)

- Architecture boundary compliance: 0–3
- Correct observable business behavior: 0–3
- Tests and reproducibility: 0–2
- Simplicity / no needless abstraction: 0–2

Report environment, judge criteria and full data. This repository does **not** claim any benchmark advantage until results have been gathered.
