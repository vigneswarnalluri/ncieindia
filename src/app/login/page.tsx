/* eslint-disable react-hooks/immutability */
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  ShieldCheck,
  Lock,
  AlertCircle,
  ArrowLeft,
  Mail,
  Phone,
  RefreshCw,
  Fingerprint,
  PlusCircle,
  CheckCircle2,
  Shield,
  HelpCircle,
  ExternalLink,
  KeyRound,
  Sparkles,
  ChevronRight,
  Info,
  Award,
  Users,
  GraduationCap,
  Landmark,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ALLOWED_OFFICIAL_EMAILS, isAllowedInstitutionEmail } from "@/lib/allowedEmails";

type Role = "institution" | "official";

const getCleanErrorMessage = (error: any): string => {
  if (!error) return "An unexpected error occurred.";
  let msg = error.message;

  try {
    if (msg && typeof msg === "string" && msg.trim().startsWith("{")) {
      const parsed = JSON.parse(msg);
      msg = parsed.error_description || parsed.message || parsed.error || msg;
    }
  } catch {}

  if (!msg || msg === "{}" || typeof msg !== "string") {
    if (error.status === 429) {
      return "Email rate limit exceeded. Please try again in a few minutes.";
    }
    if (error.status === 400) {
      return "Invalid email request or captcha. Please check and try again.";
    }
    return `Authentication failed (Status ${error.status || "unknown"}). Please verify connection.`;
  }

  if (msg.includes("rate limit exceeded")) {
    return "Email rate limit exceeded. Please try again in a few minutes.";
  }
  if (msg.includes("Signup is disabled")) {
    return "Access is limited to approved SPOCs and registered institutional coordinators.";
  }

  return msg;
};

