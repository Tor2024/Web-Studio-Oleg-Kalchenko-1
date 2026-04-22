import React from "react";
import { motion } from "framer-motion";

const CodingAnimation = () => {
    return (
        <div className="relative w-48 h-32 overflow-visible pointer-events-none">
            <motion.div
                animate={{
                    y: [0, -5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="relative"
            >
                {/* Laptop Body */}
                <svg width="180" height="120" viewBox="0 0 180 120" className="drop-shadow-sm">
                    {/* Base */}
                    <path
                        d="M20,90 L160,90 Q165,90 165,95 L165,100 Q165,105 160,105 L20,105 Q15,105 15,100 L15,95 Q15,90 20,90"
                        fill="#E0E0E0" // Light Gray
                        stroke="#2A2A2A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Screen Frame */}
                    <path
                        d="M25,90 L25,20 Q25,15 30,15 L150,15 Q155,15 155,20 L155,90"
                        fill="#F5F5F5" // White-ish
                        stroke="#2A2A2A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Screen Content Area */}
                    <rect x="32" y="22" width="116" height="60" fill="#2A2A2A" rx="2" />

                    {/* Logo on back (implied) */}
                    {/* Keyboard area hint */}
                    <line x1="80" y1="90" x2="100" y2="90" stroke="#2A2A2A" strokeWidth="2" />
                </svg>

                {/* Scrolling Code Animation */}
                <div className="absolute top-[25px] left-[35px] w-[110px] h-[55px] overflow-hidden flex flex-col gap-1.5 p-1">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                x: [0, 2, 0],
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.3,
                                repeat: Infinity,
                            }}
                            className="h-1 rounded-full"
                            style={{
                                width: `${Math.random() * 60 + 30}%`,
                                backgroundColor: i % 2 === 0 ? "#A8D5BA" : i % 3 === 0 ? "#F0C5A9" : "#D4C5F9",
                            }}
                        />
                    ))}
                </div>

                {/* Coffee Cup */}
                <div className="absolute bottom-[15px] -right-2">
                    <svg width="50" height="50" viewBox="0 0 50 50">
                        {/* Cup Handle */}
                        <path
                            d="M35,25 Q42,22 42,30 Q42,38 35,35"
                            fill="none"
                            stroke="#2A2A2A"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        {/* Cup Body */}
                        <path
                            d="M10,20 L10,35 Q10,42 25,42 Q40,42 40,35 L40,20"
                            fill="#F0C5A9" // Pastel Orange
                            stroke="#2A2A2A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* Coffee Liquid */}
                        <ellipse cx="25" cy="20" rx="15" ry="5" fill="#6F4E37" stroke="#2A2A2A" strokeWidth="1" />
                    </svg>

                    {/* Steam Animation */}
                    <motion.div
                        className="absolute -top-4 left-2"
                        animate={{
                            y: [0, -10, -15],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    >
                        <svg width="10" height="20" viewBox="0 0 10 20">
                            <path d="M5,20 Q0,15 5,10 Q10,5 5,0" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                    <motion.div
                        className="absolute -top-6 left-5"
                        animate={{
                            y: [0, -10, -15],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            delay: 0.5,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    >
                        <svg width="10" height="20" viewBox="0 0 10 20">
                            <path d="M5,20 Q10,15 5,10 Q0,5 5,0" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default CodingAnimation;
