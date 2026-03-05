export type ServiceCode = "A" | "D" | "L";

export type QueueState = {
  current_token: string;
  waiting: number;
};

export type CreateTokenRequest = {
  service_code: ServiceCode;
  customer_name?: string;
};

export type CreateTokenResponse = {
  token: string;
  position: number;
  estimated_minutes: number;
};

export type NextResponse = {
  current_token: string;
};

// For future extensibility, we can add more fields to Service type without changing the API request/response
export type Service = { code: ServiceCode; name: string };

export type TokenStatus = "waiting" | "serving" | "done";

export type TokenItem = {
  id: number;
  token_code: string;
  service_code: string;
  service_name: string;
  customer_name: string;
  status: TokenStatus;
  created_at: string;
  served_at?: string;
  done_at?: string;
};