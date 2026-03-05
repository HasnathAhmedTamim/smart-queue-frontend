"use client";

import { useState } from "react";
import type { ServiceCode, CreateTokenResponse } from "@/types/queue";
import { createToken } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";

export function TokenForm() {
  const [service, setService] = useState<ServiceCode>("A");
  const [name, setName] = useState("");
  const [result, setResult] = useState<CreateTokenResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onCreate() {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await createToken({
        service_code: service,
        customer_name: name.trim() || undefined,
      });
      setResult(res);
      setName("");
    } catch (e: unknown) {
      setError(getErrorMessage(e, "Failed to create token"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="service" className="text-sm font-medium">
          Service
        </label>
        <select
          id="service"
          name="service"
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          value={service}
          onChange={(e) => setService(e.target.value as ServiceCode)}
        >
          <option value="A">A — Account Opening</option>
          <option value="D">D — Deposit</option>
          <option value="L">L — Loan Desk</option>
        </select>
      </div>

      <div>
        <label htmlFor="customerName" className="text-sm font-medium">
          Name <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="customerName"
          name="customerName"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <button
        onClick={onCreate}
        disabled={loading}
        className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create Token"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
          <div className="font-semibold">
            Your token: <span>{result.token}</span>
          </div>
          <div className="mt-1 text-gray-600">
            Position: <b>{result.position}</b> • Est:{" "}
            <b>{result.estimated_minutes} min</b>
          </div>
        </div>
      )}
    </div>
  );
}
