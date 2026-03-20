'use client';

import { motion } from 'framer-motion';

export function ScrollIndicator() {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={handleClick}
      className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10 focus:outline-none group'
      aria-label='Scroll down'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div
        className='flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors'
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className='text-xs uppercase tracking-widest'>Scroll</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 13.5l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </motion.div>
    </motion.button>
  );
}
