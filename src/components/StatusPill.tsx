export function StatusPill({ status }: { status: "connecting" | "live" | "offline" }) {
  const cls =
    status === "live"
      ? "bg-green-100 text-green-700"
      : status === "connecting"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>{status}</span>;
}