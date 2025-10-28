export default function SkipToContent() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only fixed left-4 top-4 z-[1000] rounded-xl bg-black/70 text-white px-3 py-2 border border-white/20"
    >
      Skip to content
    </a>
  );
}
