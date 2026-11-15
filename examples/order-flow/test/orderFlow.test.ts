import { describe, expect, it, vi } from 'vitest';
import type { Order, OrderGateway } from '../src/domain/order.js';
import { confirmOrder } from '../src/application/confirmOrder.js';
import { makeStore } from '../src/application/store.js';
import { selectCanConfirmOrder, selectCurrentOrder } from '../src/application/ordersSelectors.js';
import { StubOrderGateway } from '../src/adapters/stubOrderGateway.js';
import { HttpOrderGateway } from '../src/adapters/httpOrderGateway.js';

describe('order confirmation', () => {
  it('updates business state via the real store and an injected stub', async () => {
    const gateway = new StubOrderGateway({ id: 'order-1', status: 'confirmed' });
    const store = makeStore({ orderGateway: gateway });

    await store.dispatch(confirmOrder('order-1'));

    expect(gateway.confirmedIds).toEqual(['order-1']);
    expect(selectCurrentOrder(store.getState())).toEqual({ id: 'order-1', status: 'confirmed' });
    expect(store.getState().orders.status).toBe('idle');
    expect(selectCanConfirmOrder(store.getState())).toBe(true);
  });

  it('exposes a typed failure while preserving an empty current order', async () => {
    const gateway = new StubOrderGateway(new Error('Payment rejected'));
    const store = makeStore({ orderGateway: gateway });

    const result = await store.dispatch(confirmOrder('order-1'));

    expect(confirmOrder.rejected.match(result)).toBe(true);
    expect(store.getState().orders).toMatchObject({
      current: null, status: 'failed', error: 'Payment rejected', activeRequestId: null,
    });
  });

  it('ignores a late response from an earlier request', async () => {
    let resolveFirst!: (order: Order) => void;
    const first = new Promise<Order>(resolve => { resolveFirst = resolve; });
    const gateway: OrderGateway = {
      confirm: vi.fn()
        .mockImplementationOnce(() => first)
        .mockImplementationOnce(async () => ({ id: 'latest', status: 'confirmed' })),
    };
    const store = makeStore({ orderGateway: gateway });
    const earlier = store.dispatch(confirmOrder('earlier'));
    const later = store.dispatch(confirmOrder('latest'));
    await later;
    resolveFirst({ id: 'earlier', status: 'confirmed' });
    await earlier;

    expect(selectCurrentOrder(store.getState())).toEqual({ id: 'latest', status: 'confirmed' });
  });

  it('maps an external DTO into the domain without exposing transport keys', async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(new Response(
      JSON.stringify({ order_id: 17, state: 'DONE' }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    ));
    const gateway = new HttpOrderGateway('/api', request);

    await expect(gateway.confirm('order 17')).resolves.toEqual({ id: '17', status: 'confirmed' });
    expect(request).toHaveBeenCalledWith('/api/orders/order%2017/confirm', { method: 'POST' });
  });

  it('rejects an invalid provider payload at the adapter boundary', async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(new Response(
      JSON.stringify({ order_id: 17, state: 'UNKNOWN' }),
      { status: 200 },
    ));
    await expect(new HttpOrderGateway('/api', request).confirm('17')).rejects.toThrow('invalid shape');
  });

  it('reports an HTTP failure from the adapter', async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(new Response('Service unavailable', { status: 503 }));
    await expect(new HttpOrderGateway('/api', request).confirm('17')).rejects.toThrow('503');
  });
});
