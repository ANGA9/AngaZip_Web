"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdminClient } from "@/lib/supabaseAdminClient";
import { portalFetch } from "@/lib/portalFetch";
import {
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  QrCode,
  Wallet,
  Users,
  Building2,
  RefreshCw,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import "@/styles/portal.css";

export default function ReferEarnAuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp" | "name" | "pending" | "rejected">("phone");
  const [phone, setPhone] = useState("");
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialChecking, setInitialChecking] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [promoterProfile, setPromoterProfile] = useState<any>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabaseAdminClient.auth.getSession();
        if (session) {
          await evaluatePromoterStatus();
        } else {
          setInitialChecking(false);
        }
      } catch (err) {
        setInitialChecking(false);
      }
    };
    checkAuth();
  }, []);

  const evaluatePromoterStatus = async () => {
    try {
      setLoading(true);
      const res = await portalFetch("/promoters/me");
      if (res.registered) {
        setPromoterProfile(res);
        if (res.approval_status === "approved") {
          router.push("/refer-earn/dashboard");
          return;
        } else if (res.approval_status === "rejected") {
          setStep("rejected");
        } else {
          setStep("pending");
        }
      } else {
        setStep("name");
      }
    } catch (err: any) {
      // If no promoter profile yet, step to name registration
      setStep("name");
    } finally {
      setLoading(false);
      setInitialChecking(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const formattedPhone = cleanPhone.startsWith("91") && cleanPhone.length > 10 
      ? `+${cleanPhone}` 
      : `+91${cleanPhone.slice(-10)}`;

    setLoading(true);
    try {
      const { error: signInError } = await supabaseAdminClient.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (signInError) throw signInError;

      setSuccess("OTP sent successfully to your phone!");
      setStep("otp");
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please check the number and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      const newOtp = [...otpArray];
      pasted.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtpArray(newOtp);
      const nextIndex = Math.min(index + pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const code = otpArray.join("").trim();
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("91") && cleanPhone.length > 10 
      ? `+${cleanPhone}` 
      : `+91${cleanPhone.slice(-10)}`;

    setLoading(true);
    try {
      const { data, error: verifyError } = await supabaseAdminClient.auth.verifyOtp({
        phone: formattedPhone,
        token: code,
        type: "sms",
      });

      if (verifyError) throw verifyError;

      // Authenticated! Now evaluate promoter status
      await evaluatePromoterStatus();
    } catch (err: any) {
      setError(err.message || "Invalid OTP code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterName = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setLoading(true);
    try {
      const res = await portalFetch("/promoters/register", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          phone: phone ? `+91${phone.replace(/\D/g, "").slice(-10)}` : undefined,
          email: email.trim() || undefined,
        }),
      });

      setPromoterProfile(res);
      setStep("pending");
      setSuccess("Application submitted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to submit promoter application.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabaseAdminClient.auth.signOut();
    setStep("phone");
    setPhone("");
    setOtpArray(["", "", "", "", "", ""]);
    setPromoterProfile(null);
  };

  if (initialChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl shadow-xl">
          <RefreshCw className="animate-spin text-indigo-400" size={22} />
          <span className="font-medium text-slate-300">Checking promoter status…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="text-white" size={18} />
            </div>
            <div>
              <span className="font-black tracking-tight text-lg text-white">RIKSHO</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Brand Promoter
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Main Website
            </Link>
            {promoterProfile && (
              <button
                onClick={handleLogout}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 border border-rose-500/20 px-3 py-1.5 rounded-lg bg-rose-500/10 transition"
              >
                <LogOut size={13} /> Sign out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-5 py-12 flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left Side: Value Proposition */}
        <div className="flex-1 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <TrendingUp size={14} /> Earn ₹20 Per Verified Driver
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Recruit Drivers. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Earn Instant Cash.
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Join Riksho as an authorized Brand Promoter. Scan driver QR codes on the field, verify onboarding, and earn instant rewards straight to your UPI or bank account.
          </p>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <QrCode size={16} />
              </div>
              <h3 className="font-semibold text-white text-sm">Instant QR Verification</h3>
              <p className="text-xs text-slate-400">Just scan the driver's QR code from their Riksho Buddy app.</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Wallet size={16} />
              </div>
              <h3 className="font-semibold text-white text-sm">Direct UPI Payouts</h3>
              <p className="text-xs text-slate-400">Withdraw earnings directly to your Google Pay, PhonePe, or Bank.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Auth / Registration Form */}
        <div className="w-full max-w-md">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            {/* Error Message */}
            {error && (
              <div className="mb-5 bg-rose-500/10 border border-rose-500/20 text-rose-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                <span>{success}</span>
              </div>
            )}

            {/* STEP 1: Phone Input */}
            {step === "phone" && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-white">Promoter Sign In / Register</h2>
                  <p className="text-xs text-slate-400">Enter your 10-digit mobile number to receive an OTP.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Mobile Number</label>
                  <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-slate-950 focus-within:border-indigo-500 transition">
                    <div className="bg-slate-800/80 px-3.5 flex items-center text-slate-400 text-sm font-semibold border-r border-slate-700">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="9876543210"
                      className="w-full bg-transparent px-4 py-3 text-white text-sm focus:outline-none tracking-wider placeholder:text-slate-600"
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || phone.length < 10}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition text-sm cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <RefreshCw className="animate-spin" size={18} />
                  ) : (
                    <>
                      Send Verification OTP <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 2: OTP Verification */}
            {step === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-white">Verify Phone Number</h2>
                  <p className="text-xs text-slate-400">
                    We sent a 6-digit code to <span className="text-slate-200 font-semibold">+91 {phone}</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between gap-2">
                    {otpArray.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { inputRefs.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-13 text-center text-lg font-bold bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl text-white focus:outline-none transition"
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      className="text-slate-400 hover:text-slate-200 transition"
                    >
                      Change Number
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="text-indigo-400 hover:text-indigo-300 font-medium transition"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otpArray.join("").length < 6}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition text-sm cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <RefreshCw className="animate-spin" size={18} />
                  ) : (
                    "Verify & Continue"
                  )}
                </button>
              </form>
            )}

            {/* STEP 3: Complete Profile (Name & Details) */}
            {step === "name" && (
              <form onSubmit={handleRegisterName} className="space-y-5">
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-white">Promoter Profile</h2>
                  <p className="text-xs text-slate-400">Tell us your name to submit your promoter onboarding.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition"
                      autoFocus
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition text-sm cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <RefreshCw className="animate-spin" size={18} />
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            )}

            {/* STEP 4: Application Pending Approval */}
            {step === "pending" && (
              <div className="text-center space-y-5 py-3">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-xl">
                  <Clock size={32} />
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-white">Application Under Review</h2>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                    Hi <span className="text-slate-200 font-semibold">{promoterProfile?.name || name || "Promoter"}</span>, your application has been submitted to the Riksho team. An admin will review and approve your account shortly.
                  </p>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-400 flex items-center justify-between">
                  <span>Status:</span>
                  <span className="font-semibold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[10px]">
                    Pending Approval
                  </span>
                </div>

                <button
                  onClick={evaluatePromoterStatus}
                  disabled={loading}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-3 rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition text-xs cursor-pointer"
                >
                  <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Check Approval Status
                </button>
              </div>
            )}

            {/* STEP 5: Application Rejected */}
            {step === "rejected" && (
              <div className="text-center space-y-5 py-3">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-xl">
                  <AlertCircle size={32} />
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-white">Application Not Approved</h2>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                    {promoterProfile?.rejection_reason || "Your promoter application was not approved at this time."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/support"
                    className="block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition text-xs"
                  >
                    Contact Support
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-slate-800 text-slate-300 font-medium py-2.5 rounded-xl text-xs hover:bg-slate-700 transition"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Riksho Mobility Technologies. All rights reserved.
      </footer>
    </div>
  );
}
