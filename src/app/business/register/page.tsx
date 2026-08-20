"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseAdminClient } from "@/lib/supabaseAdminClient";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Mail,
  Phone,
  User,
  Building2,
  MapPin,
  Check,
  CheckCircle2,
  FileText,
  Pen,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import "@/styles/portal.css";
import Link from "next/link";

const DRAFT_KEY = "riksho_biz_reg_draft_v1";

// ---------- Types ----------
interface FormData {
  contactName: string;
  email: string;
  phone: string;
  businessName: string;
  gstin: string;
  pan: string;
  address: string;
  city: string;
}

interface FieldErrors {
  [key: string]: string;
}

// ---------- Validation helpers ----------
const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

function validateStep1(data: FormData, isPhoneVerified: boolean): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.contactName.trim()) errors.contactName = "Please enter contact person name";
  if (!data.email.trim()) errors.email = "Please enter your registered work email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid work email address (e.g. name@company.com)";
  if (!data.phone.trim()) errors.phone = "Please enter mobile phone number";
  else if (data.phone.length !== 10 || !/^[6-9]\d{9}$/.test(data.phone)) errors.phone = "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9";
  else if (!isPhoneVerified) errors.phone = "Please verify your mobile number with OTP before continuing";
  return errors;
}

function validateStep2(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.businessName.trim()) errors.businessName = "Business name is required";
  if (!data.gstin.trim()) errors.gstin = "GSTIN is required";
  else if (!GSTIN_REGEX.test(data.gstin.toUpperCase())) errors.gstin = "Enter a valid 15-character GSTIN";
  if (!data.pan.trim()) errors.pan = "PAN is required";
  else if (!PAN_REGEX.test(data.pan.toUpperCase())) errors.pan = "Enter a valid 10-character PAN";
  if (!data.address.trim()) errors.address = "Business address is required";
  if (!data.city.trim()) errors.city = "City is required";
  return errors;
}

