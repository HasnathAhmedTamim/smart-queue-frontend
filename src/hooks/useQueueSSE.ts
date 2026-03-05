"use client";

import { useEffect, useMemo, useState } from "react";
import { queueStreamURL } from "@/lib/api";
import type { QueueState } from "@/types/queue";

type Status = "connecting" | "live" | "offline";

export function useQueueSSE() {
  const [queue, setQueue] = useState<QueueState>({ current_token: "", waiting: 0 });
  const [status, setStatus] = useState<Status>("connecting");

  // ✅ increments each time we receive an SSE update
  const [eventId, setEventId] = useState(0);

  const stream = useMemo(() => queueStreamURL(), []);

  useEffect(() => {
    let es: EventSource | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let closed = false;

    const connect = () => {
      if (closed) return;

      setStatus("connecting");
      es = new EventSource(stream);

      const onQueue = (e: MessageEvent) => {
        try {
          const data = JSON.parse(e.data);
          setQueue({
            current_token: data.current_token ?? "",
            waiting: Number(data.waiting ?? 0),
          });
          setStatus("live");

          // ✅ bump event id
          setEventId((v) => v + 1);
        } catch {}
      };

      es.addEventListener("queue", onQueue);

      es.onerror = () => {
        setStatus("offline");
        es?.close();
        es = null;
        if (!closed) retryTimer = setTimeout(connect, 1000);
      };
    };

    connect();

    return () => {
      closed = true;
      if (retryTimer) clearTimeout(retryTimer);
      es?.close();
    };
  }, [stream]);

  return { queue, status, eventId };
}