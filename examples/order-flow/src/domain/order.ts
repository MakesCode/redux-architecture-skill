export type Order = Readonly<{
  id: string;
  status: 'draft' | 'confirmed';
}>;

/** Domain-owned contract: no HTTP client, Redux or React imports. */
export interface OrderGateway {
  confirm(id: string): Promise<Order>;
}
