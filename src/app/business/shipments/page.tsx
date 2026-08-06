"use client";

import { useEffect, useState } from "react";
import { Upload, Plus, Search, Filter } from "lucide-react";
import { portalFetch } from "@/lib/portalFetch";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchShipments = () => {
    setLoading(true);
    portalFetch("/business/portal/shipments")
      .then((res) => setShipments(res.shipments || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        // Simple CSV parser for POC
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const dataLines = lines.slice(1); // skip header
        
        const bulkShipments = dataLines.map(line => {
          // Splitting by comma (ignores commas inside quotes for a robust parser, but simple split for POC)
          const [origin, dest, vehicle, weight] = line.split(',').map(s => s.trim());
          return {
            origin_address: origin,
            dest_address: dest,
            vehicle_type: vehicle || "mini_truck",
            cargo_weight_kg: weight || "100",
          };
        });

        await portalFetch("/business/portal/shipments/bulk", {
          method: "POST",
          body: JSON.stringify({ shipments: bulkShipments })
        });
        
        fetchShipments();
      } catch (err) {
        console.error("Upload failed", err);
        alert("Upload failed");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset input
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 className="admin-page-title">Shipments</h1>
          <p className="admin-page-subtitle">Manage, track, and bulk-upload your fleet logistics.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <label className={`btn-white ${uploading ? 'disabled' : ''}`} style={{ cursor: uploading ? 'default' : 'pointer', opacity: uploading ? 0.7 : 1 }}>
            <Upload size={16} style={{ marginRight: 8 }} />
            {uploading ? 'Uploading...' : 'Bulk CSV Upload'}
            <input type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFileUpload} disabled={uploading} />
          </label>
          <button className="btn-primary">
            <Plus size={16} style={{ marginRight: 8 }} />
            New Shipment
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        {/* Toolbar */}
        <div className="admin-table-toolbar">
          <div style={{ position: "relative", width: 256 }}>
            <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--admin-muted-soft)" }} size={16} />
            <input 
              type="text" 
              placeholder="Search by ID or destination..." 
              style={{ width: "100%", padding: "8px 12px 8px 36px", border: "1px solid var(--admin-border-strong)", borderRadius: 8, fontSize: 14, outline: "none" }}
            />
          </div>
          <button className="btn-white">
            <Filter size={16} style={{ marginRight: 6 }} />
            Filter
          </button>
        </div>

        {/* Table */}
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={6}>
                    <div className="admin-skel" style={{ height: 20, width: "100%" }} />
                  </td>
                </tr>
              ))
            ) : shipments.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="admin-empty">
                    <div className="admin-empty-title">No shipments found.</div>
                    <div className="admin-empty-sub">Get started by uploading a CSV or creating one manually.</div>
                  </div>
                </td>
              </tr>
            ) : (
              shipments.map((ship) => (
                <tr key={ship.id}>
                  <td className="admin-cell-mono">#{ship.id.substring(0, 8)}</td>
                  <td>{ship.origin_address}</td>
                  <td>{ship.dest_address}</td>
                  <td style={{ textTransform: "capitalize" }}>{ship.vehicle_type?.replace('_', ' ')}</td>
                  <td>
                    <span className={`admin-badge badge-${ship.status}`}>
                      {ship.status}
                    </span>
                  </td>
                  <td>
                    <button className="admin-stat-link" style={{ background: "none", border: "none", color: "var(--admin-accent)", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
