---
name: redux-clean-architecture
description: Design or refactor Redux Toolkit and TypeScript features using Clean/Hexagonal Architecture, the dependency rule, ports and adapters, composition roots, gateways, and anti-corruption mapping. Use for feature structure, business rules, testable boundaries, removing HTTP or React coupling, or replacing an API provider. Do not impose unnecessary layers on simple local UI state.
license: MIT
---

# Redux Clean Architecture

## Workflow

1. Inspect the existing feature boundaries, dependencies, naming and test conventions. Prefer adapting to the repository over imposing a directory template.
2. Identify the business behavior and domain types independently of external API response shapes.
3. Draw the dependency arrows. Domain rules and ports must **never import** React components, HTTP clients, concrete gateways, adapters or app bootstrap.
4. Choose the simplest boundary that preserves dependency direction: (a) a framework-independent domain with Redux in the application layer, or (b) a Redux-centric application core isolated from UI and infrastructure. In (b), acknowledge that the core depends on Redux. Follow existing project conventions unless they break a concrete boundary.
5. Introduce a domain-owned port **only when a real replaceable boundary is present**. Keep external API types behind an adapter / anti-corruption layer.
6. Make the composition root instantiate adapters and inject them into a store factory (`extraArgument` for thunks; `extra` in RTK Query where used).
7. Keep React an input/display adapter: render selector results, dispatch intent, avoid inline network calls or business decisions.
8. Write behavior tests using the actual store with stub adapters; add adapter contract or mapping tests at the outside edge.
9. Review the resulting import graph for upward dependencies, speculative abstractions, and UI state incorrectly placed in the domain.

## Non-negotiable boundaries

- **Forbidden:** `core/domain -> adapters/secondary`, `core/domain -> fetch/axios`, `core/domain -> React`.
- **Allowed:** `adapters/secondary -> domain port`, `adapters/primary -> app use cases`, `bootstrap -> concrete adapters + store factory`.
- Ports use domain terminology; do not return raw transport DTOs.
- No globally instantiated production gateways inside use-case modules.
- Keep checks such as Redux serializability enabled by default; document exceptions rather than disabling them globally.

## Decision guide

- State only needed for one form? Prefer `useState` or form-local state.
- Server cache with no need to swap or isolate transport? Standard RTK Query `fetchBaseQuery` is valid in the **application/infrastructure layer**.
- Externally controlled provider, API mismatch, offline strategy or testing seam? Introduce a gateway port and adapter.
- Need deterministic use-case tests? Inject a stub through the same store factory used in production.

## Example

```ts
// domain/order.ts
export type Order = { id: string; status: 'draft' | 'confirmed' };
export interface OrderGateway {
  confirm(id: string): Promise<Order>;
}

// adapters/http-order-gateway.ts
export class HttpOrderGateway implements OrderGateway {
  async confirm(id: string): Promise<Order> {
    const response = await fetch(`/api/orders/${id}/confirm`, { method: 'POST' });
    if (!response.ok) throw new Error('Could not confirm order');
    const dto = await response.json();
    return { id: String(dto.order_id), status: 'confirmed' };
  }
}
```

The domain defines the contract; the adapter imports and implements it. Bootstrap injects the adapter into the application. This code is illustrative; parse and validate untrusted DTOs at the boundary in production.

## Output expectation

When implementing: describe the chosen dependency boundary, show changed files, tests, and any known trade-offs. When advising: show the simplest acceptable architecture first.

Read as needed:
- [Dependency rule and layers](references/dependency-boundaries.md)
- [Ports, composition, ACL, alternatives](references/ports-and-composition.md)
