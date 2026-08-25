"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdminClient } from "@/lib/supabaseAdminClient";
import { AlertCircle, ArrowLeft, ArrowRight, Phone, Sparkles, RefreshCw } from "lucide-react";
import Link from "next/link";
import "@/styles/portal.css";

export default function ReferEarnAuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "code">("input");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialChecking, setInitialChecking] = useState(true);
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");

  // Check if session exists
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabaseAdminClient.auth.getSession();
        if (session) {
          router.push("/refer-earn/dashboard");
          return;
        }
      } catch (err) {
        // Continue to login
      } finally {
        setInitialChecking(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      const newOtp = [...otpArray];
      pastedCode.forEach((char, i) => {
        if (index + i < 6) {
          newOtp[index + i] = char;
        }
      });
      setOtpArray(newOtp);
      setCode(newOtp.join(""));

      const nextIndex = Math.min(index + pastedCode.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);
    setCode(newOtp.join(""));

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setInputError("");
    setError("");

    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setInputError("Please enter a valid 10-digit mobile number.");
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

      setStep("code");
      setOtpArray(["", "", "", "", "", ""]);
      setCode("");
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please verify your phone number and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = otpArray.join("").trim();
    if (cleanCode.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("91") && cleanPhone.length > 10
      ? `+${cleanPhone}`
      : `+91${cleanPhone.slice(-10)}`;

    setLoading(true);
    setError("");

    try {
      const { error: verifyError } = await supabaseAdminClient.auth.verifyOtp({
        phone: formattedPhone,
        token: cleanCode,
        type: "sms",
      });

      if (verifyError) throw verifyError;

      router.push("/refer-earn/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid OTP code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initialChecking) {
    return (
      <div className="admin-layout" style={{ alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div className="admin-loading-center">
          <RefreshCw size={18} className="admin-spin" />
          Loading promoter portal…
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-wrapper">
      <header className="portal-top-bar">
        <Link href="/" className="portal-top-brand">
          <img src="/images/final_riksho.png" alt="Riksho" className="portal-top-logo" />
          <span className="portal-type-badge">Brand Promoter</span>
        </Link>
        <Link href="/" className="portal-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Website</span>
        </Link>
      </header>

      <div className="admin-login-container">
        <div className="admin-login-card" style={{ maxWidth: 520, minHeight: "auto", margin: "0 auto" }}>
          <div className="admin-login-form-area" style={{ width: "100%", padding: "48px 40px" }}>
            <div style={{ marginBottom: "24px" }}>
              <h2 className="admin-login-title">Promoter Portal</h2>
              <p className="admin-login-sub">
                Sign in or register as a Riksho Brand Promoter using your mobile phone number.
              </p>
            </div>

            {error && (
              <div className="admin-error-box" style={{ marginBottom: "20px" }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {step === "input" ? (
              <form onSubmit={handleSendCode}>
                <div className="admin-field-group">
                  <label className="admin-field-label">Mobile Phone Number</label>
                  <div className="admin-input-wrapper">
                    <Phone className="admin-input-icon" size={18} />
                    <input
                      type="tel"
                      className="admin-input"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, ""));
                        setInputError("");
                      }}
                      maxLength={10}
                      autoFocus
                      required
                    />
                  </div>
                  {inputError && (
                    <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "6px", fontWeight: 500 }}>
                      {inputError}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="admin-btn-hero"
                  disabled={loading || phone.trim().length < 10}
                >
                  <span>{loading ? "Sending verification code..." : "Send Verification OTP"}</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode}>
                <div className="admin-field-group">
                  <label className="admin-field-label">
                    Enter the 6-digit OTP sent to <strong style={{ color: "#0F172A" }}>+91 {phone}</strong>
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
                  disabled={loading || otpArray.join("").length < 6}
                >
                  <span>{loading ? "Verifying Credentials…" : "Verify & Continue"}</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  style={{
                    width: "100%",
                    height: "46px",
                    background: "transparent",
                    border: "1.5px solid #0F172A",
                    borderRadius: "14px",
                    color: "#0F172A",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    marginTop: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.15s ease",
                  }}
                  onClick={() => setStep("input")}
                  disabled={loading}
                >
                  <ArrowLeft size={16} /> Change Mobile Number
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
