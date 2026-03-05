"use client";

import { useEffect, useRef, useState } from "react";
import type { TokenItem, TokenStatus } from "@/types/queue";
import { listTokens } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import { TokensTable } from "@/components/TokensTable";

const TABS: { key: TokenStatus; label: string }[] = [
  { key: "waiting", label: "Waiting" },
  { key: "serving", label: "Serving" },
  { key: "done", label: "Done" },
];

export function AdminHistory({
  limit = 25,
  eventId,
}: {
  limit?: number;
  eventId: number;
}) {
  const [tab, setTab] = useState<TokenStatus>("waiting");
  const [items, setItems] = useState<TokenItem[]>([]);
  const [loading, setLoading] = useState(true); // first load / tab change
  const [refreshing, setRefreshing] = useState(false); // silent refresh
  const [error, setError] = useState<string | null>(null);

  // prevent overlapping requests
  const inFlightRef = useRef(false);

  async function load(activeTab: TokenStatus, mode: "initial" | "refresh") {
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    setError(null);
    if (mode === "initial") setLoading(true);
    else setRefreshing(true);

    try {
      const data = await listTokens(activeTab, limit);
      setItems(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load history"));
      // keep old data on refresh; clear only on initial load failure
      if (mode === "initial") setItems([]);
    } finally {
      if (mode === "initial") setLoading(false);
      else setRefreshing(false);

      inFlightRef.current = false;
    }
  }

  // 1) Load when TAB changes (show Loading)
  useEffect(() => {
    load(tab, "initial");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  // 2) Refresh when SSE event arrives (silent refresh + debounce)
  useEffect(() => {
    if (loading) return; // avoid double load during initial

    const t = setTimeout(() => {
      load(tab, "refresh");
    }, 300);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
              tab === t.key
                ? "bg-gray-900 text-white ring-gray-900"
                : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"
            }`}
          >
            {t.label}
          </button>
        ))}

        <button
          onClick={() => load(tab, "refresh")}
          className="ml-auto rounded-lg bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-gray-600">Loading...</div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs text-gray-500">
            {refreshing ? "Refreshing…" : "Up to date"}
          </div>
          <TokensTable items={items} />
        </div>
      )}
    </div>
  );
}