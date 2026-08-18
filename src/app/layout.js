import { Geist, Geist_Mono, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/SiteFooter";
import SessionWrapper from "./components/sessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "900"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "600", "700"],
});

import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  weight: ["400"],
});

export const metadata = {
  title: "Sip Support - Where Creativity Gets Funded",
  description:
    "A crowdfunding platform for creators to get direct support from their fans.",
  icons: {
    icon: "/logo.svg",
  },
};

import { ToastProvider } from "./components/Toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${pacifico.variable} ${caveat.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <SessionWrapper>
          <ToastProvider>
            <Navbar />
            <main className="min-h-screen bg-slate-950 text-slate-100 relative w-full overflow-hidden">
              {/* Dark Mode Grid Background */}
              <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none"></div>

              {/* Ambient decorative glowing backdrops */}
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
              <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '-4s' }}></div>

              <div className="relative z-10 min-h-[88.5vh] flex flex-col">{children}</div>
            </main>
            <Footer />
          </ToastProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}

