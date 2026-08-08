"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateProfile } from "@/actions/useractions";

const Dashboard = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const isLoadedRef = useRef(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilePicture: "",
    coverPicture: "",
    razorpayId: "",
    razorpaySecret: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user && !isLoadedRef.current) {
      isLoadedRef.current = true;
      const initialUsername = session.user.username || session.user.email?.split("@")[0] || "";
      
      fetchUser(initialUsername)
        .then((u) => {
          if (u) {
            setForm({
              name: u.name || session.user.name || "",
              email: u.email || session.user.email || "",
              username: u.username || initialUsername,
              profilePicture: u.profilePicture || session.user.image || "",
              coverPicture: u.coverPicture || "",
              razorpayId: u.razorpayId || "",
              razorpaySecret: u.razorpaySecret || "",
            });
          } else {
            setForm({
              name: session.user.name || "",
              email: session.user.email || "",
              username: initialUsername,
              profilePicture: session.user.image || "",
              coverPicture: "",
              razorpayId: "",
              razorpaySecret: "",
            });
          }
        })
        .catch((err) => {
          console.error("Error fetching user on dashboard:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [status, session, router]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.email) {
      alert("No active session found");
      return;
    }

    setSaving(true);
    const oldUsername = session.user.username || form.username;
    let res = await updateProfile(form, oldUsername);
    setSaving(false);

    if (res.error) {
      alert(res.error);
    } else {
      alert("Profile updated successfully!");
      if (update) {
        await update();
      }
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300 font-semibold">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          Loading your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative w-full font-(family-name:--font-outfit) pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-indigo-500/5 to-transparent -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[90px] pointer-events-none -z-10"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Dashboard
          </h1>
          <p className="mt-3 text-lg text-slate-400 font-semibold">
            Manage your creator profile and payment settings
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-900 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl">
          <div className="px-8 py-6 border-b border-slate-900 bg-slate-900/10">
            <h2 className="text-xl font-bold text-white">
              Profile Settings
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-slate-300 uppercase tracking-wider pl-1"
                >
                  Display Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full h-13 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white focus:bg-slate-900/60 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-500 font-medium"
                  placeholder="John Doe"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold text-slate-300 uppercase tracking-wider pl-1"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-indigo-400 font-bold">@</span>
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full h-13 pl-9 pr-4 rounded-xl bg-slate-900 border border-slate-800 text-white focus:bg-slate-900/60 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-500 font-medium"
                    placeholder="johndoe"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-300 uppercase tracking-wider pl-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                readOnly
                className="w-full h-13 px-4 rounded-xl bg-slate-900/40 border border-slate-900 text-slate-500 cursor-not-allowed outline-none font-medium"
              />
              <p className="text-xs text-slate-500 font-semibold mt-1.5 pl-1">
                Email is synced from your login provider and cannot be changed.
              </p>
            </div>

            <hr className="border-slate-900" />

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white pl-1 border-l-2 border-indigo-500">Media</h3>

              {/* Profile Picture */}
              <div className="space-y-2">
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-bold text-slate-300 uppercase tracking-wider pl-1"
                >
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  id="profilePicture"
                  name="profilePicture"
                  value={form.profilePicture}
                  onChange={handleChange}
                  className="w-full h-13 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white focus:bg-slate-900/60 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-500 font-medium"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {/* Cover Picture */}
              <div className="space-y-2">
                <label
                  htmlFor="coverPicture"
                  className="block text-sm font-bold text-slate-300 uppercase tracking-wider pl-1"
                >
                  Cover Photo URL
                </label>
                <input
                  type="text"
                  id="coverPicture"
                  name="coverPicture"
                  value={form.coverPicture}
                  onChange={handleChange}
                  className="w-full h-13 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white focus:bg-slate-900/60 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-500 font-medium"
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
            </div>

            <hr className="border-slate-900" />

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white pl-1 border-l-2 border-pink-500">
                Razorpay Integration
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Razorpay Id */}
                <div className="space-y-2">
                  <label
                    htmlFor="razorpayId"
                    className="block text-sm font-bold text-slate-300 uppercase tracking-wider pl-1"
                  >
                    Key ID
                  </label>
                  <input
                    type="text"
                    id="razorpayId"
                    name="razorpayId"
                    value={form.razorpayId}
                    onChange={handleChange}
                    className="w-full h-13 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white focus:bg-slate-900/60 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-500 font-mono text-sm"
                    placeholder="rzp_test_..."
                  />
                </div>

                {/* Razorpay Secret */}
                <div className="space-y-2">
                  <label
                    htmlFor="razorpaySecret"
                    className="block text-sm font-bold text-slate-300 uppercase tracking-wider pl-1"
                  >
                    Key Secret
                  </label>
                  <input
                    type="password"
                    id="razorpaySecret"
                    name="razorpaySecret"
                    value={form.razorpaySecret}
                    onChange={handleChange}
                    className="w-full h-13 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white focus:bg-slate-900/60 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-500 font-mono text-sm"
                    placeholder="••••••••••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={saving}
                className="w-full h-14 bg-white hover:bg-slate-100 text-slate-950 text-base font-bold rounded-2xl transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <span>Saving Changes...</span>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 text-slate-950"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
