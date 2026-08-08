"use client";

import React, { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    q: "How does Sip Support work?",
    a: "Sip Support allows fans to make micro-donations (like buying a coffee) directly to creators using Razorpay. Creators get funded instantly into their bank account without middlemen holding payouts.",
  },
  {
    q: "Are there platform fees?",
    a: "We offer a 0% platform fee option. You connect your own Razorpay credentials so payments settle directly with standard payment gateway charges.",
  },
  {
    q: "Do supporters need an account to pay?",
    a: "No! Supporters can make a payment in seconds by just entering their name and message without any tedious sign-up process.",
  },
  {
    q: "How do I get paid?",
    a: "Enter your Razorpay Key ID and Secret in your Dashboard settings. Funds go straight to your connected bank account automatically.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-(family-name:--font-outfit) pb-24">
      {/* Hero */}
      <div className="relative py-24 px-4 text-center border-b border-slate-900 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold border border-indigo-500/20 mb-6">
            <span>✨ About Sip Support</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
            Empowering the Next Generation of Creators
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Sip Support was built on a simple premise: independent creators should be able to receive direct financial support from fans seamlessly, without high fees or delayed payouts.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-slate-950/60 rounded-3xl p-8 border border-slate-900 backdrop-blur-xl">
            <p className="text-4xl font-black text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">₹10L+</p>
            <p className="text-sm font-bold text-slate-400 mt-2">Funded to Creators</p>
          </div>
          <div className="bg-slate-950/60 rounded-3xl p-8 border border-slate-900 backdrop-blur-xl">
            <p className="text-4xl font-black text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">5,000+</p>
            <p className="text-sm font-bold text-slate-400 mt-2">Active Supporters</p>
          </div>
          <div className="bg-slate-950/60 rounded-3xl p-8 border border-slate-900 backdrop-blur-xl">
            <p className="text-4xl font-black text-white bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent">0%</p>
            <p className="text-sm font-bold text-slate-400 mt-2">Platform Fee Option</p>
          </div>
        </div>

        {/* Pillars */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Why Sip Support?</h2>
            <p className="text-slate-400 font-semibold">Designed for independence and ease</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-950/60 rounded-3xl p-8 border border-slate-900 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl font-bold border border-indigo-500/20">⚡</div>
              <h3 className="text-xl font-bold text-white">Direct Payouts</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Connect your Razorpay account directly. Funds settle into your bank account automatically with no delayed payouts or minimum thresholds.
              </p>
            </div>

            <div className="bg-slate-950/60 rounded-3xl p-8 border border-slate-900 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl font-bold border border-purple-500/20">🎨</div>
              <h3 className="text-xl font-bold text-white">Personal Brand Page</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Customize your cover image, avatar, preset support amounts, and bio to match your unique brand identity.
              </p>
            </div>

            <div className="bg-slate-950/60 rounded-3xl p-8 border border-slate-900 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center text-xl font-bold border border-pink-500/20">🔒</div>
              <h3 className="text-xl font-bold text-white">Secure & Private</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Your API secrets are stored securely. Payment verification uses HMAC SHA256 signatures to ensure authenticity.
              </p>
            </div>

            <div className="bg-slate-950/60 rounded-3xl p-8 border border-slate-900 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl font-bold border border-amber-500/20">☕</div>
              <h3 className="text-xl font-bold text-white">Zero Friction for Fans</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Supporters can buy you a coffee in under 30 seconds without creating an account or completing lengthy sign-ups.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-400 font-semibold">Everything you need to know</p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 border border-slate-900 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-lg text-white flex items-center justify-between cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-indigo-400 font-bold ml-4 text-xl">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-6 text-slate-400 text-sm font-medium leading-relaxed border-t border-slate-900/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-[2.5rem] p-10 text-center space-y-6">
          <h2 className="text-3xl font-black text-white">Start your creator journey today</h2>
          <p className="text-slate-400 text-base font-medium max-w-md mx-auto">
            Join thousands of creators receiving direct fan support on Sip Support.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-full shadow-lg hover:bg-slate-100 transition-all hover:scale-105"
          >
            Create Your Page Now ☕
          </Link>
        </div>
      </div>
    </div>
  );
}