// ---------- Step Indicator ----------
const STEPS = [
  { label: "Account\nSetup" },
  { label: "Business\nDetails" },
  { label: "Review &\nSubmit" },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="register-step-indicator">
      {STEPS.map((step, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        return (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
            <div className={`register-step-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}>
              <div className="register-step-circle">
                {isCompleted ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span className="register-step-label" style={{ whiteSpace: "pre-line" }}>{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`register-step-connector ${isCompleted ? "completed" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------- Inner Component with Query Reading & Auto-Save ----------
function BusinessRegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const rawPhone = searchParams.get("phone") || "";
  const initialPhone = rawPhone.replace(/^\+91/, "").replace(/^0+/, "").trim();

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Inline Phone OTP Verification State
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtpLoading, setPhoneOtpLoading] = useState(false);
  const [phoneOtpArray, setPhoneOtpArray] = useState(["", "", "", "", "", ""]);
  const [phoneOtpCode, setPhoneOtpCode] = useState("");
  const [phoneOtpError, setPhoneOtpError] = useState("");
  const phoneOtpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Email/Final OTP verification state
  const [otpStep, setOtpStep] = useState(false);
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [otpCode, setOtpCode] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [formData, setFormData] = useState<FormData>({
    contactName: "",
    email: initialEmail,
    phone: initialPhone,
    businessName: "",
    gstin: "",
    pan: "",
    address: "",
    city: "",
  });

  // 💾 1. Restore auto-saved draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.formData) {
          setFormData((prev) => ({
            ...prev,
            ...parsed.formData,
            email: initialEmail || parsed.formData.email || prev.email,
            phone: initialPhone || parsed.formData.phone || prev.phone,
          }));
        }
        if (typeof parsed?.phoneVerified === "boolean") {
          setPhoneVerified(parsed.phoneVerified);
        }
        if (typeof parsed?.currentStep === "number" && parsed.currentStep >= 0 && parsed.currentStep <= 2) {
          setCurrentStep(parsed.currentStep);
        }
      }
    } catch (e) {
      console.warn("Failed to load draft:", e);
    }
  }, [initialEmail, initialPhone]);

  // 💾 2. Auto-save draft on every change
  useEffect(() => {
    try {
      const hasContent = Object.values(formData).some((v) => v.trim() !== "");
      if (hasContent) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ formData, currentStep, phoneVerified }));
      }
    } catch (e) {
      console.warn("Failed to save draft:", e);
    }
  }, [formData, currentStep, phoneVerified]);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "phone") {
      setPhoneVerified(false);
      setPhoneOtpSent(false);
      setPhoneOtpError("");
    }
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Inline Phone OTP Handlers
  const handlePhoneOtpInput = (index: number, val: string) => {
    if (val.length > 1) {
      const pasted = val.slice(0, 6).split("");
      const newOtp = [...phoneOtpArray];
      pasted.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setPhoneOtpArray(newOtp);
      setPhoneOtpCode(newOtp.join(""));
      const nextIdx = Math.min(index + pasted.length, 5);
      phoneOtpInputRefs.current[nextIdx]?.focus();
      return;
    }
    const newOtp = [...phoneOtpArray];
    newOtp[index] = val;
    setPhoneOtpArray(newOtp);
    setPhoneOtpCode(newOtp.join(""));
    if (val !== "" && index < 5) phoneOtpInputRefs.current[index + 1]?.focus();
  };

  const handlePhoneOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !phoneOtpArray[index] && index > 0) {
      phoneOtpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendPhoneOtp = async () => {
    const rawNum = formData.phone.trim();
    if (rawNum.length !== 10 || !/^[6-9]\d{9}$/.test(rawNum)) {
      setFieldErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9",
      }));
      return;
    }

    setPhoneOtpLoading(true);
    setPhoneOtpError("");

    try {
      const formattedPhone = `+91${rawNum}`;
      const { error: sendErr } = await supabaseAdminClient.auth.signInWithOtp({
        phone: formattedPhone,
        options: { shouldCreateUser: true },
      });

      if (sendErr) {
        setPhoneOtpError(sendErr.message);
        setPhoneOtpLoading(false);
        return;
      }

      setPhoneOtpSent(true);
      setPhoneOtpArray(["", "", "", "", "", ""]);
      setPhoneOtpCode("");
    } catch (err: any) {
      setPhoneOtpError("Failed to send OTP code. Please try again.");
    } finally {
      setPhoneOtpLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (phoneOtpCode.length < 6) {
      setPhoneOtpError("Please enter the complete 6-digit OTP");
      return;
    }

    setPhoneOtpLoading(true);
    setPhoneOtpError("");

    try {
      const formattedPhone = `+91${formData.phone.trim()}`;
      const { error: verifyErr } = await supabaseAdminClient.auth.verifyOtp({
        phone: formattedPhone,
        token: phoneOtpCode,
        type: "sms",
      });

      if (verifyErr) {
        setPhoneOtpError(verifyErr.message);
        setPhoneOtpLoading(false);
        return;
      }

      setPhoneVerified(true);
      setPhoneOtpSent(false);
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    } catch (err: any) {
      setPhoneOtpError("Invalid or expired OTP code.");
    } finally {
      setPhoneOtpLoading(false);
    }
  };

  // Main OTP handlers (Email fallback)
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      const newOtp = [...otpArray];
      pastedCode.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtpArray(newOtp);
      setOtpCode(newOtp.join(""));
      const nextIndex = Math.min(index + pastedCode.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }
    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);
    setOtpCode(newOtp.join(""));
    if (value !== "" && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Navigation
  const handleNext = () => {
    setError("");
    let errors: FieldErrors = {};

    if (currentStep === 0) errors = validateStep1(formData, phoneVerified);
    else if (currentStep === 1) errors = validateStep2(formData);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const handlePrev = () => {
    setError("");
    setFieldErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Final submit
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // If phone was already verified in Step 1, user already has an authenticated session!
      const { data: { session } } = await supabaseAdminClient.auth.getSession();
      if (session?.user?.id) {
        // Direct insert
        const { error: insertError } = await supabaseAdminClient
          .from("businesses")
          .insert({
            owner_user_id: session.user.id,
            name: formData.businessName.trim(),
            gstin: formData.gstin.toUpperCase().trim(),
            pan: formData.pan.toUpperCase().trim(),
            address: formData.address.trim(),
            city: formData.city.trim(),
            contact_name: formData.contactName.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim().toLowerCase(),
            status: "active",
          });

        if (insertError) {
          setError(insertError.message);
          setLoading(false);
          return;
        }

        // Clean up auto-save draft
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch (e) {}

        // Success — redirect to dashboard
        router.push("/business/dashboard");
        return;
      }

      // If no active session, send OTP to email
      const { error: signInError } = await supabaseAdminClient.auth.signInWithOtp({
        email: formData.email.trim().toLowerCase(),
        options: { shouldCreateUser: true },
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      setOtpStep(true);
      setOtpArray(["", "", "", "", "", ""]);
      setOtpCode("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  // Verify Email OTP and create business record
  const handleVerifyAndCreate = async () => {
    if (otpCode.length < 6) return;
    setLoading(true);
    setError("");

    try {
      const { data, error: verifyError } = await supabaseAdminClient.auth.verifyOtp({
        email: formData.email.trim().toLowerCase(),
        token: otpCode,
        type: "email",
      });

      if (verifyError) {
        setError(verifyError.message);
        setLoading(false);
        return;
      }

      // Insert business record
      const userId = data?.user?.id;
      if (userId) {
        const { error: insertError } = await supabaseAdminClient
          .from("businesses")
          .insert({
            owner_user_id: userId,
            name: formData.businessName.trim(),
            gstin: formData.gstin.toUpperCase().trim(),
            pan: formData.pan.toUpperCase().trim(),
            address: formData.address.trim(),
            city: formData.city.trim(),
            contact_name: formData.contactName.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim().toLowerCase(),
            status: "active",
          });

        if (insertError) {
          setError(insertError.message);
          setLoading(false);
          return;
        }
      }

      // Clean up auto-save draft
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch (e) {}

      // Success — redirect to dashboard
      router.push("/business/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  // ---------- Render ----------
  return (
    <div className="admin-login-wrapper">
      <header className="portal-top-bar">
        <Link href="/" className="portal-top-brand">
          <img src="/images/final_riksho.png" alt="Riksho" className="portal-top-logo" />
          <span className="portal-type-badge">Enterprise Portal</span>
        </Link>
        <Link href="/business/login" className="portal-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Login</span>
        </Link>
      </header>

      <div className="admin-login-container" style={{ padding: "10px 20px 60px" }}>
        <div className="business-register-card">
          {/* OTP Verification Step */}
            {otpStep ? (
              <>
                <div style={{ marginBottom: "24px" }}>
                  <h2 className="admin-login-title">Verify Your Email</h2>
                  <p className="admin-login-sub">
                    Enter the 6-digit code sent to <strong style={{ color: "#0F172A" }}>{formData.email}</strong>
                  </p>
                </div>

                {error && (
                  <div className="admin-error-box">
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="admin-field-group">
                  <div className="admin-otp-group" style={{ marginTop: "4px" }}>
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
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="admin-btn-hero"
                  onClick={handleVerifyAndCreate}
                  disabled={loading || otpCode.length < 6}
                >
                  <span>{loading ? "Creating Enterprise Account..." : "Confirm & Access Dashboard"}</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  className="register-btn-prev"
                  style={{ width: "100%", justifyContent: "center", marginTop: "12px" }}
                  onClick={() => { setOtpStep(false); setError(""); }}
                  disabled={loading}
                >
                  <ArrowLeft size={16} /> Edit Details
                </button>
              </>
            ) : (
              <>
                {/* Step Counter */}
                <div className="register-step-counter">
                  Step {currentStep + 1} of {STEPS.length}
                </div>

                {/* Step Indicator */}
                <StepIndicator currentStep={currentStep} />

                {error && (
                  <div className="admin-error-box">
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{error}</span>
                  </div>
                )}

                {/* Step 1: Account Setup */}
                {currentStep === 0 && (
                  <div>
                    <h2 className="admin-login-title">Account Setup</h2>
                    <p className="admin-login-sub">Your contact details to get started.</p>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Contact Person Name *</label>
                      <div className="admin-input-wrapper">
                        <div className="admin-input-icon"><User size={18} /></div>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="admin-input-enhanced"
                          style={fieldErrors.contactName ? { borderColor: "#EF4444" } : {}}
                          value={formData.contactName}
                          onChange={(e) => updateField("contactName", e.target.value)}
                          autoFocus
                        />
                      </div>
                      {fieldErrors.contactName && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", color: "#EF4444", fontSize: "12.5px", fontWeight: 600 }}>
                          <AlertCircle size={14} style={{ flexShrink: 0 }} />
                          <span>{fieldErrors.contactName}</span>
                        </div>
                      )}
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Work Email *</label>
                      <div className="admin-input-wrapper">
                        <div className="admin-input-icon"><Mail size={18} /></div>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          className="admin-input-enhanced"
                          style={fieldErrors.email ? { borderColor: "#EF4444" } : {}}
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                        />
                      </div>
                      <div className="admin-field-hint">This will be your login credential</div>
                      {fieldErrors.email && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", color: "#EF4444", fontSize: "12.5px", fontWeight: 600 }}>
                          <AlertCircle size={14} style={{ flexShrink: 0 }} />
                          <span>{fieldErrors.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Mobile Phone Number *</label>
                      <div className="phone-input-container">
                        <div className="phone-input-row">
                          <div className="admin-input-wrapper" style={{ flex: 1 }}>
                            <div className="admin-phone-prefix" style={fieldErrors.phone ? { borderRightColor: "#EF4444" } : {}}>
                              <span>🇮🇳</span>
                              <span>+91</span>
                            </div>
                            <input
                              type="tel"
                              placeholder="98765 43210"
                              className="admin-input-enhanced admin-input-phone"
                              style={fieldErrors.phone ? { borderColor: "#EF4444" } : {}}
                              value={formData.phone}
                              maxLength={10}
                              disabled={phoneVerified}
                              onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                            />
                          </div>

                          {phoneVerified ? (
                            <div className="phone-verified-pill">
                              <CheckCircle2 size={16} />
                              <span>Verified</span>
                              <button
                                type="button"
                                onClick={() => { setPhoneVerified(false); setPhoneOtpSent(false); }}
                                style={{ background: "none", border: "none", color: "#065F46", textDecoration: "underline", fontSize: "11px", cursor: "pointer", marginLeft: 4 }}
                              >
                                Edit
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="phone-verify-action-btn"
                              onClick={handleSendPhoneOtp}
                              disabled={phoneOtpLoading || formData.phone.length !== 10}
                            >
                              {phoneOtpLoading ? (
                                <>
                                  <Loader2 size={14} className="spin-animation" />
                                  <span>Sending…</span>
                                </>
                              ) : (
                                <span>{phoneOtpSent ? "Resend Code" : "Verify Number"}</span>
                              )}
                            </button>
                          )}
                        </div>

                        {/* Inline OTP verification card when OTP is dispatched */}
                        {phoneOtpSent && !phoneVerified && (
                          <div className="inline-otp-card">
                            <div className="inline-otp-header">
                              <span className="inline-otp-title">
                                <ShieldCheck size={16} color="#4338CA" />
                                Enter 6-digit OTP sent to +91 {formData.phone}
                              </span>
                              <button
                                type="button"
                                className="inline-otp-resend"
                                onClick={handleSendPhoneOtp}
                                disabled={phoneOtpLoading}
                              >
                                Resend
                              </button>
                            </div>

                            {phoneOtpError && (
                              <div style={{ color: "#EF4444", fontSize: "12.5px", fontWeight: 600, marginBottom: "8px" }}>
                                ⚠️ {phoneOtpError}
                              </div>
                            )}

                            <div className="inline-otp-grid">
                              {phoneOtpArray.map((digit, index) => (
                                <input
                                  key={index}
                                  ref={(el) => { phoneOtpInputRefs.current[index] = el; }}
                                  type="text"
                                  inputMode="numeric"
                                  className="inline-otp-input"
                                  value={digit}
                                  onChange={(e) => handlePhoneOtpInput(index, e.target.value)}
                                  onKeyDown={(e) => handlePhoneOtpKeyDown(index, e)}
                                  maxLength={6}
                                  autoFocus={index === 0}
                                />
                              ))}
                            </div>

                            <div className="inline-otp-actions">
                              <button
                                type="button"
                                className="inline-otp-btn-confirm"
                                onClick={handleVerifyPhoneOtp}
                                disabled={phoneOtpLoading || phoneOtpCode.length < 6}
                              >
                                {phoneOtpLoading ? (
                                  <>
                                    <Loader2 size={14} className="spin-animation" />
                                    <span>Verifying…</span>
                                  </>
                                ) : (
                                  <>
                                    <Check size={14} strokeWidth={3} />
                                    <span>Confirm OTP</span>
                                  </>
                                )}
                              </button>
                              <button
                                type="button"
                                className="inline-otp-btn-cancel"
                                onClick={() => { setPhoneOtpSent(false); setPhoneOtpError(""); }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {fieldErrors.phone && !phoneOtpSent && !phoneVerified && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", color: "#EF4444", fontSize: "12.5px", fontWeight: 600 }}>
                          <AlertCircle size={14} style={{ flexShrink: 0 }} />
                          <span>{fieldErrors.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Business Details */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="admin-login-title">Business Details</h2>
                    <p className="admin-login-sub">Tell us about your business.</p>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Business / Company Name *</label>
                      <div className="admin-input-wrapper">
                        <div className="admin-input-icon"><Building2 size={18} /></div>
                        <input
                          type="text"
                          placeholder="Acme Logistics Pvt. Ltd."
                          className="admin-input-enhanced"
                          style={fieldErrors.businessName ? { borderColor: "#EF4444" } : {}}
                          value={formData.businessName}
                          onChange={(e) => updateField("businessName", e.target.value)}
                          autoFocus
                        />
                      </div>
                      {fieldErrors.businessName && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", color: "#EF4444", fontSize: "12.5px", fontWeight: 600 }}>
                          <AlertCircle size={14} style={{ flexShrink: 0 }} />
                          <span>{fieldErrors.businessName}</span>
                        </div>
                      )}
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">GSTIN *</label>
                      <div className="admin-input-wrapper">
                        <div className="admin-input-icon"><FileText size={18} /></div>
                        <input
                          type="text"
                          placeholder="22AAAAA0000A1Z5"
                          className="admin-input-enhanced"
                          value={formData.gstin}
                          onChange={(e) => updateField("gstin", e.target.value.toUpperCase())}
                          maxLength={15}
                          style={{ textTransform: "uppercase", ...(fieldErrors.gstin ? { borderColor: "#EF4444" } : {}) }}
                        />
                      </div>
                      <div className="admin-field-hint">15-character GST identification number</div>
                      {fieldErrors.gstin && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", color: "#EF4444", fontSize: "12.5px", fontWeight: 600 }}>
                          <AlertCircle size={14} style={{ flexShrink: 0 }} />
                          <span>{fieldErrors.gstin}</span>
                        </div>
                      )}
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Business PAN *</label>
                      <div className="admin-input-wrapper">
                        <div className="admin-input-icon"><FileText size={18} /></div>
                        <input
                          type="text"
                          placeholder="ABCDE1234F"
                          className="admin-input-enhanced"
                          value={formData.pan}
                          onChange={(e) => updateField("pan", e.target.value.toUpperCase())}
                          maxLength={10}
                          style={{ textTransform: "uppercase", ...(fieldErrors.pan ? { borderColor: "#EF4444" } : {}) }}
                        />
                      </div>
                      <div className="admin-field-hint">10-character Permanent Account Number</div>
                      {fieldErrors.pan && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", color: "#EF4444", fontSize: "12.5px", fontWeight: 600 }}>
                          <AlertCircle size={14} style={{ flexShrink: 0 }} />
                          <span>{fieldErrors.pan}</span>
                        </div>
                      )}
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Business Address *</label>
                      <textarea
                        placeholder="Street address, building, locality"
                        className="admin-textarea-enhanced"
                        style={fieldErrors.address ? { borderColor: "#EF4444" } : {}}
                        value={formData.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        rows={3}
                      />
                      {fieldErrors.address && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", color: "#EF4444", fontSize: "12.5px", fontWeight: 600 }}>
                          <AlertCircle size={14} style={{ flexShrink: 0 }} />
                          <span>{fieldErrors.address}</span>
                        </div>
                      )}
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">City *</label>
                      <div className="admin-input-wrapper">
                        <div className="admin-input-icon"><MapPin size={18} /></div>
                        <input
                          type="text"
                          placeholder="Mumbai"
                          className="admin-input-enhanced"
                          style={fieldErrors.city ? { borderColor: "#EF4444" } : {}}
                          value={formData.city}
                          onChange={(e) => updateField("city", e.target.value)}
                        />
                      </div>
                      {fieldErrors.city && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", color: "#EF4444", fontSize: "12.5px", fontWeight: 600 }}>
                          <AlertCircle size={14} style={{ flexShrink: 0 }} />
                          <span>{fieldErrors.city}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Submit */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="admin-login-title">Review & Submit</h2>
                    <p className="admin-login-sub">Confirm your details before creating the account.</p>

                    <div className="register-review-section">
                      <div className="register-review-heading">
                        <span>Account Details</span>
                        <button className="register-review-edit" onClick={() => setCurrentStep(0)}>
                          <Pen size={12} style={{ marginRight: 4 }} /> Edit
                        </button>
                      </div>
                      <div className="register-review-grid">
                        <div className="register-review-item">
                          <span className="register-review-label">Contact Person</span>
                          <span className="register-review-value">{formData.contactName}</span>
                        </div>
                        <div className="register-review-item">
                          <span className="register-review-label">Email</span>
                          <span className="register-review-value">{formData.email}</span>
                        </div>
                        <div className="register-review-item">
                          <span className="register-review-label">Phone</span>
                          <span className="register-review-value">+91 {formData.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="register-divider" />

                    <div className="register-review-section">
                      <div className="register-review-heading">
                        <span>Business Details</span>
                        <button className="register-review-edit" onClick={() => setCurrentStep(1)}>
                          <Pen size={12} style={{ marginRight: 4 }} /> Edit
                        </button>
                      </div>
                      <div className="register-review-grid">
                        <div className="register-review-item full-width">
                          <span className="register-review-label">Business Name</span>
                          <span className="register-review-value">{formData.businessName}</span>
                        </div>
                        <div className="register-review-item">
                          <span className="register-review-label">GSTIN</span>
                          <span className="register-review-value">{formData.gstin}</span>
                        </div>
                        <div className="register-review-item">
                          <span className="register-review-label">PAN</span>
                          <span className="register-review-value">{formData.pan}</span>
                        </div>
                        <div className="register-review-item full-width">
                          <span className="register-review-label">Address</span>
                          <span className="register-review-value">{formData.address}, {formData.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Footer */}
                <div className="register-nav-footer">
                  {currentStep > 0 ? (
                    <button className="register-btn-prev" onClick={handlePrev}>
                      <ArrowLeft size={16} /> Previous
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 2 ? (
                    <button className="admin-btn-hero" style={{ width: "auto", flex: "0 0 auto", padding: "0 32px" }} onClick={handleNext}>
                      <span>Next</span>
                      <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button
                      className="admin-btn-hero"
                      style={{ width: "auto", flex: "0 0 auto", padding: "0 32px" }}
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      <span>{loading ? "Sending OTP…" : "Submit & Verify"}</span>
                      <ArrowRight size={18} />
                    </button>
                  )}
                </div>

                {/* Login link */}
                {currentStep === 0 && (
                  <div className="admin-auth-switch">
                    Already have an account?{" "}
                    <Link href="/business/login">Sign in</Link>
                  </div>
                )}
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default function BusinessRegister() {
  return (
    <Suspense
      fallback={
        <div className="admin-login-wrapper">
          <header className="portal-top-bar">
            <div className="portal-top-brand">
              <img src="/images/final_riksho.png" alt="Riksho" className="portal-top-logo" />
              <span className="portal-type-badge">Enterprise Portal</span>
            </div>
          </header>
          <div className="admin-login-container" style={{ padding: "10px 20px 60px" }}>
            <div className="business-register-card" style={{ textAlign: "center", padding: "60px 20px" }}>
              <div className="admin-loading-center" style={{ justifyContent: "center" }}>
                Loading registration…
              </div>
            </div>
          </div>
        </div>
      }
    >
      <BusinessRegisterContent />
    </Suspense>
  );
}
