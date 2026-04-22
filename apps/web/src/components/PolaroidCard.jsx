"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function PolaroidCard({ image, title, description, rotation = 0, link, linkText, date, author }) {
    const [randomRotation, setRandomRotation] = useState(0);

    useEffect(() => {
        // If no rotation prop is provided, generate a random one between -6 and 6
        if (rotation === 0) {
            setRandomRotation(Math.random() * 12 - 6);
        } else {
            setRandomRotation(rotation);
        }
    }, [rotation]);

    return (
        <motion.div
            className="relative group cursor-pointer"
            initial={{ rotate: randomRotation, scale: 0.9 }}
            whileHover={{
                rotate: 0,
                scale: 1.05,
                zIndex: 10,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
            }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            {/* Shadow element */}
            <div className="absolute inset-0 bg-black/20 transform translate-x-2 translate-y-2 rotate-1 blur-sm rounded-sm transition-all duration-300 group-hover:translate-x-4 group-hover:translate-y-4 group-hover:blur-md" />

            {/* Card Body */}
            <div className="relative bg-white p-3 pb-12 shadow-lg rounded-sm border border-gray-100">
                {/* Image Area */}
                <div className="aspect-video bg-gray-100 mb-4 overflow-hidden relative">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover object-top transition-all duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                        </div>
                    )}

                    {/* Tape effect */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm border-l border-r border-white/60 rotate-1 shadow-sm z-10"></div>
                </div>

                {/* Handwritten Text */}
                <div className="text-center">
                    <h3 className="font-caveat text-2xl text-[#2A2A2A] font-bold mb-1 group-hover:text-[#A8D5BA] transition-colors">
                        {title}
                    </h3>
                    <p className="font-kalam text-sm text-gray-500 line-clamp-3 mb-3">
                        {description}
                    </p>
                    {link && (
                        <a href={link} className="inline-block font-kalam text-[#A8D5BA] hover:text-[#D4C5F9] transition-colors border-b border-[#A8D5BA] hover:border-[#D4C5F9] mb-4">
                            {linkText || "View More"}
                        </a>
                    )}

                    <div className="mt-2 pt-3 border-t border-gray-100">
                        {date && (
                            <p className="font-kalam text-xs text-gray-400 mb-1">
                                {date}
                            </p>
                        )}
                        {author && (
                            <p className="font-caveat text-sm text-[#D4C5F9]">
                                {author}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
