"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Content */}
                {children}

                {/* Transition Overlay (Paint Wipe) */}
                <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none"
                    initial={{ clipPath: "circle(150% at 50% 50%)" }}
                    animate={{ clipPath: "circle(0% at 50% 50%)" }}
                    exit={{ clipPath: "circle(150% at 50% 50%)" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    style={{
                        background: "linear-gradient(135deg, #A8D5BA, #F0C5A9, #D4C5F9)",
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
}
