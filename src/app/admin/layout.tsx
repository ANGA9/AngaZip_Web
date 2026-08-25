"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabaseAdminClient } from "@/lib/supabaseAdminClient";
import { adminFetch } from "@/lib/adminApi";
import { LayoutDashboard, Users, LogOut, ShieldCheck, Loader2, Bell, UserMinus, MessageSquareX, Award } from "lucide-react";
import "@/styles/portal.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // If it's the login page, we don't strictly require a session to render the shell
    // but we can still check. The login page will handle its own redirect if logged in.
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabaseAdminClient.auth.getSession();
        if (!session) {
          router.push("/admin/login");
          setLoading(false);
          return;
        }

        // Verify admin role via backend
        const me = await adminFetch("/admin/me");
        if (me.role !== "admin") {
          router.push("/admin/login");
          setLoading(false);
          return;
        }

        setUser(me);
      } catch (err) {
        console.error("Admin guard failed:", err);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabaseAdminClient.auth.signOut();
    router.push("/admin/login");
  };

  // Login page doesn't get the sidebar shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="admin-layout" style={{ alignItems: "center", justifyContent: "center" }}>
        <div className="admin-loading-center">
          <Loader2 size={18} className="admin-spin" />
          Loading admin portal…
        </div>
      </div>
    );
  }

  if (!user) return null; // Wait for redirect

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <img src="/images/final_riksho.png" alt="Riksho Admin" />
        </div>
        
        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section-label">Overview</div>
          <Link
            href="/admin"
            className={`admin-nav-item ${pathname === "/admin" ? "active" : ""}`}
          >
            <LayoutDashboard /> Dashboard
          </Link>
          <div className="admin-nav-section-label">Operations</div>
          <Link
            href="/admin/drivers"
            className={`admin-nav-item ${pathname === "/admin/drivers" ? "active" : ""}`}
          >
            <Users /> Drivers
          </Link>
          <Link
            href="/admin/incomplete"
            className={`admin-nav-item ${pathname.startsWith("/admin/incomplete") ? "active" : ""}`}
          >
            <UserMinus /> Possible Drivers
          </Link>
          <Link
            href="/admin/push"
            className={`admin-nav-item ${pathname.startsWith("/admin/push") ? "active" : ""}`}
          >
            <Bell /> Push Notifications
          </Link>
          <Link
            href="/admin/promoters"
            className={`admin-nav-item ${pathname.startsWith("/admin/promoters") ? "active" : ""}`}
          >
            <Award /> Brand Promoters
          </Link>
          {/* Phase 2:
          <Link href="/admin/rides" className="admin-nav-item"><Route /> Rides</Link>
          <Link href="/admin/riders" className="admin-nav-item"><UserRound /> Riders</Link>
          */}
          <div className="admin-nav-section-label">Analytics</div>
          <Link
            href="/admin/cancellations"
            className={`admin-nav-item ${pathname === "/admin/cancellations" ? "active" : ""}`}
          >
            <MessageSquareX /> Feedback Cancellation
          </Link>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-user">
            <span className="admin-header-email">{user.email}</span>
            <span className="admin-header-chip"><ShieldCheck size={13} /> Admin</span>
            <button onClick={handleLogout} className="admin-logout-btn">
              <LogOut /> Log out
            </button>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
