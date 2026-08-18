"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="relative flex flex-col items-center justify-center pt-16 md:pt-24 pb-16 md:pb-24 px-4 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-pink-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
        
        <div className="mb-8 inline-flex items-center gap-3 px-4.5 py-2 rounded-full border border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl shadow-2xl transition-all hover:border-slate-700">
          <img src="/logo.svg" alt="Sip Support Logo" className="w-5 h-5 object-contain" />
          <span className="text-xs md:text-sm font-bold text-slate-200">
            Empowering Independent Creators
          </span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>

        <div className="max-w-4xl text-center px-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-white">
            Where{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              creativity
            </span>{" "}
            gets funded
          </h1>

          <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            The simplest way for artists, developers, and writers to accept direct fan support, build community, and fund their passion projects.
          </p>
        </div>

        <div className="mt-10 md:mt-12 w-full max-w-lg px-4 relative z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const handle = e.target.handle?.value?.trim() || "";
              router.push(handle ? `/login?handle=${encodeURIComponent(handle)}` : "/login");
            }}
            className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl"
          >

            <div className="flex items-center gap-2 pl-4 py-2 w-full text-slate-400 font-bold text-sm">
              <span className="text-slate-500 font-semibold select-none">sipsupport.com/</span>
              <input
                type="text"
                name="handle"
                placeholder="yourname"
                className="w-full bg-transparent text-white placeholder:text-slate-600 outline-none font-bold text-base"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 px-7 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-black text-sm rounded-2xl transition-all shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              Claim Page
              <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          <div className="flex items-center justify-center gap-6 mt-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Free 2-minute setup
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Direct Razorpay Payouts
            </span>
          </div>
        </div>

        {/* Visual Showcase Banner Card */}
        <div className="mt-14 max-w-4xl w-full px-4 relative z-10">
          <div className="p-6 md:p-8 rounded-[2.5rem] bg-slate-950/80 border border-slate-900 shadow-2xl backdrop-blur-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" alt="Creator" className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 border-2 border-slate-950 flex items-center justify-center text-xs">☕</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-snug">
                  Marcus supported <span className="text-indigo-400">@alexrivera</span> with <span className="text-emerald-400 font-extrabold">₹500</span>
                </p>
                <p className="text-xs text-slate-400 font-medium italic mt-1">&ldquo;Keep making awesome open-source tools!&rdquo;</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 relative z-10">
              <Link
                href="/explore"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white font-bold text-xs border border-slate-800 transition-colors"
              >
                Browse Creators ➔
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Features Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Why creators choose us
          </h2>
          <p className="text-slate-400 text-lg font-semibold">
            Built from the ground up to serve your creative journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Supporters, not buyers (Wide - 2 columns) */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-[2rem] border border-slate-900 bg-slate-950/60 p-8 md:p-10 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>
            
            <div className="flex flex-col h-full justify-between gap-8 relative z-10">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Supporters, not buyers</h3>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg">
                  Real people backing real work. Build a community of true fans who want to see you succeed over the long term.
                </p>
              </div>

              {/* Decorative Mock Supporters Layout */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-900/60">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs font-bold">A</div>
                  <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-slate-950 flex items-center justify-center text-xs font-bold">M</div>
                  <div className="w-8 h-8 rounded-full bg-pink-600 border-2 border-slate-950 flex items-center justify-center text-xs font-bold">K</div>
                </div>
                <span className="text-xs font-semibold text-slate-500">+1,240 active supporters this week</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Funding, designed for you (Small) */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-slate-900 bg-slate-950/60 p-8 md:p-10 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/5">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="flex flex-col h-full justify-between gap-6 relative z-10">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center border border-purple-500/20 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Direct Funding</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Receive payments directly to your Razorpay account with minimal fees. Fast, transparent payouts.
                </p>
              </div>
              <span className="text-xs font-black text-purple-400 tracking-wider uppercase">0% Platform Fee option</span>
            </div>
          </div>

          {/* Bento Card 3: Meaningful connections (Small) */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-slate-900 bg-slate-950/60 p-8 md:p-10 backdrop-blur-xl transition-all duration-300 hover:border-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/5">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-pink-500/5 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="flex flex-col h-full justify-between gap-6 relative z-10">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-pink-50/10 text-pink-400 rounded-2xl flex items-center justify-center border border-pink-500/20 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Close Connections</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Engage intimately with your audience. Give them shoutouts or send warm messages back for their cups of support.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 italic">&ldquo;Thanks for the support!&rdquo;</span>
            </div>
          </div>

          {/* Bento Card 4: Built for creators (Wide - 2 columns) */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-[2rem] border border-slate-900 bg-slate-950/60 p-8 md:p-10 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>
            
            <div className="flex flex-col h-full justify-between gap-8 relative z-10">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-amber-50/10 text-amber-400 rounded-2xl flex items-center justify-center border border-amber-500/20 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Built for creators</h3>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg">
                  Your page, your rules. Customize your page to match your brand style, set cover photos, write bios, and customize preset payment options.
                </p>
              </div>

              {/* Mock tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-900/60">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400">Custom Banners</span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400">Secure API Secrets</span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400">Instant Verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-slate-950/30 border-y border-slate-900/50 py-24 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-0 w-[250px] h-[250px] bg-pink-500/5 rounded-full blur-[70px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              How it works
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
              Getting started is incredibly easy. Set up your page in minutes and start receiving support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative">
            {/* Timeline connector line */}
            <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[1.5px] bg-gradient-to-r from-indigo-500/30 via-purple-500/50 to-pink-500/30"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center text-2xl font-black text-indigo-400 shadow-xl border border-slate-800 mb-8 group-hover:-translate-y-1.5 transition-all duration-300 group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/5">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Create your page
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
                Sign up and customize your creator profile. Add a profile picture, cover photo, and connect your Razorpay account.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center text-2xl font-black text-purple-400 shadow-xl border border-slate-800 mb-8 group-hover:-translate-y-1.5 transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-purple-500/5">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Share with fans
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
                Share your unique Sip Support link on your social media, YouTube descriptions, or directly with your community.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center text-2xl font-black text-pink-400 shadow-xl border border-slate-800 mb-8 group-hover:-translate-y-1.5 transition-all duration-300 group-hover:border-pink-500/50 group-hover:shadow-pink-500/5">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Get funded
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
                Receive funds directly into your bank account. No middleman holding your money, just pure support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-28 max-w-5xl text-center relative overflow-hidden">
        {/* Neon back glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-[110px] rounded-full pointer-events-none -z-10"></div>

        <div className="bg-slate-950/60 backdrop-blur-2xl border border-slate-900 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight relative z-10 leading-tight">
            Ready to take control of your creative journey?
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto relative z-10 font-medium">
            Join other creators who are funding their passions through direct fan support. It only takes a minute to start.
          </p>
          <Link
            href="/login"
            className="relative z-10 inline-flex items-center justify-center gap-2.5 text-slate-950 bg-white hover:bg-slate-100 focus:ring-4 focus:ring-slate-800 font-bold rounded-full text-lg px-10 py-4.5 text-center shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Claim Your Page Now
            <svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

