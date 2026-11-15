import type { Order, OrderGateway } from '../domain/order.js';

export class StubOrderGateway implements OrderGateway {
  readonly confirmedIds: string[] = [];
  constructor(private readonly outcome: Order | Error) {}

  async confirm(id: string): Promise<Order> {
    this.confirmedIds.push(id);
    if (this.outcome instanceof Error) throw this.outcome;
    return this.outcome;
  }
}
