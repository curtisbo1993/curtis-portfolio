export default function DemoButtons() {
  return (
    <section className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <button className="inline-flex items-center gap-2 rounded-xl2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white shadow-soft">
          Get in touch
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl2 px-4 py-2 border border-border text-fg hover:border-brand-300 hover:text-brand-700">
          View work
        </button>
      </div>
      <div className="rounded-xl2 border border-border bg-card p-6 shadow-soft">
        <h2 className="text-2xl font-semibold">Structural BIM &amp; Automation</h2>
        <p className="text-neutral-500 mt-2">Precision modeling, tools, and workflows.</p>
        <div className="mt-6 h-24 rounded-xl2 gradient-brand" />
      </div>
    </section>
  );
}
