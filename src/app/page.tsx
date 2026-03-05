"use client";

import { Card } from "@/components/Card";
import { StatusPill } from "@/components/StatusPill";
import { QueueSummary } from "@/components/QueueSummary";
import { TokenForm } from "@/components/TokenForm";
import { AdminPanel } from "@/components/AdminPanel";
import { useQueueSSE } from "@/hooks/useQueueSSE";

export default function Home() {
  const { queue, status } = useQueueSSE();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">Smart Queue</h1>
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

          <Card title="Admin Panel" subtitle="Call next token using admin key.">
            <AdminPanel />
          </Card>
        </div>

        <p className="mt-10 text-xs text-gray-500">
          If status is <b>offline</b>, ensure backend runs and CORS allows{" "}
          <b>http://localhost:3000</b>.
        </p>
      </div>
    </main>
  );
}
