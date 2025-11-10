import Disclaimer from "./Disclaimer";
import { Twitter, Facebook, Instagram, Linkedin, Youtube, Github } from "lucide-react";

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
          <a href="mailto:cbolden@cb-designconsultants.com" className="hover:text-white">Contact</a>
        </div>

        <p>
          © {year} CB Design Consultants | All Rights Reserved. |{" "}
          <a href="/privacy" className="underline hover:text-white/80">Privacy Policy</a> ·{" "}
          <a href="/terms" className="underline hover:text-white/80">Terms of Service</a>
        </p>

        <Disclaimer />

        <div className="mt-4 flex items-center justify-center gap-5 text-white/70">
          <a 
            href="https://twitter.com/yourhandle" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="X / Twitter" 
            className="hover:text-white transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a 
            href="https://facebook.com/yourhandle" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook" 
            className="hover:text-white transition-colors"
          >
            <Facebook size={20} />
          </a>
          <a 
            href="https://instagram.com/yourhandle" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram" 
            className="hover:text-white transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/curtisaboldenjr/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn" 
            className="hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="https://youtube.com/@yourhandle" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="YouTube" 
            className="hover:text-white transition-colors"
          >
            <Youtube size={20} />
          </a>
          <a 
            href="https://github.com/yourhandle" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub" 
            className="hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
