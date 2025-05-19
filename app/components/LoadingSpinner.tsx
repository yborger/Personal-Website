'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <motion.svg
      className="h-12 w-12 text-indigo-500"
      viewBox="25 25 50 50"
      stroke="currentColor"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: 'linear',
      }}
    >
      <circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="90,150"
        strokeDashoffset="0"
      />
    </motion.svg>
  );
}
