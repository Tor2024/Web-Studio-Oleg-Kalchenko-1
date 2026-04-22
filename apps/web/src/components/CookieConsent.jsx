import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ChevronDown, ChevronUp, Check, X } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: false
    });
    const { t } = useLanguage();

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const all = { essential: true, analytics: true };
        saveConsent(all);
    };

    const handleDecline = () => {
        const essentialOnly = { essential: true, analytics: false };
        saveConsent(essentialOnly);
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };

    const saveConsent = (prefs) => {
        localStorage.setItem('cookie-consent', JSON.stringify(prefs));
        setIsVisible(false);
        // Here you would typically initialize analytics if prefs.analytics is true
        if (prefs.analytics) {
            console.log("Analytics cookies enabled");
        } else {
            console.log("Analytics cookies disabled");
        }
    };

    const togglePreference = (key) => {
        if (key === 'essential') return; // Cannot toggle essential
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-[#2A2A2A] overflow-hidden relative">

                        {/* Decorative background */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#A8D5BA] opacity-50"></div>

                        <div className="p-6 md:p-8">
                            <div className="md:flex items-start justify-between gap-8">
                                <div className="flex-1">
                                    <h3 className="font-caveat text-2xl font-bold mb-3 text-[#2A2A2A] flex items-center gap-2">
                                        {t('cookies.title') || "Cookies & Privacy"}
                                        <span className="text-sm font-kalam font-normal bg-[#F0C5A9] px-2 py-0.5 rounded-full text-[#2A2A2A] opacity-70">GDPR Compliant</span>
                                    </h3>
                                    <p className="font-kalam text-[#5A5A5A] text-sm md:text-base leading-relaxed">
                                        {t('cookies.description') || "We use cookies to ensure you get the best experience."}
                                        {" "}
                                        <a href="/privacy" className="underline hover:text-[#A8D5BA] transition-colors">{t('footer.privacy')}</a>
                                        {" & "}
                                        <a href="/imprint" className="underline hover:text-[#A8D5BA] transition-colors">{t('footer.imprint')}</a>.
                                    </p>
                                </div>

                                {/* Desktop Buttons (Initial View) */}
                                <div className="hidden md:flex flex-col gap-3 min-w-[200px]">
                                    <button
                                        onClick={handleAcceptAll}
                                        className="w-full px-6 py-2.5 rounded-lg bg-[#2A2A2A] text-white font-kalam font-bold hover:bg-[#4A4A4A] transition-all shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        <Check size={18} />
                                        {t('cookies.accept') || "Accept All"}
                                    </button>
                                    <button
                                        onClick={handleDecline}
                                        className="w-full px-6 py-2.5 rounded-lg border-2 border-[#E0E0E0] font-kalam text-[#5A5A5A] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X size={18} />
                                        {t('cookies.decline') || "Essential Only"}
                                    </button>
                                    <button
                                        onClick={() => setShowDetails(!showDetails)}
                                        className="text-xs text-[#7A7A7A] hover:text-[#2A2A2A] underline font-kalam text-center mt-1 flex items-center justify-center gap-1"
                                    >
                                        <Settings size={12} />
                                        {t('cookies.settings') || "Settings"}
                                        {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Buttons (Initial View) */}
                            <div className="md:hidden mt-6 flex flex-col gap-3">
                                <button
                                    onClick={handleAcceptAll}
                                    className="w-full px-6 py-3 rounded-lg bg-[#2A2A2A] text-white font-kalam font-bold shadow-md"
                                >
                                    {t('cookies.accept') || "Accept All"}
                                </button>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleDecline}
                                        className="flex-1 px-4 py-2 rounded-lg border-2 border-[#E0E0E0] font-kalam text-[#5A5A5A]"
                                    >
                                        {t('cookies.decline') || "Essential Only"}
                                    </button>
                                    <button
                                        onClick={() => setShowDetails(!showDetails)}
                                        className="px-4 py-2 rounded-lg border-2 border-[#E0E0E0] font-kalam text-[#5A5A5A] flex items-center justify-center"
                                    >
                                        <Settings size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Detailed Settings (Expandable) */}
                            <AnimatePresence>
                                {showDetails && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-6 mt-6 border-t border-dashed border-[#E0E0E0] space-y-4">
                                            {/* Essential */}
                                            <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
                                                <div className="pt-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={preferences.essential}
                                                        disabled
                                                        className="w-5 h-5 rounded border-gray-300 text-[#2A2A2A] focus:ring-[#A8D5BA]"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold font-caveat text-lg text-[#2A2A2A]">
                                                        {t('cookies.essential') || "Essential"}
                                                    </h4>
                                                    <p className="text-sm text-[#7A7A7A] font-kalam">
                                                        {t('cookies.essentialDesc') || "Strictly necessary for the website to function."}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Analytics */}
                                            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors cursor-pointer" onClick={() => togglePreference('analytics')}>
                                                <div className="pt-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={preferences.analytics}
                                                        onChange={() => togglePreference('analytics')}
                                                        className="w-5 h-5 rounded border-gray-300 text-[#2A2A2A] focus:ring-[#A8D5BA]"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold font-caveat text-lg text-[#2A2A2A]">
                                                        {t('cookies.analytics') || "Analytics"}
                                                    </h4>
                                                    <p className="text-sm text-[#7A7A7A] font-kalam">
                                                        {t('cookies.analyticsDesc') || "Help us understand how you use the site."}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleSavePreferences}
                                                className="w-full mt-4 px-6 py-2 rounded-lg bg-[#A8D5BA] text-[#2A2A2A] font-kalam font-bold hover:bg-[#97C4A9] transition-colors shadow-sm"
                                            >
                                                {t('cookies.save') || "Save Preferences"}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
