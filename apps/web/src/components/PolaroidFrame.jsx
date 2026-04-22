import React from 'react';
import { motion } from 'framer-motion';

export default function PolaroidFrame({ src, alt, className = "" }) {
    return (
        <div className={`relative group ${className}`}>
            {/* Shadow */}
            <div className="absolute inset-0 bg-black/20 transform translate-x-2 translate-y-2 rotate-2 rounded-sm blur-sm z-0"></div>

            {/* Polaroid Card */}
            <div className="relative bg-white p-3 pb-12 shadow-lg transform -rotate-1 transition-transform duration-300 group-hover:rotate-0 z-10">
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-[#F0F0F0] opacity-80 rotate-1 z-20" style={{ clipPath: 'polygon(0% 10%, 5% 0%, 95% 5%, 100% 15%, 98% 90%, 90% 100%, 5% 95%, 0% 85%)' }}></div>

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-contain"
                    />
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none"></div>
                </div>

                {/* Caption area */}
                <div className="absolute bottom-2 left-0 w-full text-center">
                    <span className="font-kalam text-[#2A2A2A] text-lg opacity-80">Oleh Kalchenko</span>
                </div>

                {/* Decorative doodles */}
                <svg className="absolute -bottom-4 -right-4 w-12 h-12 text-[#D4C5F9] z-30 transform rotate-12" viewBox="0 0 50 50">
                    <path d="M25,2 L28,18 L45,18 L32,28 L36,45 L25,35 L14,45 L18,28 L5,18 L22,18 Z" fill="none" stroke="currentColor" strokeWidth="2" className="hand-drawn-animation" />
                </svg>
            </div>
        </div>
    );
}
