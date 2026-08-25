"use client";

import { useEffect, useState } from "react";
import { businessSupabase } from "@/lib/supabaseAdminClient";
import { portalFetch } from "@/lib/portalFetch";
import {
  Building2,
  Mail,
  Phone,
  User,
  MapPin,
  FileText,
  Lock,
  CheckCircle2,
  AlertCircle,
  Save,
  ShieldCheck,
  Calendar,
  Sparkles,
} from "lucide-react";
import "@/styles/portal.css";

export default function BusinessSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [business, setBusiness] = useState<any>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  // Editable fields
  const [contactName, setContactName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { session } } = await businessSupabase.auth.getSession();
        if (!session) return;

        // Fetch business details
        const { data, error: fetchError } = await businessSupabase
          .from("businesses")
          .select("*")
          .eq("owner_user_id", session.user.id)
          .maybeSingle();

        if (fetchError) {
          setError(fetchError.message);
        } else if (data) {
          setBusiness(data);
          setContactName(data.contact_name || "");
          setAddress(data.address || "");
          setCity(data.city || "");
        } else {
          // Fallback to backend /business/portal/me
          const me = await portalFetch("/business/portal/me").catch(() => null);
          if (me?.business) {
            setBusiness(me.business);
            setContactName(me.business.contact_name || "");
            setAddress(me.business.address || "");
            setCity(me.business.city || "");
          }
        }
      } catch (err: any) {
        console.error("Failed to load business profile:", err);
        setError("Unable to load profile details.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business?.id) return;

    setSaving(true);
    setError("");
    setSaveSuccess(false);

    try {
      const { error: updateError } = await businessSupabase
        .from("businesses")
        .update({
          contact_name: contactName.trim(),
          address: address.trim(),
          city: city.trim(),
        })
        .eq("id", business.id);

      if (updateError) {
        setError(updateError.message);
      } else {
        setSaveSuccess(true);
        setBusiness((prev: any) => ({
          ...prev,
          contact_name: contactName.trim(),
          address: address.trim(),
          city: city.trim(),
        }));
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (err: any) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px 0", color: "#64748B", fontWeight: 500 }}>
        Loading company profile…
      </div>
    );
  }

  const createdDate = business?.created_at
    ? new Date(business.created_at).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return (
    <div className="settings-container">
      <div>
        <h1 className="admin-page-title">Company Profile & Settings</h1>
        <p className="admin-page-subtitle">
          View your verified corporate credentials and manage active dispatch & contact details.
        </p>
      </div>

      {saveSuccess && (
        <div className="settings-toast-success">
          <CheckCircle2 size={18} color="#10B981" />
          <span>Company profile updated successfully!</span>
        </div>
      )}

      {error && (
        <div className="admin-error-box">
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Card 1: Enterprise Identity Overview */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "#EEF0FE",
                border: "1.5px solid #0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4338CA",
              }}
            >
              <Building2 size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#0F172A", margin: 0, letterSpacing: "-0.01em" }}>
                {business?.name || "Registered Enterprise"}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px", fontSize: "12.5px", color: "#64748B" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Calendar size={13} /> Member since {createdDate}
                </span>
                <span>•</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Sparkles size={13} /> {business?.tier ? `Tier: ${business.tier}` : "Enterprise Tier"}
                </span>
              </div>
            </div>
          </div>

          <div className={`settings-badge-status ${business?.status === "active" ? "active" : "pending"}`}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "currentColor" }} />
            <span>{business?.status === "active" ? "Verified Active" : "Active Enterprise"}</span>
          </div>
        </div>

        <form onSubmit={handleSave}>
          {/* Card 2: Contact Person & Communication */}
          <div style={{ marginBottom: "28px" }}>
            <div className="settings-card-title" style={{ marginBottom: "16px" }}>
              <User size={18} />
              <span>Contact & Authentication Details</span>
            </div>

            <div className="settings-grid-2">
              <div className="admin-field-group" style={{ marginBottom: 0 }}>
                <label className="admin-field-label">
                  Contact Person Name
                  <span style={{ color: "#10B981", fontSize: "11.5px", fontWeight: 600, marginLeft: "8px" }}>
                    (Editable)
                  </span>
                </label>
                <div className="admin-input-wrapper">
                  <div className="admin-input-icon"><User size={18} /></div>
                  <input
                    type="text"
                    className="admin-input-enhanced"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter contact person name"
                    required
                  />
                </div>
              </div>

              <div className="admin-field-group" style={{ marginBottom: 0 }}>
                <label className="admin-field-label">
                  Primary Work Email
                  <span className="settings-locked-tag"><Lock size={10} /> Locked</span>
                </label>
                <div className="admin-input-wrapper">
                  <div className="admin-input-icon"><Mail size={18} /></div>
                  <input
                    type="email"
                    className="admin-input-enhanced"
                    value={business?.email || ""}
                    disabled
                    style={{ backgroundColor: "#F1F5F9", color: "#475569", cursor: "not-allowed" }}
                  />
                </div>
                <div className="admin-field-hint">Primary login credential. Bound to security token.</div>
              </div>

              <div className="admin-field-group" style={{ marginBottom: 0 }}>
                <label className="admin-field-label">
                  Mobile Phone Number
                  <span className="settings-locked-tag"><Lock size={10} /> Locked</span>
                </label>
                <div className="admin-input-wrapper">
                  <div className="admin-phone-prefix">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    className="admin-input-enhanced admin-input-phone"
                    value={business?.phone?.replace(/^\+91/, "") || ""}
                    disabled
                    style={{ backgroundColor: "#F1F5F9", color: "#475569", cursor: "not-allowed" }}
                  />
                </div>
                <div className="admin-field-hint">Verified OTP dispatch mobile number.</div>
              </div>
            </div>
          </div>

          <div style={{ height: "1px", background: "#F1F5F9", margin: "24px 0" }} />

          {/* Card 3: Legal & Tax Identifiers (Locked) */}
          <div style={{ marginBottom: "28px" }}>
            <div className="settings-card-title" style={{ marginBottom: "16px" }}>
              <FileText size={18} />
              <span>Legal & Government Registrations</span>
            </div>

            <div className="settings-grid-2">
              <div className="admin-field-group" style={{ marginBottom: 0 }}>
                <label className="admin-field-label">
                  Registered Business Legal Name
                  <span className="settings-locked-tag"><Lock size={10} /> Locked</span>
                </label>
                <div className="admin-input-wrapper">
                  <div className="admin-input-icon"><Building2 size={18} /></div>
                  <input
                    type="text"
                    className="admin-input-enhanced"
                    value={business?.name || ""}
                    disabled
                    style={{ backgroundColor: "#F1F5F9", color: "#475569", cursor: "not-allowed", fontWeight: 600 }}
                  />
                </div>
              </div>

              <div className="admin-field-group" style={{ marginBottom: 0 }}>
                <label className="admin-field-label">
                  GSTIN (Tax ID)
                  <span className="settings-locked-tag"><Lock size={10} /> Locked</span>
                </label>
                <div className="admin-input-wrapper">
                  <div className="admin-input-icon"><FileText size={18} /></div>
                  <input
                    type="text"
                    className="admin-input-enhanced"
                    value={business?.gstin || ""}
                    disabled
                    style={{ backgroundColor: "#F1F5F9", color: "#475569", cursor: "not-allowed", letterSpacing: "0.05em", fontWeight: 700 }}
                  />
                </div>
              </div>

              <div className="admin-field-group" style={{ marginBottom: 0 }}>
                <label className="admin-field-label">
                  Business PAN
                  <span className="settings-locked-tag"><Lock size={10} /> Locked</span>
                </label>
                <div className="admin-input-wrapper">
                  <div className="admin-input-icon"><FileText size={18} /></div>
                  <input
                    type="text"
                    className="admin-input-enhanced"
                    value={business?.pan || ""}
                    disabled
                    style={{ backgroundColor: "#F1F5F9", color: "#475569", cursor: "not-allowed", letterSpacing: "0.05em", fontWeight: 700 }}
                  />
                </div>
              </div>
            </div>

            <div className="settings-callout">
              <ShieldCheck size={20} />
              <div>
                <strong>Legal Compliance Notice:</strong> Corporate legal name, GSTIN, and PAN records are bound to your verified registration profile. To request a corporate legal entity or tax modification, please contact your Riksho enterprise support manager.
              </div>
            </div>
          </div>

          <div style={{ height: "1px", background: "#F1F5F9", margin: "24px 0" }} />

          {/* Card 4: Operating Location (Editable) */}
          <div style={{ marginBottom: "28px" }}>
            <div className="settings-card-title" style={{ marginBottom: "16px" }}>
              <MapPin size={18} />
              <span>Operating Dispatch Location</span>
            </div>

            <div className="settings-grid-2">
              <div className="admin-field-group" style={{ gridColumn: "1 / -1", marginBottom: 0 }}>
                <label className="admin-field-label">
                  Business / Warehouse Operating Address
                  <span style={{ color: "#10B981", fontSize: "11.5px", fontWeight: 600, marginLeft: "8px" }}>
                    (Editable)
                  </span>
                </label>
                <textarea
                  className="admin-textarea-enhanced"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, building, industrial area"
                  rows={2}
                  required
                />
              </div>

              <div className="admin-field-group" style={{ marginBottom: 0 }}>
                <label className="admin-field-label">
                  Operating City
                  <span style={{ color: "#10B981", fontSize: "11.5px", fontWeight: 600, marginLeft: "8px" }}>
                    (Editable)
                  </span>
                </label>
                <div className="admin-input-wrapper">
                  <div className="admin-input-icon"><MapPin size={18} /></div>
                  <input
                    type="text"
                    className="admin-input-enhanced"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Delhi, Bengaluru"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "12px", borderTop: "1px solid #F1F5F9" }}>
            <button
              type="submit"
              className="admin-btn-hero"
              style={{ width: "auto", padding: "0 32px", height: "48px", border: "1.5px solid #0F172A" }}
              disabled={saving}
            >
              <Save size={17} />
              <span>{saving ? "Saving Changes…" : "Save Profile Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
