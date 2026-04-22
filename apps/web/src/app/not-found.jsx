import React from 'react';
import { Link } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const meta = () => {
    return [
        { title: "404 - Page Not Found | Web Studio Oleh Kalchenko" },
    ];
};

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-[#FEFEFE] font-kalam text-[#2A2A2A] flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden">

                {/* Hand-drawn 404 SVG */}
                <div className="relative mb-8">
                    <svg width="300" height="150" viewBox="0 0 300 150" className="mx-auto">
                        <path d="M50,120 Q80,20 110,120 M70,80 L90,80" stroke="#F0C5A9" strokeWidth="8" fill="none" strokeLinecap="round" className="hand-drawn-animation" />
                        <circle cx="150" cy="70" r="40" stroke="#A8D5BA" strokeWidth="8" fill="none" className="hand-drawn-animation" style={{ animationDelay: '0.5s' }} />
                        <path d="M210,120 Q240,20 270,120 M230,80 L250,80" stroke="#D4C5F9" strokeWidth="8" fill="none" strokeLinecap="round" className="hand-drawn-animation" style={{ animationDelay: '1s' }} />
                    </svg>
                </div>

                <h1 className="font-caveat text-5xl md:text-7xl font-bold mb-4">
                    Oops! Page not found.
                </h1>
                <p className="text-xl text-[#5A5A5A] mb-8 max-w-md">
                    It seems you've wandered off the map. Let's get you back on track.
                </p>

                <Link
                    to="/"
                    className="inline-block px-8 py-3 bg-[#2A2A2A] text-white font-kalam rounded-full hover:bg-[#4A4A4A] transition-colors transform hover:rotate-1"
                >
                    Back to Home
                </Link>

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-10 opacity-20 animate-squiggle">
                    <svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" stroke="#F0C5A9" strokeWidth="2" fill="none" /></svg>
                </div>
                <div className="absolute bottom-1/4 right-10 opacity-20 animate-squiggle" style={{ animationDelay: '1s' }}>
                    <svg width="50" height="50" viewBox="0 0 50 50"><rect x="10" y="10" width="30" height="30" stroke="#A8D5BA" strokeWidth="2" fill="none" transform="rotate(15 25 25)" /></svg>
                </div>
            </main>
            <Footer />
        </div>
    );
}
