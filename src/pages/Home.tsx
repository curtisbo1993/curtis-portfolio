import { useReveal } from "@/hooks/useReveal";

export default function HomePage() {
  useReveal();

  return (
    <>
      <section data-reveal className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold">Welcome to My Portfolio</h2>
        <p className="mt-4 text-white/70">Intro text…</p>
      </section>

      <section
        data-reveal
        data-delay="120ms"
        className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8"
      >
        <h2 className="text-2xl font-semibold">Featured Work</h2>
        <p className="mt-4 text-white/70">Showcase some projects…</p>
      </section>
    </>
  );
}
