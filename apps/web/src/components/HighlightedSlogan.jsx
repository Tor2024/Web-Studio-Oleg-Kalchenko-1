"use client";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function HighlightedSlogan() {
    const { currentLanguage } = useLanguage();

    const content = {
        de: [
            { text: "Kreative", color: "#A8D5BA" }, // Mint
            { text: " Lösungen für Ihr ", color: null },
            { text: "digitales", color: "#F0C5A9" }, // Peach
            { text: " ", color: null },
            { text: "Business", color: "#D4C5F9" }, // Lavender
        ],
        ru: [
            { text: "Креативные", color: "#A8D5BA" },
            { text: " решения для вашего ", color: null },
            { text: "цифрового", color: "#F0C5A9" },
            { text: " ", color: null },
            { text: "бизнеса", color: "#D4C5F9" },
        ],
        en: [
            { text: "Creative", color: "#A8D5BA" },
            { text: " solutions for your ", color: null },
            { text: "digital", color: "#F0C5A9" },
            { text: " ", color: null },
            { text: "business", color: "#D4C5F9" },
        ],
    };

    const parts = content[currentLanguage] || content.en;

    return (
        <h1 className="font-caveat text-4xl md:text-6xl lg:text-7xl font-bold text-[#2A2A2A] leading-tight">
            {parts.map((part, index) => (
                <span key={index} className="relative inline-block whitespace-pre-wrap">
                    {part.color && (
                        <motion.svg
                            className="absolute inset-0 -z-10 w-full h-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.3, ease: "circOut" }}
                            style={{ originX: 0 }}
                        >
                            <path
                                d="M0,20 Q50,5 100,20 L100,80 Q50,95 0,80 Z"
                                fill={part.color}
                                opacity="0.5"
                            />
                        </motion.svg>
                    )}
                    <span className="relative z-10">{part.text}</span>
                </span>
            ))}
        </h1>
    );
}
