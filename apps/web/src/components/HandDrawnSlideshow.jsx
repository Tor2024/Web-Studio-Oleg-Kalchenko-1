import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    '/1.webp',
    '/2.webp',
    '/3.webp',
    '/4.webp',
    '/5.webp'
];

export default function HandDrawnSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000); // Slower: Change image every 7 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative aspect-square w-full max-w-lg mx-auto">
            {/* Original Square Gradient Frame */}
            <svg
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                viewBox="0 0 400 400"
                preserveAspectRatio="none"
            >
                <rect
                    x="20"
                    y="20"
                    width="360"
                    height="360"
                    stroke="url(#frameGradient)"
                    strokeWidth="3"
                    fill="none"
                    transform="rotate(2 200 200)"
                    className="hand-drawn-animation"
                />
                <defs>
                    <linearGradient
                        id="frameGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#D4C5F9" />
                        <stop offset="50%" stopColor="#A8D5BA" />
                        <stop offset="100%" stopColor="#F0C5A9" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Image Container */}
            {/* Adjusted padding to be inside the frame (20px offset + stroke) */}
            {/* Added transform rotate-2 to match the frame rotation */}
            <div className="absolute inset-12 z-10 overflow-hidden transform rotate-2">
                <AnimatePresence>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }} // Smooth cross-fade
                        className="absolute inset-0 w-full h-full object-contain" // Absolute positioning for overlap
                    />
                </AnimatePresence>
            </div>

            <div className="absolute -bottom-8 -right-4 opacity-50 z-20">
                <span className="font-caveat text-sm text-[#A8D5BA] transform rotate-12 inline-block">
                    OK Design ✓
                </span>
            </div>
        </div>
    );
}
