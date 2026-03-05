"use client";

import { useEffect, useMemo, useState } from "react";
import { queueStreamURL } from "@/lib/api";
import type { QueueState } from "@/types/queue";

type Status = "connecting" | "live" | "offline";

export function useQueueSSE() {
  // ✅ Start as connecting (no need to set in effect)
  const [queue, setQueue] = useState<QueueState>({ current_token: "", waiting: 0 });
  const [status, setStatus] = useState<Status>("connecting");

  const stream = useMemo(() => queueStreamURL(), []);

  useEffect(() => {
    const es = new EventSource(stream);

    const onQueue = (e: MessageEvent) => {
      try {
        const data: unknown = JSON.parse(e.data);
        if (typeof data === "object" && data !== null) {
          const obj = data as { current_token?: unknown; waiting?: unknown };

          setQueue({
            current_token: typeof obj.current_token === "string" ? obj.current_token : "",
            waiting: typeof obj.waiting === "number" ? obj.waiting : Number(obj.waiting ?? 0),
          });

          // ✅ Only set status in callback (external event)
          setStatus("live");
        }
      } catch {
        // ignore
      }
    };

    es.addEventListener("queue", onQueue);
    es.onerror = () => setStatus("offline");

    return () => {
      es.removeEventListener("queue", onQueue);
      es.close();
    };
  }, [stream]);

  return { queue, status };
}