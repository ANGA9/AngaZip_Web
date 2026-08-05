"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabaseAdminClient as supabase } from "@/lib/supabaseAdminClient";
import { portalFetch } from "@/lib/portalFetch";

// Fix leaflet icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const truckIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/10328/10328518.png", // A simple truck icon
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export default function LiveTrackingMap() {
  const [activeShipments, setActiveShipments] = useState<any[]>([]);
  const [locations, setLocations] = useState<Record<string, { lat: number, lng: number }>>({});

  useEffect(() => {
    // 1. Fetch active shipments to get driver_ids
    portalFetch("/business/portal/shipments")
      .then((res) => {
        const active = (res.shipments || []).filter((s: any) => 
          ["accepted", "arriving", "in_progress"].includes(s.status) && s.driver_id
        );
        setActiveShipments(active);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (activeShipments.length === 0) return;

    const driverIds = activeShipments.map(s => s.driver_id);

    // 2. Subscribe to driver_locations
    const channel = supabase
      .channel("business-fleet-tracking")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "driver_locations",
          filter: `driver_id=in.(${driverIds.map(id => `"${id}"`).join(",")})`,
        },
        (payload) => {
          if (payload.new && "lat" in payload.new) {
            const loc = payload.new as any;
            setLocations(prev => ({
              ...prev,
              [loc.driver_id]: { lat: loc.lat, lng: loc.lng }
            }));
          }
        }
      )
      .subscribe();

    // Fetch initial locations for these drivers
    const fetchInitialLocations = async () => {
      const { data } = await supabase
        .from("driver_locations")
        .select("driver_id, lat, lng")
        .in("driver_id", driverIds);
      
      if (data) {
        const initialLocs: any = {};
        data.forEach(d => { initialLocs[d.driver_id] = { lat: d.lat, lng: d.lng }; });
        setLocations(initialLocs);
      }
    };
    fetchInitialLocations();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeShipments]);

  // Center map on New Delhi by default
  const defaultCenter: [number, number] = [28.6139, 77.2090];

  return (
    <div style={{ height: "400px", width: "100%", borderRadius: "16px", overflow: "hidden", position: "relative", zIndex: 0 }}>
      <MapContainer center={defaultCenter} zoom={11} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {activeShipments.map(shipment => {
          const loc = locations[shipment.driver_id];
          if (!loc) return null;
          return (
            <Marker key={shipment.id} position={[loc.lat, loc.lng]} icon={truckIcon}>
              <Popup>
                <div className="text-sm">
                  <strong>Shipment:</strong> {shipment.id.split('-')[0].toUpperCase()}<br/>
                  <strong>Vehicle:</strong> {shipment.vehicle_type}<br/>
                  <strong>Status:</strong> {shipment.status}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
