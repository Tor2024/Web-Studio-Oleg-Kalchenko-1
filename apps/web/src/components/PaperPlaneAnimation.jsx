import React from "react";
import { motion } from "framer-motion";

const PaperPlaneAnimation = () => {
    return (
        <div className="relative w-48 h-32 overflow-visible pointer-events-none">
            {/* Flight Path (Dashed Line) */}
            <svg width="200" height="120" viewBox="0 0 200 120" className="absolute top-0 left-0 opacity-40">
                <path
                    d="M10,60 Q40,20 80,40 T160,60"
                    fill="none"
                    stroke="#A8D5BA"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                />
            </svg>

            {/* Paper Plane */}
            <motion.div
                className="absolute top-0 left-0"
                animate={{
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    offsetPath: "path('M10,60 Q40,20 80,40 T160,60')",
                    offsetRotate: "auto",
                }}
            >
                <svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: "rotate(90deg)" }}>
                    <path
                        d="M20,5 L35,35 L20,28 L5,35 L20,5"
                        fill="#FEFEFE"
                        stroke="#2A2A2A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20,5 L20,28"
                        stroke="#2A2A2A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </motion.div>

            {/* Secondary looping plane for more activity */}
            <motion.div
                className="absolute top-10 left-10"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [0.8, 1, 0.8]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            >
                {/* Simple smaller plane */}
                <svg width="30" height="30" viewBox="0 0 30 30">
                    <path
                        d="M15,2 L28,28 L15,22 L2,28 L15,2"
                        fill="#E8F4F8"
                        stroke="#2A2A2A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>
        </div>
    );
};

export default PaperPlaneAnimation;
