"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import {
  Tag,
  Gift,
  Plus,
  Search,
  RefreshCw,
  Copy,
  Check,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Loader2,
  Coins,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

interface PromoCode {
  id: string;
  code: string;
  amount: number;
  max_redemptions: number | null;
  redemption_count: number;
  expires_at: string | null;
  is_active: boolean;
  description: string | null;
  created_at: string;
}

interface PromoStats {
  total_codes: number;
  active_codes: number;
  total_redemptions: number;
  total_value_distributed: number;
}

export default function AdminPromosPage() {
  const [loading, setLoading] = useState(true);
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [stats, setStats] = useState<PromoStats>({
    total_codes: 0,
    active_codes: 0,
    total_redemptions: 0,
    total_value_distributed: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal State for creating promo code
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formCode, setFormCode] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formMaxRedemptions, setFormMaxRedemptions] = useState("");
  const [formExpiresAt, setFormExpiresAt] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4500);
  };

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/admin/promos");
      setPromos(res.promos || []);
      if (res.stats) setStats(res.stats);
    } catch (err: any) {
      showNotification("error", err.message || "Failed to load promo codes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  // Generate random 6-character alphanumeric code
  const generateRandomCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // readable chars without 0/O/1/I
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormCode(result);
    setFormError("");
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = formCode.trim().toUpperCase();
    const parsedAmount = parseFloat(formAmount);

    if (!cleanCode) {
      setFormError("Please enter or generate a promo code.");
      return;
    }
    if (cleanCode.length < 3 || cleanCode.length > 12) {
      setFormError("Code must be between 3 and 12 characters (e.g. 6 letters/numbers).");
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError("Please enter a valid credit amount greater than ₹0.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      await adminFetch("/admin/promos", {
        method: "POST",
        body: JSON.stringify({
          code: cleanCode,
          amount: parsedAmount,
          max_redemptions: formMaxRedemptions ? parseInt(formMaxRedemptions) : null,
          expires_at: formExpiresAt ? new Date(formExpiresAt).toISOString() : null,
          description: formDescription.trim() || undefined,
          is_active: formIsActive,
        }),
      });

      showNotification("success", `Promo code "${cleanCode}" created successfully!`);
      setCreateModalOpen(false);
      resetForm();
      fetchPromos();
    } catch (err: any) {
      setFormError(err.message || "Failed to create promo code.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormCode("");
    setFormAmount("");
    setFormMaxRedemptions("");
    setFormExpiresAt("");
    setFormDescription("");
    setFormIsActive(true);
    setFormError("");
  };

  const handleToggleStatus = async (promo: PromoCode) => {
    try {
      await adminFetch(`/admin/promos/${promo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ is_active: !promo.is_active }),
      });
      showNotification("success", `Code "${promo.code}" is now ${!promo.is_active ? "Active" : "Inactive"}.`);
      fetchPromos();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to update status.");
    }
  };

  const handleDelete = async (promo: PromoCode) => {
    if (!confirm(`Are you sure you want to delete promo code "${promo.code}"?`)) return;

    try {
      await adminFetch(`/admin/promos/${promo.id}`, {
        method: "DELETE",
      });
      showNotification("success", `Promo code "${promo.code}" deleted.`);
      fetchPromos();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete promo code.");
    }
  };

  const filteredPromos = promos.filter((p) => {
    const matchesSearch =
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (statusFilter === "active") return p.is_active;
    if (statusFilter === "inactive") return !p.is_active;
    return true;
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 60 }}>
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            backgroundColor: notification.type === "success" ? "#064E3B" : "#7F1D1D",
            color: "#FFFFFF",
            padding: "14px 20px",
            borderRadius: 12,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {notification.type === "success" ? <Check size={18} /> : <Trash2 size={18} />}
          {notification.text}
        </div>
      )}

      {/* Page Title & Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: 10 }}>
            <Tag size={26} color="#4338CA" /> Driver Promo Codes & Vouchers
          </h1>
          <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
            Create 6-character vouchers to credit usable recharge balance to driver partner wallets.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            generateRandomCode();
            setCreateModalOpen(true);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#4338CA",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 10,
            padding: "10px 18px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(67, 56, 202, 0.25)",
            transition: "all 0.2s",
          }}
        >
          <Plus size={18} /> Create Promo Code
        </button>
      </div>

      {/* Metrics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div style={{ backgroundColor: "#FFFFFF", padding: "18px 20px", borderRadius: 14, border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#64748B", textTransform: "uppercase" }}>Total Promo Codes</span>
            <Layers size={18} color="#6366F1" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#0F172A" }}>{stats.total_codes}</div>
          <span style={{ fontSize: 12, color: "#10B981", fontWeight: 500 }}>{stats.active_codes} currently active</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", padding: "18px 20px", borderRadius: 14, border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#64748B", textTransform: "uppercase" }}>Active Vouchers</span>
            <Sparkles size={18} color="#10B981" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#10B981" }}>{stats.active_codes}</div>
          <span style={{ fontSize: 12, color: "#64748B" }}>Ready for driver redemption</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", padding: "18px 20px", borderRadius: 14, border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#64748B", textTransform: "uppercase" }}>Total Redemptions</span>
            <TrendingUp size={18} color="#F59E0B" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#0F172A" }}>{stats.total_redemptions}</div>
          <span style={{ fontSize: 12, color: "#64748B" }}>Driver claims logged</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", padding: "18px 20px", borderRadius: 14, border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#64748B", textTransform: "uppercase" }}>Credits Distributed</span>
            <Coins size={18} color="#4338CA" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#4338CA" }}>₹{stats.total_value_distributed.toFixed(0)}</div>
          <span style={{ fontSize: 12, color: "#64748B" }}>Total usable wallet value</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "14px 18px",
          borderRadius: 14,
          border: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 260 }}>
          <Search size={18} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search promo code or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: 14,
              color: "#0F172A",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #CBD5E1",
              fontSize: 13,
              color: "#334155",
              outline: "none",
              backgroundColor: "#F8FAFC",
            }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>

          <button
            onClick={fetchPromos}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid #E2E8F0",
              backgroundColor: "#FFFFFF",
              color: "#475569",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <RefreshCw size={14} className={loading ? "admin-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      {/* Promos Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 60, textAlign: "center", color: "#64748B" }}>
            <Loader2 size={24} className="admin-spin" style={{ margin: "0 auto 12px" }} />
            Loading promo codes...
          </div>
        ) : filteredPromos.length === 0 ? (
          <div style={{ padding: 60, textAlign: "center", color: "#64748B" }}>
            <Gift size={32} color="#94A3B8" style={{ margin: "0 auto 12px" }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: "#334155", margin: "0 0 4px" }}>No promo codes found</p>
            <p style={{ fontSize: 13, margin: 0 }}>Create a new promo code using the button above.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Promo Code</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Balance Value</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Redemptions</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Expires</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Status</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPromos.map((promo) => {
                  const isExpired = promo.expires_at && new Date(promo.expires_at) < new Date();
                  const isLimitReached = promo.max_redemptions && promo.redemption_count >= promo.max_redemptions;

                  return (
                    <tr key={promo.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      {/* Code */}
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontWeight: 700,
                              fontSize: 15,
                              letterSpacing: 1,
                              backgroundColor: "#EEF2FF",
                              color: "#4338CA",
                              padding: "4px 8px",
                              borderRadius: 6,
                              border: "1px solid #C7D2FE",
                            }}
                          >
                            {promo.code}
                          </span>
                          <button
                            onClick={() => handleCopy(promo.code)}
                            title="Copy code"
                            style={{
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              color: copiedCode === promo.code ? "#10B981" : "#94A3B8",
                              padding: 4,
                            }}
                          >
                            {copiedCode === promo.code ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                        {promo.description && (
                          <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{promo.description}</div>
                        )}
                      </td>

                      {/* Value */}
                      <td style={{ padding: "14px 18px" }}>
                        <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>
                          ₹{Number(promo.amount).toFixed(2)}
                        </span>
                        <div style={{ fontSize: 11, color: "#64748B" }}>usable credit</div>
                      </td>

                      {/* Redemptions */}
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ fontWeight: 600, color: "#334155" }}>
                          {promo.redemption_count} {promo.max_redemptions ? `/ ${promo.max_redemptions}` : "(Unlimited)"}
                        </div>
                        {promo.max_redemptions && (
                          <div style={{ width: 100, height: 4, backgroundColor: "#E2E8F0", borderRadius: 2, marginTop: 4, overflow: "hidden" }}>
                            <div
                              style={{
                                width: `${Math.min(100, (promo.redemption_count / promo.max_redemptions) * 100)}%`,
                                height: "100%",
                                backgroundColor: isLimitReached ? "#EF4444" : "#4338CA",
                              }}
                            />
                          </div>
                        )}
                      </td>

                      {/* Expiry */}
                      <td style={{ padding: "14px 18px", color: isExpired ? "#EF4444" : "#475569" }}>
                        {promo.expires_at ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Calendar size={14} />
                            <span>{new Date(promo.expires_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>
                        ) : (
                          <span style={{ color: "#94A3B8" }}>Never expires</span>
                        )}
                      </td>

                      {/* Status */}
                      <td style={{ padding: "14px 18px" }}>
                        {isExpired ? (
                          <span style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                            Expired
                          </span>
                        ) : isLimitReached ? (
                          <span style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                            Limit Reached
                          </span>
                        ) : promo.is_active ? (
                          <span style={{ backgroundColor: "#DCFCE7", color: "#15803D", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                            Active
                          </span>
                        ) : (
                          <span style={{ backgroundColor: "#F1F5F9", color: "#64748B", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "14px 18px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
                          <button
                            onClick={() => handleToggleStatus(promo)}
                            title={promo.is_active ? "Deactivate" : "Activate"}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: promo.is_active ? "#10B981" : "#94A3B8",
                              padding: 4,
                            }}
                          >
                            {promo.is_active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                          </button>
                          <button
                            onClick={() => handleDelete(promo)}
                            title="Delete"
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#EF4444",
                              padding: 4,
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Promo Modal */}
      {createModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              width: "100%",
              maxWidth: 500,
              padding: 28,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Gift size={20} color="#4338CA" />
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#0F172A" }}>Create Driver Promo Code</h2>
                  <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>Adds usable balance directly to driver wallet</p>
                </div>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: 20, color: "#94A3B8", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePromo}>
              {formError && (
                <div style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
                  {formError}
                </div>
              )}

              {/* Code Input with Randomizer */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Promo Code (e.g. 6-Character)
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                    placeholder="e.g. RIK100"
                    maxLength={12}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #CBD5E1",
                      fontSize: 15,
                      fontWeight: 700,
                      letterSpacing: 1,
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={generateRandomCode}
                    style={{
                      padding: "10px 14px",
                      backgroundColor: "#F1F5F9",
                      border: "1px solid #CBD5E1",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#475569",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Sparkles size={14} color="#4338CA" /> 6-Char
                  </button>
                </div>
              </div>

              {/* Amount (₹) */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Usable Balance Credit Amount (₹)
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: 11, fontWeight: 700, color: "#475569" }}>₹</span>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    placeholder="e.g. 50"
                    required
                    style={{
                      width: "100%",
                      padding: "10px 14px 10px 32px",
                      borderRadius: 10,
                      border: "1px solid #CBD5E1",
                      fontSize: 15,
                      fontWeight: 600,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Max Redemptions & Expiry */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Max Claims (Optional)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formMaxRedemptions}
                    onChange={(e) => setFormMaxRedemptions(e.target.value)}
                    placeholder="Unlimited"
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 10,
                      border: "1px solid #CBD5E1",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formExpiresAt}
                    onChange={(e) => setFormExpiresAt(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: "1px solid #CBD5E1",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Campaign Note / Description (Optional)
                </label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="e.g. Festival driver appreciation credit"
                  maxLength={100}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 10,
                    border: "1px solid #CBD5E1",
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    border: "1px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "10px 22px",
                    borderRadius: 10,
                    border: "none",
                    backgroundColor: "#4338CA",
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {submitting && <Loader2 size={16} className="admin-spin" />}
                  Create Promo Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
