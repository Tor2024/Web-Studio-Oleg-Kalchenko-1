import React from "react";
import { motion } from "framer-motion";

const BusAnimation = () => {
    return (
        <div className="relative w-48 h-32 overflow-visible pointer-events-none">
            <motion.div
                animate={{
                    x: [-20, 100, -20],
                    y: [0, -2, 0],
                }}
                transition={{
                    x: {
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    },
                    y: {
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    },
                }}
                className="relative"
            >
                {/* Bus Body */}
                <svg width="180" height="120" viewBox="0 0 180 120" className="drop-shadow-sm">
                    {/* Main Body */}
                    <path
                        d="M10,40 L160,40 Q170,40 170,50 L170,90 Q170,100 160,100 L10,100 Q0,100 0,90 L0,50 Q0,40 10,40"
                        fill="#F0C5A9" // Pastel Orange/Beige
                        stroke="#2A2A2A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Roof/Windows Area */}
                    <path
                        d="M10,40 L10,20 Q10,10 20,10 L150,10 Q160,10 160,20 L160,40"
                        fill="#A8D5BA" // Pastel Green
                        stroke="#2A2A2A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Windows */}
                    <rect x="20" y="15" width="30" height="20" rx="2" fill="#E8F4F8" stroke="#2A2A2A" strokeWidth="1.5" />
                    <rect x="60" y="15" width="30" height="20" rx="2" fill="#E8F4F8" stroke="#2A2A2A" strokeWidth="1.5" />
                    <rect x="100" y="15" width="30" height="20" rx="2" fill="#E8F4F8" stroke="#2A2A2A" strokeWidth="1.5" />

                    {/* Headlight */}
                    <circle cx="165" cy="85" r="3" fill="#FFD700" stroke="#2A2A2A" strokeWidth="1" />

                    {/* Bumper */}
                    <path d="M165,95 L172,95" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" />

                    {/* Text "NEWS" */}
                    <text
                        x="85"
                        y="80"
                        fontFamily="'Caveat', cursive"
                        fontSize="24"
                        fontWeight="bold"
                        fill="#2A2A2A"
                        textAnchor="middle"
                        className="select-none"
                    >
                        NEWS
                    </text>

                    {/* Stripe */}
                    <path d="M0,60 L170,60" stroke="#D4C5F9" strokeWidth="2" strokeDasharray="5,5" />
                </svg>

                {/* Wheels */}
                <motion.div
                    className="absolute top-[90px] left-[25px]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <svg width="30" height="30" viewBox="0 0 30 30">
                        <circle cx="15" cy="15" r="12" fill="#4A4A4A" stroke="#2A2A2A" strokeWidth="2" />
                        <circle cx="15" cy="15" r="4" fill="#D4C5F9" />
                        <path d="M15,3 L15,27 M3,15 L27,15" stroke="#D4C5F9" strokeWidth="2" />
                    </svg>
                </motion.div>

                <motion.div
                    className="absolute top-[90px] left-[115px]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <svg width="30" height="30" viewBox="0 0 30 30">
                        <circle cx="15" cy="15" r="12" fill="#4A4A4A" stroke="#2A2A2A" strokeWidth="2" />
                        <circle cx="15" cy="15" r="4" fill="#D4C5F9" />
                        <path d="M15,3 L15,27 M3,15 L27,15" stroke="#D4C5F9" strokeWidth="2" />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Exhaust Fumes */}
            <motion.div
                className="absolute top-[95px] -left-4"
                animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.5, 2],
                    x: [0, -20, -40],
                    y: [0, -10, -20]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            >
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" fill="#CCCCCC" opacity="0.5" />
                </svg>
            </motion.div>
        </div>
    );
};

export default BusAnimation;
