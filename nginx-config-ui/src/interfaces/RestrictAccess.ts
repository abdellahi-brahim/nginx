// src/interfaces/RestrictAccess.ts

export interface AccessRule {
    action: 'allow' | 'deny';
    ip: string;
  }
  
  export type RestrictAccessConfig = AccessRule[];
  