"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TypewriterText({ text, delay = 5000 }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        let timer;
        const handleTyping = () => {
            const currentLength = displayedText.length;
            const fullLength = text.length;

            if (!isDeleting) {
                // Typing
                if (currentLength < fullLength) {
                    setDisplayedText(text.substring(0, currentLength + 1));
                    timer = setTimeout(handleTyping, 100 + Math.random() * 50); // Random typing speed
                } else {
                    // Finished typing, wait before deleting
                    timer = setTimeout(() => {
                        setIsDeleting(true);
                        handleTyping();
                    }, delay);
                }
            } else {
                // Deleting
                if (currentLength > 0) {
                    setDisplayedText(text.substring(0, currentLength - 1));
                    timer = setTimeout(handleTyping, 50); // Faster deleting speed
                } else {
                    // Finished deleting, start typing again
                    setIsDeleting(false);
                    timer = setTimeout(handleTyping, 500);
                }
            }
        };

        timer = setTimeout(handleTyping, 100);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, text, delay]);

    return (
        <span className="inline-block">
            {displayedText}
            <motion.span
                animate={{ opacity: cursorVisible ? 1 : 0 }}
                transition={{ duration: 0.1 }}
                className="inline-block ml-1 w-[2px] h-[1em] bg-current align-middle"
            />
        </span>
    );
}
