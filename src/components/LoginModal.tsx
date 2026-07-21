"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Building2, ShieldCheck, Eye, EyeOff, Lock, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

type Role = "institution" | "official";

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [role, setRole] = useState<Role>("institution");
  const [showPass, setShowPass] = useState(false);
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setId("");
        setPass("");
        setShowPass(false);
        firstInputRef.current?.focus();
      }, 120);
    }
  }, [open, role]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const idLabel = role === "institution" ? "Institution ID / Registered Email" : "Employee ID / Official Email";
  const idPlaceholder = role === "institution" ? "e.g. NCIE-INST-2024-0081" : "e.g. GOV-OFF-MH-00423";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[200] bg-zinc-950/70 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">

              {/* Header band */}
              <div className="bg-primary px-6 py-5 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close login modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 id="login-modal-title" className="text-white font-bold text-base tracking-tight">
                      Authorized Portal Access
                    </h2>
                    <p className="text-white/70 text-xs mt-0.5">NCIE India Restricted Login</p>
                  </div>
                </div>
              </div>

              {/* Restricted notice */}
              <div className="mx-6 mt-5 flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Access is <strong>strictly limited</strong> to registered institutions and designated officials. Unauthorized login attempts are logged and may be reported.
                </p>
              </div>

              {/* Role selector */}
              <div className="mx-6 mt-5 grid grid-cols-2 gap-2">
                <button
                  id="role-institution"
                  onClick={() => setRole("institution")}
                  className={`flex items-center gap-2 justify-center px-3 py-2.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                    role === "institution"
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Institution
                </button>
                <button
                  id="role-official"
                  onClick={() => setRole("official")}
                  className={`flex items-center gap-2 justify-center px-3 py-2.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                    role === "official"
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Official
                </button>
              </div>

              {/* Form */}
              <form
                className="px-6 mt-5 pb-6 space-y-4"
                onSubmit={(e) => { e.preventDefault(); /* handle submit */ }}
              >
                {/* ID field */}
                <div>
                  <label htmlFor="login-id" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    {idLabel}
                  </label>
                  <input
                    ref={firstInputRef}
                    id="login-id"
                    type="text"
                    autoComplete="username"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    placeholder={idPlaceholder}
                    className="w-full border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                {/* Password field */}
                <div>
                  <label htmlFor="login-password" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Password / Access Key
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPass ? "text" : "password"}
                      autoComplete="current-password"
                      value={pass}
                      onChange={e => setPass(e.target.value)}
                      placeholder="Enter your secure password"
                      className="w-full border border-zinc-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Forgot */}
                <div className="text-right">
                  <a href="#" className="text-xs text-primary hover:underline font-medium">
                    Forgot credentials? Contact NCIE Helpdesk
                  </a>
                </div>

                {/* Submit */}
                <button
                  id="login-submit"
                  type="submit"
                  className="w-full mui-button-primary cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  {role === "institution" ? "Login as Institution" : "Login as Official"}
                </button>

                {/* Footer note */}
                <p className="text-center text-[11px] text-zinc-400 leading-relaxed pt-1">
                  For access credentials, write to{" "}
                  <a href="mailto:office@ncieindia.org" className="text-primary hover:underline">
                    office@ncieindia.org
                  </a>
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
