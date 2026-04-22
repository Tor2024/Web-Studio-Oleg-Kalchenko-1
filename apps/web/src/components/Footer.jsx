"use client";

import { Github, Twitter, Linkedin, Mail, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import TypewriterText from "./TypewriterText";

export default function Footer() {
    const { t } = useLanguage();

    const socialLinks = [
        { icon: <Send size={20} />, href: "https://t.me/oleh_kalchenko", label: "Telegram" },
        { icon: <Github size={20} />, href: "#", label: "GitHub" },
        { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
        { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    ];

    return (
        <footer className="relative pt-24 pb-12 px-6 md:px-12 overflow-hidden">
            {/* Decorative Top Border (Wavy Line) */}
            <div className="absolute top-0 left-0 w-full h-12 pointer-events-none">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1200 48"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,24 Q300,48 600,24 Q900,0 1200,24"
                        stroke="#A8D5BA"
                        strokeWidth="2"
                        fill="none"
                        className="hand-drawn-animation"
                    />
                    <path
                        d="M0,30 Q300,54 600,30 Q900,6 1200,30"
                        stroke="#F0C5A9"
                        strokeWidth="2"
                        fill="none"
                        className="hand-drawn-animation"
                        style={{ animationDelay: "0.5s", opacity: 0.6 }}
                    />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="relative inline-block">
                            <h2 className="font-caveat text-3xl font-bold text-[#2A2A2A] min-h-[40px]">
                                <TypewriterText text="Web Studio Oleh Kalchenko" delay={5000} />
                            </h2>
                            {/* Underline */}
                            <svg
                                className="absolute -bottom-2 left-0 w-full h-3"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0,5 Q50,10 100,5"
                                    stroke="#D4C5F9"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                        </div>
                        <p className="font-kalam text-[#5A5A5A] max-w-xs">
                            {t("footer.brandDescription")}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-caveat text-2xl font-bold text-[#2A2A2A]">
                            {t("footer.explore")}
                        </h3>
                        <ul className="space-y-2 font-kalam text-[#5A5A5A]">
                            {[
                                { key: "home", path: "/" },
                                { key: "portfolio", path: "/portfolio" },
                                { key: "news", path: "/news" },
                                { key: "about", path: "/about" },
                                { key: "contact", path: "/contact" }
                            ].map((item) => (
                                <li key={item.key}>
                                    <a
                                        href={item.path}
                                        className="hover:text-[#A8D5BA] transition-colors relative group inline-block"
                                    >
                                        {t(`nav.${item.key}`)}
                                        {/* Hover underline */}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F0C5A9] group-hover:w-full transition-all duration-300"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials & Contact */}
                    <div className="space-y-6">
                        <h3 className="font-caveat text-2xl font-bold text-[#2A2A2A]">
                            {t("footer.letsConnect")}
                        </h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="relative group w-12 h-12 flex items-center justify-center text-[#2A2A2A] hover:text-[#FEFEFE] transition-colors duration-300"
                                >
                                    <span className="relative z-10">{social.icon}</span>

                                    {/* Hand-drawn circle background */}
                                    <svg
                                        className="absolute inset-0 w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            d="M24,4 C35,4 44,13 44,24 C44,35 35,44 24,44 C13,44 4,35 4,24 C4,13 13,4 24,4 Z"
                                            stroke={index % 2 === 0 ? "#A8D5BA" : "#F0C5A9"}
                                            strokeWidth="2"
                                            fill="none"
                                            className="group-hover:fill-[#A8D5BA] transition-colors duration-300"
                                            style={{
                                                strokeDasharray: "10 5",
                                            }}
                                        />
                                    </svg>
                                </a>
                            ))}
                        </div>

                        <div className="relative">
                            <a href="mailto:hello@example.com" className="font-kalam text-lg text-[#2A2A2A] hover:text-[#D4C5F9] transition-colors flex items-center">
                                <Mail size={18} className="mr-2" />
                                hello@example.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center pt-8 border-t border-[#E0E0E0] border-dashed relative">
                    <p className="font-kalam text-sm text-[#7A7A7A]">
                        © {new Date().getFullYear()} Oleh Kalchenko. {t("footer.copyright")}
                    </p>
                    <div className="mt-2 space-x-4 text-sm text-[#7A7A7A] font-kalam">
                        <a href="/imprint" className="hover:text-[#2A2A2A] transition-colors">
                            {t("footer.imprint") || "Impressum"}
                        </a>
                        <span>|</span>
                        <a href="/privacy" className="hover:text-[#2A2A2A] transition-colors">
                            {t("footer.privacy") || "Datenschutz"}
                        </a>
                    </div>

                    {/* Decor */}
                    <div className="absolute right-10 bottom-4 opacity-30 hidden md:block">
                        <svg width="60" height="60" viewBox="0 0 60 60">
                            <path d="M30,5 L35,20 L50,25 L35,30 L30,45 L25,30 L10,25 L25,20 Z" stroke="#D4C5F9" strokeWidth="2" fill="none" transform="rotate(15 30 30)" />
                        </svg>
                    </div>
                </div>
            </div>
        </footer>
    );
}
