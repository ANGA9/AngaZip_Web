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
  ChevronRight,
  ShieldCheck,
  Search,
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import Link from "next/link";
import "@/styles/portal.css";

export default function PromoterDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"recruits" | "payouts">("recruits");
  
  // QR Scanner Modal State
  const [scannerOpen, setScannerOpen] = useState(false);
  const [manualDriverId, setManualDriverId] = useState("");
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState("");
  const [scanSuccess, setScanSuccess] = useState<any>(null);
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

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await portalFetch("/promoters/dashboard");
      setData(res);

      // Pre-fill existing banking info
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

  // Start & Stop QR Scanner
  useEffect(() => {
    if (scannerOpen) {
      setScanError("");
      setScanSuccess(null);
      setManualDriverId("");

      const qrRegionId = "promoter-qr-reader";
      let html5QrCode: Html5Qrcode | null = null;

      const timer = setTimeout(() => {
        try {
          html5QrCode = new Html5Qrcode(qrRegionId);
          scannerRef.current = html5QrCode;

          html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              handleLinkDriver(decodedText);
            },
            (errorMessage) => {
              // Ignore standard frame scan errors
            }
          ).catch((err) => {
            console.warn("Camera start failed:", err);
            setScanError("Could not access camera. Please allow camera permissions or enter Driver ID manually.");
          });
        } catch (e: any) {
          setScanError("Camera initialization error. Please use manual entry.");
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        if (html5QrCode && html5QrCode.isScanning) {
          html5QrCode.stop().catch(() => {});
        }
      };
    }
  }, [scannerOpen]);

  const handleCloseScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch(() => {});
    }
    setScannerOpen(false);
  };

  const handleLinkDriver = async (driverIdOrQr: string) => {
    if (!driverIdOrQr || scanLoading) return;
    setScanLoading(true);
    setScanError("");
    setScanSuccess(null);

    // Stop scanner if running to prevent duplicate calls
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch(() => {});
    }

    try {
      const res = await portalFetch("/promoters/link-driver", {
        method: "POST",
        body: JSON.stringify({ driver_id: driverIdOrQr }),
      });

      setScanSuccess(res);
      await loadDashboard();
    } catch (err: any) {
      setScanError(err.message || "Failed to link driver. Please verify the QR code.");
    } finally {
      setScanLoading(false);
    }
  };

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutError("");
    setPayoutSuccess("");

    const amountRupees = parseFloat(payoutAmount);
    if (!amountRupees || amountRupees < 10) {
      setPayoutError("Minimum withdrawal amount is ₹10.");
      return;
    }

    const amountPaise = Math.round(amountRupees * 100);
    const available = data?.stats?.available_balance || 0;

    if (amountPaise > available) {
      setPayoutError(`Insufficient balance. You can withdraw up to ₹${(available / 100).toFixed(2)}.`);
      return;
    }

    if (payoutMethod === "upi" && !upiId.trim()) {
      setPayoutError("Please enter a valid UPI ID (e.g. yourname@okhdfcbank).");
      return;
    }

    if (payoutMethod === "bank" && (!bankAccountNo.trim() || !bankIfsc.trim())) {
      setPayoutError("Please enter your complete bank account number and IFSC code.");
      return;
    }

    setPayoutLoading(true);
    try {
      const res = await portalFetch("/promoters/payout-request", {
        method: "POST",
        body: JSON.stringify({
          amount: amountPaise,
          payout_method: payoutMethod,
          upi_id: upiId.trim() || undefined,
          bank_account_no: bankAccountNo.trim() || undefined,
          bank_ifsc: bankIfsc.trim() || undefined,
          bank_name: bankName.trim() || undefined,
          account_holder_name: accountHolderName.trim() || undefined,
        }),
      });

      setPayoutSuccess("Withdrawal request submitted! Admin will process payment to your account.");
      setPayoutAmount("");
      await loadDashboard();
      setTimeout(() => {
        setPayoutOpen(false);
        setPayoutSuccess("");
      }, 2500);
    } catch (err: any) {
      setPayoutError(err.message || "Failed to submit withdrawal request.");
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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl shadow-xl">
          <RefreshCw className="animate-spin text-indigo-400" size={22} />
          <span className="font-medium text-slate-300">Loading promoter dashboard…</span>
        </div>
      </div>
    );
  }

  const promoter = data?.promoter || {};
  const stats = data?.stats || { total_recruits: 0, total_earnings: 0, available_balance: 0, withdrawn_amount: 0 };
  const referrals = data?.referrals || [];
  const payouts = data?.payouts || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="text-white" size={16} />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black tracking-tight text-base sm:text-lg text-white">RIKSHO</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Promoter
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/60 border border-slate-700/60 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate max-w-[200px]">{promoter.name || "Promoter"} ({promoter.phone})</span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 border border-slate-800 hover:border-rose-500/30 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-500/10 transition cursor-pointer"
            >
              <LogOut size={13} /> <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-6 sm:space-y-8">
        {/* Welcome & Primary Action Banner */}
        <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900/80 to-slate-900/40 border border-indigo-500/20 rounded-3xl p-5 sm:p-8 relative overflow-hidden backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
              <TrendingUp size={14} /> Active Field Campaign
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              Welcome back, {promoter.name || "Promoter"}!
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg leading-relaxed">
              Earn <span className="text-emerald-400 font-bold">₹20 for every driver</span> you onboard. Scan the driver's QR code from their Riksho Buddy app to verify and record your recruit instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-10 w-full md:w-auto">
            <button
              onClick={() => setScannerOpen(true)}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition text-sm cursor-pointer active:scale-95"
            >
              <QrCode size={18} />
              <span>Scan Driver QR</span>
            </button>

            <button
              onClick={() => setPayoutOpen(true)}
              disabled={stats.available_balance < 1000}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-100 font-semibold px-5 py-3.5 rounded-2xl border border-slate-700 flex items-center justify-center gap-2 transition text-sm cursor-pointer disabled:cursor-not-allowed active:scale-95"
            >
              <Wallet size={16} className="text-emerald-400" />
              <span>Withdraw Payout</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Total Recruits</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Users size={14} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
              {stats.total_recruits}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500">Verified drivers</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Total Earnings</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp size={14} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-400">
              ₹{(stats.total_earnings / 100).toFixed(2)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500">Lifetime rewards</div>
          </div>

          <div className="bg-slate-900/60 border border-indigo-500/30 bg-indigo-950/20 rounded-2xl p-4 sm:p-5 space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs text-indigo-300 font-medium">Available Balance</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
                <Wallet size={14} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
              ₹{(stats.available_balance / 100).toFixed(2)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-indigo-400/80">Ready to withdraw</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Withdrawn Sum</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-700">
                <CreditCard size={14} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-300">
              ₹{(stats.withdrawn_amount / 100).toFixed(2)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500">Transferred to UPI/Bank</div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab("recruits")}
                className={`text-xs sm:text-sm font-bold pb-2 transition flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
                  activeTab === "recruits"
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Users size={15} /> Recruits ({referrals.length})
              </button>

              <button
                onClick={() => setActiveTab("payouts")}
                className={`text-xs sm:text-sm font-bold pb-2 transition flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
                  activeTab === "payouts"
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Wallet size={15} /> Payout History ({payouts.length})
              </button>
            </div>

            <button
              onClick={loadDashboard}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition self-end sm:self-auto cursor-pointer"
            >
              <RefreshCw size={12} /> Refresh Data
            </button>
          </div>

          {/* TAB 1: Recruits Table */}
          {activeTab === "recruits" && (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
              {referrals.length === 0 ? (
                <div className="text-center py-12 sm:py-16 px-4 space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto border border-slate-700">
                    <QrCode size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">No Drivers Recruited Yet</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Tap "Scan Driver QR" to scan your first partner driver and earn ₹20 immediately!
                    </p>
                  </div>
                  <button
                    onClick={() => setScannerOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    Scan First Driver
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Driver Name</th>
                        <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Phone Number</th>
                        <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Date Verified</th>
                        <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Reward</th>
                        <th className="py-3 px-4 sm:px-5 text-right whitespace-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {referrals.map((r: any) => {
                        const isTest = r.driver_name?.includes("[TEST]");
                        const cleanName = r.driver_name?.replace("[TEST]", "").trim() || "Riksho Partner";
                        return (
                          <tr key={r.id} className="hover:bg-slate-800/30 transition">
                            <td className="py-4 px-5 font-semibold text-white">
                              <div className="flex items-center gap-2">
                                <span>{cleanName}</span>
                                {isTest && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                                    TEST
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-5 text-slate-300 font-mono">
                              {r.driver_phone}
                            </td>
                          <td className="py-4 px-5 text-slate-400">
                            {new Date(r.created_at).toLocaleDateString()} {new Date(r.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td className="py-4 px-5 font-bold text-emerald-400">
                            +₹{(r.reward_amount / 100).toFixed(2)}
                          </td>
                          <td className="py-4 px-5 text-right">
                            <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                              <CheckCircle2 size={12} /> Verified
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

          {/* TAB 2: Payouts Table */}
          {activeTab === "payouts" && (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
              {payouts.length === 0 ? (
                <div className="text-center py-16 px-4 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto border border-slate-700">
                    <Wallet size={28} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">No Payout Requests Yet</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Once you reach ₹10 in available balance, you can request a withdrawal to your UPI or Bank.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Requested Date</th>
                        <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Amount</th>
                        <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Payout Destination</th>
                        <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Reference / Notes</th>
                        <th className="py-3 px-4 sm:px-5 text-right whitespace-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {payouts.map((p: any) => (
                        <tr key={p.id} className="hover:bg-slate-800/30 transition">
                          <td className="py-3.5 px-4 sm:px-5 text-slate-400 whitespace-nowrap">
                            {new Date(p.requested_at).toLocaleDateString()} {new Date(p.requested_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td className="py-3.5 px-4 sm:px-5 font-bold text-white text-sm whitespace-nowrap">
                            ₹{(p.amount / 100).toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4 sm:px-5 text-slate-300 whitespace-nowrap">
                            {p.payout_method === "upi" ? (
                              <div className="font-mono text-indigo-300">UPI: {p.upi_id}</div>
                            ) : (
                              <div>
                                <span className="font-medium text-white">{p.bank_name || "Bank"}</span> (A/C: {p.bank_account_no})
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 sm:px-5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                            {p.transaction_ref ? `Txn: ${p.transaction_ref}` : p.admin_notes || "—"}
                          </td>
                          <td className="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                            {p.status === "paid" && (
                              <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                                <CheckCircle2 size={12} /> Paid
                              </span>
                            )}
                            {p.status === "pending" && (
                              <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                                <Clock size={12} /> In Review
                              </span>
                            )}
                            {p.status === "rejected" && (
                              <span className="inline-flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2.5 py-1 rounded-full text-[11px] font-semibold">
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

      {/* MODAL 1: QR Scanner */}
      {scannerOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-5 sm:p-6 space-y-4 sm:space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <QrCode size={16} />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base">Scan Driver QR Code</h3>
              </div>
              <button
                onClick={handleCloseScanner}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Status alerts */}
            {scanError && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3 sm:p-3.5 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{scanError}</span>
              </div>
            )}

            {scanSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                  <CheckCircle2 size={18} /> Recruit Verified Successfully!
                </div>
                <p>{scanSuccess.message}</p>
                <button
                  onClick={() => {
                    setScanSuccess(null);
                    setScannerOpen(false);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded-lg text-xs mt-2 transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}

            {/* Camera View */}
            {!scanSuccess && (
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden bg-black max-w-[280px] sm:max-w-[320px] aspect-square mx-auto flex items-center justify-center border border-slate-800 relative shadow-inner">
                  <div id="promoter-qr-reader" className="w-full h-full" />
                </div>

                <div className="text-center text-xs text-slate-400">
                  Point camera at the QR code displayed in the driver's Riksho Buddy app.
                </div>

                {/* Manual Fallback Entry */}
                <div className="border-t border-slate-800 pt-3.5 space-y-2">
                  <span className="text-[11px] text-slate-400 block font-medium">Or enter Driver ID manually:</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualDriverId}
                      onChange={(e) => setManualDriverId(e.target.value)}
                      placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <button
                      onClick={() => handleLinkDriver(manualDriverId)}
                      disabled={scanLoading || !manualDriverId.trim()}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
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

      {/* MODAL 2: Payout / Withdrawal */}
      {payoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-5 sm:p-6 space-y-4 sm:space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Wallet size={16} />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base">Request Withdrawal</h3>
              </div>
              <button
                onClick={() => setPayoutOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-3 sm:p-3.5 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-400">Available Balance:</span>
              <span className="text-emerald-400 font-bold text-sm">₹{(stats.available_balance / 100).toFixed(2)}</span>
            </div>

            {payoutError && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3 sm:p-3.5 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{payoutError}</span>
              </div>
            )}

            {payoutSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-3 sm:p-3.5 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                <span>{payoutSuccess}</span>
              </div>
            )}

            <form onSubmit={handleRequestPayout} className="space-y-3.5 sm:space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Amount to Withdraw (₹)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-sm">₹</span>
                  <input
                    type="number"
                    step="1"
                    min="10"
                    max={(stats.available_balance / 100)}
                    required
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Method Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Payout Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod("upi")}
                    className={`py-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      payoutMethod === "upi"
                        ? "bg-indigo-600/20 border-indigo-500 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Wallet size={14} /> UPI ID
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayoutMethod("bank")}
                    className={`py-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      payoutMethod === "bank"
                        ? "bg-indigo-600/20 border-indigo-500 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Building size={14} /> Bank Account
                  </button>
                </div>
              </div>

              {/* UPI Input */}
              {payoutMethod === "upi" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">UPI ID / VPA *</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="mobile@paytm or user@okhdfcbank"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              )}

              {/* Bank Inputs */}
              {payoutMethod === "bank" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Account Holder Name *</label>
                    <input
                      type="text"
                      required
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      placeholder="Account holder's name"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Account No *</label>
                      <input
                        type="text"
                        required
                        value={bankAccountNo}
                        onChange={(e) => setBankAccountNo(e.target.value)}
                        placeholder="Account Number"
                        className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">IFSC Code *</label>
                      <input
                        type="text"
                        required
                        value={bankIfsc}
                        onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                        placeholder="SBIN0001234"
                        className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Bank Name (Optional)</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. State Bank of India"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={payoutLoading || !payoutAmount}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition text-xs cursor-pointer active:scale-95"
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
