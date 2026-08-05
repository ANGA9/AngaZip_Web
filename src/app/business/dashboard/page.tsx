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
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Overview</h1>
      <p className="text-gray-500 mb-8">Welcome back. Here's what's happening with your fleet today.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Active Shipments</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <TruckIcon />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Completed (Month)</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.completed}</h3>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Scheduled Jobs</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.scheduled}</h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Logistics Spend</p>
            <h3 className="text-2xl font-bold text-gray-900">₹{(stats.spend / 1000).toFixed(1)}k</h3>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Tracking Map</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 h-[420px] flex flex-col items-center justify-center text-center">
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
