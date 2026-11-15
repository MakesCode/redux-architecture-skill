# Redux Architecture Skills

**Make AI coding agents write Redux with the discipline of a senior frontend architect.**

Open-source [Agent Skills](https://agentskills.io/specification) for **Redux Toolkit + TypeScript**: clean architecture, event-oriented workflows, normalized entity collections, RTK Query, selectors, advanced typing, and behavior-first testing.

**For:** Codex · Claude Code · Grok Build · Cursor · compatible coding agents.

**Read in:** English · [Français](docs/i18n/README.fr.md) · [Español](docs/i18n/README.es.md) · [Português (Brasil)](docs/i18n/README.pt-BR.md) · [简体中文](docs/i18n/README.zh-CN.md) · [日本語](docs/i18n/README.ja.md)

> A skill is an instruction package for an AI agent. It does **not** install Redux in your application, enforce rules automatically or guarantee that code is correct. The agents choose skills based on the request and their own supported skill mechanisms.

## Install

Once this repository is published under [`MakesCode`](https://github.com/MakesCode), developers can install the skills with:

```bash
# Interactive — choose skills and compatible coding agents
npx skills add MakesCode/redux-architecture-skill

# Install all skills to Codex, Claude Code and Grok Build (when supported by your CLI version)
npx skills add MakesCode/redux-architecture-skill --skill '*' -a codex -a claude-code -a grok -y

# Install just the architecture audit
npx skills add MakesCode/redux-architecture-skill --skill redux-architecture-audit

# Preview available skills without installing
npx skills add MakesCode/redux-architecture-skill --list
```

Try locally before publishing: `npx skills add .` from the repository root. The installation command is provided by the community [`skills` CLI](https://github.com/vercel-labs/skills); check your CLI's supported agent IDs before using non-interactive flags.

| Agent | Typical project-level skill path |
| --- | --- |
| Codex | `.agents/skills/<skill-name>/` |
| Claude Code | `.claude/skills/<skill-name>/` |
| Grok Build | `.grok/skills/<skill-name>/` (check current Grok Build support) |
| Cursor | Resolve through the `skills` CLI's agent picker |

**Grok Build** means the coding environment; it does not imply that every Grok chat interface can load skills. See [Agent Skills](https://agentskills.io/specification) and [Grok Build docs](https://docs.x.ai/build/features/skills-plugins-marketplaces).

## Multi-agent plugin layout

Alongside portable `skills/` folders, this repository includes **multi-agent plugin metadata**: `.agents/plugins/`, `.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`, `.grok-plugin/`, `gemini-extension.json`, `kimi.plugin.json` and a root `plugin.json`. Each platform points to the **same eight standalone skills**; there are no duplicated prompts or extra install scripts.

> These manifests are provided for compatible agent-plugin hosts; support varies by version and has not yet been end-to-end tested in each host. For the simplest portable install, use `npx skills add`. No custom CLI is required.

See [Agent integrations](docs/agent-integrations.md) · [Explications en français](docs/i18n/agent-integrations.fr.md).

## Eight focused skills

| Skill | When to use | Example prompt |
| --- | --- | --- |
| [`redux-clean-architecture`](skills/redux-clean-architecture/SKILL.md) | Ports, adapters, dependency direction, composition root, ACL | “Design a checkout flow using a replaceable payment gateway.” |
| [`redux-event-driven`](skills/redux-event-driven/SKILL.md) | Actions, reducers, async thunks, listener middleware | “Make order confirmation event-oriented without UI orchestration.” |
| [`redux-entity-modeling`](skills/redux-entity-modeling/SKILL.md) | Normalized collections, `createEntityAdapter`, stable IDs and relationships | “Normalize users and follow relationships with typed selectors.” |
| [`redux-typescript-advanced`](skills/redux-typescript-advanced/SKILL.md) | `RootState`, `AppDispatch`, typed hooks, thunks and failure payloads | “Type the Redux store factory and React hooks without unsafe casts.” |
| [`redux-rtk-query`](skills/redux-rtk-query/SKILL.md) | Server caching, gateways, tags, invalidation and errors | “Keep RTK Query cache logic behind an API boundary.” |
| [`redux-selectors`](skills/redux-selectors/SKILL.md) | Derived state, view models and memoization | “Create a memoized cart summary read model.” |
| [`redux-tdd`](skills/redux-tdd/SKILL.md) | Use-case, adapter, selector and component tests | “Drive checkout behavior from failing tests.” |
| [`redux-architecture-audit`](skills/redux-architecture-audit/SKILL.md) | Existing code reviews and incremental architecture repair | “Audit this feature with path:line evidence and prioritized fixes.” |

Skills are designed to be combined, but each stands alone. `SKILL.md` contains short behavioral instructions; longer examples and reasoning live in linked `references/` files.

## Design principles

- **Dependency direction over folder dogma.** A pure domain never imports React, transport clients or concrete adapters. Redux-specific coordination may belong in the application layer.
- **Ports only for meaningful boundaries.** Use gateway interfaces when they isolate replaceable dependencies, external contracts or test seams.
- **Business events when appropriate.** Distinguish *intent* from an *observed fact*. Redux is not automatically Event Sourcing.
- **Entity adapters only for real collections.** Use `createEntityAdapter` when identity, lookup and repeated updates justify it. A single current order does not require it.
- **Typed, safe application wiring.** Infer `RootState`/`AppDispatch`; type React hooks and async thunk dependencies; validate untrusted API JSON.
- **RTK Query for server cache.** Use `fakeBaseQuery` + `queryFn` when a gateway abstraction matters. `fetchBaseQuery` is valid for simpler application APIs.
- **Selectors are read models.** Memoize derived arrays/objects when reference stability or computation matters, not every trivial selector.
- **Behavior-first testing.** Exercise real Redux stores with stub gateways; test React via visible behavior and accessible DOM roles.
- **Minimal architecture.** Avoid Redux, normalization or adapters when the feature doesn't need them.

## Example: a realistic small order flow

The [`examples/order-flow`](examples/order-flow/README.md) project includes:

```text
Pure domain model + OrderGateway port
    ↑ implemented by HttpOrderGateway / StubOrderGateway
Redux application (typed createAsyncThunk → slice → selectors)
    ↑ consumed by typed React hooks / OrderConfirmation component
Store factory + bootstrap compose the application
```

The sample illustrates `RootState`, `AppDispatch`, `.withTypes()` React hooks, typed `rejectWithValue` errors, a request-ID guard against stale results, DTO mapping at the infrastructure boundary, use-case tests, HTTP adapter tests and DOM-level UI tests.

**Deliberately no `createEntityAdapter` in the order example.** Its state represents one active order. The separate [`redux-entity-modeling`](skills/redux-entity-modeling/SKILL.md) skill covers normalized user collections and relationships.

**Before: UI handling HTTP + state orchestration**

```tsx
function OrderButton({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  return <button onClick={async () => {
    const response = await fetch(`/api/orders/${id}/confirm`, { method: 'POST' });
    const dto = await response.json();
    dispatch(setCurrentOrder(dto));
    dispatch(closeModal());
  }}>Confirm</button>;
}
```

**After: thin UI adapter using the use case**

```tsx
function OrderButton({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  return <button onClick={() => { void dispatch(confirmOrder(id)); }}>
    Confirm
  </button>;
}
```

Run the example:

```bash
cd examples/order-flow
npm install
npm test
npm run typecheck
```

Tests use stub gateways, not a running backend. See the [sample README](examples/order-flow/README.md) for the actual files and limitations.

## Prompt ideas

```text
Use redux-clean-architecture and redux-tdd to implement a checkout feature.
Write a failing behavior test, inject a gateway, keep the domain independent of HTTP.
```

```text
Use redux-entity-modeling for our people and team memberships.
Choose stable IDs, normalize real collections, and justify whether Redux should own the data.
```

```text
Use redux-typescript-advanced to type the store factory, React hooks and async thunks.
Prefer inference; include expected rejection payloads and avoid circular type dependencies.
```

## Validation and contributions

GitHub Actions runs the example tests and TypeScript typecheck. Maintainer-only validation scripts are **not** included in this public repo; the skills require **no Python**. See [CONTRIBUTING.md](CONTRIBUTING.md) and [design principles](docs/design-principles.md).

Every skill is self-contained and written for direct use by coding agents. Contribute focused patterns and executable examples instead of background explanations.

## License

MIT — see [LICENSE](LICENSE).

If these skills improve your Redux architecture, a GitHub ⭐ and a concrete before/after contribution help others discover them.
