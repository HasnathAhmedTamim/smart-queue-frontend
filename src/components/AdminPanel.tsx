"use client";

import { useState } from "react";
import { adminNext } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";

export function AdminPanel() {
  const [adminKey, setAdminKey] = useState("dev-admin-key");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onNext() {
    setError(null);
    setLoading(true);
    try {
      await adminNext(adminKey.trim());
    } catch (e: unknown) {
      setError(getErrorMessage(e, "Failed to call next"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="adminKey" className="text-sm font-medium">
          Admin Key
        </label>
        <input
          id="adminKey"
          name="adminKey"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="X-Admin-Key"
        />
      </div>

      <button
        onClick={onNext}
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Calling..." : "Call Next"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
