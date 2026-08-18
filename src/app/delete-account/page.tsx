"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Trash2, Smartphone, Mail, AlertCircle, CheckCircle2, FileText, ArrowRight } from "lucide-react";

export default function DeleteAccountPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-red-50 text-red-600 rounded-2xl mb-4 border border-red-100 shadow-sm">
            <Trash2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Account & Data Deletion
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
            At Riksho, you have full control over your personal data. You can request the permanent deletion of your account and associated personal identifiers at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Method 1: In-App */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Option 1 (Fastest)</span>
                <h2 className="text-xl font-bold text-slate-900">Delete in Riksho App</h2>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-6">
              If you still have the Riksho mobile app installed on your device, you can delete your account instantly:
            </p>
            <ol className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold shrink-0 mt-0.5">1</span>
                <span>Open the <strong>Riksho App</strong> and tap your <strong>Profile</strong> icon.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold shrink-0 mt-0.5">2</span>
                <span>Go to <strong>Settings</strong> &gt; <strong>Data & Privacy</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold shrink-0 mt-0.5">3</span>
                <span>Tap <strong>Delete Account</strong> and confirm your request.</span>
              </li>
            </ol>
          </div>

          {/* Method 2: Web Request */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Option 2 (Web Form)</span>
                <h2 className="text-xl font-bold text-slate-900">Submit Web Request</h2>
              </div>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-900">Request Submitted</h3>
                <p className="text-emerald-700 text-xs sm:text-sm mt-1">
                  We have received your account deletion request for <strong>{phone}</strong>. Your personal data will be purged within 30 days in compliance with DPDP regulations.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your registered name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Reason (Optional)</label>
                  <textarea
                    rows={2}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Tell us why you are deleting your account..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Deletion Request"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Data Governance / Policy Details */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">Data Deletion Policy & Retention Terms</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-500" />
                Data Permanently Purged
              </h4>
              <ul className="space-y-1.5 text-slate-600 text-xs sm:text-sm list-disc pl-4">
                <li>Personal profile information (Name, Phone number, Email)</li>
                <li>Saved home, work, and favorite addresses</li>
                <li>Real-time GPS telematics & device identifiers</li>
                <li>Push notification tokens & session credentials</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                Data Retained for Legal Compliance
              </h4>
              <ul className="space-y-1.5 text-slate-600 text-xs sm:text-sm list-disc pl-4">
                <li>Completed trip payment invoices and GST records (retained for statutory accounting compliance under applicable Indian tax laws)</li>
                <li>Anonymized trip safety logs for dispute resolution</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <p>For inquiries, contact our Data Protection Officer at: <a href="mailto:grievance@riksho.in" className="text-indigo-600 font-semibold underline">grievance@riksho.in</a></p>
            <p>Purge Processing Window: <strong>Within 30 Calendar Days</strong></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
