"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const shapes = ["circle", "triangle", "square", "hexagon", "zigzag"];
const colors = [
    "#FFB7B2", // Pastel Red
    "#B5EAD7", // Pastel Mint
    "#C7CEEA", // Pastel Periwinkle
    "#FFDAC1", // Pastel Peach
    "#E2F0CB", // Pastel Lime
    "#A8D5BA", // Original Green
    "#F0C5A9", // Original Orange
    "#D4C5F9", // Original Purple
];

export default function FloatingShapes() {
    const containerRef = useRef(null);
    const [elements, setElements] = useState([]);
    const requestRef = useRef();

    useEffect(() => {
        // Initialize shapes
        const randomShapes = Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            rotation: Math.random() * 360,
            vRotation: (Math.random() - 0.5) * 0.5,
            type: shapes[Math.floor(Math.random() * shapes.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 30 + Math.random() * 40,
        }));

        // Add the girl specifically
        const girl = {
            id: "girl",
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            vx: (Math.random() - 0.5) * 0.5, // Much slower velocity
            vy: (Math.random() - 0.5) * 0.5,
            rotation: Math.random() * 20 - 10, // Less rotation for the girl
            vRotation: (Math.random() - 0.5) * 0.2,
            type: "girl",
            color: "#F0C5A9", // Skin/Dress tone
            size: 60, // Slightly larger
        };

        setElements([...randomShapes, girl]);

        const animate = () => {
            setElements((prevElements) => {
                return prevElements.map((el) => {
                    let { x, y, vx, vy, rotation, vRotation, size } = el;

                    // Update position
                    x += vx;
                    y += vy;
                    rotation += vRotation;

                    // Bounce off edges
                    if (containerRef.current) {
                        const { width, height } = containerRef.current.getBoundingClientRect();

                        if (x <= 0 || x + size >= width) {
                            vx = -vx;
                            x = x <= 0 ? 0 : width - size;
                        }
                        if (y <= 0 || y + size >= height) {
                            vy = -vy;
                            y = y <= 0 ? 0 : height - size;
                        }
                    }

                    return { ...el, x, y, vx, vy, rotation };
                });
            });
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const renderShape = (type, color, size) => {
        const strokeWidth = 2.5;
        const props = {
            width: size,
            height: size,
            viewBox: "0 0 50 50",
            fill: "none",
            stroke: color,
            strokeWidth: strokeWidth,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "opacity-60",
        };

        switch (type) {
            case "girl":
                return (
                    <svg {...props} viewBox="0 0 60 100">
                        {/* Head */}
                        <circle cx="30" cy="20" r="10" />
                        {/* Hair */}
                        <path d="M20 20 Q10 25 15 35" />
                        <path d="M40 20 Q50 25 45 35" />
                        {/* Dress/Body */}
                        <path d="M30 30 L15 70 L45 70 Z" />
                        {/* Arms */}
                        <path d="M30 35 L15 45" />
                        <path d="M30 35 L45 45" />
                        {/* Legs */}
                        <path d="M25 70 L25 90" />
                        <path d="M35 70 L35 90" />
                    </svg>
                );
            case "circle":
                return (
                    <svg {...props}>
                        <circle cx="25" cy="25" r="20" />
                    </svg>
                );
            case "triangle":
                return (
                    <svg {...props}>
                        <path d="M25 5 L45 40 L5 40 Z" />
                    </svg>
                );
            case "square":
                return (
                    <svg {...props}>
                        <rect x="10" y="10" width="30" height="30" rx="5" />
                    </svg>
                );
            case "hexagon":
                return (
                    <svg {...props}>
                        <path d="M25 5 L45 15 L45 35 L25 45 L5 35 L5 15 Z" />
                    </svg>
                );
            case "zigzag":
                return (
                    <svg {...props}>
                        <path d="M5 25 L15 10 L25 40 L35 10 L45 25" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {elements.map((el) => (
                <div
                    key={el.id}
                    className="absolute will-change-transform"
                    style={{
                        transform: `translate3d(${el.x}px, ${el.y}px, 0) rotate(${el.rotation}deg)`,
                        width: el.size,
                        height: el.size,
                    }}
                >
                    {renderShape(el.type, el.color, el.size)}
                </div>
            ))}
        </div>
    );
}
