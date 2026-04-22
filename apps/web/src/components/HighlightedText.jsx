import React from 'react';
import { motion } from 'framer-motion';

/**
 * HighlightedText – renders a string with animated highlighter markers behind
 * specific words. The markers appear with a "drawing" effect and use the
 * brand gradient colors. The component is lightweight and can be used in any
 * place where a slogan or headline needs emphasis.
 */
export default function HighlightedText({ text, highlights }) {
    // Split the text into words while preserving spaces
    const parts = text.split(/(\s+)/);

    // Helper to find highlight config for a word (case‑sensitive match)
    const getHighlight = (word) =>
        highlights?.find((h) => h.word && h.word.toLowerCase() === word.toLowerCase());

    return (
        <span className="relative inline-block">
            {parts.map((part, i) => {
                const highlight = getHighlight(part);
                if (highlight) {
                    return (
                        <span key={i} className="relative inline-block mx-0.5">
                            {/* Marker – animated background */}
                            <motion.span
                                className="absolute inset-0 -z-10 rounded-sm"
                                style={{ backgroundColor: highlight.color, opacity: 0.4 }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                            />
                            {/* Sketchy border around the marker */}
                            <motion.span
                                className="absolute inset-0 -z-10 rounded-sm border border-dashed"
                                style={{ borderColor: highlight.color, opacity: 0.6 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: i * 0.15 + 0.2, ease: 'easeOut' }}
                            />
                            {part}
                        </span>
                    );
                }
                // Regular whitespace or non‑highlighted word
                return <span key={i}>{part}</span>;
            })}
        </span>
    );
}
