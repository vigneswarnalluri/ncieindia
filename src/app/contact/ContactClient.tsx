"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MapPin, CheckCircle, ArrowRight, ShieldCheck, Copy, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactClient() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("student");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", org: "", phone: "", message: "" });
    setIsSubmitted(false);
  };

  const copyToClipboard = (email: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  const DESKS = [
    {
      label: language === "hi" ? "मुख्य कार्यकारी अधिकारी (CEO) डेस्क" : "Chief Executive Officer (CEO) Desk",
      email: "ceo@ncieindia.org",
    },
    {
      label: language === "hi" ? "कार्यकारी निदेशक (ED) डेस्क" : "Executive Director (ED) Desk",
      email: "ed@ncieindia.org",
    },
    {
      label: language === "hi" ? "सीएसआर, साझेदारी और गठबंधन" : "CSR, Partnerships & Funding",
      email: "csr@ncieindia.org",
    },
    {
      label: language === "hi" ? "केंद्रीय सचिवालय कार्यालय" : "Central Secretariat Office",
      email: "office@ncieindia.org",
    },
    {
      label: language === "hi" ? "सामान्य प्रश्न और हेल्पडेस्क" : "General Inquiries & Helpdesk",
      email: "info@ncieindia.org",
    },
  ];

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-20">
      
      {/* ── Page Hero Banner (Institutional style) ── */}
      <div className="relative bg-[#0A5D45] overflow-hidden py-16 text-white border-b border-[#074733]">
        {/* Simple geometric lines for clean institutional styling */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="100%" y1="20%" x2="0" y2="80%" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">{t("nav_home")}</Link>
            <span>/</span>
            <span className="text-white/60">{t("nav_contact")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t("contact_title")}
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-2 max-w-xl">
            {t("contact_desc")}
          </p>
        </div>
      </div>

      {/* ── Main Layout Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT COLUMN: Central Secretariat & Desks Directory (5/12 width) ── */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Central Secretariat HQ Card */}
            <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6">
              <div className="border-l-4 border-primary pl-4 py-0.5">
                <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-900">
                  {t("contact_address_title")}
                </h2>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">
                  Apex Command &amp; Central Registry
                </p>
              </div>

              <div className="space-y-6 text-xs sm:text-sm">
                <div className="flex gap-3.5">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-zinc-800 uppercase tracking-wide">Main Head Office (HQ)</h3>
                    <p className="text-zinc-500 mt-1 leading-relaxed">
                      Old Secretariat, Near Vidhan Sabha,<br />
                      Delhi, 110054
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 pt-4 border-t border-zinc-100">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-zinc-800 uppercase tracking-wide">Nodal &amp; Implementation Agency</h3>
                    <p className="text-zinc-500 mt-1 leading-relaxed">
                      NCIE Desk, Guntur,<br />
                      Andhra Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 pt-4 border-t border-zinc-100">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-zinc-800 uppercase tracking-wide">{t("contact_phone_title")}</h3>
                    <p className="text-zinc-500 mt-1 font-mono leading-relaxed">
                      0863 232 1417
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Mon–Sat, 9:00 AM – 5:30 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Official Communication Desks */}
            <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6">
              <div className="border-l-4 border-primary pl-4 py-0.5">
                <h3 className="text-base font-bold uppercase tracking-wider text-zinc-900">
                  {language === "hi" ? "आधिकारिक संचार डेस्क" : "Official Communication Desks"}
                </h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">
                  Direct Department Directories
                </p>
              </div>

              <div className="divide-y divide-zinc-150 text-xs sm:text-sm">
                {DESKS.map((desk, idx) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-zinc-850 uppercase tracking-wide text-[11px]">{desk.label}</h4>
                      <a href={`mailto:${desk.email}`} className="text-primary font-mono hover:underline font-bold block text-xs sm:text-sm">
                        {desk.email}
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard(desk.email)}
                      className="p-2 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-350 active:bg-zinc-100 transition-all rounded cursor-pointer relative shrink-0"
                      title="Copy Email Address"
                    >
                      {copiedEmail === desk.email ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-zinc-400 hover:text-zinc-700" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Official Inquiries Form Card (7/12 width) ── */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="bg-white border border-zinc-200 rounded-none p-8 text-center space-y-6 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-none">
                  <CheckCircle className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-wide">{t("contact_submitted_title")}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-sm mx-auto">
                    {t("contact_submitted_desc")
                      .replace("{name}", formData.name)
                      .replace("{tab}", t(`contact_tab_${activeTab}`))}
                  </p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded p-4 text-left flex gap-3 text-xs text-zinc-650 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    <strong>
                      {t("contact_next_steps").split(":")[0]}:
                    </strong>
                    {t("contact_next_steps")
                      .substring(t("contact_next_steps").indexOf(":") + 1)
                      .replace("{email}", formData.email)}
                  </span>
                </div>

                <Button variant="outline" onClick={resetForm} className="w-full font-bold uppercase tracking-wider text-xs py-2.5 rounded-none cursor-pointer">
                  {t("contact_btn_another")}
                </Button>
              </div>
            ) : (
              <Card className="border border-zinc-200 rounded-none shadow-sm bg-white">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="px-6 pt-6 pb-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">
                      {t("contact_select_desk")}
                    </label>
                    <TabsList className="w-full grid grid-cols-3 bg-zinc-50 border border-zinc-200 p-0.5 rounded-none">
                      <TabsTrigger value="student" className="text-xs py-1.5 font-bold uppercase tracking-wider rounded-none data-[state=active]:bg-[#0D6B4F] data-[state=active]:text-white cursor-pointer">{t("contact_tab_student")}</TabsTrigger>
                      <TabsTrigger value="institution" className="text-xs py-1.5 font-bold uppercase tracking-wider rounded-none data-[state=active]:bg-[#0D6B4F] data-[state=active]:text-white cursor-pointer">{t("contact_tab_institution")}</TabsTrigger>
                      <TabsTrigger value="partnership" className="text-xs py-1.5 font-bold uppercase tracking-wider rounded-none data-[state=active]:bg-[#0D6B4F] data-[state=active]:text-white cursor-pointer">{t("contact_tab_partnership")}</TabsTrigger>
                    </TabsList>
                  </div>

                  <CardHeader className="px-6 py-4 pb-2">
                    <CardTitle className="text-base font-extrabold uppercase tracking-wide text-zinc-800">
                      {activeTab === "student" && t("contact_form_student_title")}
                      {activeTab === "institution" && t("contact_form_institution_title")}
                      {activeTab === "partnership" && t("contact_form_partnership_title")}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-zinc-500">
                      {activeTab === "student" && t("contact_form_student_desc")}
                      {activeTab === "institution" && t("contact_form_institution_desc")}
                      {activeTab === "partnership" && t("contact_form_partnership_desc")}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">{t("contact_label_name")}</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t("contact_placeholder_name")}
                          required
                          className="rounded-none border-zinc-300 text-xs py-2 bg-zinc-50/20 focus-visible:ring-1 focus-visible:ring-[#0D6B4F] focus-visible:border-[#0D6B4F]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">{t("contact_label_email")}</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t("contact_placeholder_email")}
                            required
                            className="rounded-none border-zinc-300 text-xs py-2 bg-zinc-50/20 focus-visible:ring-1 focus-visible:ring-[#0D6B4F] focus-visible:border-[#0D6B4F]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">{t("contact_label_phone")}</label>
                          <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t("contact_placeholder_phone")}
                            required
                            className="rounded-none border-zinc-300 text-xs py-2 bg-zinc-50/20 focus-visible:ring-1 focus-visible:ring-[#0D6B4F] focus-visible:border-[#0D6B4F]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                          {activeTab === "student" ? t("contact_label_org_student") : t("contact_label_org_other")}
                        </label>
                        <Input
                          name="org"
                          value={formData.org}
                          onChange={handleInputChange}
                          placeholder={t("contact_placeholder_org")}
                          required
                          className="rounded-none border-zinc-300 text-xs py-2 bg-zinc-50/20 focus-visible:ring-1 focus-visible:ring-[#0D6B4F] focus-visible:border-[#0D6B4F]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">{t("contact_label_message")}</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t("contact_placeholder_message")}
                          required
                          className="rounded-none border-zinc-300 text-xs min-h-[100px] py-2 bg-zinc-50/20 focus-visible:ring-1 focus-visible:ring-[#0D6B4F] focus-visible:border-[#0D6B4F]"
                        />
                      </div>

                      <Button type="submit" className="w-full justify-center text-xs uppercase tracking-wider font-bold py-3 bg-[#0D6B4F] hover:bg-[#08533d] text-white rounded-none cursor-pointer shadow-none transition-colors flex items-center gap-1.5">
                        {t("contact_btn_submit")}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>

                    </form>
                  </CardContent>
                </Tabs>
              </Card>
            )}
          </div>

        </div>
      </div>
      
    </div>
  );
}
