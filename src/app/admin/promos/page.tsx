"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { adminSupabase } from "@/lib/supabaseAdminClient";
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
  Clock,
  ShieldCheck,
} from "lucide-react";

interface PromoCode {
  id: string;
  code: string;
  type?: "credit" | "free_pass";
  amount: number;
  duration_days?: number | null;
  plan_name?: string | null;
  max_redemptions: number | null;
  redemption_count: number;
  expires_at: string | null;
  is_active: boolean;
  is_deleted?: boolean;
  deleted_at?: string | null;
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
  const [typeFilter, setTypeFilter] = useState<"all" | "credit" | "free_pass">("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal State for deleting / archiving promo code
  const [promoToDelete, setPromoToDelete] = useState<PromoCode | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Modal State for creating promo code (strictly max 6 chars)
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formType, setFormType] = useState<"credit" | "free_pass">("credit");
  const [formCode, setFormCode] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formDurationDays, setFormDurationDays] = useState("7");
  const [formPlanName, setFormPlanName] = useState("");
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

  const calculateStats = (promoList: PromoCode[]) => {
    const totalCodes = promoList.length;
    const activeCodes = promoList.filter((p) => p.is_active).length;
    const totalRedemptions = promoList.reduce((sum, p) => sum + (p.redemption_count || 0), 0);
    const totalValueDistributed = promoList.reduce(
      (sum, p) => sum + (p.redemption_count || 0) * Number(p.amount || 0),
      0
    );
    return {
      total_codes: totalCodes,
      active_codes: activeCodes,
      total_redemptions: totalRedemptions,
      total_value_distributed: totalValueDistributed,
    };
  };

  const fetchPromos = async () => {
    setLoading(true);
    try {
      // Direct Supabase Query (filtering out deleted codes)
      const { data: supaPromos, error: supaErr } = await adminSupabase
        .from("driver_promo_codes")
        .select("*")
        .or("is_deleted.is.null,is_deleted.eq.false")
        .order("created_at", { ascending: false });

      if (supaErr) {
        throw supaErr;
      }

      const list = supaPromos || [];
      setPromos(list);
      setStats(calculateStats(list));
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
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
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
    const cleanCode = formCode.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 6);

    if (!cleanCode) {
      setFormError("Please enter or generate a 6-character promo code.");
      return;
    }
    if (cleanCode.length < 3 || cleanCode.length > 6) {
      setFormError("Promo code must be between 3 and 6 characters (e.g. 6 letters/numbers).");
      return;
    }

    let payloadAmount = 0;
    let payloadDays: number | null = null;
    let payloadPlanName: string | null = null;

    if (formType === "credit") {
      const parsedAmount = parseFloat(formAmount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setFormError("Please enter a valid credit amount greater than ₹0.");
        return;
      }
      payloadAmount = parsedAmount;
    } else {
      const parsedDays = parseInt(formDurationDays);
      if (isNaN(parsedDays) || parsedDays <= 0) {
        setFormError("Please enter valid duration in days (at least 1 day).");
        return;
      }
      payloadDays = parsedDays;
      payloadPlanName = formPlanName.trim() || `Free ${parsedDays}-Day Access Pass`;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const { data: { user } } = await adminSupabase.auth.getUser();

      // Check if active code already exists in db
      const { data: existing } = await adminSupabase
        .from("driver_promo_codes")
        .select("id, is_deleted")
        .eq("code", cleanCode)
        .maybeSingle();

      if (existing && !existing.is_deleted) {
        throw new Error(`Promo code "${cleanCode}" already exists. Please choose a different code.`);
      }

      if (existing && existing.is_deleted) {
        const { error: updateErr } = await adminSupabase
          .from("driver_promo_codes")
          .update({
            type: formType,
            amount: payloadAmount,
            duration_days: payloadDays,
            plan_name: payloadPlanName,
            max_redemptions: formMaxRedemptions ? parseInt(formMaxRedemptions) : null,
            expires_at: formExpiresAt ? new Date(formExpiresAt).toISOString() : null,
            description: formDescription.trim() || null,
            is_active: formIsActive,
            is_deleted: false,
            deleted_at: null,
            created_by: user?.id || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (updateErr) throw updateErr;
      } else {
        const { error: insertErr } = await adminSupabase
          .from("driver_promo_codes")
          .insert({
            code: cleanCode,
            type: formType,
            amount: payloadAmount,
            duration_days: payloadDays,
            plan_name: payloadPlanName,
            max_redemptions: formMaxRedemptions ? parseInt(formMaxRedemptions) : null,
            expires_at: formExpiresAt ? new Date(formExpiresAt).toISOString() : null,
            description: formDescription.trim() || null,
            is_active: formIsActive,
            is_deleted: false,
            created_by: user?.id || null,
          });

        if (insertErr) throw insertErr;
      }

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
    setFormType("credit");
    setFormCode("");
    setFormAmount("");
    setFormDurationDays("7");
    setFormPlanName("");
    setFormMaxRedemptions("");
    setFormExpiresAt("");
    setFormDescription("");
    setFormIsActive(true);
    setFormError("");
  };

  const handleToggleStatus = async (promo: PromoCode) => {
    try {
      const { error } = await adminSupabase
        .from("driver_promo_codes")
        .update({ is_active: !promo.is_active, updated_at: new Date().toISOString() })
        .eq("id", promo.id);

      if (error) throw error;
      showNotification("success", `Code "${promo.code}" is now ${!promo.is_active ? "Active" : "Inactive"}.`);
      fetchPromos();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to update status.");
    }
  };

  const handleDeleteClick = (promo: PromoCode) => {
    setPromoToDelete(promo);
  };

  const confirmDeletePromo = async () => {
    if (!promoToDelete) return;
    setDeleting(true);

    try {
      const { error } = await adminSupabase
        .from("driver_promo_codes")
        .update({
          is_active: false,
          is_deleted: true,
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", promoToDelete.id);

      if (error) throw error;
      showNotification("success", `Promo code "${promoToDelete.code}" deleted. New claims are now blocked.`);
      setPromoToDelete(null);
      fetchPromos();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete promo code.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredPromos = promos.filter((p) => {
    const matchesSearch =
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.plan_name && p.plan_name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (statusFilter === "active" && !p.is_active) return false;
    if (statusFilter === "inactive" && p.is_active) return false;
    if (typeFilter === "credit" && p.type === "free_pass") return false;
    if (typeFilter === "free_pass" && p.type !== "free_pass") return false;
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
            Issue 6-character wallet credit vouchers or grant unlimited free platform access passes (X days) to drivers.
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
            padding: "10px 18px",
            borderRadius: 12,
            border: "none",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(67, 56, 202, 0.25)",
          }}
        >
          <Plus size={18} /> Create Promo Code
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div style={{ backgroundColor: "#FFFFFF", padding: 20, borderRadius: 16, border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748B", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            <span>Active Codes</span>
            <Tag size={18} color="#4338CA" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A" }}>
            {stats.active_codes} <span style={{ fontSize: 14, fontWeight: 500, color: "#94A3B8" }}>/ {stats.total_codes} total</span>
          </div>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", padding: 20, borderRadius: 16, border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748B", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            <span>Total Claims</span>
            <Sparkles size={18} color="#059669" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A" }}>
            {stats.total_redemptions}
          </div>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", padding: 20, borderRadius: 16, border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748B", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            <span>Credit Value Issued</span>
            <Coins size={18} color="#D97706" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#059669" }}>
            ₹{stats.total_value_distributed.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, border: "1px solid #E2E8F0", padding: "16px 20px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 260 }}>
          <Search size={18} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search code or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: 14, width: "100%", color: "#0F172A" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #CBD5E1",
              fontSize: 13,
              color: "#334155",
              fontWeight: 500,
              outline: "none",
              backgroundColor: "#F8FAFC",
            }}
          >
            <option value="all">All Promo Types</option>
            <option value="credit">Wallet Credit (₹)</option>
            <option value="free_pass">Free Pass (Days)</option>
          </select>

          {/* Status Filter */}
          <div style={{ display: "flex", backgroundColor: "#F1F5F9", borderRadius: 10, padding: 3 }}>
            {(["all", "active", "inactive"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  backgroundColor: statusFilter === s ? "#FFFFFF" : "transparent",
                  color: statusFilter === s ? "#4338CA" : "#64748B",
                  boxShadow: statusFilter === s ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                  textTransform: "capitalize",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={fetchPromos}
            title="Refresh"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 10,
              border: "1px solid #CBD5E1",
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
              color: "#64748B",
            }}
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Promo Codes Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#64748B" }}>
            <Loader2 className="animate-spin" size={28} style={{ margin: "0 auto 10px auto", color: "#4338CA" }} />
            Loading promo codes...
          </div>
        ) : filteredPromos.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center" }}>
            <Tag size={40} color="#CBD5E1" style={{ margin: "0 auto 12px auto" }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#334155", margin: "0 0 6px 0" }}>No promo codes found</h3>
            <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Create a new promo code voucher for drivers.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Code & Description</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Promo Type & Benefit</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Redemptions</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Expires At</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Status</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPromos.map((promo) => {
                  const isExpired = promo.expires_at && new Date(promo.expires_at) < new Date();
                  const isLimitReached = promo.max_redemptions && promo.redemption_count >= promo.max_redemptions;
                  const isFreePass = promo.type === "free_pass";

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
                              backgroundColor: isFreePass ? "#EEF2FF" : "#ECFDF5",
                              color: isFreePass ? "#4338CA" : "#065F46",
                              padding: "4px 8px",
                              borderRadius: 6,
                              border: isFreePass ? "1px solid #C7D2FE" : "1px solid #A7F3D0",
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

                      {/* Benefit */}
                      <td style={{ padding: "14px 18px" }}>
                        {isFreePass ? (
                          <div>
                            <span style={{ backgroundColor: "#EEF2FF", color: "#4338CA", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <Clock size={13} /> {promo.duration_days || 7} Days Free Pass
                            </span>
                            <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{promo.plan_name || "Unlimited Driving Access"}</div>
                          </div>
                        ) : (
                          <div>
                            <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>
                              ₹{Number(promo.amount).toFixed(2)}
                            </span>
                            <div style={{ fontSize: 11, color: "#64748B" }}>Wallet Credit Voucher</div>
                          </div>
                        )}
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
                            onClick={() => handleDeleteClick(promo)}
                            title="Delete / Discontinue Promo"
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

      {/* Create Promo Modal (Strictly 6-Character Max Code) */}
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
              maxWidth: 520,
              padding: 28,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Gift size={20} color="#4338CA" />
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#0F172A" }}>Create Driver Promo Code</h2>
                  <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>Configure wallet credits or unlimited drive passes</p>
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

              {/* Promo Type Selector (Credit vs Free Pass) */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 8 }}>
                  Promo Reward Type
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setFormType("credit")}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 12,
                      border: formType === "credit" ? "2px solid #4338CA" : "1px solid #CBD5E1",
                      backgroundColor: formType === "credit" ? "#EEF2FF" : "#FFFFFF",
                      color: formType === "credit" ? "#4338CA" : "#64748B",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      cursor: "pointer",
                    }}
                  >
                    <Coins size={18} />
                    <span>Wallet Credit (₹)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormType("free_pass")}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 12,
                      border: formType === "free_pass" ? "2px solid #4338CA" : "1px solid #CBD5E1",
                      backgroundColor: formType === "free_pass" ? "#EEF2FF" : "#FFFFFF",
                      color: formType === "free_pass" ? "#4338CA" : "#64748B",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      cursor: "pointer",
                    }}
                  >
                    <ShieldCheck size={18} />
                    <span>Free Pass (Days)</span>
                  </button>
                </div>
              </div>

              {/* Code Input with Strict 6-Character Limit and Randomizer */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
                    Promo Code (Max 6 Characters)
                  </label>
                  <span style={{ fontSize: 11, fontWeight: 600, color: formCode.length === 6 ? "#4338CA" : "#94A3B8" }}>
                    {formCode.length} / 6
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={formCode}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 6);
                      setFormCode(val);
                      if (formError) setFormError("");
                    }}
                    placeholder={formType === "credit" ? "RIK100" : "RIDE06"}
                    maxLength={6}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #CBD5E1",
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: 2,
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

              {/* Dynamic Inputs based on Type */}
              {formType === "credit" ? (
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
                  <p style={{ fontSize: 11, color: "#64748B", margin: "4px 0 0 0" }}>
                    Driver can apply this credit at checkout towards any recharge plan.
                  </p>
                </div>
              ) : (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                        Duration (Days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={formDurationDays}
                        onChange={(e) => setFormDurationDays(e.target.value)}
                        placeholder="7"
                        required
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "1px solid #CBD5E1",
                          fontSize: 15,
                          fontWeight: 600,
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                        Plan Title (Optional)
                      </label>
                      <input
                        type="text"
                        value={formPlanName}
                        onChange={(e) => setFormPlanName(e.target.value)}
                        placeholder={`Free ${formDurationDays || 7}-Day Pass`}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "1px solid #CBD5E1",
                          fontSize: 13,
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: "#64748B", margin: "4px 0 0 0" }}>
                    Automatically activates or stacks {formDurationDays || 7} days of unlimited driving access upon claim.
                  </p>
                </div>
              )}

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
                  placeholder="e.g. Diwali Partner Reward Campaign"
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
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: 10,
                    border: "1px solid #CBD5E1",
                    backgroundColor: "#FFFFFF",
                    color: "#475569",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    flex: 2,
                    padding: "12px",
                    borderRadius: 10,
                    border: "none",
                    backgroundColor: "#4338CA",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: submitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 4px 12px rgba(67, 56, 202, 0.2)",
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Creating...
                    </>
                  ) : (
                    "Create Promo Code"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Promo Confirmation Modal */}
      {promoToDelete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
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
              maxWidth: 480,
              padding: 28,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid #F1F5F9",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: "#FEE2E2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Trash2 size={24} color="#DC2626" />
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#0F172A" }}>
                  Delete Promo Code?
                </h2>
                <div style={{ display: "inline-block", backgroundColor: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA", padding: "2px 8px", borderRadius: 6, fontSize: 13, fontWeight: 700, marginTop: 4, letterSpacing: 0.5 }}>
                  {promoToDelete.code}
                </div>
              </div>
            </div>

            {/* Explanation box detailing the exact business rules */}
            <div
              style={{
                backgroundColor: "#F8FAFC",
                borderRadius: 12,
                padding: "14px 16px",
                border: "1px solid #E2E8F0",
                fontSize: 13,
                color: "#334155",
                lineHeight: "1.5",
                marginBottom: 20,
              }}
            >
              <div style={{ fontWeight: 600, color: "#0F172A", marginBottom: 6 }}>
                What happens when this code is deleted:
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#475569" }}>
                <li style={{ marginBottom: 6 }}>
                  <strong>New claims blocked:</strong> No driver will be able to claim or redeem <code>{promoToDelete.code}</code>.
                </li>
                <li style={{ marginBottom: 6 }}>
                  <strong>Active drivers protected:</strong> Any driver who has <em>already claimed</em> this promo will keep their active drive pass or usable balance until it naturally expires.
                </li>
                <li>
                  <strong>No re-use:</strong> Once a driver&apos;s existing claimed pass or balance finishes, they cannot use or claim this code again.
                </li>
              </ul>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                type="button"
                disabled={deleting}
                onClick={() => setPromoToDelete(null)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                  color: "#475569",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: deleting ? "not-allowed" : "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={confirmDeletePromo}
                style={{
                  flex: 1.5,
                  padding: "12px",
                  borderRadius: 10,
                  border: "none",
                  backgroundColor: "#DC2626",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: deleting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)",
                }}
              >
                {deleting ? (
                  <>
                    <Loader2 className="animate-spin" size={16} /> Deleting...
                  </>
                ) : (
                  "Yes, Delete Promo"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
