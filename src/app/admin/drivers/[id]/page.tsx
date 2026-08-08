"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminFetch } from "@/lib/adminApi";
import Link from "next/link";
import { ArrowLeft, User, Car, ShieldCheck, BarChart3, Check, X, Ban, Star, Loader2, FileText, Image as ImageIcon } from "lucide-react";

export default function DriverDetail() {
  const params = useParams();
  const id = params.id as string;
  
  const [driver, setDriver] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // The `documents` bucket is private, so a /object/public/ URL returns 400 and
  // the anon key cannot sign for another user's files. The backend attaches a
  // short-lived `signed_url` to each row instead (see common/document-urls.ts).
  const getDocUrl = (doc: { signed_url?: string | null; storage_path?: string }) => {
    if (doc.signed_url) return doc.signed_url;
    // Legacy rows stored an absolute URL directly.
    if (doc.storage_path?.startsWith("http")) return doc.storage_path;
    return "";
  };

  const fetchDriver = async () => {
    setLoading(true);
    try {
      const data = await adminFetch(`/admin/drivers/${id}`);
      setDriver(data);
    } catch (err: any) {
      setError(err.message || "Failed to load driver");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriver();
  }, [id]);

  const handleAction = async (action: "approve" | "reject" | "suspend") => {
    let reason = "";
    if (action === "reject" || action === "suspend") {
      reason = window.prompt(`Please enter a reason for ${action}ing this driver:`) || "";
      if (!reason.trim()) return;
    }

    setActionLoading(true);
    try {
      await adminFetch(`/admin/drivers/${id}/${action}`, {
        method: "POST",
        body: JSON.stringify(reason ? { reason } : {}),
      });
      // Refresh driver
      await fetchDriver();
    } catch (err: any) {
      alert("Action failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div>Loading driver profile...</div>;
  if (error) return <div className="admin-error">{error}</div>;
  if (!driver) return <div>Driver not found</div>;

  return (
    <div>
      <div className="admin-detail-topbar">
        <Link href="/admin/drivers" className="admin-back-link">
          <ArrowLeft /> Back
        </Link>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>{driver.name}</h1>
        <span className={`admin-badge badge-${driver.verification_status}`}>
          {driver.verification_status}
        </span>
      </div>

      <div className="admin-detail-grid">
        {/* Left Column: Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="admin-card">
            <h2><User /> Personal Information</h2>
            <div className="admin-info-row">
              <span className="admin-info-label">Full Name</span>
              <span className="admin-info-value">{driver.name}</span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-label">Phone</span>
              <span className="admin-info-value">{driver.phone}</span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-label">License Number</span>
              <span className="admin-info-value" style={{ fontFamily: "monospace", fontSize: "16px" }}>
                {driver.license_no}
              </span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-label">Registered On</span>
              <span className="admin-info-value">{new Date(driver.created_at).toLocaleString()}</span>
            </div>
          </div>

          <div className="admin-card">
            <h2><Car /> Vehicle Information</h2>
            {driver.vehicles ? (
              [...(Array.isArray(driver.vehicles) ? driver.vehicles : [driver.vehicles])].map((v: any, i: number) => (
                <div key={i} className="admin-info-grid" style={{ marginBottom: i > 0 ? "16px" : 0 }}>
                  <div className="admin-info-row">
                    <span className="admin-info-label">Type</span>
                    <span className="admin-info-value" style={{ textTransform: "capitalize" }}>{v.type}</span>
                  </div>
                  <div className="admin-info-row">
                    <span className="admin-info-label">Plate</span>
                    <span className="admin-info-value">{v.plate}</span>
                  </div>
                  <div className="admin-info-row">
                    <span className="admin-info-label">Model</span>
                    <span className="admin-info-value">{v.model}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--color-text-muted)" }}>No vehicles registered.</p>
            )}
          </div>
          
          <div className="admin-card">
            <h2><FileText /> Uploaded Documents</h2>
            {driver.driver_documents && driver.driver_documents.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "16px", marginTop: "16px" }}>
                {driver.driver_documents.map((doc: any, i: number) => {
                  const url = getDocUrl(doc);
                  return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px", border: "1px solid #E5E7EB", padding: "10px", borderRadius: "8px", alignItems: "center" }}>
                    <div
                      style={{ width: "100%", height: "100px", backgroundColor: "#F3F4F6", borderRadius: "4px", overflow: "hidden", cursor: url ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center" }}
                      onClick={() => url && setPreviewImage(url)}
                    >
                      {url ? (
                        <img src={url} alt={doc.doc_type} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <ImageIcon color="#9CA3AF" />
                      )}
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "capitalize", color: "#374151" }}>
                      {doc.doc_type.replace(/_/g, " ")}
                    </span>
                    <span style={{ fontSize: "11px", color: doc.status === "approved" ? "#10B981" : doc.status === "rejected" ? "#EF4444" : "#F59E0B" }}>
                      {doc.status}
                    </span>
                  </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: "var(--color-text-muted)", marginTop: "16px" }}>No documents uploaded yet.</p>
            )}
          </div>
        </div>

        {/* Right Column: Actions */}
        <div>
          <div className="admin-card">
            <h2><ShieldCheck /> Verification</h2>
            <p style={{ color: "var(--admin-muted)", fontSize: "13px", marginBottom: "20px", lineHeight: 1.5 }}>
              Review the license and vehicle documents carefully before approving.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {driver.verification_status !== "approved" && (
                <button
                  className="admin-btn admin-btn-primary admin-btn-block"
                  onClick={() => handleAction("approve")}
                  disabled={actionLoading}
                >
                  <Check /> Approve Driver
                </button>
              )}

              {driver.verification_status === "pending" && (
                <button
                  className="admin-btn admin-btn-danger admin-btn-block"
                  onClick={() => handleAction("reject")}
                  disabled={actionLoading}
                >
                  <X /> Reject Application
                </button>
              )}

              {driver.verification_status === "approved" && (
                <button
                  className="admin-btn admin-btn-danger admin-btn-block"
                  onClick={() => handleAction("suspend")}
                  disabled={actionLoading}
                >
                  <Ban /> Suspend Driver
                </button>
              )}
            </div>
            {actionLoading && (
              <div className="admin-loading-center" style={{ marginTop: "16px", fontSize: "14px" }}>
                <Loader2 size={15} className="admin-spin" /> Processing…
              </div>
            )}
          </div>

          <div className="admin-card">
            <h2><BarChart3 /> Performance</h2>
            <div className="admin-info-row">
              <span className="admin-info-label">Total Trips</span>
              <span className="admin-info-value">{driver.total_trips || 0}</span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-label">Rating</span>
              <span className="admin-info-value">
                {driver.rating ? (
                  <span className="admin-rating"><Star /> {driver.rating}</span>
                ) : (
                  <span style={{ color: "var(--admin-muted)" }}>New</span>
                )}
              </span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-label">Status</span>
              <span className="admin-info-value">
                <span className={`admin-status-dot ${driver.status === "online" ? "online" : ""}`}>
                  {driver.status || "offline"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.8)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "40px"
        }} onClick={() => setPreviewImage(null)}>
          <button 
            style={{ position: "absolute", top: "20px", right: "20px", background: "white", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            onClick={(e) => { e.stopPropagation(); setPreviewImage(null); }}
          >
            <X size={24} color="#000" />
          </button>
          <img 
            src={previewImage} 
            alt="Document Preview" 
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "8px" }} 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
