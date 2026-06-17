"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<string>("student");
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  return (
    <div className="flex-1 bg-white relative py-16 md:py-24">
      <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" className="mb-4">Get In Touch</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 font-sans mb-4">
            Contact NCIE Desk
          </h1>
          <p className="text-base md:text-lg text-zinc-500 leading-relaxed">
            Submit your specific inquiry. Our regional coordinators will route your request to the appropriate division desk.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900">Desk Operations</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                The National Council for Innovation and Entrepreneurship maintains coordination desks across major zones. Select the correct category tab to ensure swift routing.
              </p>
            </div>

            <div className="space-y-4 text-sm text-zinc-600">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-mint text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">MoE Innovation Cell Secretariat</h4>
                  <p className="text-zinc-500 mt-0.5">D-Block, Shastri Bhawan, New Delhi — 110001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-mint text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">Official Support Email</h4>
                  <p className="text-zinc-500 mt-0.5">office@ncieindia.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-mint text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">Toll-Free Helpdesk</h4>
                  <p className="text-zinc-500 mt-0.5">08632321417 (Mon–Sat, 9:00 AM – 5:30 PM IST)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form Desk */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="bg-white border border-zinc-150 rounded-2xl p-8 shadow-md text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-mint text-primary flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-900">Inquiry Logged</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Thank you, <span className="font-semibold text-primary">{formData.name}</span>. Your <span className="capitalize font-semibold text-accent">{activeTab} inquiry</span> has been successfully submitted to our regional coordinator.
                  </p>
                </div>

                <div className="bg-zinc-50 border border-zinc-150 rounded-xl p-5 text-left flex gap-3 text-xs text-zinc-600 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Next Steps:</strong> The desk lead will verify your institutional details. A response will be issued to <strong>{formData.email}</strong> within 3-4 working days.
                  </span>
                </div>

                <Button variant="outline" onClick={resetForm} className="w-full">
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <Card className="border border-zinc-150 shadow-sm bg-glass">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="px-6 pt-6 pb-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-3">
                      Select Inquiry Desk
                    </label>
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="student" className="text-xs">Student</TabsTrigger>
                      <TabsTrigger value="institution" className="text-xs">Institution</TabsTrigger>
                      <TabsTrigger value="partnership" className="text-xs">Partnership</TabsTrigger>
                    </TabsList>
                  </div>

                  <CardHeader className="px-6 py-4 pb-2">
                    <CardTitle className="text-lg font-bold">
                      {activeTab === "student" && "Student Inquiry Form"}
                      {activeTab === "institution" && "Institution Inquiry Form"}
                      {activeTab === "partnership" && "Partnership Inquiry Form"}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {activeTab === "student" && "Questions about student chapters, hackathons, and prototype grants."}
                      {activeTab === "institution" && "Acquisition guidelines and makerspace funding queries for colleges."}
                      {activeTab === "partnership" && "Corporate accelerators, angel networks, or CSR fund alliances."}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Full Name</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Sneha Nair"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Email Address</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. sneha@gmail.com"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Phone Number</label>
                          <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 9876543210"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                          {activeTab === "student" ? "College/University" : "Organization Name"}
                        </label>
                        <Input
                          name="org"
                          value={formData.org}
                          onChange={handleInputChange}
                          placeholder="e.g. Indian Institute of Science"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Message Details</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please provide specific details regarding your inquiry..."
                          required
                        />
                      </div>

                      <Button variant="primary" type="submit" className="w-full justify-center text-xs sm:text-sm">
                        Submit Inquiry
                        <ArrowRight className="w-4 h-4 ml-1.5" />
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
