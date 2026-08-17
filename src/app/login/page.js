"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [status, router]);
    
    return (
       <div className="min-h-screen bg-slate-950 relative w-full font-(family-name:--font-outfit) overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[400px] h-[200px] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    <div className="bg-slate-950/60 backdrop-blur-2xl border border-slate-900 shadow-2xl rounded-3xl overflow-hidden">
                        <div className="p-8 md:p-10">
                            <div className="text-center mb-10">
                                <div className="flex justify-center mb-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/logo.svg" alt="Sip Support" className="w-14 h-14 object-contain" />
                                </div>
                                <h2 className="text-3xl font-black text-white tracking-tight leading-tight mb-2">
                                    Welcome to Sip Support
                                </h2>
                                <p className="text-slate-400 font-semibold">Log in to fund your creative journey.</p>
                            </div>
    
                            <div className="space-y-4">
                                <button 
                                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })} 
                                    className="group w-full h-14 px-6 border border-slate-800 bg-slate-900 hover:bg-slate-850 rounded-full transition-all duration-200 flex items-center justify-center gap-3 shadow-md cursor-pointer hover:border-slate-700 active:scale-95"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google logo" />
                                    <span className="font-bold text-slate-300 text-lg group-hover:text-white transition-colors">Continue with Google</span>
                                </button>
    
                                <button 
                                    onClick={() => signIn("github", { callbackUrl: "/dashboard" })} 
                                    className="group w-full h-14 px-6 border border-slate-800 bg-slate-900 hover:bg-slate-850 rounded-full transition-all duration-200 flex items-center justify-center gap-3 shadow-md cursor-pointer hover:border-slate-700 active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-white" viewBox="0 0 16 16">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                                    </svg>
                                    <span className="font-bold text-slate-300 text-lg group-hover:text-white transition-colors">Continue with Github</span>
                                </button>
                            </div>
    
                            <div className="mt-12 text-center">
                                <p className="text-xs text-slate-500 font-semibold">
                                    By proceeding, you agree to our <Link href="#" className="underline hover:text-slate-400">Terms of Use</Link> and <Link href="#" className="underline hover:text-slate-400">Privacy Policy</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    );
};

export default Login;
