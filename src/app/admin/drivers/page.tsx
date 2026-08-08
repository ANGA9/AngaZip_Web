"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminFetch } from "@/lib/adminApi";
import { Search, Users, ChevronLeft, ChevronRight } from "lucide-react";

function DriversListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const statusParam = searchParams.get("status") || "pending";
  const searchParam = searchParams.get("q") || "";
  const pageParam = parseInt(searchParams.get("page") || "0");

  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParam);

  const tabs = [
    { id: "pending", label: "Pending Review" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
    { id: "suspended", label: "Suspended" },
    { id: "all", label: "All Drivers" },
  ];

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        status: statusParam,
        q: searchParam,
        page: pageParam.toString()
      }).toString();

      const data = await adminFetch(`/admin/drivers?${qs}`);
      setDrivers(data);
    } catch (err) {
      console.error("Failed to fetch drivers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [statusParam, searchParam, pageParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin/drivers?status=${statusParam}&q=${search}&page=0`);
  };

  const handleTabChange = (tabId: string) => {
    router.push(`/admin/drivers?status=${tabId}&q=${searchParam}&page=0`);
  };

  return (
    <div>
      <h1 className="admin-page-title">Drivers</h1>
      <p className="admin-page-subtitle">Review applications and manage driver verification.</p>

      <div className="admin-table-container">
        <div className="admin-table-toolbar">
          <div className="admin-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`admin-tab ${statusParam === tab.id ? "active" : ""}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="admin-search-wrap">
            <Search />
            <input
              type="text"
              placeholder="Search name or phone…"
              className="admin-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Driver</th>
              <th>Phone</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i}>
                  {[...Array(5)].map((__, j) => (
                    <td key={j}>
                      <div className="admin-skel" style={{ height: 14, width: j === 0 ? "70%" : "50%" }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : drivers.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="admin-empty">
                    <Users />
                    <div className="admin-empty-title">No drivers found</div>
                    <div className="admin-empty-sub">Nothing matches this filter yet.</div>
                  </div>
                </td>
              </tr>
            ) : (
              drivers.map(driver => (
                <tr key={driver.id} onClick={() => router.push(`/admin/drivers/${driver.id}`)}>
                  <td>
                    <div className="admin-cell-title">{driver.name}</div>
                    <div className="admin-cell-sub">DL {driver.license_no}</div>
                  </td>
                  <td className="admin-cell-mono">{driver.phone}</td>
                  <td>
                    {driver.vehicles ? (
                      <div>
                        <span style={{ textTransform: "capitalize", fontWeight: 500 }}>
                          {(Array.isArray(driver.vehicles) ? driver.vehicles[0] : driver.vehicles).type}
                        </span>
                        <div className="admin-cell-sub">
                          {(Array.isArray(driver.vehicles) ? driver.vehicles[0] : driver.vehicles).plate}
                        </div>
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <span className={`admin-badge badge-${driver.verification_status}`}>
                      {driver.verification_status}
                    </span>
                  </td>
                  <td className="admin-cell-sub" style={{ marginTop: 0 }}>
                    {new Date(driver.created_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="admin-table-footer">
          <button
            className="admin-btn admin-btn-secondary admin-btn-sm"
            disabled={pageParam === 0}
            onClick={() => router.push(`/admin/drivers?status=${statusParam}&q=${searchParam}&page=${Math.max(0, pageParam - 1)}`)}
          >
            <ChevronLeft /> Previous
          </button>
          <span className="admin-page-indicator">Page {pageParam + 1}</span>
          <button
            className="admin-btn admin-btn-secondary admin-btn-sm"
            disabled={drivers.length < 20}
            onClick={() => router.push(`/admin/drivers?status=${statusParam}&q=${searchParam}&page=${pageParam + 1}`)}
          >
            Next <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DriversList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DriversListContent />
    </Suspense>
  );
}
