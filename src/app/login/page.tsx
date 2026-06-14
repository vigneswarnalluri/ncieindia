"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
  ArrowLeft,
  Mail,
  Phone,
  RefreshCw,
  Fingerprint
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type Role = "institution" | "official";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("institution");
  const [showPass, setShowPass] = useState(false);
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  // Captcha state
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate random captcha
  const generateCaptcha = () => {
    setIsRefreshing(true);
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput("");
    setCaptchaError(false);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    setId("");
    setPass("");
    setShowPass(false);
    setCaptchaInput("");
    setCaptchaError(false);
    setTimeout(() => firstInputRef.current?.focus(), 100);
  }, [role]);

  const idLabel = role === "institution"
    ? t("id_label_institution")
    : t("id_label_official");
  const idPlaceholder = role === "institution"
    ? t("id_placeholder_institution")
    : t("id_placeholder_official");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Captcha validation
    if (captchaInput.toUpperCase() !== captchaCode) {
      setCaptchaError(true);
      generateCaptcha();
      return;
    }

    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleSsoLogin = () => {
    setSsoLoading(true);
    setTimeout(() => {
      setSsoLoading(false);
      alert("Redirecting securely to National Single Sign-On (MeriPehchaan)...");
    }, 1000);
  };

  return (
    <div 
      className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center relative py-6 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/login-bg.png')" }}
    >
      {/* Sophisticated backdrop overlay for readability & professional contrast */}
      <div className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[3px] pointer-events-none" />
      
      {/* Top action header */}
      <div className="w-full max-w-md flex justify-between items-center mb-3 px-1 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-semibold tracking-wide transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("back_to_portal")}
        </Link>
        <span className="text-[10px] bg-white/10 backdrop-blur-md border border-white/20 text-white px-2.5 py-0.5 rounded-full font-mono tracking-wider">
          {t("nic_secure")}
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 relative overflow-hidden z-10">
        
        {/* Elegant Top Decorative Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

        {/* National Emblem & Department Branding */}
        <div className="flex flex-col items-center text-center space-y-3 mb-3">
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/gov-emblem.png"
              alt="Government of India Emblem"
              width={75}
              height={22}
              className="h-6 w-auto object-contain opacity-80"
              unoptimized
            />
            <div className="w-px h-4 bg-zinc-300" />
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
              Govt. of India
            </span>
          </div>
          
          <Image
            src="/logo-new.png"
            alt="NCIE India Logo"
            width={170}
            height={48}
            className="h-9 w-auto object-contain mt-1"
            unoptimized
            priority
          />
        </div>

        {/* Header Title */}
        <div className="text-center space-y-1 mb-3">
          <h1 className="text-xl font-extrabold text-zinc-900 tracking-tight">
            {t("login_title")}
          </h1>
          <p className="text-zinc-500 text-xs">
            {t("login_subtitle")}
          </p>
        </div>

        {/* Security Notice Alert */}
        <div className="flex items-start gap-2.5 bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 mb-3.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-800 leading-normal">
            <strong>{t("security_warning").split(":")[0]}:</strong>{t("security_warning").split(":")[1]}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="login-form-pane"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3.5"
            >
              {/* Role Selector Tabs (Sliding indicator style) */}
              <div className="relative p-1 bg-zinc-100 border border-zinc-200/60 rounded-xl grid grid-cols-2 gap-1">
                <button
                  id="role-institution"
                  type="button"
                  onClick={() => setRole("institution")}
                  className={`relative z-10 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                    role === "institution" ? "text-primary font-black" : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  {t("role_institution")}
                </button>
                <button
                  id="role-official"
                  type="button"
                  onClick={() => setRole("official")}
                  className={`relative z-10 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                    role === "official" ? "text-primary font-black" : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t("role_official")}
                </button>

                {/* Slider Indicator */}
                <div
                  className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm border border-zinc-200/50 transition-all duration-300 ease-out"
                  style={{
                    left: role === "institution" ? "4px" : "calc(50% + 2px)",
                    width: "calc(50% - 6px)",
                  }}
                />
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-3">
                
                {/* ID input */}
                <div className="space-y-1.5">
                  <label htmlFor="login-id" className="block text-xs font-semibold text-zinc-700">
                    {idLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      {role === "institution" ? (
                        <Building2 className="w-4 h-4" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                    </div>
                    <input
                      ref={firstInputRef}
                      id="login-id"
                      type="text"
                      autoComplete="username"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      placeholder={idPlaceholder}
                      required
                      className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Password input */}
                <div className="space-y-1.5">
                  <label htmlFor="login-password" className="block text-xs font-semibold text-zinc-700">
                    {t("password_label")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password"
                      type={showPass ? "text" : "password"}
                      autoComplete="current-password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-11 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* CAPTCHA validation card */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold text-zinc-700">
                      {t("captcha_label")}
                    </label>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-primary hover:text-primary-light transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
                      {t("captcha_refresh")}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Simulated Captcha Security Box */}
                    <div className="relative bg-zinc-100 border border-zinc-200 rounded-xl flex items-center justify-center select-none overflow-hidden h-[38px]">
                      {/* background lines pattern */}
                      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%)] bg-[size:6px_6px]" />
                      {/* security noise bar */}
                      <div className="absolute w-full h-[1px] bg-zinc-400/50 top-[18px] -rotate-2" />
                      <span className="font-mono text-base font-extrabold tracking-widest text-zinc-800 italic select-none">
                        {captchaCode}
                      </span>
                    </div>

                    <input
                      type="text"
                      maxLength={5}
                      placeholder={t("captcha_verify_placeholder")}
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value.toUpperCase());
                        setCaptchaError(false);
                      }}
                      required
                      className={`w-full bg-white border rounded-xl px-4 py-2 text-center text-sm font-mono tracking-widest placeholder:font-sans placeholder:tracking-normal placeholder:text-xs focus:outline-none transition-all shadow-sm ${
                        captchaError
                          ? "border-red-400 focus:ring-2 focus:ring-red-105"
                          : "border-zinc-200 focus:ring-2 focus:ring-primary/15 focus:border-primary"
                      }`}
                    />
                  </div>
                  {captchaError && (
                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {t("captcha_error")}
                    </p>
                  )}
                </div>

                {/* Remember Me and Forgot Password row */}
                <div className="flex justify-between items-center text-xs pt-1">
                  <label className="flex items-center gap-2 text-zinc-650 font-normal cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="rounded border-zinc-300 text-primary focus:ring-primary/10 cursor-pointer h-3.5 w-3.5"
                    />
                    <span>{t("remember_device")}</span>
                  </label>
                  <a href="mailto:support-ncie@nic.in" className="text-primary hover:text-primary-light font-semibold transition-colors">
                    {t("forgot_password")}
                  </a>
                </div>

                {/* Login submission button */}
                <button
                  id="login-submit"
                  type="submit"
                  disabled={loading || ssoLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#0D6B4F] hover:bg-[#0b5c43] active:scale-[0.99] text-white font-semibold text-sm rounded-xl py-2.5 transition-all shadow-[0_4px_12px_rgba(13,107,79,0.15)] hover:shadow-[0_4px_16px_rgba(13,107,79,0.25)] disabled:opacity-75 cursor-pointer mt-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                  {loading ? t("signing_in") : t("signin_button")}
                </button>
              </form>

              {/* SSO Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-200"></div>
                <span className="flex-shrink mx-3 text-zinc-400 font-bold uppercase tracking-widest text-[9px]">OR</span>
                <div className="flex-grow border-t border-zinc-200"></div>
              </div>

              {/* National SSO DigiLocker Integration */}
              <button
                type="button"
                onClick={handleSsoLogin}
                disabled={loading || ssoLoading}
                className="w-full flex items-center justify-center gap-2.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-350 hover:bg-zinc-100/50 active:bg-zinc-200 rounded-xl py-2.5 transition-all text-xs font-semibold text-zinc-700 hover:text-zinc-955 cursor-pointer shadow-sm"
              >
                {ssoLoading ? (
                  <span className="w-3.5 h-3.5 border-2 border-zinc-400/30 border-t-zinc-700 rounded-full animate-spin" />
                ) : (
                  <Fingerprint className="w-4 h-4 text-[#E85D04]" />
                )}
                <span>{t("national_sso")}</span>
              </button>
            </motion.div>
          ) : (
            // Success Verification Dispatched
            <motion.div
              key="auth-success-pane"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-4"
            >
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-zinc-900">{t("mfa_sent")}</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
                  {t("mfa_desc")}
                </p>
              </div>
              <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-3.5 text-xs font-mono text-zinc-500">
                {t("tx_id")}:<br />
                <span className="font-bold text-zinc-800 select-all">NCIE-AUTH-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="text-xs text-primary hover:underline font-bold"
              >
                {t("go_back_login")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Support Helplines / Footer details */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/90 text-center px-4 relative z-10">
        <span className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-white/70" />
          <a href="mailto:support-ncie@nic.in" className="hover:text-emerald-300 transition-colors">
            {t("helpline_email")}
          </a>
        </span>
        <div className="hidden sm:block w-px h-3.5 bg-white/30 self-center" />
        <span className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-white/70" />
          <span>{t("helpline_phone")}</span>
        </span>
      </div>

      <p className="text-[10px] text-white/60 mt-3 text-center relative z-10">
        {t("copyright")}
      </p>
    </div>
  );
}
