"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdminClient } from "@/lib/supabaseAdminClient";
import { AlertCircle, ArrowLeft, Mail, Phone, ShieldCheck, Download, Store } from "lucide-react";
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
          <span>← Back to Darkstore</span>
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
            <h2 className="admin-login-title">Welcome back</h2>
            <p className="admin-login-sub">
              Sign in with your email or phone to access the Store Ops Portal.
            </p>

            {error && <div className="admin-error"><AlertCircle /> {error}</div>}

            {step === "input" ? (
              <form onSubmit={handleSendCode}>
                <div className="admin-login-tabs">
                  <div 
                    className={`admin-login-tab ${tab === 'phone' ? 'active' : ''}`}
                    onClick={() => setTab('phone')}
                  >
                    <Phone size={16} /> Phone
                  </div>
                  <div 
                    className={`admin-login-tab ${tab === 'email' ? 'active' : ''}`}
                    onClick={() => setTab('email')}
                  >
                    <Mail size={16} /> Email
                  </div>
                </div>

                <label className="admin-field-label">
                  {tab === "email" ? "Email Address" : "Phone Number"}
                </label>
                <input
                  type={tab === "email" ? "email" : "tel"}
                  placeholder={tab === "email" ? "Enter your email address" : "Enter your phone number"}
                  className="admin-input"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  required
                />

                <button 
                  type="submit" 
                  className="admin-btn admin-btn-primary admin-btn-block"
                  disabled={loading}
                >
                  {loading ? "Requesting..." : "Request OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode}>
                <label className="admin-field-label">
                  Enter the 6-digit code sent to <strong>{loginId}</strong>
                </label>
                <div className="admin-otp-group mt-4">
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
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary admin-btn-block"
                  disabled={loading}
                >
                  {loading ? "Verifying…" : "Sign In"}
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary admin-btn-block mt-3"
                  onClick={() => setStep("input")}
                  disabled={loading}
                >
                  <ArrowLeft size={18} className="inline mr-2" /> Back
                </button>
              </form>
            )}

            <div className="admin-login-footer">
              <span className="flex items-center"><ShieldCheck size={16} /> 100% SECURE</span>
              <span>Store Ops Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
