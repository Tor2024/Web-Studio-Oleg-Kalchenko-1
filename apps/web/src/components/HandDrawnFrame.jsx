import React from 'react';

export default function HandDrawnFrame({ children, className = "" }) {
    return (
        <div className={`relative ${className}`}>
            {/* Hand-drawn border SVG */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 400 300"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#D4C5F9" />
                        <stop offset="50%" stopColor="#A8D5BA" />
                        <stop offset="100%" stopColor="#F0C5A9" />
                    </linearGradient>
                </defs>

                {/* Main border */}
                <path
                    d="M5,5 Q200,2 395,5 Q398,150 395,295 Q200,298 5,295 Q2,150 5,5"
                    stroke="url(#frameGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    className="drop-shadow-sm"
                />

                {/* Sketchy inner line */}
                <path
                    d="M12,12 Q200,10 388,12 Q390,150 388,288 Q200,290 12,288 Q10,150 12,12"
                    stroke="#2A2A2A"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="6,4"
                    className="opacity-20"
                />
            </svg>

            {/* Content container with padding to sit inside frame */}
            <div className="relative z-10 w-full h-full p-6">
                <div className="w-full h-full overflow-hidden rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
