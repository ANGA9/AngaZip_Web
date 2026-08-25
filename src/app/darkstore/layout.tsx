"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { darkstoreSupabase } from "@/lib/supabaseAdminClient";
import { portalFetch } from "@/lib/portalFetch";
import { Package, LogOut, ShieldCheck, Loader2 } from "lucide-react";
import "@/styles/portal.css";

export default function DarkstoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (pathname === "/darkstore" || pathname === "/darkstore/login") {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const { data: { session } } = await darkstoreSupabase.auth.getSession();
        if (!session) {
          router.push("/darkstore/login");
          setLoading(false);
          return;
        }

        // Verify store_ops or admin role via backend. Use the generic /me
        // (returns the real users.role for any authenticated caller) — /admin/me
        // is admin-gated and would 403 a legitimate store_ops account.
        const me = await portalFetch("/me").catch(() => null);
        const role = me?.role;
        if (role !== "admin" && role !== "store_ops") {
          router.push("/darkstore/login");
          setLoading(false);
          return;
        }

        setUser({ email: session.user.email, role });
      } catch (err) {
        console.error("Darkstore guard failed:", err);
        router.push("/darkstore/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [pathname, router]);

  const handleLogout = async () => {
    await darkstoreSupabase.auth.signOut();
    router.push("/darkstore/login");
  };

  // Public landing and login page do not get the admin sidebar shell
  if (pathname === "/darkstore" || pathname === "/darkstore/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="admin-layout" style={{ alignItems: "center", justifyContent: "center" }}>
        <div className="admin-loading-center">
          <Loader2 size={18} className="admin-spin" />
          Loading store portal…
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <img src="/images/final_riksho.png" alt="Riksho Store Ops" />
        </div>
        
        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section-label">Operations</div>
          <Link
            href="/darkstore/queue"
            className={`admin-nav-item ${pathname === "/darkstore/queue" ? "active" : ""}`}
          >
            <Package /> Fulfilment Queue
          </Link>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-user">
            <span className="admin-header-email">{user.email}</span>
            <span className="admin-header-chip"><ShieldCheck size={13} /> Store Ops</span>
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
