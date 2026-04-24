import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RealityCheck Live",
  description: "Voice-first startup idea reality check agent",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen overflow-x-hidden bg-[#070A18] font-sans text-white antialiased">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.28),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(217,70,239,0.22),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(132,204,22,0.16),transparent_34%),linear-gradient(135deg,#070A18_0%,#111827_45%,#160B2F_100%)]" />
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <nav className="sticky top-0 z-20 border-b border-white/10 bg-[#080B18]/80 px-6 py-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <div>
              <p className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-lime-300 bg-clip-text text-xl font-black tracking-tight text-transparent">
                RealityCheck Live
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/45">Ship to Prod Hackathon</p>
            </div>
            <span className="rounded-full border border-lime-300/40 bg-lime-300/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-lime-200 shadow-lg shadow-lime-500/20">
              Live
            </span>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
