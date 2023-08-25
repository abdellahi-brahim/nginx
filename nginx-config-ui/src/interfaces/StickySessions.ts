// src/interfaces/StickySessions.ts

export interface StickySessionsConfig {
    method: 'cookie'; // 'cookie' is one of the methods. You can expand this later if needed.
    cookieName: string;
    expires: string; // e.g. "1h"
    domain: string;  // e.g. ".example.com"
    path: string;    // e.g. "/"
  }
  