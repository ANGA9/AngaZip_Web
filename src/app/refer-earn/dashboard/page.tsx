"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { promoterSupabase } from "@/lib/supabaseAdminClient";
import { portalFetch } from "@/lib/portalFetch";
import {
  Users,
  Wallet,
  TrendingUp,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  LogOut,
  Sparkles,
  CreditCard,
  Building,
  X,
  LayoutDashboard,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import Link from "next/link";
import "@/styles/portal.css";

export default function PromoterDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"recruits" | "payouts">("recruits");
  const [approvalStatus, setApprovalStatus] = useState<"unregistered" | "pending" | "approved" | "rejected">("unregistered");
  const [promoterProfile, setPromoterProfile] = useState<any>(null);

  // Name Onboarding Form State
  const [onboardingName, setOnboardingName] = useState("");
  const [onboardingLoading, setOnboardingLoading] = useState(false);
  const [onboardingError, setOnboardingError] = useState("");
  const [checkingStatus, setCheckingStatus] = useState(false);

  // QR Scanner Modal State
  const [scannerOpen, setScannerOpen] = useState(false);
  const [manualDriverId, setManualDriverId] = useState("");
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState("");
  const [scanSuccessModal, setScanSuccessModal] = useState<any>(null);
  const [alreadyRecruitedModal, setAlreadyRecruitedModal] = useState<any>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Payout Modal State
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState<"upi" | "bank">("upi");
  const [upiId, setUpiId] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [payoutError, setPayoutError] = useState("");
  const [payoutSuccess, setPayoutSuccess] = useState("");

  const evaluateStatus = useCallback(async () => {
    try {
      const me = await portalFetch("/promoters/me");
      setPromoterProfile(me);

      if (!me.registered || !me.name) {
        setApprovalStatus("unregistered");
        return;
      }

      if (me.approval_status === "approved") {
        setApprovalStatus("approved");
        // Load live dashboard metrics
        try {
          const res = await portalFetch("/promoters/dashboard");
          setData(res);
          if (res.promoter) {
            if (res.promoter.upi_id) setUpiId(res.promoter.upi_id);
            if (res.promoter.bank_account_no) setBankAccountNo(res.promoter.bank_account_no);
            if (res.promoter.bank_ifsc) setBankIfsc(res.promoter.bank_ifsc);
            if (res.promoter.bank_name) setBankName(res.promoter.bank_name);
            if (res.promoter.account_holder_name) setAccountHolderName(res.promoter.account_holder_name);
          }
        } catch (e) {}
      } else if (me.approval_status === "rejected") {
        setApprovalStatus("rejected");
      } else {
        setApprovalStatus("pending");
      }
    } catch (err: any) {
      setApprovalStatus("unregistered");
    } finally {
      setLoading(false);
      setCheckingStatus(false);
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await promoterSupabase.auth.getSession();
      if (!session) {
        router.push("/refer-earn/login");
        return;
      }
      evaluateStatus();
    };
    checkSession();
  }, [router, evaluateStatus]);

  // Auto-poll approval status every 6 seconds when pending
  useEffect(() => {
    if (approvalStatus === "pending") {
      const interval = setInterval(() => {
        evaluateStatus();
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [approvalStatus, evaluateStatus]);

  // Start & Stop QR Scanner
  useEffect(() => {
    if (scannerOpen) {
      setScanError("");
      setScanSuccessModal(null);
      setAlreadyRecruitedModal(null);
      setManualDriverId("");

      const qrTimer = setTimeout(async () => {
        try {
          const html5QrCode = new Html5Qrcode("promoter-qr-reader");
          scannerRef.current = html5QrCode;

          await html5QrCode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            (decodedText) => {
              handleQrDetected(decodedText);
            },
            () => {}
          );
        } catch (e: any) {
          console.warn("Camera start failed:", e);
          setScanError("Camera access failed. Please ensure camera permissions are allowed, or enter Driver ID manually.");
        }
      }, 300);

      return () => {
        clearTimeout(qrTimer);
        if (scannerRef.current) {
          scannerRef.current.stop().catch(() => {}).finally(() => {
            scannerRef.current = null;
          });
        }
      };
    }
  }, [scannerOpen]);

  const handleCloseScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {}
      scannerRef.current = null;
    }
    setScannerOpen(false);
  };

  const handleQrDetected = async (decodedText: string) => {
    let rawText = decodedText.trim();
    let driverId = rawText;

    try {
      if (rawText.startsWith("{") || rawText.startsWith("[")) {
        const parsed = JSON.parse(rawText);
        driverId = parsed.driver_id || parsed.id || parsed.userId || rawText;
      }
    } catch (e) {}

    // Check for UUID pattern inside the QR string
    const uuidMatch = driverId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    if (uuidMatch) {
      driverId = uuidMatch[0];
    } else {
      driverId = driverId
        .replace(/^riksho-driver:test:/i, "")
        .replace(/^riksho-driver:/i, "")
        .replace(/^test:/i, "")
        .replace(/^\[TEST\]/i, "")
        .trim();
    }

    handleLinkDriver(driverId);
  };

  const handleLinkDriver = async (driverId: string) => {
    if (!driverId || scanLoading) return;
    setScanLoading(true);
    setScanError("");

    try {
      const res = await portalFetch("/promoters/link-driver", {
        method: "POST",
        body: JSON.stringify({ driver_id: driverId }),
      });

      // Stop camera and close scanner modal
      if (scannerRef.current) {
        try { await scannerRef.current.stop(); } catch (e) {}
        scannerRef.current = null;
      }
      setScannerOpen(false);

      // Open Success Dialog Box
      setScanSuccessModal({
        driver_name: res.referral?.driver_name || "Riksho Partner",
        driver_phone: res.referral?.driver_phone || "Registered Driver",
        reward_amount: res.referral?.reward_amount || 2000,
        message: res.message || "Driver successfully verified and added to your recruits!",
      });

      await evaluateStatus();
    } catch (err: any) {
      const errMsg = err.message || "";
      if (
        errMsg.toLowerCase().includes("already") ||
        errMsg.includes("DRIVER_ALREADY_LINKED") ||
        errMsg.includes("409")
      ) {
        // Stop camera and close scanner modal
        if (scannerRef.current) {
          try { await scannerRef.current.stop(); } catch (e) {}
          scannerRef.current = null;
        }
        setScannerOpen(false);

        // Open Already Recruited Dialog Box
        setAlreadyRecruitedModal({
          message: errMsg || "This driver has already been recruited and verified by another promoter.",
        });
      } else {
        setScanError(errMsg || "Failed to link driver. Please verify that this driver is registered.");
      }
    } finally {
      setScanLoading(false);
    }
  };

  const handleSaveOnboardingName = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = onboardingName.trim();
    if (cleanName.length < 3) {
      setOnboardingError("Please enter your full name (at least 3 characters).");
      return;
    }

    setOnboardingLoading(true);
    setOnboardingError("");

    try {
      const { data: { session } } = await promoterSupabase.auth.getSession();
      const phone = session?.user?.phone;

      await portalFetch("/promoters/register", {
        method: "POST",
        body: JSON.stringify({
          name: cleanName,
          phone: phone || undefined,
        }),
      });

      setApprovalStatus("pending");
      await evaluateStatus();
    } catch (err: any) {
      setOnboardingError(err.message || "Failed to submit promoter registration.");
    } finally {
      setOnboardingLoading(false);
    }
  };

  const handleManualCheckStatus = async () => {
    setCheckingStatus(true);
    await evaluateStatus();
  };

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutError("");
    setPayoutSuccess("");

    const amountInRupees = parseFloat(payoutAmount);
    if (isNaN(amountInRupees) || amountInRupees < 10) {
      setPayoutError("Minimum payout request is ₹10.");
      return;
    }

    const availableRupees = (data?.stats?.available_balance || 0) / 100;
    if (amountInRupees > availableRupees) {
      setPayoutError(`Amount exceeds available balance of ₹${availableRupees.toFixed(2)}.`);
      return;
    }

    if (payoutMethod === "upi" && !upiId.trim()) {
      setPayoutError("Please enter your UPI ID.");
      return;
    }

    if (payoutMethod === "bank") {
      if (!bankAccountNo.trim() || !bankIfsc.trim() || !accountHolderName.trim()) {
        setPayoutError("Please fill in all mandatory bank details.");
        return;
      }
    }

    setPayoutLoading(true);
    try {
      await portalFetch("/promoters/payouts/request", {
        method: "POST",
        body: JSON.stringify({
          amount: Math.round(amountInRupees * 100),
          payout_method: payoutMethod,
          upi_id: payoutMethod === "upi" ? upiId.trim() : undefined,
          bank_account_no: payoutMethod === "bank" ? bankAccountNo.trim() : undefined,
          bank_ifsc: payoutMethod === "bank" ? bankIfsc.trim().toUpperCase() : undefined,
          bank_name: payoutMethod === "bank" ? bankName.trim() : undefined,
          account_holder_name: payoutMethod === "bank" ? accountHolderName.trim() : undefined,
        }),
      });

      setPayoutSuccess("Withdrawal request submitted! Payout will be processed to your account.");
      setPayoutAmount("");
      await evaluateStatus();
      setTimeout(() => {
        setPayoutOpen(false);
        setPayoutSuccess("");
      }, 2500);
    } catch (err: any) {
      setPayoutError(err.message || "Failed to submit payout request.");
    } finally {
      setPayoutLoading(false);
    }
  };

  const handleSignOut = async () => {
    await promoterSupabase.auth.signOut();
    router.push("/refer-earn/login");
  };

  if (loading) {
    return (
      <div className="admin-layout" style={{ alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div className="admin-loading-center">
          <RefreshCw size={18} className="admin-spin" />
          Loading promoter portal…
        </div>
      </div>
    );
  }

  const promoter = data?.promoter || promoterProfile || {};
  const stats = data?.stats || { total_recruits: 0, total_earnings: 0, available_balance: 0, withdrawn_amount: 0 };
  const referrals = data?.referrals || [];
  const payouts = data?.payouts || [];

  return (
    <div className="admin-layout">
      {/* Sidebar matching Riksho Admin */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <img src="/images/final_riksho.png" alt="Riksho Promoter" />
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section-label">Promoter Hub</div>
          <button
            onClick={() => setActiveTab("recruits")}
            className={`admin-nav-item ${activeTab === "recruits" ? "active" : ""}`}
            style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
          >
            <LayoutDashboard /> Overview & Recruits
          </button>

          <button
            onClick={() => setActiveTab("payouts")}
            className={`admin-nav-item ${activeTab === "payouts" ? "active" : ""}`}
            style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
          >
            <Wallet /> Payout History
          </button>

          <div className="admin-nav-section-label">External</div>
          <Link href="/" className="admin-nav-item">
            <ArrowRight /> Main Website
          </Link>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="admin-header-user">
            <span className="admin-header-email">
              {promoter.name || "Promoter"} ({promoter.phone || "Partner"})
            </span>
            <span
              className="admin-header-chip"
              style={{
                backgroundColor: approvalStatus === "approved" ? "#ECFDF5" : "#FEF3C7",
                color: approvalStatus === "approved" ? "#047857" : "#B45309",
              }}
            >
              {approvalStatus === "approved" ? <CheckCircle2 size={13} /> : <Clock size={13} />}
              {approvalStatus === "approved" ? "Approved Promoter" : "Under Review"}
            </span>
            <button onClick={handleSignOut} className="admin-logout-btn">
              <LogOut size={14} /> Log out
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content">
          {/* Top Title & Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "24px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h1 className="admin-page-title">Promoter Dashboard</h1>
              <p className="admin-page-subtitle">
                Recruit drivers on the field, verify on-boarding QR codes, and earn ₹20 instant rewards per driver.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setScannerOpen(true)}
                className="admin-btn admin-btn-primary"
                style={{ gap: "8px" }}
              >
                <QrCode size={16} /> Scan Driver QR
              </button>

              <button
                onClick={() => setPayoutOpen(true)}
                disabled={stats.available_balance < 1000}
                className="admin-btn admin-btn-secondary"
                style={{ gap: "8px" }}
              >
                <Wallet size={16} /> Withdraw Payout
              </button>
            </div>
          </div>

          {/* Stats Grid matching Riksho Admin */}
          <div className="admin-stats-grid" style={{ marginBottom: "28px" }}>
            <div className="admin-stat-card">
              <div className="admin-stat-head">
                <span className="admin-stat-title">Total Recruits</span>
                <span className="admin-stat-icon cyan">
                  <Users size={18} />
                </span>
              </div>
              <div className="admin-stat-value">{stats.total_recruits}</div>
              <div style={{ fontSize: "12px", color: "var(--admin-muted)", marginTop: "4px" }}>
                Verified driver recruits
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-head">
                <span className="admin-stat-title">Total Earnings</span>
                <span className="admin-stat-icon green">
                  <TrendingUp size={18} />
                </span>
              </div>
              <div className="admin-stat-value" style={{ color: "#059669" }}>
                ₹{(stats.total_earnings / 100).toFixed(2)}
              </div>
              <div style={{ fontSize: "12px", color: "var(--admin-muted)", marginTop: "4px" }}>
                Lifetime rewards earned
              </div>
            </div>

            <div className="admin-stat-card" style={{ borderColor: "#C7D2FE", backgroundColor: "#F5F7FF" }}>
              <div className="admin-stat-head">
                <span className="admin-stat-title" style={{ color: "#4338CA", fontWeight: 700 }}>
                  Available Balance
                </span>
                <span className="admin-stat-icon" style={{ backgroundColor: "#EEF2FF", color: "#4338CA" }}>
                  <Wallet size={18} />
                </span>
              </div>
              <div className="admin-stat-value" style={{ color: "#4338CA" }}>
                ₹{(stats.available_balance / 100).toFixed(2)}
              </div>
              <div style={{ fontSize: "12px", color: "#6366F1", marginTop: "4px" }}>
                Ready for withdrawal
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-head">
                <span className="admin-stat-title">Withdrawn Sum</span>
                <span className="admin-stat-icon amber">
                  <CreditCard size={18} />
                </span>
              </div>
              <div className="admin-stat-value">₹{(stats.withdrawn_amount / 100).toFixed(2)}</div>
              <div style={{ fontSize: "12px", color: "var(--admin-muted)", marginTop: "4px" }}>
                Transferred to UPI / Bank
              </div>
            </div>
          </div>

          {/* Section Tabs */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--admin-border)", marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              <button
                onClick={() => setActiveTab("recruits")}
                style={{
                  padding: "10px 4px",
                  borderBottom: activeTab === "recruits" ? "2px solid #4338CA" : "2px solid transparent",
                  fontWeight: 700,
                  fontSize: 14,
                  color: activeTab === "recruits" ? "#4338CA" : "#64748b",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Recruited Drivers ({referrals.length})
              </button>

              <button
                onClick={() => setActiveTab("payouts")}
                style={{
                  padding: "10px 4px",
                  borderBottom: activeTab === "payouts" ? "2px solid #4338CA" : "2px solid transparent",
                  fontWeight: 700,
                  fontSize: 14,
                  color: activeTab === "payouts" ? "#4338CA" : "#64748b",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Payout History ({payouts.length})
              </button>
            </div>

            <button
              onClick={evaluateStatus}
              style={{
                fontSize: 12,
                color: "var(--admin-muted)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={13} /> Refresh Data
            </button>
          </div>

          {/* TAB 1: Recruits Table */}
          {activeTab === "recruits" && (
            <div className="admin-table-container">
              {referrals.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 16px" }}>
                  <Users size={36} color="#94a3b8" style={{ margin: "0 auto 12px auto" }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>No Driver Recruits Yet</h3>
                  <p style={{ fontSize: 13, color: "#64748b", maxWidth: 360, margin: "0 auto 16px auto" }}>
                    Scan the QR code on a newly onboarded driver's phone to verify your recruit and earn ₹20 immediately!
                  </p>
                  <button
                    onClick={() => setScannerOpen(true)}
                    className="admin-btn admin-btn-primary admin-btn-sm"
                  >
                    Scan First Driver
                  </button>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Driver Name</th>
                      <th>Phone Number</th>
                      <th>Date Verified</th>
                      <th>Reward Amount</th>
                      <th style={{ textAlign: "right" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((r: any) => {
                      const isTest = r.driver_name?.includes("[TEST]");
                      const cleanName = r.driver_name?.replace("[TEST]", "").trim() || "Riksho Partner";
                      return (
                        <tr key={r.id}>
                          <td style={{ fontWeight: 600, color: "#0F172A" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span>{cleanName}</span>
                              {isTest && (
                                <span style={{ fontSize: 10, fontWeight: 800, background: "#EEF2FF", color: "#4338CA", padding: "2px 6px", borderRadius: 4, border: "1px solid #C7D2FE" }}>
                                  TEST
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ fontFamily: "monospace", color: "#64748b" }}>
                            {r.driver_phone || "—"}
                          </td>
                          <td style={{ color: "#64748b" }}>
                            {new Date(r.created_at).toLocaleDateString()} {new Date(r.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td style={{ fontWeight: 700, color: "#059669" }}>
                            +₹{(r.reward_amount / 100).toFixed(2)}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <span className="admin-chip" style={{ backgroundColor: "#ECFDF5", color: "#047857" }}>
                              <CheckCircle2 size={12} /> Verified
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 2: Payouts Table */}
          {activeTab === "payouts" && (
            <div className="admin-table-container">
              {payouts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 16px" }}>
                  <Wallet size={36} color="#94a3b8" style={{ margin: "0 auto 12px auto" }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>No Payout Requests Yet</h3>
                  <p style={{ fontSize: 13, color: "#64748b", maxWidth: 360, margin: "0 auto" }}>
                    Once you accumulate at least ₹10 in available balance, you can submit a withdrawal request.
                  </p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Requested Date</th>
                      <th>Amount</th>
                      <th>Payout Method & Destination</th>
                      <th>Transaction Ref / Note</th>
                      <th style={{ textAlign: "right" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payouts.map((p: any) => (
                      <tr key={p.id}>
                        <td style={{ color: "#64748b" }}>
                          {new Date(p.requested_at).toLocaleDateString()} {new Date(p.requested_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td style={{ fontWeight: 700, color: "#0F172A" }}>
                          ₹{(p.amount / 100).toFixed(2)}
                        </td>
                        <td>
                          {p.payout_method === "upi" ? (
                            <div style={{ fontFamily: "monospace", color: "#4338CA" }}>UPI: {p.upi_id}</div>
                          ) : (
                            <div>
                              <strong style={{ color: "#0F172A" }}>{p.bank_name || "Bank"}</strong> (A/C: {p.bank_account_no})
                            </div>
                          )}
                        </td>
                        <td style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>
                          {p.transaction_ref ? `Txn: ${p.transaction_ref}` : p.admin_notes || "—"}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {p.status === "paid" && (
                            <span className="admin-chip" style={{ backgroundColor: "#ECFDF5", color: "#047857" }}>
                              <CheckCircle2 size={12} /> Paid
                            </span>
                          )}
                          {p.status === "pending" && (
                            <span className="admin-chip" style={{ backgroundColor: "#FEF3C7", color: "#B45309" }}>
                              <Clock size={12} /> In Review
                            </span>
                          )}
                          {p.status === "rejected" && (
                            <span className="admin-chip" style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}>
                              <AlertCircle size={12} /> Rejected
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>

      {/* DIALOG 1: Non-skippable Onboarding Name Modal (When user has not submitted name yet) */}
      {approvalStatus === "unregistered" && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 24, border: "1.5px solid #0F172A", maxWidth: 460, width: "100%", padding: 36, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)" }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: "#EEF2FF", border: "1.5px solid #C7D2FE", color: "#4338CA", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <Sparkles size={26} />
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.02em" }}>
              Complete Promoter Profile
            </h3>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, marginBottom: 24 }}>
              Please enter your full name to submit your promoter registration for verification.
            </p>

            {onboardingError && (
              <div className="admin-error-box" style={{ marginBottom: 16 }}>
                <AlertCircle size={16} />
                <span>{onboardingError}</span>
              </div>
            )}

            <form onSubmit={handleSaveOnboardingName}>
              <div className="admin-field-group" style={{ marginBottom: 20 }}>
                <label className="admin-field-label">Full Name *</label>
                <div className="admin-input-wrapper">
                  <input
                    type="text"
                    required
                    value={onboardingName}
                    onChange={(e) => {
                      setOnboardingName(e.target.value);
                      if (onboardingError) setOnboardingError("");
                    }}
                    placeholder="Enter at least 3 letters (e.g. Rahul Sharma)"
                    className="admin-input-enhanced"
                    style={{ paddingLeft: "16px" }}
                    autoFocus
                  />
                </div>
                {onboardingName.trim().length > 0 && onboardingName.trim().length < 3 && (
                  <span style={{ fontSize: 12, color: "#D97706", marginTop: 6, display: "block" }}>
                    Please enter at least 3 characters ({onboardingName.trim().length}/3)
                  </span>
                )}
              </div>

              {/* Button ONLY appears / is enabled when at least 3 letters are entered */}
              {onboardingName.trim().length >= 3 && (
                <button
                  type="submit"
                  disabled={onboardingLoading}
                  className="admin-btn-hero"
                  style={{ marginTop: 8 }}
                >
                  <span>{onboardingLoading ? "Submitting Registration…" : "Submit for Verification"}</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* DIALOG 2: Non-skippable Pending Approval Dialog (Unclosable until admin approves access) */}
      {approvalStatus === "pending" && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 24, border: "1.5px solid #0F172A", maxWidth: 480, width: "100%", padding: 36, textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)" }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: "#FEF3C7", border: "1.5px solid #FDE68A", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
              <Clock size={32} />
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", marginBottom: 10, letterSpacing: "-0.02em" }}>
              Application Submitted for Verification
            </h3>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>
              Hi <strong style={{ color: "#0F172A" }}>{promoter.name || "Promoter"}</strong>, your registration has been submitted to the Riksho team. An admin will review and approve your account within minutes.
            </p>

            <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", padding: "14px 18px", borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, marginBottom: 24 }}>
              <span style={{ color: "#64748B", fontWeight: 500 }}>Current Status:</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#B45309", fontWeight: 800, fontSize: 12, backgroundColor: "#FEF3C7", padding: "4px 10px", borderRadius: 8, border: "1px solid #FDE68A" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#D97706" }} />
                PENDING APPROVAL
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={handleManualCheckStatus}
                disabled={checkingStatus}
                className="admin-btn admin-btn-secondary"
                style={{ width: "100%", height: 48, justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 700 }}
              >
                <RefreshCw size={16} className={checkingStatus ? "admin-spin" : ""} />
                <span>{checkingStatus ? "Checking status…" : "Check Approval Status"}</span>
              </button>

              <button
                onClick={handleSignOut}
                style={{ background: "none", border: "none", color: "#94A3B8", fontSize: 13, cursor: "pointer", padding: "6px" }}
              >
                Sign out / Log in with another number
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG 3: Rejected Dialog */}
      {approvalStatus === "rejected" && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 24, border: "1.5px solid #0F172A", maxWidth: 460, width: "100%", padding: 36, textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)" }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: "#FEE2E2", border: "1.5px solid #FECACA", color: "#DC2626", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
              <AlertCircle size={32} />
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", marginBottom: 10 }}>
              Application Not Approved
            </h3>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>
              {promoter.rejection_reason || "Your promoter application was not approved at this time. Please contact support for more details."}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link
                href="/support"
                className="admin-btn admin-btn-primary"
                style={{ width: "100%", height: 46, justifyContent: "center", textDecoration: "none" }}
              >
                Contact Support
              </Link>
              <button
                onClick={handleSignOut}
                className="admin-btn admin-btn-secondary"
                style={{ width: "100%", height: 46, justifyContent: "center" }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG 4: QR Scanner Modal */}
      {scannerOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, border: "1.5px solid #0F172A", maxWidth: 440, width: "100%", padding: 24, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <QrCode size={20} color="#4338CA" />
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A" }}>Scan Driver QR Code</h3>
              </div>
              <button
                onClick={handleCloseScanner}
                style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {scanError && (
              <div className="admin-error-box" style={{ marginBottom: 14 }}>
                <AlertCircle size={16} />
                <span>{scanError}</span>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ borderRadius: 14, overflow: "hidden", background: "#000000", maxWidth: 280, aspectRatio: "1/1", margin: "0 auto", width: "100%" }}>
                <div id="promoter-qr-reader" style={{ width: "100%", height: "100%" }} />
              </div>

              <p style={{ textAlign: "center", fontSize: 12.5, color: "#64748B" }}>
                Point camera at the QR code displayed in the driver's Riksho Buddy app.
              </p>

              <div style={{ borderTop: "1px solid var(--admin-border)", paddingTop: 14 }}>
                <label className="admin-field-label" style={{ fontSize: 12 }}>Or enter Driver ID manually:</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={manualDriverId}
                    onChange={(e) => setManualDriverId(e.target.value)}
                    placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                    className="admin-input"
                    style={{ fontSize: 12, fontFamily: "monospace" }}
                  />
                  <button
                    onClick={() => handleLinkDriver(manualDriverId)}
                    disabled={scanLoading || !manualDriverId.trim()}
                    className="admin-btn admin-btn-primary admin-btn-sm"
                  >
                    {scanLoading ? <RefreshCw className="admin-spin" size={14} /> : "Verify"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG: Driver Successfully Recruited Modal */}
      {scanSuccessModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 24, border: "1.5px solid #0F172A", maxWidth: 460, width: "100%", padding: 32, textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)" }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: "#ECFDF5", border: "1.5px solid #A7F3D0", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px auto" }}>
              <CheckCircle2 size={34} />
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", marginBottom: 6, letterSpacing: "-0.02em" }}>
              Driver Successfully Recruited!
            </h3>
            <p style={{ fontSize: 13.5, color: "#64748B", marginBottom: 20 }}>
              The driver has been verified and added to your recruitment roster.
            </p>

            <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 16, padding: "18px 20px", marginBottom: 24, textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "#64748B" }}>Driver Name:</span>
                <strong style={{ fontSize: 14, color: "#0F172A" }}>{scanSuccessModal.driver_name}</strong>
              </div>
              {scanSuccessModal.driver_phone && scanSuccessModal.driver_phone !== "—" && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#64748B" }}>Contact Phone:</span>
                  <span style={{ fontSize: 13, fontFamily: "monospace", color: "#334155" }}>{scanSuccessModal.driver_phone}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed #CBD5E1", paddingTop: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#059669" }}>Reward Added:</span>
                <strong style={{ fontSize: 18, fontWeight: 900, color: "#059669" }}>+₹{(scanSuccessModal.reward_amount / 100).toFixed(2)}</strong>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setScanSuccessModal(null)}
                className="admin-btn admin-btn-secondary"
                style={{ flex: 1, height: 46, justifyContent: "center" }}
              >
                Done
              </button>
              <button
                onClick={() => {
                  setScanSuccessModal(null);
                  setScannerOpen(true);
                }}
                className="admin-btn admin-btn-primary"
                style={{ flex: 1.3, height: 46, justifyContent: "center", gap: 6 }}
              >
                <QrCode size={16} /> Scan Next Driver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG: Driver Already Recruited Modal */}
      {alreadyRecruitedModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 24, border: "1.5px solid #0F172A", maxWidth: 460, width: "100%", padding: 32, textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)" }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: "#FEF3C7", border: "1.5px solid #FDE68A", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px auto" }}>
              <AlertCircle size={34} />
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.02em" }}>
              Driver Already Recruited
            </h3>
            <p style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.5, marginBottom: 20 }}>
              {alreadyRecruitedModal.message || "This driver has already completed registration with another recruiter. Driver rewards are awarded only once per partner."}
            </p>

            <div style={{ backgroundColor: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 14, padding: "14px 16px", marginBottom: 24, fontSize: 13, color: "#92400E", textAlign: "left", display: "flex", gap: 8, alignItems: "flex-start" }}>
              <Clock size={16} style={{ flexShrink: 0, marginTop: 2, color: "#D97706" }} />
              <span>Referral bonus cannot be claimed multiple times for the same vehicle or driver account.</span>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setAlreadyRecruitedModal(null)}
                className="admin-btn admin-btn-secondary"
                style={{ flex: 1, height: 46, justifyContent: "center" }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setAlreadyRecruitedModal(null);
                  setScannerOpen(true);
                }}
                className="admin-btn admin-btn-primary"
                style={{ flex: 1.3, height: 46, justifyContent: "center", gap: 6 }}
              >
                <QrCode size={16} /> Scan Another Driver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG 5: Withdrawal Request Modal */}
      {payoutOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, border: "1.5px solid #0F172A", maxWidth: 440, width: "100%", padding: 24, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Wallet size={20} color="#059669" />
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A" }}>Request Withdrawal</h3>
              </div>
              <button
                onClick={() => setPayoutOpen(false)}
                style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", padding: "12px 16px", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, marginBottom: 16 }}>
              <span style={{ color: "#64748B" }}>Available Balance:</span>
              <strong style={{ color: "#059669", fontSize: 16 }}>₹{(stats.available_balance / 100).toFixed(2)}</strong>
            </div>

            {payoutError && (
              <div className="admin-error-box" style={{ marginBottom: 14 }}>
                <AlertCircle size={16} />
                <span>{payoutError}</span>
              </div>
            )}

            {payoutSuccess && (
              <div style={{ backgroundColor: "#ECFDF5", border: "1px solid #A7F3D0", color: "#047857", padding: 14, borderRadius: 12, marginBottom: 14, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={16} />
                <span>{payoutSuccess}</span>
              </div>
            )}

            <form onSubmit={handleRequestPayout}>
              <div className="admin-field-group">
                <label className="admin-field-label">Amount to Withdraw (₹)</label>
                <div className="admin-input-wrapper">
                  <span style={{ position: "absolute", left: 14, fontWeight: 700, color: "#64748B" }}>₹</span>
                  <input
                    type="number"
                    step="1"
                    min="10"
                    max={(stats.available_balance / 100)}
                    required
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    placeholder="e.g. 100"
                    className="admin-input"
                    style={{ paddingLeft: 32, width: "100%" }}
                  />
                </div>
              </div>

              <div className="admin-field-group">
                <label className="admin-field-label">Payout Method</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod("upi")}
                    style={{
                      padding: "9px 12px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      border: payoutMethod === "upi" ? "1.5px solid #4338CA" : "1px solid #CBD5E1",
                      backgroundColor: payoutMethod === "upi" ? "#EEF2FF" : "#FFFFFF",
                      color: payoutMethod === "upi" ? "#4338CA" : "#64748B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Wallet size={14} /> UPI ID
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayoutMethod("bank")}
                    style={{
                      padding: "9px 12px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      border: payoutMethod === "bank" ? "1.5px solid #4338CA" : "1px solid #CBD5E1",
                      backgroundColor: payoutMethod === "bank" ? "#EEF2FF" : "#FFFFFF",
                      color: payoutMethod === "bank" ? "#4338CA" : "#64748B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Building size={14} /> Bank Account
                  </button>
                </div>
              </div>

              {payoutMethod === "upi" && (
                <div className="admin-field-group">
                  <label className="admin-field-label">UPI ID / VPA *</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="mobile@paytm or user@okhdfcbank"
                    className="admin-input"
                    style={{ width: "100%", fontFamily: "monospace" }}
                  />
                </div>
              )}

              {payoutMethod === "bank" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="admin-field-group">
                    <label className="admin-field-label">Account Holder Name *</label>
                    <input
                      type="text"
                      required
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      placeholder="Account holder's name"
                      className="admin-input"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Account Number *</label>
                      <input
                        type="text"
                        required
                        value={bankAccountNo}
                        onChange={(e) => setBankAccountNo(e.target.value)}
                        placeholder="Account Number"
                        className="admin-input"
                        style={{ width: "100%", fontFamily: "monospace" }}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">IFSC Code *</label>
                      <input
                        type="text"
                        required
                        value={bankIfsc}
                        onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                        placeholder="SBIN0001234"
                        className="admin-input"
                        style={{ width: "100%", fontFamily: "monospace", textTransform: "uppercase" }}
                      />
                    </div>
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Bank Name (Optional)</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. State Bank of India"
                      className="admin-input"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={payoutLoading || !payoutAmount}
                className="admin-btn admin-btn-primary"
                style={{ width: "100%", marginTop: 8 }}
              >
                {payoutLoading ? <RefreshCw className="admin-spin" size={16} /> : "Submit Withdrawal Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
