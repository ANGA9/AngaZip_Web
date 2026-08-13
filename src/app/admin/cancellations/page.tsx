"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { MessageSquareX, Calendar, MapPin, User, Car } from "lucide-react";

export default function CancellationsPage() {
  const [cancellations, setCancellations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCancellations = async () => {
      try {
        const data = await adminFetch("/admin/cancellations");
        setCancellations(data);
      } catch (err) {
        console.error("Failed to fetch cancellations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCancellations();
  }, []);

  return (
    <div>
      <h1 className="admin-page-title">Feedback Cancellation</h1>
      <p className="admin-page-subtitle">Review feedback from cancelled rides.</p>

      <div className="admin-card mt-6">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Feedback Reason</th>
                <th>Route</th>
                <th>Service</th>
                <th>Cancelled By</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "2rem" }}>
                    Loading...
                  </td>
                </tr>
              ) : cancellations.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                    No cancellations found.
                  </td>
                </tr>
              ) : (
                cancellations.map((ride) => (
                  <tr key={ride.id}>
                    <td>
                      <div className="admin-td-main">
                        {new Date(ride.cancelled_at || ride.created_at).toLocaleDateString()}
                      </div>
                      <div className="admin-td-sub">
                        {new Date(ride.cancelled_at || ride.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td>
                      <div className="admin-td-main" style={{ color: "#b91c1c", fontWeight: 600 }}>
                        {ride.cancel_reason || "No reason provided"}
                      </div>
                    </td>
                    <td>
                      <div className="admin-td-sub truncate max-w-[200px]" title={ride.origin_address}>
                        <MapPin size={12} className="inline mr-1" /> {ride.origin_address}
                      </div>
                      <div className="admin-td-sub truncate max-w-[200px]" title={ride.dest_address}>
                        <MapPin size={12} className="inline mr-1" /> {ride.dest_address}
                      </div>
                    </td>
                    <td>
                      <div className="admin-td-main capitalize">
                        {ride.vehicle_type}
                      </div>
                      <div className="admin-td-sub capitalize">
                        {ride.service_type}
                      </div>
                    </td>
                    <td>
                      <div className="admin-badge" style={{ backgroundColor: ride.cancelled_by === 'customer' ? '#dbeafe' : '#fef3c7', color: ride.cancelled_by === 'customer' ? '#1e40af' : '#b45309' }}>
                        {ride.cancelled_by || "system"}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
