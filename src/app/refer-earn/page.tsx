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
import "@/styles/promoter.css";

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
      const { error: verifyError } = await supabaseAdminClient.auth.verifyOtp({
        phone: formattedPhone,
        token: code,
        type: "sms",
      });

      if (verifyError) throw verifyError;

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
      <div className="pr-container" style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#0F172A", border: "1px solid rgba(255,255,255,0.1)", padding: "16px 28px", borderRadius: 16 }}>
          <RefreshCw className="animate-spin" size={20} color="#818CF8" />
          <span style={{ fontWeight: 600, color: "#E2E8F0" }}>Loading Riksho Promoter Portal…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pr-container">
      {/* Header */}
      <header className="pr-header">
        <div className="pr-header-inner">
          <div className="pr-brand">
            <div className="pr-brand-logo">
              <Sparkles size={18} />
            </div>
            <span className="pr-brand-name">RIKSHO</span>
            <span className="pr-badge-promoter">Brand Promoter</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/" style={{ fontSize: 13, color: "var(--pr-text-muted)", transition: "color 0.2s" }}>
              Main Website
            </Link>
            {promoterProfile && (
              <button
                onClick={handleLogout}
                style={{ fontSize: 12, color: "#FDA4AF", display: "flex", alignItems: "center", gap: 6, border: "1px solid var(--pr-rose-border)", padding: "6px 12px", borderRadius: 10, background: "var(--pr-rose-soft)" }}
              >
                <LogOut size={13} /> Sign out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pr-main">
        {/* Left Presentation */}
        <div className="pr-hero">
          <div className="pr-tag-reward">
            <TrendingUp size={15} /> Earn ₹20 Per Verified Driver
          </div>

          <h1 className="pr-title">
            Recruit Drivers. <br />
            <span className="pr-gradient-text">Earn Instant Cash.</span>
          </h1>

          <p className="pr-desc">
            Join Riksho as an authorized Brand Promoter. Scan driver QR codes on the field, verify onboarding, and earn instant rewards straight to your UPI or bank account.
          </p>

          <div className="pr-perks">
            <div className="pr-perk-card">
              <div className="pr-perk-icon indigo">
                <QrCode size={18} />
              </div>
              <h3 className="pr-perk-title">Instant QR Verification</h3>
              <p className="pr-perk-desc">Just scan the driver's QR code from their Riksho Buddy app.</p>
            </div>

            <div className="pr-perk-card">
              <div className="pr-perk-icon emerald">
                <Wallet size={18} />
              </div>
              <h3 className="pr-perk-title">Direct UPI Payouts</h3>
              <p className="pr-perk-desc">Withdraw earnings directly to Google Pay, PhonePe, or Bank.</p>
            </div>
          </div>
        </div>

        {/* Right Auth Card */}
        <div className="pr-auth-card">
          <div className="pr-auth-glow" />

          {/* Alerts */}
          {error && (
            <div className="pr-alert error">
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="pr-alert success">
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <span>{success}</span>
            </div>
          )}

          {/* STEP 1: Phone Input */}
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="pr-form">
              <div className="pr-form-header">
                <h2 className="pr-form-title">Promoter Sign In</h2>
                <p className="pr-form-subtitle">Enter your 10-digit mobile number to receive an OTP.</p>
              </div>

              <div className="pr-input-group">
                <label className="pr-input-label">Mobile Number</label>
                <div className="pr-phone-wrapper">
                  <div className="pr-phone-prefix">+91</div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="9876543210"
                    className="pr-phone-input"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="pr-btn-primary"
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
            <form onSubmit={handleVerifyOtp} className="pr-form">
              <div className="pr-form-header">
                <h2 className="pr-form-title">Verify Phone Number</h2>
                <p className="pr-form-subtitle">
                  We sent a 6-digit code to <strong style={{ color: "#FFFFFF" }}>+91 {phone}</strong>
                </p>
              </div>

              <div className="pr-input-group">
                <div className="pr-otp-grid">
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
                      className="pr-otp-box"
                    />
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    style={{ color: "var(--pr-text-muted)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Change Number
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    style={{ color: "#818CF8", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otpArray.join("").length < 6}
                className="pr-btn-primary"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : "Verify & Continue"}
              </button>
            </form>
          )}

          {/* STEP 3: Complete Profile */}
          {step === "name" && (
            <form onSubmit={handleRegisterName} className="pr-form">
              <div className="pr-form-header">
                <h2 className="pr-form-title">Promoter Onboarding</h2>
                <p className="pr-form-subtitle">Tell us your name to submit your promoter registration.</p>
              </div>

              <div className="pr-input-group">
                <label className="pr-input-label">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="pr-text-input"
                  autoFocus
                />
              </div>

              <div className="pr-input-group">
                <label className="pr-input-label">Email Address (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="pr-text-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="pr-btn-primary"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : "Submit Application"}
              </button>
            </form>
          )}

          {/* STEP 4: Application Pending */}
          {step === "pending" && (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 18, padding: "8px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: "var(--pr-amber-soft)", border: "1px solid var(--pr-amber-border)", color: "#FBBF24", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                <Clock size={32} />
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF", marginBottom: 6 }}>Application Under Review</h2>
                <p style={{ fontSize: 13, color: "var(--pr-text-muted)", lineHeight: 1.5 }}>
                  Hi <strong style={{ color: "#FFFFFF" }}>{promoterProfile?.name || name || "Promoter"}</strong>, your application has been submitted. An admin will review and approve your account shortly.
                </p>
              </div>

              <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid var(--pr-border)", borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--pr-text-muted)" }}>
                <span>Current Status:</span>
                <span style={{ fontWeight: 700, color: "#FBBF24", background: "var(--pr-amber-soft)", padding: "2px 8px", borderRadius: 6, border: "1px solid var(--pr-amber-border)", fontSize: 11, textTransform: "uppercase" }}>
                  Pending Approval
                </span>
              </div>

              <button
                onClick={evaluatePromoterStatus}
                disabled={loading}
                className="pr-btn-secondary"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Check Approval Status
              </button>
            </div>
          )}

          {/* STEP 5: Rejected */}
          {step === "rejected" && (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 18, padding: "8px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: "var(--pr-rose-soft)", border: "1px solid var(--pr-rose-border)", color: "#FB7185", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                <AlertCircle size={32} />
              </div>

              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF", marginBottom: 6 }}>Application Not Approved</h2>
                <p style={{ fontSize: 13, color: "var(--pr-text-muted)", lineHeight: 1.5 }}>
                  {promoterProfile?.rejection_reason || "Your promoter application was not approved at this time."}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link href="/support" className="pr-btn-primary" style={{ textDecoration: "none" }}>
                  Contact Support
                </Link>
                <button onClick={handleLogout} className="pr-btn-secondary">
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="pr-footer">
        © {new Date().getFullYear()} Riksho Mobility Technologies. All rights reserved.
      </footer>
    </div>
  );
}

