export interface LoginResponse {
  access_token: string;
  api_product_list: string;
  api_product_list_json: string[];
  application_name: string;
  client_id: string;
  'developer.email': string;
  expires_in: number;
  issued_at: number;
  organization_name: string;
  refresh_count: number;
  refresh_token_expires_in: number;
  scope: string;
  status: string;
  token_type: string;
}
