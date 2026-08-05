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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Shipments</h1>
          <p className="text-gray-500">Manage, track, and bulk-upload your fleet logistics.</p>
        </div>
        <div className="flex gap-3">
          <label className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
            <Upload size={18} />
            {uploading ? 'Uploading...' : 'Bulk CSV Upload'}
            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors">
            <Plus size={18} />
            New Shipment
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID or destination..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Tracking ID</th>
                <th className="px-6 py-4 font-medium">Origin</th>
                <th className="px-6 py-4 font-medium">Destination</th>
                <th className="px-6 py-4 font-medium">Vehicle</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading shipments...</td>
                </tr>
              ) : shipments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No shipments found.</td>
                </tr>
              ) : (
                shipments.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{s.id.split("-")[0].toUpperCase()}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{s.origin_address}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{s.dest_address}</td>
                    <td className="px-6 py-4 text-gray-600 capitalize">{s.vehicle_type?.replace("_", " ")}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        s.status === "completed" ? "bg-green-100 text-green-800" :
                        s.status === "requested" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 font-medium">Track</button>
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
