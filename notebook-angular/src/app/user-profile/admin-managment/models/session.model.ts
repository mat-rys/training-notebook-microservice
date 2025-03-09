export interface Session {
    id: string;
    username: string;
    userId: string;
    ipAddress: string;
    start: number;
    lastAccess: number;
    clients: { [key: string]: string }; // Mapa klucz-wartość dla klientów
  }
  