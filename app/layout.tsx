import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cinelista — catálogo de filmes em cartaz",
    template: "%s — Cinelista",
  },
  description:
    "Confira os filmes em cartaz e as próximas estreias na Cinelista: sinopses, classificação, duração, elenco e horários.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <header className="border-b border-black/8 dark:border-white/12">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-6 px-6 py-5">
            <Link href="/" className="text-lg font-bold tracking-tight">
              🎬 Cinelista
            </Link>
            <nav className="flex gap-4 text-sm text-zinc-500">
              <Link href="/" className="hover:text-foreground">
                Catálogo
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-black/8 dark:border-white/12">
          <div className="mx-auto w-full max-w-5xl px-6 py-6 text-sm text-zinc-500">
            © {new Date().getFullYear()} Cinelista — catálogo de filmes.
          </div>
        </footer>
      </body>
    </html>
  );
}
