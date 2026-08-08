"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const DashboardIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ProfileIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LogoutIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setShowDropdown(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const navLinks = [
    { name: "Explore", href: "/explore" },
    { name: "Creators", href: "/creators" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 shadow-lg shadow-black/20"
          : "bg-slate-950/40 backdrop-blur-md border-b border-slate-900/50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        {/* Left: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[0.95rem] lg:text-base font-semibold text-slate-300 hover:text-white transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Center: Logo */}
        <div className="shrink-0 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-200 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Sip Support" className="h-9 md:h-11 w-auto object-contain" />
            <span
              className="font-bold text-2xl md:text-3xl tracking-wide text-white"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              Sip Support
            </span>
          </Link>
        </div>

        {/* Right: Auth & Profile */}
        <div className="flex items-center justify-end gap-3 md:gap-4 flex-1">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="hidden md:flex items-center gap-2 text-[0.95rem] lg:text-base font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <DashboardIcon className="w-5 h-5 text-indigo-400" />
                Dashboard
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                  aria-label="User menu"
                  className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-full transition-transform hover:scale-105 active:scale-95"
                >
                  <div className="p-[1.5px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 transition-shadow">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={session?.user?.image || "/avatar.png"}
                      alt=""
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-slate-950 bg-slate-900"
                    />
                  </div>
                </button>

                <div
                  role="menu"
                  aria-hidden={!showDropdown}
                  className={`absolute right-0 top-full mt-3 w-64 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 z-50 overflow-hidden transition-all duration-200 origin-top-right ${
                    showDropdown ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="px-4 py-4 border-b border-slate-900 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={session?.user?.image || "/avatar.png"} alt="" className="w-10 h-10 rounded-full object-cover bg-slate-900 border border-slate-800" />
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-white truncate">{session?.user?.name || "Creator"}</p>
                      <p className="text-xs text-slate-400 truncate">{session?.user?.email || ""}</p>
                    </div>
                  </div>
                  <div className="py-2 px-2" role="none">
                    <Link href="/dashboard" role="menuitem" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-900 hover:text-white transition-colors" onClick={() => setShowDropdown(false)}>
                      <DashboardIcon className="w-4 h-4 text-indigo-400" />
                      Dashboard
                    </Link>
                    <Link href={session?.user?.username ? `/${session.user.username}` : "#"} role="menuitem" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-900 hover:text-white transition-colors" onClick={() => setShowDropdown(false)}>
                      <ProfileIcon className="w-4 h-4 text-purple-400" />
                      Your Page
                    </Link>
                    <div className="border-t border-slate-900 mt-1 pt-1">
                      <button role="menuitem" onClick={() => signOut()} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-400 rounded-lg hover:bg-red-950/30 hover:text-red-300 transition-colors">
                        <LogoutIcon className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <Link href="/login" className="text-sm lg:text-base font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2">
                Log in
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-10 px-5 lg:px-6 rounded-full bg-white text-slate-950 text-sm lg:text-[0.95rem] font-bold shadow-md hover:bg-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
              >
                Get Started
                <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-0.5 transition-transform text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          )}

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm" onClick={closeMobileMenu} aria-hidden="true" />
      )}

      <div
        id="mobile-menu"
        role="menu"
        aria-hidden={!isMobileMenuOpen}
        className={`md:hidden fixed top-16 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-900 shadow-2xl transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 py-5 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {!session && (
            <div className="flex flex-col gap-2.5 pb-4 mb-3 border-b border-slate-900">
              <Link href="/login" role="menuitem" className="w-full text-center py-3 rounded-xl bg-white text-slate-950 font-bold text-base shadow-sm hover:bg-slate-100 transition-colors" onClick={closeMobileMenu}>
                Get Started
              </Link>
              <Link href="/login" role="menuitem" className="w-full text-center py-3 rounded-xl bg-slate-900 text-slate-300 font-semibold text-base hover:bg-slate-800 transition-colors border border-slate-800" onClick={closeMobileMenu}>
                Log in
              </Link>
            </div>
          )}

          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} role="menuitem" className="text-base font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors py-3 px-3 rounded-lg" onClick={closeMobileMenu}>
              {link.name}
            </Link>
          ))}

          {session && (
            <>
              <div className="border-t border-slate-900 mt-2 pt-2 flex flex-col gap-1">
                <Link href="/dashboard" role="menuitem" className="flex items-center gap-3 text-base font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors py-3 px-3 rounded-lg" onClick={closeMobileMenu}>
                  <DashboardIcon className="w-5 h-5 text-indigo-400" />
                  Dashboard
                </Link>
                <Link href={session?.user?.username ? `/${session.user.username}` : "#"} role="menuitem" className="flex items-center gap-3 text-base font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors py-3 px-3 rounded-lg" onClick={closeMobileMenu}>
                  <ProfileIcon className="w-5 h-5 text-purple-400" />
                  Your Page
                </Link>
              </div>
              <div className="border-t border-slate-900 mt-2 pt-2">
                <button role="menuitem" onClick={() => { signOut(); closeMobileMenu(); }} className="w-full flex items-center gap-3 text-base font-semibold text-red-400 hover:bg-red-950/20 transition-colors py-3 px-3 rounded-lg">
                  <LogoutIcon className="w-5 h-5 text-red-400" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
