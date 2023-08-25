// src/interfaces/RateLimiting.ts

export interface RateLimitingConfig {
    zoneName: string;
    rate: string;  // e.g., '10r/s'
    burst?: number;
    delay?: number;
  }
  