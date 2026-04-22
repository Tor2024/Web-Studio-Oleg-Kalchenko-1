import React from "react";
import { motion } from "framer-motion";

const BusAnimationVariant = () => {
    return (
        <div className="relative w-48 h-40 overflow-visible pointer-events-none">
            <motion.div
                animate={{
                    x: [-20, 100, -20],
                    y: [0, -2, 0],
                }}
                transition={{
                    x: {
                        duration: 18, // Slightly slower
                        repeat: Infinity,
                        ease: "linear",
                    },
                    y: {
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    },
                }}
                className="relative"
            >
                {/* Bus Body - Double Decker Style */}
                <svg width="180" height="140" viewBox="0 0 180 140" className="drop-shadow-sm">
                    {/* Main Body (Lower Deck) */}
                    <path
                        d="M10,70 L160,70 Q170,70 170,80 L170,110 Q170,120 160,120 L10,120 Q0,120 0,110 L0,80 Q0,70 10,70"
                        fill="#AEC6CF" // Pastel Blue
                        stroke="#2A2A2A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Upper Deck */}
                    <path
                        d="M10,70 L10,30 Q10,20 20,20 L150,20 Q160,20 160,30 L160,70"
                        fill="#FDFD96" // Pastel Yellow
                        stroke="#2A2A2A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Windows Upper Deck */}
                    <rect x="20" y="30" width="25" height="25" rx="2" fill="#E8F4F8" stroke="#2A2A2A" strokeWidth="1.5" />
                    <rect x="55" y="30" width="25" height="25" rx="2" fill="#E8F4F8" stroke="#2A2A2A" strokeWidth="1.5" />
                    <rect x="90" y="30" width="25" height="25" rx="2" fill="#E8F4F8" stroke="#2A2A2A" strokeWidth="1.5" />
                    <rect x="125" y="30" width="25" height="25" rx="2" fill="#E8F4F8" stroke="#2A2A2A" strokeWidth="1.5" />

                    {/* Windows Lower Deck */}
                    <rect x="20" y="80" width="30" height="25" rx="2" fill="#E8F4F8" stroke="#2A2A2A" strokeWidth="1.5" />
                    <rect x="60" y="80" width="30" height="25" rx="2" fill="#E8F4F8" stroke="#2A2A2A" strokeWidth="1.5" />

                    {/* Door */}
                    <rect x="130" y="70" width="30" height="50" rx="2" fill="#E8F4F8" stroke="#2A2A2A" strokeWidth="1.5" />
                    <line x1="145" y1="70" x2="145" y2="120" stroke="#2A2A2A" strokeWidth="1.5" />

                    {/* Headlight */}
                    <circle cx="165" cy="105" r="4" fill="#FFD700" stroke="#2A2A2A" strokeWidth="1" />

                    {/* Bumper */}
                    <path d="M165,115 L172,115" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" />

                    {/* Text "BLOG" */}
                    <text
                        x="90"
                        y="100"
                        fontFamily="'Caveat', cursive"
                        fontSize="20"
                        fontWeight="bold"
                        fill="#2A2A2A"
                        textAnchor="middle"
                        className="select-none"
                    >
                        BLOG
                    </text>

                    {/* Stripe */}
                    <path d="M0,70 L170,70" stroke="#2A2A2A" strokeWidth="2" />
                </svg>

                {/* Wheels */}
                <motion.div
                    className="absolute top-[110px] left-[25px]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <svg width="30" height="30" viewBox="0 0 30 30">
                        <circle cx="15" cy="15" r="12" fill="#4A4A4A" stroke="#2A2A2A" strokeWidth="2" />
                        <circle cx="15" cy="15" r="4" fill="#FDFD96" />
                        <path d="M15,3 L15,27 M3,15 L27,15" stroke="#FDFD96" strokeWidth="2" />
                    </svg>
                </motion.div>

                <motion.div
                    className="absolute top-[110px] left-[115px]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <svg width="30" height="30" viewBox="0 0 30 30">
                        <circle cx="15" cy="15" r="12" fill="#4A4A4A" stroke="#2A2A2A" strokeWidth="2" />
                        <circle cx="15" cy="15" r="4" fill="#FDFD96" />
                        <path d="M15,3 L15,27 M3,15 L27,15" stroke="#FDFD96" strokeWidth="2" />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Exhaust Fumes - Different style */}
            <motion.div
                className="absolute top-[115px] -left-4"
                animate={{
                    opacity: [0, 0.6, 0],
                    scale: [0.5, 1.2, 1.8],
                    x: [0, -15, -30],
                    y: [0, -5, -15]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            >
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M10,10 Q15,5 20,10 Q15,15 10,10" fill="#CCCCCC" opacity="0.5" />
                </svg>
            </motion.div>
        </div>
    );
};

export default BusAnimationVariant;
