"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdminClient } from "@/lib/supabaseAdminClient";
import { AlertCircle, ArrowLeft, ArrowRight, Mail, Phone, ShieldCheck, Download, Store } from "lucide-react";
import "@/styles/portal.css";
import Link from "next/link";

export default function DarkstoreLogin() {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "code">("input");
  const [tab, setTab] = useState<"phone" | "email">("email");
  const [loginId, setLoginId] = useState("");
  const [code, setCode] = useState("");
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      const newOtp = [...otpArray];
      pastedCode.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtpArray(newOtp);
      setCode(newOtp.join(''));
      
      const nextIndex = Math.min(index + pastedCode.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);
    setCode(newOtp.join(''));

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId) return;
    
    setLoading(true);
    setError("");
    
    let signInError;
    if (tab === "email") {
      const res = await supabaseAdminClient.auth.signInWithOtp({
        email: loginId,
        options: { shouldCreateUser: false },
      });
      signInError = res.error;
    } else {
      const res = await supabaseAdminClient.auth.signInWithOtp({
        phone: loginId,
      });
      signInError = res.error;
    }

    setLoading(false);

    if (signInError) {
      if (signInError.message.includes("Signups not allowed")) {
         setError("This email is not authorized as store staff.");
      } else {
         setError(signInError.message);
      }
      return;
    }

    setStep("code");
    setOtpArray(["", "", "", "", "", ""]);
    setCode("");
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    
    setLoading(true);
    setError("");

    let verifyError;
    if (tab === "email") {
      const res = await supabaseAdminClient.auth.verifyOtp({
        email: loginId,
        token: code,
        type: "email",
      });
      verifyError = res.error;
    } else {
      const res = await supabaseAdminClient.auth.verifyOtp({
        phone: loginId,
        token: code,
        type: "sms",
      });
      verifyError = res.error;
    }

    setLoading(false);

    if (verifyError) {
      setError(verifyError.message);
      return;
    }

    router.push("/darkstore");
  };

  return (
    <div className="admin-login-wrapper">
      <header className="portal-top-bar">
        <Link href="/" className="portal-top-brand">
          <img src="/images/final_riksho.png" alt="Riksho" className="portal-top-logo" />
          <span className="portal-type-badge">Store Ops Hub</span>
        </Link>
        <Link href="/darkstore" className="portal-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Darkstore</span>
        </Link>
      </header>

      <div className="admin-login-container">
        <div className="admin-login-card">
          {/* Left Illustration Panel */}
          <div 
            className="admin-login-ill" 
            style={{ backgroundImage: "url('/images/login_ill_darkstore.png')" }}
          />

          {/* Right Form Area */}
          <div className="admin-login-form-area">
            <div style={{ marginBottom: "24px" }}>
              <h2 className="admin-login-title">Darkstore Ops Hub</h2>
              <p className="admin-login-sub">
                Sign in with your registered store credentials to manage inventory and order fulfillment.
              </p>
            </div>

            {error && (
              <div className="admin-error-box">
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {step === "input" ? (
              <form onSubmit={handleSendCode}>
                {/* Segmented Tab Switcher */}
                <div className="admin-login-segmented">
                  <div 
                    className={`admin-login-segment ${tab === 'email' ? 'active' : ''}`}
                    onClick={() => setTab('email')}
                  >
                    <Mail size={16} /> Store Email
                  </div>
                  <div 
                    className={`admin-login-segment ${tab === 'phone' ? 'active' : ''}`}
                    onClick={() => setTab('phone')}
                  >
                    <Phone size={16} /> Store Phone
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">
                    {tab === "email" ? "Registered Store Email" : "Store Operator Phone Number"}
                  </label>
                  
                  <div className="admin-input-wrapper">
                    {tab === "email" ? (
                      <>
                        <div className="admin-input-icon">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          placeholder="store@riksho.com"
                          className="admin-input-enhanced"
                          value={loginId}
                          onChange={(e) => setLoginId(e.target.value)}
                          required
                          autoFocus
                        />
                      </>
                    ) : (
                      <>
                        <div className="admin-phone-prefix">
                          <span>🇮🇳</span>
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          className="admin-input-enhanced admin-input-phone"
                          value={loginId}
                          onChange={(e) => setLoginId(e.target.value)}
                          required
                          autoFocus
                        />
                      </>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="admin-btn-hero"
                  disabled={loading}
                >
                  <span>{loading ? "Sending verification code..." : "Request Store OTP"}</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode}>
                <div className="admin-field-group">
                  <label className="admin-field-label">
                    Enter the 6-digit OTP sent to <strong style={{ color: "#0F172A" }}>{loginId}</strong>
                  </label>
                  
                  <div className="admin-otp-group" style={{ marginTop: "12px" }}>
                    {otpArray.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        className="admin-otp-box"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        maxLength={6}
                        required={index === 0}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="admin-btn-hero"
                  disabled={loading}
                >
                  <span>{loading ? "Verifying Credentials…" : "Authenticate & Open Hub"}</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  style={{
                    width: "100%",
                    height: "46px",
                    background: "transparent",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "14px",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    marginTop: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.15s ease"
                  }}
                  onClick={() => setStep("input")}
                  disabled={loading}
                >
                  <ArrowLeft size={16} /> Edit {tab === 'email' ? 'Email' : 'Phone'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
