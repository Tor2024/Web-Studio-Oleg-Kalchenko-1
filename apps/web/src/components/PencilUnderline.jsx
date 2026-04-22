import { motion } from 'framer-motion';

// Hand-drawn SVG underline used below section headings to reinforce the
// pencil-drawn aesthetic. Draws itself on mount.
export default function PencilUnderline({
  color = '#FF6B6B',
  width = 220,
  className = '',
}) {
  return (
    <svg
      viewBox="0 0 220 14"
      width={width}
      height={14}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        d="M2 8 C 40 2, 80 12, 120 6 S 200 10, 218 5"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
    </svg>
  );
}
