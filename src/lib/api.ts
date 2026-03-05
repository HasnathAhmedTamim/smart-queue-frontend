import { API } from "@/lib/env";
import type { CreateTokenRequest, CreateTokenResponse, NextResponse } from "@/types/queue";
import type { Service } from "@/types/queue";
type ApiErrorPayload = { error?: { message?: string } };

async function parseJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

function getErrorMessage(payload: unknown, fallback: string) {
  const p = payload as ApiErrorPayload;
  return p?.error?.message || fallback;
}

export async function createToken(payload: CreateTokenRequest): Promise<CreateTokenResponse> {
  const res = await fetch(`${API}/api/tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await parseJson(res);
  if (!res.ok) throw new Error(getErrorMessage(data, "Failed to create token"));
  return data as CreateTokenResponse;
}

export async function adminNext(adminKey: string): Promise<NextResponse> {
  const res = await fetch(`${API}/api/queue/next`, {
    method: "POST",
    headers: { "X-Admin-Key": adminKey },
  });

  const data = await parseJson(res);
  if (!res.ok) throw new Error(getErrorMessage(data, "Failed to call next"));
  return data as NextResponse;
}

export function queueStreamURL() {
  return `${API}/api/stream/queue`;
}

export async function listServices(): Promise<Service[]> {
  const res = await fetch(`${API}/api/services`, { method: "GET" });
  const data = await parseJson(res);
  if (!res.ok) throw new Error(getErrorMessage(data, "Failed to load services"));
  return data as Service[];
}