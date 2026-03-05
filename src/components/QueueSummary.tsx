import type { QueueState } from "@/types/queue";

export function QueueSummary({ queue }: { queue: QueueState }) {
  return (
    <div className="text-sm text-gray-700">
      Current: <b>{queue.current_token || "—"}</b> • Waiting: <b>{queue.waiting}</b>
    </div>
  );
}