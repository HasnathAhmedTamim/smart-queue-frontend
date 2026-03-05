"use client";

import { useEffect, useId } from "react";

export function RightDrawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const titleId = useId();

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // ✅ If closed, don't render anything (no aria-hidden needed)
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-label="Close menu"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed right-0 top-0 z-50 h-full w-[320px] bg-white text-gray-900 shadow-xl"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div id={titleId} className="text-sm font-semibold">
            {title}
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm font-bold text-gray-600 hover:bg-gray-100"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-4">{children}</div>
      </aside>
    </>
  );
}