import type { Order, OrderGateway } from '../domain/order.js';

type ApiOrder = { order_id: string | number; state: 'DONE' };
function isApiOrder(value: unknown): value is ApiOrder {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (typeof candidate.order_id === 'string' || typeof candidate.order_id === 'number')
    && candidate.state === 'DONE';
}

/** Only the adapter understands transport DTOs and the network. */
export class HttpOrderGateway implements OrderGateway {
  constructor(
    private readonly baseUrl: string,
    private readonly request: typeof fetch = fetch,
  ) {}

  async confirm(id: string): Promise<Order> {
    const response = await this.request(
      `${this.baseUrl}/orders/${encodeURIComponent(id)}/confirm`,
      { method: 'POST' },
    );
    if (!response.ok) throw new Error(`Order API failed: ${response.status}`);
    const value: unknown = await response.json();
    if (!isApiOrder(value)) throw new Error('Order API returned an invalid shape');
    return { id: String(value.order_id), status: 'confirmed' };
  }
}
