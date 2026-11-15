# Ports, adapters, the composition root, and the ACL

## Port

A port states **what a use case needs**, never **how** the outside world supplies it.

```ts
export type Order = { id: string; status: 'draft' | 'confirmed' };
export interface OrderGateway { confirm(id: string): Promise<Order> }
```

## Anti-corruption layer (ACL)

An adapter maps external representations to domain concepts; it may reject/normalize malformed data. Example: `{ order_id: 1, state: "DONE" }` becomes `{ id: "1", status: "confirmed" }`. Keep transport details (URL, tokens, headers, retries) distinct from domain translation when each has enough complexity to warrant it.

## Composition root

```ts
// store factory, depends on port type, not concrete gateway
function makeStore(gateways: { orderGateway: OrderGateway }) {
  return configureStore({
    reducer: { orders: ordersReducer },
    middleware: getDefault => getDefault({ thunk: { extraArgument: gateways } }),
  });
}

// bootstrap, the outermost boundary
const orderGateway = new HttpOrderGateway('/api');
const store = makeStore({ orderGateway });
```

Initialize a **fresh** listener middleware instance inside a store factory if the store must be instantiated repeatedly in tests; register listeners at the correct scope to avoid leakage across tests.

## When to defer a technical decision

You can implement and test domain behaviors against a stub before choosing REST/GraphQL or an HTTP client. The external choice is replaceable if the port remains stable. Don't add an ACL when the transport is trivial and no distinct domain model exists.

## Common failures

- Importing `HttpOrderGateway` in a thunk instead of using `extraArgument`.
- Defining `OrderGateway` in the HTTP adapter and forcing the domain to import it.
- Returning raw DTOs from ports, causing API churn in UI/core.
- A hard-coded default production gateway in a store factory that tests silently use.
- Turning `serializableCheck` off broadly rather than keeping serializable state.
