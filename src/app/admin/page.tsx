"use client";

import { Card } from "@/components/Card";
import { StatusPill } from "@/components/StatusPill";
import { QueueSummary } from "@/components/QueueSummary";
import { AdminPanel } from "@/components/AdminPanel";
import { AdminHistory } from "@/components/AdminHistory";
import { useQueueSSE } from "@/hooks/useQueueSSE";
import Link from "next/link";

export default function AdminPage() {
  const { queue, status, eventId } = useQueueSSE();

  return (
    //This is Admin Dashboard
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-3">
              <StatusPill status={status} />
              <QueueSummary queue={queue} />
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
            >
              ← Back
            </Link>

            <Link
              href="/display"
              className="rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-900"
            >
              Open Display
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card title="Controls" subtitle="Call next token using admin key.">
            <AdminPanel />
          </Card>

          <div className="lg:col-span-2">
            <Card title="History" subtitle="Waiting / Serving / Done tokens (live refresh).">
              <div className="max-h-[520px] overflow-auto rounded-xl border border-gray-200 bg-white">
                <AdminHistory limit={25} eventId={eventId} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}