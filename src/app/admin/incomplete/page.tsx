"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { UserMinus, Loader2 } from "lucide-react";

export default function IncompleteDriversPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminFetch(`/admin/incomplete-drivers`);
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch incomplete drivers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="admin-page-title">Possible Drivers</h1>
      <p className="admin-page-subtitle">Users who have authenticated via OTP but have not submitted the onboarding form.</p>

      <div className="admin-table-container" style={{ marginTop: 24 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Phone Number</th>
              <th>First Seen</th>
              <th>Last Sign In</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "40px" }}>
                  <Loader2 className="admin-spin" style={{ margin: "0 auto" }} />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
                  <UserMinus size={40} style={{ margin: "0 auto 12px", opacity: 0.2 }} />
                  No incomplete onboardings found.
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td style={{ fontWeight: 600 }}>{user.phone}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td>{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "Never"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
