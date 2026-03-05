"use client";
import Link from "next/link";
import { Card } from "@/components/Card";
import { StatusPill } from "@/components/StatusPill";
import { QueueSummary } from "@/components/QueueSummary";
import { TokenForm } from "@/components/TokenForm";
import { AdminPanel } from "@/components/AdminPanel";
import { useQueueSSE } from "@/hooks/useQueueSSE";
import { AdminHistory } from "@/components/AdminHistory";
export default function Home() {
  const { queue, status, eventId } = useQueueSSE();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Smart Queue</h1>
            <Link
              href="/admin"
              className="inline-flex items-center rounded-lg bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
            >
              Admin Dashboard →
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill status={status} />
            <QueueSummary queue={queue} />
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card
            title="Take a Token"
            subtitle="Choose a service and take your token."
          >
            <TokenForm />
          </Card>

          {/* <Card title="Admin Panel" subtitle="Call next token using admin key.">
            <AdminPanel />
          </Card> */}
          {/* <Card title="Admin Panel" subtitle="Call next token using admin key.">
            <div className="space-y-6">
              <AdminPanel />
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  History
                </h3>
                <AdminHistory limit={25} eventId={eventId} />
              </div>
            </div>
          </Card> */}
        </div>

        <p className="mt-10 text-xs text-gray-500">
          If status is <b>offline</b>, ensure backend runs and CORS allows{" "}
          <b>http://localhost:3000</b>.
        </p>
      </div>
    </main>
  );
}
