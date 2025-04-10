import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-8 rounded-t-2xl">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Nkca122"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-black transition"
          >
            <Github size={18} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nikunj-chauhan-9781832b2/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-black transition"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
        </div>
        <div className="text-center md:text-right">
          &copy; {new Date().getFullYear()} Nikunj Chauhan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
