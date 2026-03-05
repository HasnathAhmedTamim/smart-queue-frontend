"use client";

import { useQueueSSE } from "@/hooks/useQueueSSE";
import { StatusPill } from "@/components/StatusPill";

export default function DisplayPage() {
  const { queue, status } = useQueueSSE();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <StatusPill status={status} />
        </div>

        <div>
          <div className="text-xl text-gray-300">Now Serving</div>
          <div className="text-7xl font-extrabold tracking-tight">
            {queue.current_token || "—"}
          </div>
        </div>

        <div className="text-2xl text-gray-300">
          Waiting: <span className="font-bold text-white">{queue.waiting}</span>
        </div>
      </div>
    </main>
  );
}