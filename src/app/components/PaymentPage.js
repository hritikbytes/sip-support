"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import CardSpotlight from "./CardSpotlight";
import InputPulseBorder from "./InputPulseBorder";
import Script from "next/script";
import { initiate, fetchUser, fetchpayments } from "@/actions/useractions";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "./Toast";

const PaymentContent = ({ username }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      let u = await fetchUser(username);
      setCurrentUser(u);
      if (u) {
        let p = await fetchpayments(username);
        setPayments(p || []);
      }
    } catch (error) {
      console.error("Error loading creator profile:", error);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      setNotification({
        type: "success",
        message: "Thank you so much! Your support payment was successful. ❤️",
      });
      router.replace(`/${username}`);
    } else if (payment === "failure") {
      setNotification({
        type: "error",
        message: "Payment failed or was cancelled. Please try again.",
      });
      router.replace(`/${username}`);
    }
  }, [searchParams, router, username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const copyPageLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;
    navigator.clipboard.writeText(url);
    showToast("Creator page link copied to clipboard! 📋", "success");
  };

  const pay = async (amount, message) => {
    try {
      if (!currentUser?.razorpayId) {
        showToast("This creator has not configured their payment keys yet.", "error");
        return;
      }

      let a = await initiate(amount, username, {
        name: formData.name,
        message: message,
      });
      let order_id = a.id;

      const options = {
        key: currentUser.razorpayId,
        amount: Math.round(Number(amount) * 100),
        currency: "INR",
        name: "Sip Support",
        description: `Support @${username}`,
        image: currentUser.profilePicture || "/logo.svg",
        order_id: order_id,
        callback_url: `${window.location.origin}/api/razorpay`,
        prefill: {
          name: formData.name,
        },
        theme: {
          color: "#6366f1",
        },
      };

      if (!window.Razorpay) {
        showToast("Payment SDK is loading, please try again in a moment.", "info");
        return;
      }

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment error:", error);
      showToast("Payment failed: " + (error.message || "Unknown error"), "error");
    }
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.amount) {
      showToast("Please enter both your name and amount.", "error");
      return;
    }
    await pay(formData.amount, formData.message);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 pb-24 text-slate-100 font-(family-name:--font-outfit) animate-pulse">
        <div className="w-full h-[220px] md:h-[300px] bg-slate-900/60 border-b border-slate-900"></div>
        <div className="max-w-6xl mx-auto px-4 -mt-16 md:-mt-20 flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-slate-900 border-4 border-slate-950"></div>
          <div className="space-y-3 pt-4 text-center md:text-left">
            <div className="h-8 w-48 bg-slate-900 rounded-xl mx-auto md:mx-0"></div>
            <div className="h-4 w-28 bg-slate-900/80 rounded-lg mx-auto md:mx-0"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-black text-white mb-2">Creator Not Found</h1>
        <p className="text-slate-400 max-w-md mb-6 font-medium">
          The creator @{username} doesn&apos;t exist or hasn&apos;t set up their profile yet.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-100 transition-all"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload"></Script>
      <div className="min-h-screen bg-slate-950 pb-24 text-slate-100 font-(family-name:--font-outfit)">
        {notification && (
          <div
            className={`w-full text-center py-3.5 px-4 font-bold text-sm border-b transition-all ${
              notification.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Cover & Profile Section */}
        <div className="w-full relative bg-slate-950 border-b border-slate-900 pb-12">
          <div className="w-full h-[200px] md:h-[300px] relative overflow-hidden bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                currentUser.coverPicture ||
                "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2940&auto=format&fit=crop"
              }
              alt="cover"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20">
            <div className="relative shrink-0 flex-col items-center md:items-start pl-0 md:pl-2">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[4px] border-slate-950 shadow-2xl overflow-hidden bg-slate-900 mx-auto relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    currentUser.profilePicture ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="profile"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-950"
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left pt-2 md:pt-24 md:pl-2">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {currentUser.name || username}
              </h1>
              <p className="text-slate-400 font-semibold mt-1 text-lg">
                @{username}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 md:pt-24 pr-0 md:pr-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-500/10 text-pink-400 text-sm font-bold shadow-md border border-pink-500/20">
                <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                {payments.length} supporter{payments.length === 1 ? "" : "s"}
              </span>

              <button
                type="button"
                onClick={copyPageLink}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-bold shadow-md border border-slate-800 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>🔗 Share Profile</span>
              </button>
            </div>
          </div>
        </div>


        {/* Main Content Areas */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column (Content & Supporters) */}
            <div className="w-full lg:w-3/5 flex flex-col gap-8">
              {/* About Section */}
              <div className="bg-slate-950/60 rounded-3xl p-8 md:p-10 shadow-xl border border-slate-900 hover:border-slate-800 transition-all duration-350">
                <h2 className="text-2xl font-bold text-white mb-4">About</h2>
                <div className="prose prose-invert">
                  <p className="text-slate-300 leading-relaxed text-lg font-medium">
                    Welcome to my Sip Support page! If you enjoy the content I
                    create and want to help me continue delivering high-quality
                    work, consider buying me a coffee. Your support means the
                    world to me and directly funds my creative journey!
                  </p>
                </div>
              </div>

              {/* Supporters List */}
              <div className="bg-slate-950/60 rounded-3xl p-8 md:p-10 shadow-xl border border-slate-900">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="text-2xl bg-indigo-500/10 text-indigo-400 p-2.5 rounded-xl border border-indigo-500/20 block">
                    🫶
                  </span>{" "}
                  Recent Supporters
                </h2>

                <div className="flex flex-col gap-4">
                  {payments.length === 0 && (
                    <div className="text-slate-500 text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800 font-semibold">
                      <div className="text-4xl mb-3 opacity-60">🌱</div>
                      Nobody has supported yet. Be the first to spark the flame!
                    </div>
                  )}
                  {payments.map((p, index) => (
                    <div
                      key={p._id || index}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/20 border border-slate-900/80 hover:bg-slate-900/40 hover:border-slate-800 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-md">
                        ☕
                      </div>
                      <div className="flex-1 mt-0.5">
                        <p className="font-bold text-slate-100 text-lg leading-tight">
                          {p.name}{" "}
                          <span className="text-slate-400 font-semibold text-base">
                            supported
                          </span>{" "}
                          <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-500/20 ml-1 inline-block text-sm">
                            ₹{p.amount}
                          </span>
                        </p>
                        {p.message && (
                          <div className="mt-3 relative pl-4 border-l-2 border-slate-800">
                            <p className="text-slate-400 italic font-semibold leading-relaxed">
                              &ldquo;{p.message}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Payment Form) */}
            <div className="w-full lg:w-2/5">
              <CardSpotlight className="rounded-[2rem] p-8 md:p-10 border border-slate-900 shadow-2xl relative overflow-hidden flex flex-col items-stretch justify-start!">
                <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

                <div className="flex items-center justify-between w-full mb-8 relative z-10">
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Buy{" "}
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent capitalize">{username}</span>{" "}
                    a coffee
                  </h2>
                  <div className="text-3xl animate-bounce drop-shadow-sm">
                    ☕
                  </div>
                </div>

                <div className="flex flex-col gap-6 w-full relative z-10">
                  {/* Preset Amount Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    {[100, 300, 500].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            amount: amt.toString(),
                          }))
                        }
                        className={`py-3.5 rounded-2xl font-bold text-lg transition-all duration-200 cursor-pointer ${
                          formData.amount === amt.toString()
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/35 border border-indigo-500 scale-[1.03]"
                            : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700"
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input using InputPulseBorder */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Amount</label>
                    <InputPulseBorder
                      name="amount"
                      type="number"
                      placeholder="Custom Amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="font-bold text-lg pl-8"
                    />
                  </div>

                  {/* Name Input using InputPulseBorder */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Your Name</label>
                    <InputPulseBorder
                      name="name"
                      type="text"
                      placeholder="Your Name or Handle"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="font-semibold text-base"
                    />
                  </div>

                  {/* Message Input using InputPulseBorder */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Message (Optional)</label>
                    <InputPulseBorder
                      name="message"
                      type="textarea"
                      placeholder="A message of support..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="text-base h-28"
                    />
                  </div>

                  {/* Pay/Support Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handlePayment}
                      disabled={!formData.name || !formData.amount}
                      className="group w-full py-4.5 font-black text-lg text-slate-950 bg-white hover:bg-slate-100 rounded-2xl shadow-xl shadow-indigo-500/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      Support {formData.amount ? `₹${formData.amount}` : ""}
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-4 font-semibold flex items-center justify-center gap-1.5">
                      <svg
                        className="w-4 h-4 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Secured by Razorpay
                    </p>
                  </div>
                </div>
              </CardSpotlight>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PaymentPage = ({ username }) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300 font-semibold">
          Loading...
        </div>
      }
    >
      <PaymentContent username={username} />
    </Suspense>
  );
};

export default PaymentPage;
