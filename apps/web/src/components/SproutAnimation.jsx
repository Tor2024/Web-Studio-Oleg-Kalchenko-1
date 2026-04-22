import React from "react";
import { motion } from "framer-motion";

const SproutAnimation = () => {
    return (
        <div className="relative w-32 h-32 overflow-visible pointer-events-none">
            {/* Pot */}
            <svg width="100" height="100" viewBox="0 0 100 100" className="absolute bottom-0 left-1/2 -translate-x-1/2 drop-shadow-sm">
                <path
                    d="M20,40 L80,40 L70,90 Q70,95 65,95 L35,95 Q30,95 30,90 L20,40"
                    fill="#E07A5F" // Terracotta
                    stroke="#2A2A2A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15,40 L85,40 L85,30 Q85,25 80,25 L20,25 Q15,25 15,30 L15,40"
                    fill="#F2CC8F" // Rim color
                    stroke="#2A2A2A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {/* Stem */}
            <motion.div
                className="absolute bottom-[60px] left-1/2 -translate-x-1/2 origin-bottom"
                animate={{ skewX: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg width="40" height="60" viewBox="0 0 40 60" className="overflow-visible">
                    <path
                        d="M20,60 Q20,30 20,10"
                        stroke="#81B29A" // Green stem
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Left Leaf */}
                    <motion.path
                        d="M20,40 Q5,35 10,25 Q20,30 20,40"
                        fill="#A8D5BA"
                        stroke="#2A2A2A"
                        strokeWidth="1.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Right Leaf */}
                    <motion.path
                        d="M20,30 Q35,25 30,15 Q20,20 20,30"
                        fill="#A8D5BA"
                        stroke="#2A2A2A"
                        strokeWidth="1.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    />

                    {/* Blooming Flower/New Leaf at top */}
                    <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 2, ease: "backOut" }}
                    >
                        <circle cx="20" cy="10" r="6" fill="#F4F1DE" stroke="#2A2A2A" strokeWidth="1.5" />
                        <circle cx="20" cy="10" r="3" fill="#F2CC8F" />
                        {/* Petals */}
                        <path d="M20,4 Q24,0 28,4" fill="none" stroke="#2A2A2A" strokeWidth="1" />
                        <path d="M28,10 Q32,14 28,18" fill="none" stroke="#2A2A2A" strokeWidth="1" />
                        <path d="M20,16 Q16,20 12,16" fill="none" stroke="#2A2A2A" strokeWidth="1" />
                        <path d="M12,10 Q8,6 12,4" fill="none" stroke="#2A2A2A" strokeWidth="1" />
                    </motion.g>
                </svg>
            </motion.div>

            {/* Floating Particles */}
            <motion.div
                className="absolute top-0 right-0"
                animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <svg width="10" height="10"><circle cx="5" cy="5" r="2" fill="#F2CC8F" /></svg>
            </motion.div>
        </div>
    );
};

export default SproutAnimation;
