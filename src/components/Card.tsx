import React from "react";

export function Card(props: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <h2 className="text-lg font-semibold">{props.title}</h2>
      {props.subtitle && <p className="mt-1 text-sm text-gray-600">{props.subtitle}</p>}
      <div className="mt-5">{props.children}</div>
    </section>
  );
}