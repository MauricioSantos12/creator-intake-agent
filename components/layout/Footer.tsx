import { X, GitCommit, Link } from "lucide-react";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: Link },
  { label: "Twitter", href: "https://twitter.com", icon: X },
  { label: "GitHub", href: "https://github.com", icon: GitCommit },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink bg-ink px-6 py-4 text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 sm:grid-cols-3">
        <p className="text-center text-sm sm:text-left font-semibold">
          Developed by <span className="font-semibold">MS Dev</span>
        </p>

        <p className="text-center  text-cream/80 text-sm font-semibold">
          © {year} All rights reserved.
        </p>

        <div className="flex items-center justify-center gap-4 sm:justify-end">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-cream/70 transition-colors hover:text-brand text-md"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
