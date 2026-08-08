import React from "react";
import Link from "next/link";
import { fetchAllCreators } from "@/actions/useractions";

const SPOTLIGHT_CREATORS = [
  {
    name: "Elena Rostova",
    username: "elenacart",
    tagline: "Digital Concept Artist & Illustrator",
    bio: "Creating high-res fantasy artwork, speedpaint breakdowns, and brush packs for independent artists worldwide.",
    profilePicture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    coverPicture: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop",
    raised: "₹1,45,000+",
    supporters: "480+",
  },
  {
    name: "Alex Rivera",
    username: "alexrivera",
    tagline: "Full-stack Open Source Developer",
    bio: "Building free developer utilities, teaching modern web frameworks, and sharing deep-dive architecture tutorials.",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    coverPicture: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    raised: "₹2,10,000+",
    supporters: "720+",
  },
];

export default async function CreatorsPage() {
  let dbUsers = [];
  try {
    dbUsers = await fetchAllCreators();
  } catch (err) {
    console.error("Error loading creators:", err);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-(family-name:--font-outfit) pb-24">
      {/* Header */}
      <div className="relative py-24 px-4 text-center border-b border-slate-900 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-500/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold border border-purple-500/20 mb-6">
            <span>🚀 Creator Showcase & Leaderboard</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
            Fueled by Fan Support
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Meet the top independent creators turning audience appreciation into sustainable creative careers.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-full text-base shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
          >
            Join as a Creator ☕
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        {/* All Registered Creators Section */}
        {dbUsers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white">Registered Creators</h2>
                <p className="text-slate-400 text-sm font-medium mt-1">Creators actively receiving support on Sip Support</p>
              </div>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                {dbUsers.length} Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbUsers.map((user) => (
                <div
                  key={user._id || user.username}
                  className="bg-slate-950/60 rounded-3xl p-6 border border-slate-900 hover:border-slate-800 transition-all shadow-xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt={user.name || user.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white text-lg truncate">{user.name || user.username}</h3>
                      <p className="text-slate-400 text-sm font-medium truncate">@{user.username}</p>
                    </div>
                  </div>

                  <Link
                    href={`/${user.username}`}
                    className="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    View Page
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Creator Spotlight */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Creator Spotlights</h2>
            <p className="text-slate-400 font-semibold">Stories of creators thriving on Sip Support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SPOTLIGHT_CREATORS.map((spotlight) => (
              <div
                key={spotlight.username}
                className="bg-slate-950/60 rounded-[2.5rem] border border-slate-900 p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={spotlight.profilePicture} alt={spotlight.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{spotlight.name}</h3>
                      <p className="text-xs font-bold text-indigo-400">{spotlight.tagline}</p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-base font-medium leading-relaxed italic">
                    &ldquo;{spotlight.bio}&rdquo;
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-900">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Funded</span>
                      <p className="text-xl font-black text-white mt-1">{spotlight.raised}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Supporters</span>
                      <p className="text-xl font-black text-white mt-1">{spotlight.supporters}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 relative z-10">
                  <Link
                    href={`/${spotlight.username}`}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl border border-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Visit @{spotlight.username}&apos;s Page ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-slate-950 border border-slate-800 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to start receiving support?</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8 font-medium">
            Create your profile, set your payout details, and start sharing your custom link in under 2 minutes.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold text-base rounded-full shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
          >
            Claim Your Creator Page Now
          </Link>
        </div>
      </div>
    </div>
  );
}
