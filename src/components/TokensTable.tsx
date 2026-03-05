import type { TokenItem } from "@/types/queue";

function fmt(ts?: string) {
  if (!ts) return "—";
  // keep it simple: show only time+date part
  // you can improve later (date-fns)
  return ts.replace("T", " ").replace("Z", "");
}

export function TokensTable({ items }: { items: TokenItem[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-3 py-2 text-left font-semibold">Token</th>
            <th className="px-3 py-2 text-left font-semibold">Service</th>
            <th className="px-3 py-2 text-left font-semibold">Name</th>
            <th className="px-3 py-2 text-left font-semibold">Created</th>
            <th className="px-3 py-2 text-left font-semibold">Served</th>
            <th className="px-3 py-2 text-left font-semibold">Done</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.length === 0 ? (
            <tr>
              <td className="px-3 py-3 text-gray-500" colSpan={6}>
                No records.
              </td>
            </tr>
          ) : (
            items.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 font-semibold">{t.token_code}</td>
                <td className="px-3 py-2">
                  <span className="text-gray-900">{t.service_code}</span>
                  <span className="text-gray-500"> — {t.service_name}</span>
                </td>
                <td className="px-3 py-2">{t.customer_name || "—"}</td>
                <td className="px-3 py-2 text-gray-600">{fmt(t.created_at)}</td>
                <td className="px-3 py-2 text-gray-600">{fmt(t.served_at)}</td>
                <td className="px-3 py-2 text-gray-600">{fmt(t.done_at)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}