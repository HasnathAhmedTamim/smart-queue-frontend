"use client";

import { useState } from "react";
import Link from "next/link";
import { useQueueSSE } from "@/hooks/useQueueSSE";
import { StatusPill } from "@/components/StatusPill";
import { RightDrawer } from "@/components/RightDrawer";

export default function DisplayPage() {
  const { queue, status } = useQueueSSE();
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center">
      {/* Top-right menu button */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-4 right-4 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/20"
        aria-label="Open menu"
      >
        ☰
      </button>

      <RightDrawer open={open} onClose={() => setOpen(false)} title="Display Menu">
        <div className="space-y-3">
          <Link
            href="/admin"
            className="block rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-black"
          >
            ← Back to Admin
          </Link>

          <Link
            href="/"
            className="block rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50"
          >
            Home
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              document.documentElement.requestFullscreen?.();
            }}
            className="block w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50"
          >
            Fullscreen
          </button>

          <p className="text-xs text-gray-600">
            Tip: Press <b>Esc</b> to close menu.
          </p>
        </div>
      </RightDrawer>

      {/* Display content */}
      <div className="w-full max-w-5xl px-6 text-center space-y-10">
        <div className="flex justify-center">
          <StatusPill status={status} />
        </div>

        <div>
          <div className="text-2xl text-gray-300">Now Serving</div>
          <div className="mt-4 text-8xl md:text-9xl font-extrabold tracking-tight">
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