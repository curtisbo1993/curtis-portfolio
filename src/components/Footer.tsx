import Disclaimer from "./Disclaimer";

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
          © 2025 CB Design Consultants | All Rights Reserved. |{" "}
          <a href="/privacy" className="underline hover:text-white/80">Privacy Policy</a> ·{" "}
          <a href="/terms" className="underline hover:text-white/80">Terms of Service</a>
        </p>

        <Disclaimer />

        <div className="mt-4 flex items-center justify-center gap-4 text-white/70">
          <a href="https://twitter.com/yourhandle" aria-label="X / Twitter" className="hover:text-white">X</a>
          <a href="https://facebook.com/yourhandle" aria-label="Facebook" className="hover:text-white">Fb</a>
          <a href="https://instagram.com/yourhandle" aria-label="Instagram" className="hover:text-white">Ig</a>
          <a href="https://www.linkedin.com/in/curtisaboldenjr/" aria-label="LinkedIn" className="hover:text-white">in</a>
          <a href="https://youtube.com/@yourhandle" aria-label="YouTube" className="hover:text-white">YT</a>
          <a href="https://github.com/yourhandle" aria-label="GitHub" className="hover:text-white">GH</a>
          <a href="https://www.behance.net/yourhandle" aria-label="Behance" className="hover:text-white">Be</a>
          <a href="https://dribbble.com/yourhandle" aria-label="Dribbble" className="hover:text-white">Db</a>
        </div>
      </div>
    </footer>
  );
}
