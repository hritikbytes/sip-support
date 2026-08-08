"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAllCreators } from "@/actions/useractions";

const SAMPLE_CREATORS = [
  {
    name: "Alex Rivera",
    username: "alexrivera",
    category: "Tech",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    coverPicture: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    bio: "Building open-source developer tools and writing tech essays.",
    followers: "12.4K",
  },
  {
    name: "Elena Rostova",
    username: "elenacart",
    category: "Art",
    profilePicture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    coverPicture: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop",
    bio: "Digital illustrator creating cyberpunk concept art and tutorials.",
    followers: "8.9K",
  },
  {
    name: "Marcus Vance",
    username: "marcusbeats",
    category: "Music",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    coverPicture: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
    bio: "Indie lo-fi producer sharing sample packs & weekly chill beats.",
    followers: "15.1K",
  },
  {
    name: "Sophia Chen",
    username: "sophiacodes",
    category: "Gaming",
    profilePicture: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop",
    coverPicture: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    bio: "Indie game dev crafting retro pixel RPGs and devlogs.",
    followers: "6.7K",
  },
];

const CATEGORIES = ["All", "Tech", "Art", "Music", "Gaming", "Writing", "Podcasts"];

export default function ExplorePage() {
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        let dbCreators = await fetchAllCreators();
        let formattedDb = (dbCreators || []).map((u) => ({
          name: u.name || u.username,
          username: u.username,
          category: "Tech",
          profilePicture: u.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          coverPicture: u.coverPicture || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop",
          bio: "Independent creator funding passion projects on Sip Support.",
          followers: "1K+",
        }));

        const existingUsernames = new Set(formattedDb.map((c) => c.username));
        const customSamples = SAMPLE_CREATORS.filter((c) => !existingUsernames.has(c.username));
        setCreators([...formattedDb, ...customSamples]);
      } catch (err) {
        console.error("Failed to load creators:", err);
        setCreators(SAMPLE_CREATORS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.username.toLowerCase().includes(search.toLowerCase()) ||
      c.bio.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-(family-name:--font-outfit) pb-24">
      {/* Hero Header */}
      <div className="relative py-20 px-4 text-center border-b border-slate-900 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold border border-indigo-500/20 mb-6">
            <span>✨ Discover Amazing Talent</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Explore Creators
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto mb-10">
            Find and directly back the independent artists, developers, and writers shaping the future.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search creators by name, handle, or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-xl"
            />
            <svg
              className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-slate-950 shadow-lg shadow-white/10 scale-105"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Creator Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-400 font-semibold">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-3"></div>
            Loading creators...
          </div>
        ) : filteredCreators.length === 0 ? (
          <div className="text-center py-24 bg-slate-950/40 rounded-3xl border border-dashed border-slate-900 mt-8">
            <div className="text-5xl mb-4">☕</div>
            <h3 className="text-2xl font-bold text-white mb-2">No creators found</h3>
            <p className="text-slate-400 font-medium">Try searching for another keyword or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredCreators.map((creator) => (
              <div
                key={creator.username}
                className="group bg-slate-950/60 rounded-3xl border border-slate-900 overflow-hidden hover:border-indigo-500/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Cover Photo */}
                  <div className="h-32 w-full relative overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={creator.coverPicture}
                      alt="cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                  </div>

                  {/* Profile Header */}
                  <div className="px-6 pt-0 relative pb-4">
                    <div className="w-20 h-20 rounded-2xl border-4 border-slate-950 overflow-hidden bg-slate-900 -mt-10 shadow-xl relative z-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={creator.profilePicture}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {creator.name}
                        </h2>
                        <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                          {creator.category || "Creator"}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-500 mt-0.5">
                        @{creator.username}
                      </p>
                      <p className="text-slate-400 text-sm font-medium mt-3 line-clamp-2 leading-relaxed">
                        {creator.bio}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-900/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    ❤️ {creator.followers} supporters
                  </span>
                  <Link
                    href={`/${creator.username}`}
                    className="px-5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    Support ☕
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
