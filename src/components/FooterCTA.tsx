"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { TextHoverEffect } from "@/components/ui/hover-footer";

export default function FooterCTA() {
  // Footer link data for QuizSom
  const footerLinks = [
    {
      title: "Portals",
      links: [
        { label: "Faculty Dashboard", href: "/teacher/dashboard" },
        { label: "Student Exam Join", href: "/student" },
        { label: "Create Assessment", href: "/teacher/create" },
        { label: "Course Materials", href: "/teacher/materials" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "Syllabus Grounding", href: "#features" },
        { label: "2-Strike Proctoring", href: "#features" },
        { label: "Server-Side Clocks", href: "#features" },
        {
          label: "Live Proctoring Audit",
          href: "/student",
          pulse: true,
        },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-slate-700 dark:text-zinc-300 shrink-0" />,
      text: "sanskar.work12@gmail.com",
      href: "mailto:sanskar.work12@gmail.com",
    },
    {
      icon: <Phone size={18} className="text-slate-700 dark:text-zinc-300 shrink-0" />,
      text: "+91 9867821598",
      href: "tel:+919867821598",
    },
    {
      icon: <MapPin size={18} className="text-slate-700 dark:text-zinc-300 shrink-0" />,
      text: "Mumbai, India",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Github size={18} />, label: "GitHub", href: "https://github.com" },
    { icon: <Twitter size={18} />, label: "Twitter", href: "https://twitter.com" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: <Globe size={18} />, label: "Status", href: "#" },
  ];

  return (
    <footer className="mt-8 w-full bg-[#F8FAFC] dark:bg-[#000000] bg-grid-subtle text-slate-900 dark:text-white relative overflow-hidden transition-colors border-t border-slate-200/90 dark:border-zinc-800/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-6 relative z-10">
        {/* Top High-Impact Call to Action Block */}
        <div className="rounded-3xl p-6 sm:p-10 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-zinc-800 shadow-sm max-w-5xl mx-auto text-center space-y-5 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-zinc-900 border border-blue-200 dark:border-zinc-800 text-blue-700 dark:text-zinc-200 text-xs font-mono font-semibold tracking-tight shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Ready for Immediate Internal Deployment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight max-w-3xl mx-auto">
            Transform your syllabus into secure, verified assessments today.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Create AI-grounded question banks in minutes, run 2-strike proctored rooms, and deliver instant pedagogical feedback.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/teacher/dashboard"
              className="px-6 py-3.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100 font-bold text-sm transition-all flex items-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Launch Faculty Portal</span>
              <ArrowRight className="w-4 h-4 text-white dark:text-black" />
            </Link>
            <Link
              href="/student"
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-white font-semibold text-sm border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-xs hover:-translate-y-0.5"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Student Exam Portal</span>
            </Link>
          </div>
        </div>

        {/* 4-Column Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-8">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Logo size="md" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Institutional AI assessment platform powered by Gemini Flash. Zero hallucination syllabus grounding and deterministic proctoring.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider font-mono mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                    {link.pulse && (
                      <span className="absolute top-1.5 ml-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider font-mono mb-6">
              Contact Information
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-slate-600 dark:text-zinc-400">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Centered Single-Line Bold Credit Above Divider */}
        <div className="pb-6 flex items-center justify-center text-center font-mono">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
            <span>Built with</span>
            <span className="text-rose-500 font-normal">❤️‍🔥</span>
            <span>by Team Metamax at Gemini Hackday 2.0</span>
            <Image
              src="/gemini-star.png"
              alt="Google Gemini"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain inline-block ml-0.5"
              unoptimized
            />
          </div>
        </div>

        {/* Divider and Upper Shifted Info Bar (Social Links + Copyright) */}
        <div className="pt-6 pb-2 border-t border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 dark:text-zinc-400 gap-4 font-mono">
          {/* Social icons */}
          <div className="flex space-x-5 text-slate-600 dark:text-zinc-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="hover:text-slate-900 dark:hover:text-white transition-colors p-1"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-right">
            &copy; {new Date().getFullYear()} QuizSom Internal Assessment Platform. All rights reserved.
          </p>
        </div>
      </div>

      {/* Giant Interactive Text Hover Effect — Cleanly Positioned at Bottom */}
      <div className="lg:flex hidden h-[22rem] -mt-20 -mb-20 justify-center pointer-events-auto select-none">
        <TextHoverEffect text="QUIZSOM" className="z-10 w-full" />
      </div>
    </footer>
  );
}
