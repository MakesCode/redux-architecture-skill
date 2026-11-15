import { HttpOrderGateway } from './adapters/httpOrderGateway.js';
import { makeStore } from './application/store.js';

/** The outermost composition root instantiates concrete dependencies. */
export function createLiveStore() {
  return makeStore({ orderGateway: new HttpOrderGateway('/api') });
}
