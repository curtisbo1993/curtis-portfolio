export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-neutral-950/60 backdrop-blur py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-white/60 space-y-3">
        <div className="flex flex-wrap justify-center gap-4 text-white/70">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/work" className="hover:text-white">Work</a>
          <a href="/services" className="hover:text-white">Services</a>
          <a href="/tools" className="hover:text-white">Tools</a>
          <a href="/about" className="hover:text-white">About</a>
          <a href="mailto:curtis@example.com" className="hover:text-white">Contact</a>
        </div>

        <p>
          © {year} Curtis Bolden — CB Design Consultants.  
          Built with React + Tailwind on Vite.
        </p>

        <div className="flex justify-center gap-3 text-white/50">
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" fill="currentColor"><path d="M5 3a2 2 0 11-4 0 2 2 0 014 0zM1 7h4v12H1V7zm7 0h3.8v1.7h.1c.5-.9 1.9-1.9 3.9-1.9 4.2 0 5 2.8 5 6.4V19H18v-5.3c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 3V19h-4V7z"/></svg>
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg width="20" height="20" fill="currentColor"><path d="M10 .3a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.4-3.5-1.4-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.3.9 1.3.9.8 1.3 2.1.9 2.6.7.1-.6.3-1 .6-1.3-2.3-.2-4.8-1.1-4.8-5a3.9 3.9 0 011-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.2 2.8 1a9.5 9.5 0 015.1 0c2-.9 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.5 4.8-4.9 5 .3.3.6.9.6 1.9v2.8c0 .3.2.6.7.5A10 10 0 0010 .3"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
