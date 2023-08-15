// user.model.ts
export interface User {
    id: string;
    email: string;
    email_constraint: string;
    email_verified: boolean;
    enabled: boolean;
    federation_link: string | null;
    first_name: string;
    last_name: string;
    realm_id: string;
    username: string;
    created_timestamp: number;
    service_account_client_link: string | null;
    not_before: number;
  }
  