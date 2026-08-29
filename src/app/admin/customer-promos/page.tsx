"use client";

import { useEffect, useState } from "react";
import { adminSupabase } from "@/lib/supabaseAdminClient";
import { adminFetch } from "@/lib/adminApi";
import {
  Coins,
  Gift,
  Plus,
  Search,
  RefreshCw,
  Copy,
  Check,
  Trash2,
  Calendar,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Loader2,
  TrendingUp,
  ShieldCheck,
  Award,
} from "lucide-react";

interface CustomerPromoCode {
  id: string;
  code: string;
  coins_amount: number;
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
  total_coins_distributed: number;
}

export default function AdminCustomerPromosPage() {
  const [loading, setLoading] = useState(true);
  const [promos, setPromos] = useState<CustomerPromoCode[]>([]);
  const [stats, setStats] = useState<PromoStats>({
    total_codes: 0,
    active_codes: 0,
    total_redemptions: 0,
    total_coins_distributed: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal State for deleting promo code
  const [promoToDelete, setPromoToDelete] = useState<CustomerPromoCode | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Modal State for creating customer promo code (strictly 6 chars)
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formCode, setFormCode] = useState("");
  const [formCoinsAmount, setFormCoinsAmount] = useState("50");
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

  const calculateStats = (promoList: CustomerPromoCode[]) => {
    const nonDeleted = promoList.filter((p) => !p.is_deleted);
    const totalCodes = nonDeleted.length;
    const activeCodes = nonDeleted.filter((p) => p.is_active).length;
    const totalRedemptions = nonDeleted.reduce((sum, p) => sum + (p.redemption_count || 0), 0);
    const totalCoinsDistributed = nonDeleted.reduce(
      (sum, p) => sum + (p.redemption_count || 0) * Number(p.coins_amount || 0),
      0
    );
    return {
      total_codes: totalCodes,
      active_codes: activeCodes,
      total_redemptions: totalRedemptions,
      total_coins_distributed: totalCoinsDistributed,
    };
  };

  const fetchPromos = async () => {
    setLoading(true);
    try {
      // 1. Try Supabase direct query
      const { data: supaData, error: supaErr } = await adminSupabase
        .from("customer_coin_promo_codes")
        .select("*")
        .or("is_deleted.is.null,is_deleted.eq.false")
        .order("created_at", { ascending: false });

      if (!supaErr && supaData) {
        setPromos(supaData);
        setStats(calculateStats(supaData));
        return;
      }

      // 2. Fallback to adminFetch API endpoint
      const res = await adminFetch("/admin/customer-promos");
      if (res && res.promos) {
        setPromos(res.promos);
        setStats(res.stats || calculateStats(res.promos));
      }
    } catch (err: any) {
      console.warn("Using fallback/cache for customer promo codes:", err);
      // If table is newly created or empty, default to empty list without crashing UI
      setPromos([]);
      setStats({ total_codes: 0, active_codes: 0, total_redemptions: 0, total_coins_distributed: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const generateRandom6CharPromo = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormCode(result);
    setFormError("");
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = formCode.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);

    if (!cleanCode) {
      setFormError("Please enter a 6-character promo code.");
      return;
    }
    if (cleanCode.length !== 6) {
      setFormError("Customer promo code must be STRICTLY 6 characters (e.g. COIN50, RIKSHO).");
      return;
    }

    const parsedCoins = parseInt(formCoinsAmount, 10);
    if (isNaN(parsedCoins) || parsedCoins <= 0) {
      setFormError("Please enter valid coins amount greater than 0.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const { data: { user } } = await adminSupabase.auth.getUser();

      const payload = {
        code: cleanCode,
        coins_amount: parsedCoins,
        max_redemptions: formMaxRedemptions ? parseInt(formMaxRedemptions, 10) : null,
        expires_at: formExpiresAt ? new Date(formExpiresAt).toISOString() : null,
        description: formDescription.trim() || null,
        is_active: formIsActive,
        is_deleted: false,
        created_by: user?.id || null,
        updated_at: new Date().toISOString(),
      };

      // Check if code already exists
      const { data: existing } = await adminSupabase
        .from("customer_coin_promo_codes")
        .select("id, is_deleted")
        .eq("code", cleanCode)
        .maybeSingle();

      if (existing && !existing.is_deleted) {
        throw new Error(`Promo code "${cleanCode}" already exists. Please choose a different code.`);
      }

      if (existing && existing.is_deleted) {
        const { error: updateErr } = await adminSupabase
          .from("customer_coin_promo_codes")
          .update({ ...payload, deleted_at: null })
          .eq("id", existing.id);

        if (updateErr) throw updateErr;
      } else {
        const { error: insertErr } = await adminSupabase
          .from("customer_coin_promo_codes")
          .insert(payload);

        if (insertErr) {
          // If direct insert failed, try adminFetch
          await adminFetch("/admin/customer-promos", {
            method: "POST",
            body: JSON.stringify(payload),
          });
        }
      }

      showNotification("success", `Customer Promo code "${cleanCode}" created successfully!`);
      setCreateModalOpen(false);
      resetForm();
      fetchPromos();
    } catch (err: any) {
      setFormError(err.message || "Failed to create customer promo code.");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePromoStatus = async (promo: CustomerPromoCode) => {
    try {
      const nextActive = !promo.is_active;
      const { error } = await adminSupabase
        .from("customer_coin_promo_codes")
        .update({ is_active: nextActive, updated_at: new Date().toISOString() })
        .eq("id", promo.id);

      if (error) {
        await adminFetch(`/admin/customer-promos/${promo.id}`, {
          method: "PATCH",
          body: JSON.stringify({ is_active: nextActive }),
        });
      }

      setPromos((prev) =>
        prev.map((p) => (p.id === promo.id ? { ...p, is_active: nextActive } : p))
      );
      setStats((prev) => ({
        ...prev,
        active_codes: nextActive ? prev.active_codes + 1 : prev.active_codes - 1,
      }));

      showNotification(
        "success",
        `Code "${promo.code}" is now ${nextActive ? "Active" : "Inactive"}.`
      );
    } catch (err: any) {
      console.error("Failed to toggle promo status:", err);
      showNotification("error", "Failed to update promo status.");
    }
  };

  const handleDeletePromo = async () => {
    if (!promoToDelete) return;
    setDeleting(true);
    try {
      const { error } = await adminSupabase
        .from("customer_coin_promo_codes")
        .update({
          is_active: false,
          is_deleted: true,
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", promoToDelete.id);

      if (error) {
        await adminFetch(`/admin/customer-promos/${promoToDelete.id}`, {
          method: "DELETE",
        });
      }

      setPromos((prev) =>
        prev.map((p) => (p.id === promoToDelete.id ? { ...p, is_deleted: true, is_active: false } : p))
      );
      setStats((prev) => ({
        ...prev,
        total_codes: Math.max(0, prev.total_codes - 1),
        active_codes: promoToDelete.is_active ? Math.max(0, prev.active_codes - 1) : prev.active_codes,
      }));

      showNotification("success", `Promo code "${promoToDelete.code}" deleted successfully.`);
      setPromoToDelete(null);
      fetchPromos();
    } catch (err: any) {
      console.error("Failed to delete promo code:", err);
      showNotification("error", "Failed to delete promo code.");
    } finally {
      setDeleting(false);
    }
  };

  const resetForm = () => {
    setFormCode("");
    setFormCoinsAmount("50");
    setFormMaxRedemptions("");
    setFormExpiresAt("");
    setFormDescription("");
    setFormIsActive(true);
    setFormError("");
  };

  // Filter promos
  const filteredPromos = promos.filter((p) => {
    if (p.is_deleted) return false;
    const matchesSearch =
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && p.is_active) ||
      (statusFilter === "inactive" && !p.is_active);

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px" }}>
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            backgroundColor: notification.type === "success" ? "#065F46" : "#991B1B",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <Sparkles size={16} />
          <span>{notification.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#0F172A",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Coins size={28} color="#4338CA" />
            Customer Promo Codes (Riksho Coins)
          </h1>
          <p style={{ fontSize: 14, color: "#64748B", margin: "6px 0 0 0" }}>
            Issue strictly 6-character promotional codes for customers to receive Riksho Coins for ride discounts.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            generateRandom6CharPromo();
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
          <Plus size={18} /> Create Customer Promo
        </button>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Total Codes */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: 20,
            borderRadius: 16,
            border: "1px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#64748B",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            <span>Total Promos</span>
            <Coins size={18} color="#4338CA" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A" }}>
            {stats.total_codes}
          </div>
        </div>

        {/* Active Codes */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: 20,
            borderRadius: 16,
            border: "1px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#64748B",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            <span>Active Codes</span>
            <ShieldCheck size={18} color="#059669" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#059669" }}>
            {stats.active_codes}{" "}
            <span style={{ fontSize: 14, fontWeight: 500, color: "#94A3B8" }}>
              / {stats.total_codes} total
            </span>
          </div>
        </div>

        {/* Total Claims */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: 20,
            borderRadius: 16,
            border: "1px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#64748B",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            <span>Total Redemptions</span>
            <TrendingUp size={18} color="#2563EB" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A" }}>
            {stats.total_redemptions}
          </div>
        </div>

        {/* Total Coins Issued */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: 20,
            borderRadius: 16,
            border: "1px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#64748B",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            <span>Total Coins Distributed</span>
            <Gift size={18} color="#D97706" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#4338CA" }}>
            {stats.total_coins_distributed}{" "}
            <span style={{ fontSize: 13, fontWeight: 500, color: "#64748B" }}>
              Coins (₹{(stats.total_coins_distributed / 10).toFixed(0)})
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          border: "1px solid #E2E8F0",
          padding: "16px 20px",
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 260 }}>
          <Search size={18} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search by 6-char code or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: 14, width: "100%", color: "#0F172A" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Customer Promo Codes Table */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#64748B" }}>
            <Loader2 className="animate-spin" size={28} style={{ margin: "0 auto 10px auto", color: "#4338CA" }} />
            Loading customer promo codes...
          </div>
        ) : filteredPromos.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center" }}>
            <Coins size={40} color="#CBD5E1" style={{ margin: "0 auto 12px auto" }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#334155", margin: "0 0 6px 0" }}>
              No customer promo codes found
            </h3>
            <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
              Create a 6-character coin promo code for customers.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Code & Description</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Coins Reward</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Redemptions</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Expires At</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>Status</th>
                  <th style={{ padding: "14px 18px", fontWeight: 600, color: "#475569", textAlign: "right" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPromos.map((promo) => {
                  const isExpired = promo.expires_at && new Date(promo.expires_at) < new Date();
                  const isLimitReached =
                    promo.max_redemptions !== null &&
                    promo.redemption_count >= promo.max_redemptions;

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
                              letterSpacing: 2,
                              backgroundColor: "#EEF2FF",
                              color: "#4338CA",
                              padding: "4px 10px",
                              borderRadius: 6,
                              border: "1px solid #C7D2FE",
                            }}
                          >
                            {promo.code}
                          </span>
                          <button
                            onClick={() => copyToClipboard(promo.code)}
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
                          <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                            {promo.description}
                          </div>
                        )}
                      </td>

                      {/* Coins Benefit */}
                      <td style={{ padding: "14px 18px" }}>
                        <div>
                          <span style={{ fontWeight: 700, color: "#4338CA", fontSize: 15 }}>
                            +{promo.coins_amount} Coins
                          </span>
                          <div style={{ fontSize: 11, color: "#64748B" }}>
                            ₹{(promo.coins_amount / 10).toFixed(0)} checkout discount
                          </div>
                        </div>
                      </td>

                      {/* Redemptions */}
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ fontWeight: 600, color: "#334155" }}>
                          {promo.redemption_count}{" "}
                          {promo.max_redemptions ? `/ ${promo.max_redemptions}` : "(Unlimited)"}
                        </div>
                        {promo.max_redemptions && (
                          <div
                            style={{
                              width: 100,
                              height: 4,
                              backgroundColor: "#E2E8F0",
                              borderRadius: 2,
                              marginTop: 4,
                              overflow: "hidden",
                            }}
                          >
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
                      <td style={{ padding: "14px 18px" }}>
                        {promo.expires_at ? (
                          <div style={{ fontSize: 13, color: isExpired ? "#EF4444" : "#334155", fontWeight: 500 }}>
                            {new Date(promo.expires_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                            {isExpired && <div style={{ fontSize: 11, color: "#EF4444" }}>Expired</div>}
                          </div>
                        ) : (
                          <span style={{ fontSize: 13, color: "#94A3B8" }}>No expiration</span>
                        )}
                      </td>

                      {/* Status */}
                      <td style={{ padding: "14px 18px" }}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            backgroundColor: promo.is_active && !isExpired && !isLimitReached ? "#ECFDF5" : "#F1F5F9",
                            color: promo.is_active && !isExpired && !isLimitReached ? "#065F46" : "#64748B",
                          }}
                        >
                          {promo.is_active && !isExpired && !isLimitReached ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "14px 18px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <button
                            onClick={() => togglePromoStatus(promo)}
                            title={promo.is_active ? "Deactivate promo" : "Activate promo"}
                            style={{ border: "none", background: "none", cursor: "pointer", padding: 4 }}
                          >
                            {promo.is_active ? (
                              <ToggleRight size={22} color="#10B981" />
                            ) : (
                              <ToggleLeft size={22} color="#94A3B8" />
                            )}
                          </button>
                          <button
                            onClick={() => setPromoToDelete(promo)}
                            title="Delete promo"
                            style={{
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              padding: 4,
                              color: "#EF4444",
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
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: 16,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              width: "100%",
              maxWidth: 480,
              padding: 24,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    backgroundColor: "#EEF2FF",
                    padding: 8,
                    borderRadius: 10,
                    display: "flex",
                  }}
                >
                  <Coins size={20} color="#4338CA" />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                  Create Customer Promo Code
                </h2>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#94A3B8",
                  padding: 4,
                }}
              >
                ✕
              </button>
            </div>

            {formError && (
              <div
                style={{
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  color: "#991B1B",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontSize: 13,
                  marginBottom: 16,
                }}
              >
                {formError}
              </div>
            )}

            <form onSubmit={handleCreatePromo}>
              {/* Code Input (Strict 6 Chars) */}
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
                    Promo Code <span style={{ color: "#DC2626" }}>* (Strictly 6 Chars)</span>
                  </label>
                  <button
                    type="button"
                    onClick={generateRandom6CharPromo}
                    style={{
                      border: "none",
                      background: "none",
                      color: "#4338CA",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    🎲 Generate 6-Char Code
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={formCode}
                  onChange={(e) =>
                    setFormCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))
                  }
                  placeholder="e.g. COIN50, RIKSHO, WEL100"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #CBD5E1",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  required
                />
                <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>
                  Must be exactly 6 uppercase letters/numbers. ({formCode.length}/6 entered)
                </div>
              </div>

              {/* Coins Reward */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Riksho Coins Reward <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formCoinsAmount}
                    onChange={(e) => setFormCoinsAmount(e.target.value)}
                    placeholder="e.g. 50"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #CBD5E1",
                      fontSize: 14,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    required
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 12,
                      color: "#64748B",
                      fontWeight: 600,
                    }}
                  >
                    Coins (= ₹{(parseInt(formCoinsAmount || "0", 10) / 10).toFixed(0)} discount)
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>
                  10 Coins = ₹1 instant discount for customer at checkout.
                </div>
              </div>

              {/* Max Redemptions & Expiry */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Max Claims
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formMaxRedemptions}
                    onChange={(e) => setFormMaxRedemptions(e.target.value)}
                    placeholder="Unlimited"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #CBD5E1",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formExpiresAt}
                    onChange={(e) => setFormExpiresAt(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 10,
                      border: "1px solid #CBD5E1",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  Description / Purpose
                </label>
                <input
                  type="text"
                  maxLength={255}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="e.g. Durga Puja special 50 Coins gift"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #CBD5E1",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Active Toggle */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#334155" }}>
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: "#4338CA" }}
                  />
                  <span>Activate promo code immediately upon creation</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  disabled={submitting}
                  style={{
                    padding: "10px 16px",
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
                  disabled={submitting || formCode.length !== 6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    borderRadius: 10,
                    border: "none",
                    backgroundColor: formCode.length === 6 ? "#4338CA" : "#94A3B8",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: formCode.length === 6 ? "pointer" : "not-allowed",
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <span>Create Code</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {promoToDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: 16,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              width: "100%",
              maxWidth: 420,
              padding: 24,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#DC2626", margin: "0 0 10px 0" }}>
              Delete Customer Promo Code
            </h3>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: "1.5", margin: 0 }}>
              Are you sure you want to delete promo code{" "}
              <strong style={{ color: "#0F172A" }}>"{promoToDelete.code}"</strong>?
            </p>
            <p style={{ fontSize: 13, color: "#64748B", marginTop: 8 }}>
              This will block future claims. Existing coins already redeemed by customers will remain in their balance.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
              <button
                onClick={() => setPromoToDelete(null)}
                disabled={deleting}
                style={{
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: "1px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                  color: "#475569",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePromo}
                disabled={deleting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: "none",
                  backgroundColor: "#DC2626",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {deleting ? (
                  <>
                    <Loader2 className="animate-spin" size={15} />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Code</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
