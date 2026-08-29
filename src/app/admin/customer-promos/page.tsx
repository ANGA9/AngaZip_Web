"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { adminSupabase } from "@/lib/supabaseAdminClient";
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
    try {
      setLoading(true);
      const res = await adminFetch("/admin/customer-promos");
      if (res && res.promos) {
        setPromos(res.promos);
        setStats(res.stats || calculateStats(res.promos));
      } else {
        const { data, error } = await adminSupabase
          .from("customer_coin_promo_codes")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPromos(data || []);
        setStats(calculateStats(data || []));
      }
    } catch (err: any) {
      console.error("Failed to fetch customer promo codes:", err);
      showNotification("error", "Failed to load customer promo codes.");
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
      await adminFetch("/admin/customer-promos", {
        method: "POST",
        body: JSON.stringify({
          code: cleanCode,
          coins_amount: parsedCoins,
          max_redemptions: formMaxRedemptions ? parseInt(formMaxRedemptions, 10) : null,
          expires_at: formExpiresAt ? new Date(formExpiresAt).toISOString() : null,
          description: formDescription.trim() || null,
          is_active: formIsActive,
        }),
      });

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
      await adminFetch(`/admin/customer-promos/${promo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ is_active: nextActive }),
      });

      setPromos((prev) =>
        prev.map((p) => (p.id === promo.id ? { ...p, is_active: nextActive } : p))
      );
      setStats((prev) => ({
        ...prev,
        active_codes: nextActive ? prev.active_codes + 1 : prev.active_codes - 1,
      }));

      showNotification(
        "success",
        `Promo code "${promo.code}" is now ${nextActive ? "Active" : "Inactive"}.`
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
      await adminFetch(`/admin/customer-promos/${promoToDelete.id}`, {
        method: "DELETE",
      });

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
    <div className="admin-page-container">
      {/* Toast Notification */}
      {notification && (
        <div className={`admin-toast ${notification.type}`}>
          <div className="admin-toast-content">
            <Sparkles size={16} />
            <span>{notification.text}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title flex-row items-center gap-2">
            <Coins className="text-indigo-600 inline mr-2" size={26} />
            Customer Promo Codes (Riksho Coins)
          </h1>
          <p className="admin-page-subtitle">
            Create and distribute strictly 6-character promotional codes for customers to receive Riksho Coins.
          </p>
        </div>
        <div className="admin-page-actions">
          <button
            className="admin-btn-secondary"
            onClick={fetchPromos}
            disabled={loading}
            title="Refresh list"
          >
            <RefreshCw size={15} className={loading ? "admin-spin" : ""} />
            <span>Refresh</span>
          </button>
          <button
            className="admin-btn-primary"
            onClick={() => {
              resetForm();
              generateRandom6CharPromo();
              setCreateModalOpen(true);
            }}
          >
            <Plus size={16} />
            <span>Create Customer Promo</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon indigo">
            <Coins size={20} />
          </div>
          <div className="admin-stat-info">
            <div className="admin-stat-label">Total Customer Promos</div>
            <div className="admin-stat-value">{stats.total_codes}</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon green">
            <ShieldCheck size={20} />
          </div>
          <div className="admin-stat-info">
            <div className="admin-stat-label">Active Promos</div>
            <div className="admin-stat-value">{stats.active_codes}</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon blue">
            <TrendingUp size={20} />
          </div>
          <div className="admin-stat-info">
            <div className="admin-stat-label">Total Redemptions</div>
            <div className="admin-stat-value">{stats.total_redemptions}</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon amber">
            <Gift size={20} />
          </div>
          <div className="admin-stat-info">
            <div className="admin-stat-label">Total Coins Awarded</div>
            <div className="admin-stat-value">
              {stats.total_coins_distributed} <span style={{ fontSize: "13px", fontWeight: 500, color: "#64748B" }}>Coins (₹{(stats.total_coins_distributed / 10).toFixed(0)})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="admin-filters-card">
        <div className="admin-search-wrapper">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search by 6-char code or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search-input"
          />
          {searchQuery && (
            <button className="admin-clear-search" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>

        <div className="admin-filter-group">
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Promos Table Card */}
      <div className="admin-table-card">
        {loading ? (
          <div className="admin-loading-state">
            <Loader2 size={24} className="admin-spin" />
            <span>Loading customer promo codes…</span>
          </div>
        ) : filteredPromos.length === 0 ? (
          <div className="admin-empty-state">
            <Coins size={36} className="admin-empty-icon" />
            <div className="admin-empty-title">No Customer Promo Codes Found</div>
            <div className="admin-empty-desc">
              {searchQuery || statusFilter !== "all"
                ? "No customer promo codes match your current filters."
                : "No customer promo codes have been created yet. Click 'Create Customer Promo' to generate 6-character coin vouchers."}
            </div>
            {(searchQuery || statusFilter !== "all") && (
              <button
                className="admin-btn-secondary"
                style={{ marginTop: "12px" }}
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="admin-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Promo Code (6 Chars)</th>
                  <th>Coins Reward</th>
                  <th>Redemptions</th>
                  <th>Expires</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPromos.map((promo) => {
                  const isExpired = promo.expires_at && new Date(promo.expires_at) < new Date();
                  const isMaxed =
                    promo.max_redemptions !== null &&
                    promo.redemption_count >= promo.max_redemptions;

                  return (
                    <tr key={promo.id} className={!promo.is_active ? "row-inactive" : ""}>
                      {/* Code + Description */}
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span className="promo-code-badge" style={{ letterSpacing: "2px", fontWeight: 700 }}>
                            {promo.code}
                          </span>
                          <button
                            className="admin-icon-btn small"
                            onClick={() => copyToClipboard(promo.code)}
                            title="Copy code"
                          >
                            {copiedCode === promo.code ? (
                              <Check size={13} className="text-green-600" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        </div>
                        {promo.description && (
                          <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                            {promo.description}
                          </div>
                        )}
                      </td>

                      {/* Coins Reward */}
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ fontWeight: 700, color: "#4338CA", fontSize: "14px" }}>
                            +{promo.coins_amount} Coins
                          </span>
                          <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                            (₹{(promo.coins_amount / 10).toFixed(0)} off)
                          </span>
                        </div>
                      </td>

                      {/* Redemptions */}
                      <td>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "#1E293B" }}>
                          {promo.redemption_count}
                          {promo.max_redemptions !== null && (
                            <span style={{ color: "#64748B", fontWeight: 400 }}>
                              {" "}
                              / {promo.max_redemptions}
                            </span>
                          )}
                        </div>
                        {isMaxed && (
                          <span className="admin-status-pill error" style={{ marginTop: "3px" }}>
                            Limit Reached
                          </span>
                        )}
                      </td>

                      {/* Expiry */}
                      <td>
                        {promo.expires_at ? (
                          <div>
                            <div style={{ fontSize: "12px", color: isExpired ? "#DC2626" : "#475569" }}>
                              {new Date(promo.expires_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                            {isExpired && (
                              <span className="admin-status-pill error" style={{ marginTop: "2px" }}>
                                Expired
                              </span>
                            )}
                          </div>
                        ) : (
                          <span style={{ fontSize: "12px", color: "#94A3B8" }}>No Expiry</span>
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`admin-status-pill ${
                            promo.is_active && !isExpired && !isMaxed ? "success" : "neutral"
                          }`}
                        >
                          {promo.is_active && !isExpired && !isMaxed ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <button
                            className="admin-icon-btn"
                            onClick={() => togglePromoStatus(promo)}
                            title={promo.is_active ? "Deactivate code" : "Activate code"}
                          >
                            {promo.is_active ? (
                              <ToggleRight size={18} className="text-green-600" />
                            ) : (
                              <ToggleLeft size={18} className="text-gray-400" />
                            )}
                          </button>
                          <button
                            className="admin-icon-btn danger"
                            onClick={() => setPromoToDelete(promo)}
                            title="Delete promo code"
                          >
                            <Trash2 size={15} />
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
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: "520px" }}>
            <div className="admin-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="admin-stat-icon indigo" style={{ width: "36px", height: "36px" }}>
                  <Coins size={18} />
                </div>
                <div>
                  <h3 className="admin-modal-title">Create Customer Promo Code</h3>
                  <p className="admin-modal-subtitle">
                    Strict 6-character code awarded as Riksho Coins
                  </p>
                </div>
              </div>
              <button className="admin-modal-close" onClick={() => setCreateModalOpen(false)}>
                ✕
              </button>
            </div>

            {formError && <div className="admin-form-error mb-4">{formError}</div>}

            <form onSubmit={handleCreatePromo}>
              {/* Code Input (Strict 6 Characters) */}
              <div className="admin-form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="admin-form-label">
                    Promo Code <span style={{ color: "#DC2626" }}>* (Strictly 6 Chars)</span>
                  </label>
                  <button
                    type="button"
                    className="admin-link-btn"
                    style={{ fontSize: "12px" }}
                    onClick={generateRandom6CharPromo}
                  >
                    🎲 Generate 6-Char Code
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={formCode}
                  onChange={(e) =>
                    setFormCode(
                      e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)
                    )
                  }
                  placeholder="e.g. COIN50, RIKSHO, WEL100"
                  className="admin-form-input"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "3px",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                  required
                />
                <span className="admin-form-hint">
                  Must be exactly 6 uppercase letters/numbers. {formCode.length}/6 characters entered.
                </span>
              </div>

              {/* Coins Reward Amount */}
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Riksho Coins Amount <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formCoinsAmount}
                    onChange={(e) => setFormCoinsAmount(e.target.value)}
                    placeholder="e.g. 50"
                    className="admin-form-input"
                    required
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "12px",
                      color: "#64748B",
                      fontWeight: 600,
                    }}
                  >
                    Coins (= ₹{(parseInt(formCoinsAmount || "0", 10) / 10).toFixed(0)} discount)
                  </span>
                </div>
                <span className="admin-form-hint">
                  10 Coins = ₹1 instant discount for customer on ride checkout.
                </span>
              </div>

              {/* Max Redemptions & Expiry */}
              <div className="admin-form-row">
                <div className="admin-form-group" style={{ flex: 1 }}>
                  <label className="admin-form-label">Max Redemptions</label>
                  <input
                    type="number"
                    min="1"
                    value={formMaxRedemptions}
                    onChange={(e) => setFormMaxRedemptions(e.target.value)}
                    placeholder="Unlimited (Leave blank)"
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group" style={{ flex: 1 }}>
                  <label className="admin-form-label">Expiry Date</label>
                  <input
                    type="date"
                    value={formExpiresAt}
                    onChange={(e) => setFormExpiresAt(e.target.value)}
                    className="admin-form-input"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="admin-form-group">
                <label className="admin-form-label">Description / Internal Notes</label>
                <input
                  type="text"
                  maxLength={255}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="e.g. Durga Puja special 50 Coins gift"
                  className="admin-form-input"
                />
              </div>

              {/* Active Toggle */}
              <div className="admin-form-group">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                  />
                  <span>Activate promo code immediately upon creation</span>
                </label>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setCreateModalOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  disabled={submitting || formCode.length !== 6}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="admin-spin" />
                      <span>Creating…</span>
                    </>
                  ) : (
                    <span>Create Promo Code</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {promoToDelete && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: "440px" }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title" style={{ color: "#DC2626" }}>
                Delete Customer Promo Code
              </h3>
              <button className="admin-modal-close" onClick={() => setPromoToDelete(null)}>
                ✕
              </button>
            </div>
            <div className="admin-modal-body" style={{ padding: "16px 0" }}>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
                Are you sure you want to delete promo code{" "}
                <strong style={{ color: "#1E293B" }}>"{promoToDelete.code}"</strong>?
              </p>
              <p style={{ fontSize: "13px", color: "#64748B", marginTop: "8px" }}>
                This will block any future claims. Existing coins already redeemed by customers will remain in their balance.
              </p>
            </div>
            <div className="admin-modal-actions">
              <button
                className="admin-btn-secondary"
                onClick={() => setPromoToDelete(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="admin-btn-danger"
                onClick={handleDeletePromo}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader2 size={15} className="admin-spin" />
                    <span>Deleting…</span>
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
