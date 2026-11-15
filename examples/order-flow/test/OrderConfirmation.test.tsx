// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeStore } from '../src/application/store.js';
import { StubOrderGateway } from '../src/adapters/stubOrderGateway.js';
import { OrderExample } from '../src/ui/OrderExample.js';

afterEach(cleanup);

describe('OrderConfirmation UI adapter', () => {
  it('shows the confirmation after the user clicks, without knowing the gateway', async () => {
    const store = makeStore({ orderGateway: new StubOrderGateway({ id: 'order-1', status: 'confirmed' }) });
    const user = userEvent.setup();
    render(<OrderExample store={store} orderId="order-1" />);

    await user.click(screen.getByRole('button', { name: 'Confirm order' }));

    expect(await screen.findByRole('status')).toHaveTextContent('Confirmed order: order-1');
  });

  it('renders a visible error from a failed gateway', async () => {
    const store = makeStore({ orderGateway: new StubOrderGateway(new Error('Payment rejected')) });
    const user = userEvent.setup();
    render(<OrderExample store={store} orderId="order-1" />);

    await user.click(screen.getByRole('button', { name: 'Confirm order' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Payment rejected');
  });
});
