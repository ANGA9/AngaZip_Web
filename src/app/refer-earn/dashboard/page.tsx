"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdminClient } from "@/lib/supabaseAdminClient";
import { portalFetch } from "@/lib/portalFetch";
import {
  Users,
  Wallet,
  TrendingUp,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  RefreshCw,
  LogOut,
  Sparkles,
  Camera,
  X,
  CreditCard,
  Building,
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import "@/styles/promoter.css";

export default function PromoterDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"recruits" | "payouts">("recruits");
  
  const [scannerOpen, setScannerOpen] = useState(false);
  const [manualDriverId, setManualDriverId] = useState("");
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState("");
  const [scanSuccess, setScanSuccess] = useState<any>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

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

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await portalFetch("/promoters/dashboard");
      setData(res);

      if (res.promoter) {
        if (res.promoter.upi_id) setUpiId(res.promoter.upi_id);
        if (res.promoter.bank_account_no) setBankAccountNo(res.promoter.bank_account_no);
        if (res.promoter.bank_ifsc) setBankIfsc(res.promoter.bank_ifsc);
        if (res.promoter.bank_name) setBankName(res.promoter.bank_name);
        if (res.promoter.account_holder_name) setAccountHolderName(res.promoter.account_holder_name);
      }
    } catch (err: any) {
      if (err.message?.includes("PROMOTER_NOT_APPROVED") || err.message?.includes("403") || err.message?.includes("404")) {
        router.push("/refer-earn");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabaseAdminClient.auth.getSession();
      if (!session) {
        router.push("/refer-earn");
        return;
      }
      loadDashboard();
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    if (scannerOpen) {
      setScanError("");
      setScanSuccess(null);
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
          setScanError("Camera access failed. Please ensure camera permissions are allowed, or type the Driver ID manually below.");
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
    let driverId = decodedText.trim();
    try {
      if (decodedText.startsWith("{") || decodedText.startsWith("[")) {
        const parsed = JSON.parse(decodedText);
        driverId = parsed.driver_id || parsed.id || decodedText;
      }
    } catch (e) {}

    handleLinkDriver(driverId);
  };

  const handleLinkDriver = async (driverId: string) => {
    if (!driverId || scanLoading) return;
    setScanLoading(true);
    setScanError("");
    setScanSuccess(null);

    try {
      const res = await portalFetch("/promoters/link-driver", {
        method: "POST",
        body: JSON.stringify({ driver_id: driverId }),
      });

      setScanSuccess(res);
      await loadDashboard();
    } catch (err: any) {
      setScanError(err.message || "Failed to link driver. Please verify that this driver is onboarded.");
    } finally {
      setScanLoading(false);
    }
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

    const availableRupees = (stats.available_balance || 0) / 100;
    if (amountInRupees > availableRupees) {
      setPayoutError(`Amount exceeds your available balance of ₹${availableRupees.toFixed(2)}.`);
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
      await loadDashboard();
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
    await supabaseAdminClient.auth.signOut();
    router.push("/refer-earn");
  };

  if (loading && !data) {
    return (
      <div className="pr-container" style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#0F172A", border: "1px solid rgba(255,255,255,0.1)", padding: "16px 28px", borderRadius: 16 }}>
          <RefreshCw className="animate-spin" size={20} color="#818CF8" />
          <span style={{ fontWeight: 600, color: "#E2E8F0" }}>Loading Promoter Dashboard…</span>
        </div>
      </div>
    );
  }

  const promoter = data?.promoter || {};
  const stats = data?.stats || { total_recruits: 0, total_earnings: 0, available_balance: 0, withdrawn_amount: 0 };
  const referrals = data?.referrals || [];
  const payouts = data?.payouts || [];

  return (
    <div className="pr-container">
      <header className="pr-header">
        <div className="pr-header-inner">
          <div className="pr-brand">
            <div className="pr-brand-logo">
              <Sparkles size={18} />
            </div>
            <span className="pr-brand-name">RIKSHO</span>
            <span className="pr-badge-verified">Verified Promoter</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#CBD5E1", background: "rgba(30, 41, 59, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "6px 14px", borderRadius: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399", display: "inline-block" }} />
              <span>{promoter.name || "Promoter"} ({promoter.phone})</span>
            </div>
            <button
              onClick={handleSignOut}
              style={{ fontSize: 12, color: "#94A3B8", display: "flex", alignItems: "center", gap: 6, border: "1px solid var(--pr-border)", padding: "6px 12px", borderRadius: 10, background: "rgba(15,23,42,0.8)", cursor: "pointer" }}
            >
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="pr-dash-container">
        <div className="pr-action-banner">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 9999, background: "rgba(99, 102, 241, 0.15)", color: "#818CF8", border: "1px solid rgba(99, 102, 241, 0.3)", fontSize: 12, fontWeight: 700, width: "fit-content" }}>
              <TrendingUp size={14} /> Active Field Campaign
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", letterSpacing: -0.5 }}>
              Welcome back, {promoter.name || "Promoter"}!
            </h1>
            <p style={{ fontSize: 13, color: "var(--pr-text-muted)", maxWidth: 540, lineHeight: 1.5 }}>
              Earn <strong style={{ color: "#34D399" }}>₹20 for every driver</strong> you onboard. Scan the driver's QR code from their Riksho Buddy app to verify and credit your wallet immediately.
            </p>
          </div>

          <div className="pr-banner-actions">
            <button
              onClick={() => setScannerOpen(true)}
              className="pr-btn-primary"
              style={{ padding: "0 24px", width: "auto" }}
            >
              <QrCode size={18} />
              <span>Scan Driver QR</span>
            </button>

            <button
              onClick={() => setPayoutOpen(true)}
              disabled={stats.available_balance < 1000}
              className="pr-btn-secondary"
              style={{ padding: "0 20px", width: "auto" }}
            >
              <Wallet size={16} color="#34D399" />
              <span>Withdraw Payout</span>
            </button>
          </div>
        </div>

        <div className="pr-stats-grid">
          <div className="pr-stat-card">
            <div className="pr-stat-header">
              <span className="pr-stat-label">Total Recruits</span>
              <div className="pr-perk-icon indigo" style={{ width: 30, height: 30, margin: 0 }}>
                <Users size={15} />
              </div>
            </div>
            <div className="pr-stat-value">{stats.total_recruits}</div>
            <div className="pr-stat-subtext">Verified drivers onboarded</div>
          </div>

          <div className="pr-stat-card">
            <div className="pr-stat-header">
              <span className="pr-stat-label">Total Earnings</span>
              <div className="pr-perk-icon emerald" style={{ width: 30, height: 30, margin: 0 }}>
                <TrendingUp size={15} />
              </div>
            </div>
            <div className="pr-stat-value emerald">₹{(stats.total_earnings / 100).toFixed(2)}</div>
            <div className="pr-stat-subtext">Lifetime reward sum</div>
          </div>

          <div className="pr-stat-card highlight">
            <div className="pr-stat-header">
              <span className="pr-stat-label" style={{ color: "#A5B4FC" }}>Available Balance</span>
              <div className="pr-perk-icon indigo" style={{ width: 30, height: 30, margin: 0, background: "rgba(99, 102, 241, 0.25)" }}>
                <Wallet size={15} color="#A5B4FC" />
              </div>
            </div>
            <div className="pr-stat-value">₹{(stats.available_balance / 100).toFixed(2)}</div>
            <div className="pr-stat-subtext" style={{ color: "#818CF8" }}>Ready for instant payout</div>
          </div>

          <div className="pr-stat-card">
            <div className="pr-stat-header">
              <span className="pr-stat-label">Withdrawn Sum</span>
              <div className="pr-perk-icon" style={{ width: 30, height: 30, margin: 0, background: "rgba(255,255,255,0.06)", color: "#CBD5E1" }}>
                <CreditCard size={15} />
              </div>
            </div>
            <div className="pr-stat-value" style={{ color: "#CBD5E1" }}>₹{(stats.withdrawn_amount / 100).toFixed(2)}</div>
            <div className="pr-stat-subtext">Transferred to UPI/Bank</div>
          </div>
        </div>

        <div>
          <div className="pr-tabs-row">
            <div className="pr-tabs">
              <button
                onClick={() => setActiveTab("recruits")}
                className={`pr-tab-btn ${activeTab === "recruits" ? "active" : ""}`}
              >
                <Users size={15} /> Recruited Drivers ({referrals.length})
              </button>

              <button
                onClick={() => setActiveTab("payouts")}
                className={`pr-tab-btn ${activeTab === "payouts" ? "active" : ""}`}
              >
                <Wallet size={15} /> Payout History ({payouts.length})
              </button>
            </div>

            <button
              onClick={loadDashboard}
              style={{ fontSize: 12, color: "var(--pr-text-muted)", display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}
            >
              <RefreshCw size={13} /> Refresh Data
            </button>
          </div>

          {activeTab === "recruits" && (
            <div className="pr-table-card" style={{ marginTop: 16 }}>
              {referrals.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
                  <div className="pr-perk-icon indigo" style={{ width: 56, height: 56, borderRadius: 16 }}>
                    <QrCode size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>No Drivers Recruited Yet</h3>
                    <p style={{ fontSize: 13, color: "var(--pr-text-muted)", maxWidth: 360 }}>
                      Tap "Scan Driver QR" to scan your first partner driver and earn ₹20 immediately!
                    </p>
                  </div>
                  <button
                    onClick={() => setScannerOpen(true)}
                    className="pr-btn-primary"
                    style={{ width: "auto", padding: "0 20px", height: 40, fontSize: 13 }}
                  >
                    Scan First Driver
                  </button>
                </div>
              ) : (
                <div className="pr-table-wrapper">
                  <table className="pr-table">
                    <thead>
                      <tr>
                        <th>Driver Name</th>
                        <th>Phone Number</th>
                        <th>Date Verified</th>
                        <th>Reward Earned</th>
                        <th style={{ textAlign: "right" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrals.map((r: any) => {
                        const isTest = r.driver_name?.includes("[TEST]");
                        const cleanName = r.driver_name?.replace("[TEST]", "").trim() || "Riksho Partner";
                        return (
                          <tr key={r.id}>
                            <td style={{ fontWeight: 700, color: "#FFFFFF" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span>{cleanName}</span>
                                {isTest && (
                                  <span style={{ fontSize: 10, fontWeight: 800, background: "rgba(99, 102, 241, 0.2)", color: "#A5B4FC", padding: "2px 6px", borderRadius: 4, border: "1px solid rgba(99, 102, 241, 0.3)" }}>
                                    TEST
                                  </span>
                                )}
                              </div>
                            </td>
                            <td style={{ fontFamily: "monospace", color: "var(--pr-text-muted)" }}>
                              {r.driver_phone || "—"}
                            </td>
                            <td style={{ color: "var(--pr-text-muted)" }}>
                              {new Date(r.created_at).toLocaleDateString()} {new Date(r.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </td>
                            <td style={{ fontWeight: 800, color: "#34D399" }}>
                              ₹{(r.reward_amount / 100).toFixed(2)}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--pr-emerald-soft)", border: "1px solid var(--pr-emerald-border)", color: "#34D399", padding: "4px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700 }}>
                                <CheckCircle2 size={13} /> Verified
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "payouts" && (
            <div className="pr-table-card" style={{ marginTop: 16 }}>
              {payouts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
                  <div className="pr-perk-icon emerald" style={{ width: 56, height: 56, borderRadius: 16 }}>
                    <Wallet size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>No Payout Requests Yet</h3>
                    <p style={{ fontSize: 13, color: "var(--pr-text-muted)", maxWidth: 360 }}>
                      Once you reach ₹10 in available balance, you can request a withdrawal to your UPI or Bank.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="pr-table-wrapper">
                  <table className="pr-table">
                    <thead>
                      <tr>
                        <th>Requested Date</th>
                        <th>Amount</th>
                        <th>Payout Destination</th>
                        <th>Reference / Notes</th>
                        <th style={{ textAlign: "right" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payouts.map((p: any) => (
                        <tr key={p.id}>
                          <td style={{ color: "var(--pr-text-muted)" }}>
                            {new Date(p.requested_at).toLocaleDateString()} {new Date(p.requested_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td style={{ fontWeight: 800, color: "#FFFFFF", fontSize: 15 }}>
                            ₹{(p.amount / 100).toFixed(2)}
                          </td>
                          <td>
                            {p.payout_method === "upi" ? (
                              <div style={{ fontFamily: "monospace", color: "#A5B4FC" }}>UPI: {p.upi_id}</div>
                            ) : (
                              <div>
                                <strong style={{ color: "#FFFFFF" }}>{p.bank_name || "Bank"}</strong> (A/C: {p.bank_account_no})
                              </div>
                            )}
                          </td>
                          <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--pr-text-muted)" }}>
                            {p.transaction_ref ? `Txn: ${p.transaction_ref}` : p.admin_notes || "—"}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {p.status === "paid" && (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--pr-emerald-soft)", border: "1px solid var(--pr-emerald-border)", color: "#34D399", padding: "4px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700 }}>
                                <CheckCircle2 size={12} /> Paid
                              </span>
                            )}
                            {p.status === "pending" && (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--pr-amber-soft)", border: "1px solid var(--pr-amber-border)", color: "#FBBF24", padding: "4px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700 }}>
                                <Clock size={12} /> In Review
                              </span>
                            )}
                            {p.status === "rejected" && (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--pr-rose-soft)", border: "1px solid var(--pr-rose-border)", color: "#FB7185", padding: "4px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700 }}>
                                <AlertCircle size={12} /> Rejected
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {scannerOpen && (
        <div className="pr-modal-overlay">
          <div className="pr-modal-box">
            <div className="pr-modal-header">
              <div className="pr-modal-title">
                <QrCode size={18} color="#818CF8" /> Scan Driver QR Code
              </div>
              <button onClick={handleCloseScanner} style={{ color: "var(--pr-text-muted)", background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            {scanError && (
              <div className="pr-alert error">
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{scanError}</span>
              </div>
            )}

            {scanSuccess && (
              <div className="pr-alert success" style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
                  <CheckCircle2 size={16} /> Recruit Verified Successfully!
                </div>
                <p style={{ fontSize: 12 }}>{scanSuccess.message}</p>
                <button
                  onClick={() => {
                    setScanSuccess(null);
                    setScannerOpen(false);
                  }}
                  className="pr-btn-primary pr-btn-emerald"
                  style={{ height: 36, fontSize: 12, marginTop: 6 }}
                >
                  Done
                </button>
              </div>
            )}

            {!scanSuccess && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ borderRadius: 18, overflow: "hidden", background: "#000000", maxWidth: 300, aspectRatio: "1/1", margin: "0 auto", border: "1px solid var(--pr-border)", width: "100%" }}>
                  <div id="promoter-qr-reader" style={{ width: "100%", height: "100%" }} />
                </div>

                <div style={{ textAlign: "center", fontSize: 12, color: "var(--pr-text-muted)" }}>
                  Point camera at the QR code displayed in the driver's Riksho Buddy app.
                </div>

                <div style={{ borderTop: "1px solid var(--pr-border)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 11, color: "var(--pr-text-muted)", fontWeight: 600 }}>Or enter Driver ID manually:</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      value={manualDriverId}
                      onChange={(e) => setManualDriverId(e.target.value)}
                      placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                      className="pr-text-input"
                      style={{ fontSize: 12, fontFamily: "monospace" }}
                    />
                    <button
                      onClick={() => handleLinkDriver(manualDriverId)}
                      disabled={scanLoading || !manualDriverId.trim()}
                      className="pr-btn-primary"
                      style={{ width: "auto", padding: "0 18px", height: 42, fontSize: 12 }}
                    >
                      {scanLoading ? <RefreshCw className="animate-spin" size={14} /> : "Verify"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {payoutOpen && (
        <div className="pr-modal-overlay">
          <div className="pr-modal-box">
            <div className="pr-modal-header">
              <div className="pr-modal-title">
                <Wallet size={18} color="#34D399" /> Request Withdrawal
              </div>
              <button onClick={() => setPayoutOpen(false)} style={{ color: "var(--pr-text-muted)", background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: "rgba(0,0,0,0.5)", border: "1px solid var(--pr-border)", padding: "12px 16px", borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, marginBottom: 14 }}>
              <span style={{ color: "var(--pr-text-muted)" }}>Available Balance:</span>
              <span style={{ fontWeight: 800, color: "#34D399", fontSize: 16 }}>₹{(stats.available_balance / 100).toFixed(2)}</span>
            </div>

            {payoutError && (
              <div className="pr-alert error">
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{payoutError}</span>
              </div>
            )}

            {payoutSuccess && (
              <div className="pr-alert success">
                <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
                <span>{payoutSuccess}</span>
              </div>
            )}

            <form onSubmit={handleRequestPayout} className="pr-form">
              <div className="pr-input-group">
                <label className="pr-input-label">Amount to Withdraw (₹)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: 12, color: "#94A3B8", fontWeight: 700 }}>₹</span>
                  <input
                    type="number"
                    step="1"
                    min="10"
                    max={(stats.available_balance / 100)}
                    required
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    placeholder="e.g. 100"
                    className="pr-text-input"
                    style={{ paddingLeft: 32 }}
                  />
                </div>
              </div>

              <div className="pr-input-group">
                <label className="pr-input-label">Payout Method</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod("upi")}
                    style={{
                      height: 42,
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 700,
                      border: "1px solid",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      background: payoutMethod === "upi" ? "rgba(99, 102, 241, 0.2)" : "rgba(0,0,0,0.4)",
                      borderColor: payoutMethod === "upi" ? "#6366F1" : "var(--pr-border)",
                      color: payoutMethod === "upi" ? "#FFFFFF" : "var(--pr-text-muted)",
                    }}
                  >
                    <Wallet size={14} /> UPI ID
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayoutMethod("bank")}
                    style={{
                      height: 42,
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 700,
                      border: "1px solid",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      background: payoutMethod === "bank" ? "rgba(99, 102, 241, 0.2)" : "rgba(0,0,0,0.4)",
                      borderColor: payoutMethod === "bank" ? "#6366F1" : "var(--pr-border)",
                      color: payoutMethod === "bank" ? "#FFFFFF" : "var(--pr-text-muted)",
                    }}
                  >
                    <Building size={14} /> Bank Account
                  </button>
                </div>
              </div>

              {payoutMethod === "upi" && (
                <div className="pr-input-group">
                  <label className="pr-input-label">UPI ID / VPA *</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="mobile@paytm or name@okhdfcbank"
                    className="pr-text-input"
                    style={{ fontFamily: "monospace" }}
                  />
                </div>
              )}

              {payoutMethod === "bank" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="pr-input-group">
                    <label className="pr-input-label">Account Holder Name *</label>
                    <input
                      type="text"
                      required
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      placeholder="Account holder's name"
                      className="pr-text-input"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div className="pr-input-group">
                      <label className="pr-input-label">Account No *</label>
                      <input
                        type="text"
                        required
                        value={bankAccountNo}
                        onChange={(e) => setBankAccountNo(e.target.value)}
                        placeholder="Account Number"
                        className="pr-text-input"
                        style={{ fontFamily: "monospace" }}
                      />
                    </div>
                    <div className="pr-input-group">
                      <label className="pr-input-label">IFSC Code *</label>
                      <input
                        type="text"
                        required
                        value={bankIfsc}
                        onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                        placeholder="SBIN0001234"
                        className="pr-text-input"
                        style={{ fontFamily: "monospace", textTransform: "uppercase" }}
                      />
                    </div>
                  </div>

                  <div className="pr-input-group">
                    <label className="pr-input-label">Bank Name (Optional)</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. State Bank of India"
                      className="pr-text-input"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={payoutLoading || !payoutAmount}
                className="pr-btn-primary pr-btn-emerald"
                style={{ marginTop: 6 }}
              >
                {payoutLoading ? <RefreshCw className="animate-spin" size={16} /> : "Submit Withdrawal Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
