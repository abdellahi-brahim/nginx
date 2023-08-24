// src/interfaces/SSLTLSTermination.ts

export interface SSLTLSConfig {
  domain: string;
  certText: string;
  certFile: File | null;
  keyText: string;
  keyFile: File | null;
}
