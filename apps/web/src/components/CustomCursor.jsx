"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsVisible(true);
        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-multiply"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full transform -rotate-12"
            >
                <path
                    d="M28.5 3.5L24.5 7.5L21.5 4.5L25.5 0.5L28.5 3.5Z"
                    fill="#F0C5A9"
                    stroke="#2A2A2A"
                    strokeWidth="1.5"
                />
                <path
                    d="M21.5 4.5L24.5 7.5L10.5 21.5L4.5 24.5L7.5 18.5L21.5 4.5Z"
                    fill="#A8D5BA"
                    stroke="#2A2A2A"
                    strokeWidth="1.5"
                />
                <path
                    d="M4.5 24.5L7.5 18.5L6 17L3 20L4.5 24.5Z"
                    fill="#D4C5F9"
                    stroke="#2A2A2A"
                    strokeWidth="1.5"
                />
                <path
                    d="M3 20L4.5 24.5L0.5 28.5L3 20Z"
                    fill="#2A2A2A"
                />
            </svg>
        </motion.div>
    );
}
