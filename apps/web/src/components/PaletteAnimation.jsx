import React from "react";
import { motion } from "framer-motion";

const PaletteAnimation = () => {
    return (
        <div className="relative w-48 h-32 overflow-visible pointer-events-none">
            <motion.div
                animate={{
                    rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="relative"
            >
                {/* Palette Body */}
                <svg width="160" height="120" viewBox="0 0 160 120" className="drop-shadow-sm">
                    <path
                        d="M20,60 Q20,20 60,20 L100,20 Q140,20 140,60 Q140,100 100,100 Q90,100 80,90 Q70,80 60,90 Q50,100 40,100 Q20,100 20,60"
                        fill="#DEB887" // Burlywood/Wooden color
                        stroke="#2A2A2A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Thumb Hole */}
                    <circle cx="40" cy="50" r="8" fill="#FEFEFE" stroke="#2A2A2A" strokeWidth="2" />

                    {/* Paint Blobs */}
                    <circle cx="70" cy="40" r="10" fill="#FF6B6B" opacity="0.8" /> {/* Red */}
                    <circle cx="100" cy="35" r="10" fill="#4ECDC4" opacity="0.8" /> {/* Teal */}
                    <circle cx="120" cy="60" r="10" fill="#FFE66D" opacity="0.8" /> {/* Yellow */}
                    <circle cx="105" cy="85" r="10" fill="#D4C5F9" opacity="0.8" /> {/* Lavender */}
                    <circle cx="75" cy="80" r="8" fill="#A8D5BA" opacity="0.8" /> {/* Green */}
                </svg>

                {/* Animated Brush */}
                <motion.div
                    className="absolute top-0 right-0"
                    animate={{
                        x: [0, -20, -10, 0],
                        y: [0, 20, 10, 0],
                        rotate: [0, -15, -5, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <svg width="60" height="80" viewBox="0 0 60 80">
                        {/* Handle */}
                        <path
                            d="M40,10 L50,0 L55,5 L45,15 L40,10"
                            fill="#8B4513"
                            stroke="#2A2A2A"
                            strokeWidth="1"
                        />
                        <path
                            d="M40,10 L20,60"
                            stroke="#8B4513"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                        {/* Metal Ferrule */}
                        <rect x="18" y="58" width="8" height="10" fill="#C0C0C0" stroke="#2A2A2A" strokeWidth="1" transform="rotate(20 22 63)" />
                        {/* Bristles */}
                        <path
                            d="M16,68 Q10,75 15,80 Q25,78 24,68"
                            fill="#D4C5F9" // Dipped in lavender paint
                            stroke="#2A2A2A"
                            strokeWidth="1"
                        />
                    </svg>
                </motion.div>

                {/* Floating Sparkles/Magic */}
                <motion.div
                    className="absolute top-0 right-10"
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20">
                        <path d="M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8 Z" fill="#FFD700" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PaletteAnimation;
