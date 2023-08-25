// src/interfaces/HeaderModifications.ts

export interface Header {
  key: string;
  value: string;
}

export type HeaderModificationsConfig = Header[];
