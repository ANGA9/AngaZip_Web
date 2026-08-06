"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { portalFetch } from "@/lib/portalFetch";
import dynamic from "next/dynamic";

const LiveTrackingMap = dynamic(() => import("@/components/LiveTrackingMap"), { ssr: false });
export default function BusinessDashboard() {
  const [stats, setStats] = useState({ active: 0, completed: 0, scheduled: 0, spend: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portalFetch("/business/portal/stats")
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-500">Loading dashboard...</div>;

  return (
    <div>
      <h1 className="admin-page-title">Overview</h1>
      <p className="admin-page-subtitle mb-8">Welcome back. Here's what's happening with your fleet today.</p>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-head">
            <span className="admin-stat-title">Active Shipments</span>
            <span className="admin-stat-icon cyan">
              <TruckIcon />
            </span>
          </div>
          <div className="admin-stat-value">{stats.active}</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-head">
            <span className="admin-stat-title">Completed (Month)</span>
            <span className="admin-stat-icon green">
              <CheckCircle size={20} />
            </span>
          </div>
          <div className="admin-stat-value">{stats.completed}</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-head">
            <span className="admin-stat-title">Scheduled Jobs</span>
            <span className="admin-stat-icon amber">
              <Clock size={20} />
            </span>
          </div>
          <div className="admin-stat-value">{stats.scheduled}</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-head">
            <span className="admin-stat-title">Logistics Spend</span>
            <span className="admin-stat-icon">
              <TrendingUp size={20} />
            </span>
          </div>
          <div className="admin-stat-value">₹{(stats.spend / 1000).toFixed(1)}k</div>
        </div>
      </div>

      {/* Recent Activity */}
      <h2 className="admin-page-title mt-8 mb-4" style={{ fontSize: '18px' }}>Live Tracking Map</h2>
      <div style={{ height: 420, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
        <LiveTrackingMap />
      </div>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17h4V5H2v12h3"/>
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h2"/>
      <circle cx="7.5" cy="17.5" r="2.5"/>
      <circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
  );
}
