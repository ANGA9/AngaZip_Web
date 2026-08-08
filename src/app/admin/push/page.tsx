"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Bell, Send, Image as ImageIcon, Search, AlertCircle, CheckCircle2 } from "lucide-react";

export default function PushNotificationsPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [target, setTarget] = useState("all_users");

  const fetchHistory = async () => {
    try {
      const data = await adminFetch("/admin/push/history");
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch push history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) {
      setError("Title and Body are required.");
      return;
    }
    
    if (!confirm(`Are you sure you want to broadcast this to ${target}?`)) {
      return;
    }

    setSending(true);
    setError("");
    setSuccess("");

    try {
      await adminFetch("/admin/push/send", {
        method: "POST",
        body: JSON.stringify({ title, body, imageUrl: imageUrl || undefined, target }),
      });
      
      setSuccess("Notification sent successfully!");
      setTitle("");
      setBody("");
      setImageUrl("");
      fetchHistory(); // Refresh history
      
      setTimeout(() => setSuccess(""), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to send notification");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Push Notifications</h1>
          <p className="admin-page-subtitle">Send targeted alerts to Riksho users.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginTop: '24px' }}>
        
        {/* Compose Form */}
        <div className="admin-card" style={{ padding: '24px', alignSelf: 'start' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Send size={18} color="var(--admin-accent)" /> Compose Message
          </h2>
          
          {error && (
            <div style={{ backgroundColor: '#FEF2F2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}
          
          {success && (
            <div style={{ backgroundColor: '#F0FDF4', color: '#16A34A', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} /> {success}
            </div>
          )}

          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-muted)' }}>Target Audience</label>
              <select 
                className="admin-input" 
                value={target} 
                onChange={(e) => setTarget(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
              >
                <option value="all_users">All Users</option>
                <option value="riders">Riders Only</option>
                <option value="drivers">Drivers Only</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-muted)' }}>Notification Title *</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g., 50% Off Your Next Ride!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-muted)' }}>Message Body *</label>
              <textarea
                className="admin-input"
                placeholder="Details of the notification..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
                maxLength={200}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', resize: 'none', fontFamily: 'inherit' }}
              />
              <div style={{ fontSize: '11px', color: 'var(--admin-muted-soft)', textAlign: 'right', marginTop: '4px' }}>
                {body.length}/200
              </div>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-muted)' }}>
                <ImageIcon size={14} /> Image URL (Optional)
              </label>
              <input
                type="url"
                className="admin-input"
                placeholder="https://example.com/promo.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
              />
            </div>

            <button 
              type="submit" 
              className="admin-action-btn"
              disabled={sending || !title || !body}
              style={{ width: '100%', padding: '12px', backgroundColor: 'var(--admin-accent)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: (sending || !title || !body) ? 'not-allowed' : 'pointer', opacity: (sending || !title || !body) ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '8px' }}
            >
              {sending ? 'Broadcasting...' : <><Send size={16} /> Broadcast Notification</>}
            </button>
          </form>
        </div>

        {/* History List */}
        <div className="admin-card" style={{ padding: '0', alignSelf: 'start', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={18} color="var(--admin-muted)" /> Broadcast History
            </h2>
          </div>
          
          <div className="admin-table-container">
            <table className="admin-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 24px', borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-muted-soft)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '12px 24px', borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-muted-soft)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Target</th>
                  <th style={{ padding: '12px 24px', borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-muted-soft)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Message</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: 'var(--admin-muted)' }}>Loading history...</td>
                  </tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ padding: '32px 24px', textAlign: 'center', color: 'var(--admin-muted)' }}>
                      No notifications sent yet.
                    </td>
                  </tr>
                ) : (
                  history.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                      <td style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--admin-muted)' }}>
                        {new Date(item.sent_at).toLocaleString()}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ backgroundColor: 'var(--admin-accent-soft)', color: 'var(--admin-accent)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' }}>
                          {item.target === 'all_users' ? 'All Users' : item.target}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: '600', color: 'var(--admin-ink)', fontSize: '14px', marginBottom: '2px' }}>{item.title}</div>
                        <div style={{ color: 'var(--admin-muted)', fontSize: '13px', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }}>
                          {item.body}
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
    </div>
  );
}
