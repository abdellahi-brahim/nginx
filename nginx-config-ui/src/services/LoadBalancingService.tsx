// src/services/LoadBalancingService.ts

import serversData from '../data/servers.json';
import { BackendServer } from '../interfaces/LoadBalancing';

const LoadBalancingService = {
  getServers: (): Promise<BackendServer[]> => {
    // For now, we're just returning a promise that resolves with the static data.
    // Later, you can replace this with an actual fetch() call to your API.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(serversData as BackendServer[]);
      }, 500); // Simulating a network delay
    });
  },

  // You can also add other methods like addServer, removeServer, etc. here when you're ready to expand functionality.
};

export default LoadBalancingService;
