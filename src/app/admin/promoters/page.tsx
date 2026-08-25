"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import {
  Users,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Clock,
  Check,
  X,
  RefreshCw,
  Search,
  Building,
  CreditCard,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function AdminPromotersPage() {
  const [activeTab, setActiveTab] = useState<"promoters" | "payouts">("promoters");
  const [loading, setLoading] = useState(true);
  const [promoters, setPromoters] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal State for Rejecting Promoter
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedPromoterId, setSelectedPromoterId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Modal State for Paying Payout Request
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedPayoutId, setSelectedPayoutId] = useState<string | null>(null);
  const [transactionRef, setTransactionRef] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      if (activeTab === "promoters") {
        const query = statusFilter !== "all" ? `?status=${statusFilter}` : "";
        const res = await adminFetch(`/admin/promoters${query}`);
        setPromoters(res.promoters || []);
      } else {
        const query = statusFilter !== "all" ? `?status=${statusFilter}` : "";
        const res = await adminFetch(`/admin/promoters/payouts${query}`);
        setPayouts(res.payouts || []);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, statusFilter]);

  const handleApprovePromoter = async (id: string) => {
    setActionLoading(true);
    setError("");
    try {
      await adminFetch(`/admin/promoters/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: "approved" }),
      });
      setSuccess("Promoter approved successfully!");
      fetchData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to approve promoter");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectPromoter = async () => {
    if (!selectedPromoterId) return;
    setActionLoading(true);
    setError("");
    try {
      await adminFetch(`/admin/promoters/${selectedPromoterId}/status`, {
        method: "PUT",
        body: JSON.stringify({
          status: "rejected",
          rejection_reason: rejectionReason.trim() || "Application not approved",
        }),
      });
      setSuccess("Promoter application rejected.");
      setRejectModalOpen(false);
      setSelectedPromoterId(null);
      setRejectionReason("");
      fetchData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to reject promoter");
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkPayoutPaid = async () => {
    if (!selectedPayoutId) return;
    setActionLoading(true);
    setError("");
    try {
      await adminFetch(`/admin/promoters/payouts/${selectedPayoutId}/status`, {
        method: "PUT",
        body: JSON.stringify({
          status: "paid",
          transaction_ref: transactionRef.trim() || "MANUAL_UPI_TRANSFER",
        }),
      });
      setSuccess("Payout marked as Paid successfully!");
      setPayModalOpen(false);
      setSelectedPayoutId(null);
      setTransactionRef("");
      fetchData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update payout request");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectPayout = async (payoutId: string) => {
    if (!confirm("Are you sure you want to reject this payout request? The amount will be refunded to the promoter's balance.")) {
      return;
    }
    setActionLoading(true);
    setError("");
    try {
      await adminFetch(`/admin/promoters/payouts/${payoutId}/status`, {
        method: "PUT",
        body: JSON.stringify({
          status: "rejected",
          admin_notes: "Rejected by admin",
        }),
      });
      setSuccess("Payout rejected and balance refunded to promoter.");
      fetchData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to reject payout");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">Brand Promoters & Payouts</h1>
          <p className="admin-page-subtitle">
            Review promoter applications, verify recruited drivers, and process promoter referral payouts.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="admin-btn-secondary"
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <RefreshCw size={14} className={loading ? "admin-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div style={{ padding: "12px 16px", backgroundColor: "#fee2e2", color: "#b91c1c", borderRadius: 8, marginBottom: 16, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div style={{ padding: "12px 16px", backgroundColor: "#dcfce7", color: "#15803d", borderRadius: 8, marginBottom: 16, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle2 size={16} /> {success}
        </div>
      )}

      {/* Navigation Tabs & Filter */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <button
            onClick={() => { setActiveTab("promoters"); setStatusFilter("all"); }}
            style={{
              padding: "10px 16px",
              borderBottom: activeTab === "promoters" ? "2px solid #4f46e5" : "2px solid transparent",
              fontWeight: 600,
              fontSize: 14,
              color: activeTab === "promoters" ? "#4f46e5" : "#6b7280",
              background: "none",
              cursor: "pointer",
            }}
          >
            Promoters List ({promoters.length})
          </button>
          <button
            onClick={() => { setActiveTab("payouts"); setStatusFilter("all"); }}
            style={{
              padding: "10px 16px",
              borderBottom: activeTab === "payouts" ? "2px solid #4f46e5" : "2px solid transparent",
              fontWeight: 600,
              fontSize: 14,
              color: activeTab === "payouts" ? "#4f46e5" : "#6b7280",
              background: "none",
              cursor: "pointer",
            }}
          >
            Payout Requests ({payouts.length})
          </button>
        </div>

        {/* Status Dropdown Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
            fontSize: 13,
            backgroundColor: "#fff",
          }}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          {activeTab === "promoters" ? (
            <>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </>
          ) : (
            <>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
            </>
          )}
        </select>
      </div>

      {/* TAB 1: Promoters Table */}
      {activeTab === "promoters" && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Promoter</th>
                <th>Status</th>
                <th>Recruits</th>
                <th>Total Earned</th>
                <th>Available Balance</th>
                <th>Joined</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 40 }}>
                    <Loader2 className="admin-spin" style={{ margin: "0 auto" }} />
                  </td>
                </tr>
              ) : promoters.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#6b7280" }}>
                    No promoters found.
                  </td>
                </tr>
              ) : (
                promoters.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "#111827" }}>{p.name || "Unnamed"}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "monospace" }}>{p.phone}</div>
                    </td>
                    <td>
                      {p.approval_status === "approved" && (
                        <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, backgroundColor: "#dcfce7", color: "#15803d" }}>
                          Approved
                        </span>
                      )}
                      {p.approval_status === "pending" && (
                        <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, backgroundColor: "#fef3c7", color: "#b45309" }}>
                          Pending
                        </span>
                      )}
                      {p.approval_status === "rejected" && (
                        <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, backgroundColor: "#fee2e2", color: "#b91c1c" }}>
                          Rejected
                        </span>
                      )}
                    </td>
                    <td style={{ fontWeight: 600 }}>{p.total_recruits || 0}</td>
                    <td style={{ color: "#059669", fontWeight: 600 }}>₹{((p.total_earnings || 0) / 100).toFixed(2)}</td>
                    <td style={{ fontWeight: 600 }}>₹{((p.available_balance || 0) / 100).toFixed(2)}</td>
                    <td style={{ fontSize: 12, color: "#6b7280" }}>{new Date(p.created_at).toLocaleDateString()}</td>
                    <td style={{ textAlign: "right" }}>
                      {p.approval_status === "pending" && (
                        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                          <button
                            onClick={() => handleApprovePromoter(p.id)}
                            disabled={actionLoading}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600,
                              backgroundColor: "#4f46e5",
                              color: "#fff",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => { setSelectedPromoterId(p.id); setRejectModalOpen(true); }}
                            disabled={actionLoading}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600,
                              backgroundColor: "#fee2e2",
                              color: "#b91c1c",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {p.approval_status === "approved" && (
                        <span style={{ fontSize: 12, color: "#059669" }}>Active</span>
                      )}
                      {p.approval_status === "rejected" && (
                        <button
                          onClick={() => handleApprovePromoter(p.id)}
                          disabled={actionLoading}
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            backgroundColor: "#f3f4f6",
                            color: "#374151",
                            border: "1px solid #d1d5db",
                            cursor: "pointer",
                          }}
                        >
                          Re-approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: Payout Requests Table */}
      {activeTab === "payouts" && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Promoter</th>
                <th>Amount</th>
                <th>Destination</th>
                <th>Date Requested</th>
                <th>Status</th>
                <th>Txn Ref</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 40 }}>
                    <Loader2 className="admin-spin" style={{ margin: "0 auto" }} />
                  </td>
                </tr>
              ) : payouts.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#6b7280" }}>
                    No payout requests found.
                  </td>
                </tr>
              ) : (
                payouts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "#111827" }}>{p.promoters?.name || "Promoter"}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "monospace" }}>{p.promoters?.phone}</div>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: 14 }}>₹{(p.amount / 100).toFixed(2)}</td>
                    <td>
                      {p.payout_method === "upi" ? (
                        <div style={{ fontFamily: "monospace", fontSize: 12, color: "#4f46e5" }}>
                          UPI: {p.upi_id}
                        </div>
                      ) : (
                        <div style={{ fontSize: 12 }}>
                          <div><strong>A/C:</strong> {p.bank_account_no}</div>
                          <div><strong>IFSC:</strong> {p.bank_ifsc}</div>
                          {p.bank_name && <div style={{ color: "#6b7280" }}>{p.bank_name}</div>}
                        </div>
                      )}
                    </td>
                    <td style={{ fontSize: 12, color: "#6b7280" }}>{new Date(p.requested_at).toLocaleDateString()}</td>
                    <td>
                      {p.status === "paid" && (
                        <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, backgroundColor: "#dcfce7", color: "#15803d" }}>
                          Paid
                        </span>
                      )}
                      {p.status === "pending" && (
                        <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, backgroundColor: "#fef3c7", color: "#b45309" }}>
                          Pending
                        </span>
                      )}
                      {p.status === "rejected" && (
                        <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, backgroundColor: "#fee2e2", color: "#b91c1c" }}>
                          Rejected
                        </span>
                      )}
                    </td>
                    <td style={{ fontSize: 12, fontFamily: "monospace", color: "#6b7280" }}>
                      {p.transaction_ref || "—"}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {p.status === "pending" && (
                        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                          <button
                            onClick={() => { setSelectedPayoutId(p.id); setPayModalOpen(true); }}
                            disabled={actionLoading}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600,
                              backgroundColor: "#059669",
                              color: "#fff",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => handleRejectPayout(p.id)}
                            disabled={actionLoading}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600,
                              backgroundColor: "#fee2e2",
                              color: "#b91c1c",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {p.status === "paid" && (
                        <span style={{ fontSize: 12, color: "#059669" }}>Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL: Reject Promoter */}
      {rejectModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}>
          <div style={{ backgroundColor: "#fff", borderRadius: 12, maxWidth: 400, width: "100%", padding: 24, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Reject Promoter Application</h3>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
              Provide a reason for rejecting this promoter application (visible to the promoter):
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Incomplete identification documents"
              rows={3}
              style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #d1d5db", fontSize: 13, marginBottom: 16 }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                onClick={() => setRejectModalOpen(false)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectPromoter}
                disabled={actionLoading}
                style={{ padding: "8px 16px", borderRadius: 8, backgroundColor: "#b91c1c", color: "#fff", border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Mark Payout Paid */}
      {payModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}>
          <div style={{ backgroundColor: "#fff", borderRadius: 12, maxWidth: 400, width: "100%", padding: 24, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Mark Payout as Paid</h3>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
              Enter the bank/UPI transaction UTR or reference number for record keeping:
            </p>
            <input
              type="text"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              placeholder="e.g. UTR49281940184"
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #d1d5db", fontSize: 13, marginBottom: 16 }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                onClick={() => setPayModalOpen(false)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkPayoutPaid}
                disabled={actionLoading}
                style={{ padding: "8px 16px", borderRadius: 8, backgroundColor: "#059669", color: "#fff", border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
              >
                Confirm & Mark Paid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
