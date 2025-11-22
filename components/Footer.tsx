'use client';

import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
      <p className="text-white/40 text-xs font-medium tracking-wide">
        By Theekshana
      </p>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/TheekshanaCN"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/theekshana-chamodhya"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-blue-400 transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="https://x.com/theekshana_c_n"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-sky-400 transition-colors"
          aria-label="X (Twitter)"
        >
          <Twitter className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
}
