import { motion } from 'framer-motion';

// Introduces the designer (Oleh) as a sketched polaroid portrait. Used on the
// home page between services and featured projects so visitors see who is
// behind the studio in the hand-drawn style.
export default function DesignerCard({ name, role, bio, quote }) {
  const portraitVariants = {
    hidden: { opacity: 0, y: 20, rotate: -4 },
    visible: { opacity: 1, y: 0, rotate: -3 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 items-center">
      <motion.div
        variants={portraitVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        className="relative mx-auto w-[260px] bg-white p-4 pb-10 shadow-[0_6px_24px_rgba(0,0,0,0.08)]"
        style={{
          borderTop: '1.5px solid #2A2A2A',
          borderLeft: '1.5px solid #2A2A2A',
          borderRight: '1.5px solid #2A2A2A',
          borderBottom: '1.5px solid #2A2A2A',
          transform: 'rotate(-3deg)',
        }}
      >
        <svg
          viewBox="0 0 220 220"
          className="w-full aspect-square bg-[#FBF6EF]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sketchGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F0C5A9" />
              <stop offset="100%" stopColor="#D4C5F9" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="110"
            cy="86"
            r="40"
            fill="none"
            stroke="#2A2A2A"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
          <motion.path
            d="M46 210 Q 60 144 110 144 Q 160 144 174 210"
            fill="none"
            stroke="#2A2A2A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
          />
          <motion.path
            d="M95 80 Q 100 78 105 80"
            stroke="#2A2A2A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
          />
          <motion.path
            d="M115 80 Q 120 78 125 80"
            stroke="#2A2A2A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7 }}
          />
          <motion.path
            d="M96 100 Q 110 110 124 100"
            stroke="#FF6B6B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          />
          <motion.circle
            cx="46"
            cy="210"
            r="6"
            fill="url(#sketchGrad)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.1 }}
          />
          <motion.circle
            cx="174"
            cy="210"
            r="6"
            fill="url(#sketchGrad)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.2 }}
          />
        </svg>
        <p className="font-caveat text-2xl text-[#2A2A2A] text-center mt-3">{name}</p>
        <p className="font-kalam text-xs text-[#666] text-center">{role}</p>
      </motion.div>

      <div>
        <p className="font-kalam text-lg text-[#2A2A2A] leading-relaxed mb-4">{bio}</p>
        {quote ? (
          <blockquote className="font-caveat text-2xl text-[#5A5A5A] border-l-4 border-[#FF6B6B] pl-4 italic">
            “{quote}”
          </blockquote>
        ) : null}
      </div>
    </div>
  );
}