export default function LoginPage() {
  const [role, setRole] = useState<Role>("institution");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const emailRef = useRef<string>("");
  const firstInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const router = useRouter();

  // OTP Verification state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Captcha state
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const startResendCooldown = () => {
    setResendCountdown(60);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

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
    setTimeout(() => setIsRefreshing(false), 300);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setId("");
      setCaptchaInput("");
      setCaptchaError(false);
      firstInputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [role]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const ssoSession = searchParams.get("sso_session");
      if (ssoSession) {
        try {
          const sessionData = JSON.parse(decodeURIComponent(ssoSession));
          localStorage.setItem("ncie_demo_session", JSON.stringify(sessionData));
          document.cookie = `ncie_demo_session=${encodeURIComponent(
            JSON.stringify(sessionData)
          )}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;

          const targetUrl =
            sessionData.role === "official" ? "/dashboard/official" : "/dashboard/institution";
          window.location.href = targetUrl;
        } catch (e) {
          console.error("Failed to parse SSO session:", e);
          setAuthError("Failed to authenticate via SSO. Please try again.");
        }
      }

      const errorParam = searchParams.get("error");
      if (errorParam) {
        if (errorParam === "sso_unauthorized") {
          setAuthError(t("login_unauthorized_desc"));
        } else if (errorParam === "sso_missing_code") {
          setAuthError("MeriPehchaan login code is missing. Please try again.");
        } else if (errorParam === "sso_configuration_error") {
          setAuthError("MeriPehchaan SSO configuration error on server.");
        } else if (errorParam === "sso_token_exchange_failed") {
          setAuthError("Token exchange failed with MeriPehchaan server.");
        } else if (errorParam === "sso_profile_failed") {
          setAuthError("Could not retrieve profile information from MeriPehchaan.");
        } else if (errorParam === "sso_callback_error") {
          setAuthError("SSO login failed. Please try again.");
        } else {
          setAuthError(errorParam);
        }
      }
    }
  }, []);

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;
    setOtpError(null);
    setOtp(["", "", "", "", "", ""]);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: otpEmail,
        options: { shouldCreateUser: true },
      });
      if (error) {
        setOtpError(getCleanErrorMessage(error));
      } else {
        startResendCooldown();
        setOtpError(null);
      }
    } catch {
      setOtpError("Failed to resend OTP. Please try again.");
    }
  };

  const handleOtpBoxChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, "");
    if (!clean) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    if (clean.length > 1) {
      const pasted = clean.slice(0, 6).split("");
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(pasted.length, 5);
      otpInputRefs.current[nextIdx]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = clean;
    setOtp(newOtp);

    if (index < 5 && clean) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const tokenStr = otp.join("").trim();
    if (tokenStr.length < 6) {
      setOtpError("Please enter the complete 6-digit OTP.");
      return;
    }

    setVerifyingOtp(true);
    setOtpError(null);

    const emailToVerify = otpEmail || emailRef.current;
    if (!emailToVerify) {
      setOtpError("Session expired. Please go back and re-enter your email.");
      setVerifyingOtp(false);
      return;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: emailToVerify,
        token: tokenStr,
        type: "email",
      });

      if (error) {
        setOtpError(getCleanErrorMessage(error));
      } else {
        const isOfficial = ALLOWED_OFFICIAL_EMAILS.some(
          (allowed) => allowed.toLowerCase() === emailToVerify.toLowerCase()
        );
        const isInstitution = isAllowedInstitutionEmail(emailToVerify);

        let targetRole: Role = role;
        if (role === "official" && !isOfficial) {
          targetRole = "institution";
        } else if (role === "institution" && !isInstitution) {
          targetRole = "official";
        } else if (!role) {
          targetRole = isOfficial ? "official" : "institution";
        }

        window.location.href = `/dashboard/${targetRole}`;
      }
    } catch {
      setOtpError("Verification failed. Please try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // Captcha validation
    if (captchaInput.toUpperCase() !== captchaCode) {
      setCaptchaError(true);
      generateCaptcha();
      return;
    }

    const email = id.trim().toLowerCase();
    let isAllowed = false;
    if (role === "official") {
      isAllowed = ALLOWED_OFFICIAL_EMAILS.some(
        (allowed) => allowed.toLowerCase() === email
      );
      if (!isAllowed) {
        setAuthError("This email address is not registered for Official/Nodal Command access.");
        generateCaptcha();
        return;
      }
    } else {
      isAllowed = isAllowedInstitutionEmail(email);
      if (!isAllowed) {
        setAuthError(
          "This email address is not registered for Institutional Chapter/SPOC access. Please establish your Campus Chapter first."
        );
        generateCaptcha();
        return;
      }
    }

    setLoading(true);
    try {
      emailRef.current = email;
      setOtpEmail(email);

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });

      if (error) {
        setAuthError(getCleanErrorMessage(error));
        generateCaptcha();
      } else {
        setSuccess(true);
        startResendCooldown();
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 300);
      }
    } catch {
      setAuthError("An unexpected connection error occurred. Please try again.");
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleSsoLogin = () => {
    setSsoLoading(true);
    const clientId = process.env.NEXT_PUBLIC_MERIPEHCHAAN_CLIENT_ID;
    const authUrl = process.env.NEXT_PUBLIC_MERIPEHCHAAN_AUTH_URL;
    const redirectUri = process.env.NEXT_PUBLIC_MERIPEHCHAAN_REDIRECT_URI;
    const state = "ncie-sso-state-secure";
    const scope = "openid profile email";

    if (!clientId || !authUrl || !redirectUri) {
      setAuthError(
        "MeriPehchaan SSO is currently in scheduled maintenance. Please use Direct Email OTP verification."
      );
      setSsoLoading(false);
      return;
    }

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope,
      state: state,
    });

    window.location.href = `${authUrl}?${params.toString()}`;
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 relative flex flex-col justify-center py-4 sm:py-8 lg:py-12 px-3 xs:px-4 sm:px-6 lg:px-8 selection:bg-[#0D6B4F] selection:text-white">
      {/* Clean Subtle Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(#0D6B4F 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} 
      />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#0D6B4F] text-xs font-bold transition-colors bg-white px-2.5 sm:px-3 py-1.5 rounded-md border border-slate-200 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("back_to_portal")}</span>
          </Link>
        </div>

        {/* 2-Column Responsive Portal Layout: Login Card First on Mobile (order-1 lg:order-2), Info Second (order-2 lg:order-1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Right/Top Column on Mobile: Clean White Authorization Card */}
          <div className="order-1 lg:order-2 lg:col-span-6 w-full">
            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 xs:p-5 sm:p-8 relative overflow-hidden">
              {/* National Tricolor Top Strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 flex">
                <div className="flex-1 bg-[#FF9933]" />
                <div className="flex-1 bg-white border-y border-slate-200" />
                <div className="flex-1 bg-[#138808]" />
              </div>

              {/* Portal Authorization Header */}
              <div className="text-center space-y-1 mb-4 sm:mb-5 pt-1">
                <div className="inline-flex items-center justify-center p-2 sm:p-2.5 bg-emerald-50 text-[#0D6B4F] rounded-full mb-1 border border-emerald-200/60 shadow-inner">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Portal Authorization
                </h2>
                <p className="text-slate-500 text-[11px] sm:text-xs">
                  Enter your registered credentials to receive an authentication OTP.
                </p>
              </div>

              {/* Security Advisory Callout */}
              <div className="flex items-start gap-2 sm:gap-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg sm:rounded-xl p-2.5 sm:p-3 mb-3.5 sm:mb-4 text-left">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-[10px] sm:text-[11px] text-amber-900 leading-snug">
                  <strong>Notice:</strong> Restricted to authorized university coordinators and nodal personnel under Sec. 66 IT Act, 2000. All sessions logged.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.div
                    key="login-form-pane"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-3.5 sm:space-y-4"
                  >
                    {/* Role Toggle Selector - Responsive on all screen widths */}
                    <div className="p-1 bg-slate-100 border border-slate-200 rounded-lg sm:rounded-xl grid grid-cols-2 gap-1 shadow-inner">
                      <button
                        id="role-institution"
                        type="button"
                        onClick={() => setRole("institution")}
                        className={`py-1.5 sm:py-2 px-1 xs:px-2 text-[10.5px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-md sm:rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer truncate ${
                          role === "institution"
                            ? "bg-[#0D6B4F] text-white shadow-md font-black"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">INSTITUTION (SPOC)</span>
                      </button>
                      <button
                        id="role-official"
                        type="button"
                        onClick={() => setRole("official")}
                        className={`py-1.5 sm:py-2 px-1 xs:px-2 text-[10.5px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-md sm:rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer truncate ${
                          role === "official"
                            ? "bg-[#093325] text-white shadow-md font-black"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">NODAL OFFICER</span>
                      </button>
                    </div>

                    {/* Form Input */}
                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                      {/* Email Input */}
                      <div className="space-y-1 text-left">
                        <label
                          htmlFor="login-id"
                          className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700"
                        >
                          {role === "institution"
                            ? "Institutional SPOC Email Address"
                            : "Nodal Officer / Ministry Email"}
                          <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <input
                            ref={firstInputRef}
                            id="login-id"
                            type="email"
                            autoComplete="email"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder={
                              role === "institution"
                                ? "e.g. spoc@institution.edu.in"
                                : "e.g. nodal.officer@ncie.gov.in"
                            }
                            required
                            className="w-full bg-slate-50/50 border border-slate-300 rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0D6B4F]/20 focus:border-[#0D6B4F] transition-all shadow-2xs font-mono"
                          />
                        </div>
                      </div>

                      {/* Passwordless OTP Notice */}
                      <div className="flex items-center gap-2 bg-emerald-50/70 border border-emerald-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-[10px] sm:text-[11px] text-emerald-900 text-left">
                        <Lock className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0" />
                        <span>
                          A secure <strong>6-digit OTP</strong> will be dispatched to your registered email.
                        </span>
                      </div>

                      {/* Security CAPTCHA Card */}
                      <div className="space-y-1 sm:space-y-1.5 pt-0.5 text-left">
                        <div className="flex justify-between items-center">
                          <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700">
                            Security Captcha <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={generateCaptcha}
                            className="text-[#0D6B4F] hover:text-[#094e39] transition-colors flex items-center gap-1 text-[10px] sm:text-[11px] font-bold cursor-pointer"
                          >
                            <RefreshCw
                              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                            />
                            <span>Refresh Code</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div className="relative bg-slate-100 border border-slate-300 rounded-lg sm:rounded-xl flex items-center justify-center select-none overflow-hidden h-[38px] sm:h-[40px] shadow-inner">
                            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%)] bg-[size:6px_6px]" />
                            <div className="absolute w-full h-[1px] bg-slate-400/60 top-[19px] sm:top-[20px] -rotate-2" />
                            <span className="font-mono text-base sm:text-lg font-black tracking-[0.25em] sm:tracking-[0.3em] text-slate-900 italic select-none">
                              {captchaCode}
                            </span>
                          </div>

                          <input
                            type="text"
                            maxLength={5}
                            placeholder="Enter code"
                            value={captchaInput}
                            onChange={(e) => {
                              setCaptchaInput(e.target.value.toUpperCase());
                              setCaptchaError(false);
                            }}
                            required
                            className={`w-full bg-slate-50/50 focus:bg-white border rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-center text-xs sm:text-sm font-mono font-bold tracking-widest focus:outline-none transition-all shadow-2xs ${
                              captchaError
                                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                : "border-slate-300 focus:ring-2 focus:ring-[#0D6B4F]/20 focus:border-[#0D6B4F]"
                            }`}
                          />
                        </div>
                        {captchaError && (
                          <p className="text-red-600 text-[11px] sm:text-xs font-semibold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>Incorrect captcha code. Please try again.</span>
                          </p>
                        )}
                      </div>

                      {/* Error Banner */}
                      {authError && (
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-2.5 sm:p-3 animate-in fade-in text-left">
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <p className="text-xs text-red-700 font-semibold">{authError}</p>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        id="login-submit"
                        type="submit"
                        disabled={loading || ssoLoading}
                        className="w-full flex items-center justify-center gap-2 bg-[#0D6B4F] hover:bg-[#0a5840] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl py-2.5 sm:py-3 transition-all shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer min-h-[42px]"
                      >
                        {loading ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Lock className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {loading
                            ? "Dispatching Access OTP..."
                            : role === "institution"
                            ? "Request SPOC Access OTP"
                            : "Request Nodal Officer Access OTP"}
                        </span>
                      </button>
                    </form>

                    {/* Establish Chapter Register Link */}
                    {role === "institution" && (
                      <div className="pt-0.5 text-center">
                        <Link
                          href="/join"
                          className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-[#0D6B4F] hover:text-[#084231] font-bold hover:underline"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Not registered? Establish your Campus Chapter →</span>
                        </Link>
                      </div>
                    )}

                    {/* SSO Divider */}
                    <div className="relative flex py-0.5 sm:py-1 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-3 text-slate-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">
                        NATIONAL CENTRAL SSO
                      </span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    {/* National SSO Button */}
                    <button
                      type="button"
                      onClick={handleSsoLogin}
                      disabled={loading || ssoLoading}
                      className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg sm:rounded-xl py-2 sm:py-2.5 transition-all text-[11px] sm:text-xs font-bold text-slate-800 cursor-pointer shadow-2xs min-h-[40px]"
                    >
                      {ssoLoading ? (
                        <span className="w-3.5 h-3.5 border-2 border-slate-400/30 border-t-slate-700 rounded-full animate-spin" />
                      ) : (
                        <Fingerprint className="w-4 h-4 text-[#E85D04]" />
                      )}
                      <span>Sign in with MeriPehchaan (National SSO / JanParichay)</span>
                    </button>
                  </motion.div>
                ) : (
                  /* OTP Verification Screen */
                  <motion.div
                    key="auth-success-pane"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-3.5 sm:space-y-4 py-1 sm:py-2"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-[#0D6B4F] shadow-inner">
                      <KeyRound className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        Enter Security Verification OTP
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                        A 6-digit access code has been dispatched to:
                      </p>
                      {otpEmail && (
                        <p className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 inline-block break-all max-w-full">
                          {otpEmail}
                        </p>
                      )}
                    </div>

                    {/* 6-Box Segmented OTP Inputs - Seamless on small screens */}
                    <form onSubmit={handleVerifyOtp} className="space-y-3.5 sm:space-y-4 max-w-sm mx-auto pt-1">
                      <div className="space-y-2">
                        <div className="flex justify-center gap-1.5 xs:gap-2">
                          {[0, 1, 2, 3, 4, 5].map((idx) => (
                            <input
                              key={idx}
                              ref={(el) => {
                                otpInputRefs.current[idx] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={otp[idx]}
                              onChange={(e) => handleOtpBoxChange(idx, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                              className={`w-8 h-10 xs:w-9 xs:h-11 sm:w-10 sm:h-12 text-center text-lg sm:text-xl font-bold font-mono border rounded-lg sm:rounded-xl focus:outline-none transition-all shadow-2xs ${
                                otpError
                                  ? "border-red-400 bg-red-50/40 text-red-900"
                                  : "border-slate-300 bg-white text-slate-900 focus:border-[#0D6B4F] focus:ring-2 focus:ring-[#0D6B4F]/20"
                              }`}
                            />
                          ))}
                        </div>

                        {otpError && (
                          <p className="text-red-600 text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{otpError}</span>
                          </p>
                        )}
                      </div>

                      <button
                        id="otp-verify-submit"
                        type="submit"
                        disabled={verifyingOtp}
                        className="w-full flex items-center justify-center gap-2 bg-[#0D6B4F] hover:bg-[#0a5840] text-white font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl py-2.5 sm:py-3 transition-all shadow-md disabled:opacity-75 cursor-pointer min-h-[42px]"
                      >
                        {verifyingOtp ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <ShieldCheck className="w-4 h-4" />
                        )}
                        <span>
                          {verifyingOtp ? "Authenticating Session..." : "Verify & Access Dashboard"}
                        </span>
                      </button>

                      {/* Resend Cooldown */}
                      <div className="pt-1 flex flex-col items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={resendCountdown > 0}
                          className="text-[11px] sm:text-xs text-slate-600 hover:text-[#0D6B4F] disabled:opacity-50 disabled:cursor-not-allowed font-semibold cursor-pointer"
                        >
                          {resendCountdown > 0
                            ? `Resend OTP in ${resendCountdown}s`
                            : "Didn't receive the email? Resend OTP"}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSuccess(false);
                            setOtp(["", "", "", "", "", ""]);
                            setOtpError(null);
                            setAuthError(null);
                            generateCaptcha();
                          }}
                          className="text-[11px] sm:text-xs text-[#0D6B4F] hover:underline font-bold"
                        >
                          ← Re-enter Email Address
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Left Column on Desktop / Bottom on Mobile: Authority, Purpose & Highlights */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-4 sm:space-y-6 pt-1 lg:pt-2">
            <div>
              <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight">
                Institutional Innovation &amp; Nodal Command Gateway
              </h1>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Authorized central portal for higher educational chapter SPOCs, faculty coordinators, and central nodal directors to manage incubation grants, verify student innovators, and dispatch gazette directives.
              </p>
            </div>

            {/* Feature Callout Cards */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="bg-white border border-slate-200/90 rounded-lg sm:rounded-xl p-3 sm:p-3.5 flex items-start gap-3 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="p-1.5 sm:p-2 bg-emerald-50 text-[#0D6B4F] rounded-lg shrink-0 border border-emerald-100">
                  <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    Institutional Incubation &amp; Seed Grants
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Access pre-incubation grants (₹8.00L to ₹50.00L), track fund utilization certificates, and manage chapter star ratings.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-lg sm:rounded-xl p-3 sm:p-3.5 flex items-start gap-3 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="p-1.5 sm:p-2 bg-blue-50 text-blue-700 rounded-lg shrink-0 border border-blue-100">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    Student Innovator &amp; Internship Verification
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Review and endorse undergraduate innovation internships across 10 core national tracks with real-time audit registries.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-lg sm:rounded-xl p-3 sm:p-3.5 flex items-start gap-3 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="p-1.5 sm:p-2 bg-purple-50 text-purple-700 rounded-lg shrink-0 border border-purple-100">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    Secure Institutional Mailbox &amp; Gazette Desks
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Direct cryptographic communications with the Central Directorate, official notifications, and compliance alerts.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Trust Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
              <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-center shadow-2xs">
                <div className="text-base sm:text-lg font-black text-[#0D6B4F]">180+</div>
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 mt-0.5">Chapters</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-center shadow-2xs">
                <div className="text-base sm:text-lg font-black text-slate-900">10,000+</div>
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 mt-0.5">Innovators</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-center shadow-2xs">
                <div className="text-base sm:text-lg font-black text-[#f5a623]">₹10 Cr+</div>
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 mt-0.5">Fund Support</div>
              </div>
            </div>
          </div>

        </div>

        {/* Support & Helpline Footer */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 text-xs text-slate-500 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <a href="mailto:info@ncieindia.org" className="hover:text-[#0D6B4F] transition-colors font-medium">
                info@ncieindia.org
              </a>
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
            © 2026 National Council for Innovation &amp; Entrepreneurship (NCIE).
          </p>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-md shadow-2xl rounded-2xl p-5 sm:p-6 relative animate-in fade-in">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-emerald-100 text-[#0D6B4F] rounded-lg">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Portal Access Guidelines</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p>
                <strong>Institutional SPOCs:</strong> Sign in using the official email nominated during chapter establishment (e.g. principal or designated coordinator).
              </p>
              <p>
                <strong>Nodal Officers:</strong> Sign in with registered central directorate / ministry credentials.
              </p>
              <p>
                <strong>New Institutions:</strong> If your college has not registered an NCIE Campus Chapter, please use the{" "}
                <Link
                  href="/join"
                  onClick={() => setShowHelpModal(false)}
                  className="text-[#0D6B4F] font-bold underline"
                >
                  Chapter Affiliation Form
                </Link>{" "}
                to initiate accreditation.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-[#0D6B4F] hover:bg-[#0a5840] text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
