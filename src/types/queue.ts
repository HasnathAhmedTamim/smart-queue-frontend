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