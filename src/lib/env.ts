export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export function requireEnv(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

export const API = requireEnv("NEXT_PUBLIC_API_BASE", API_BASE);