'use client';
import { useEffect, useState } from 'react';

/** Internal, unoverrideable square button styles */
const SQUARE =
  'appearance-none select-none grid place-items-center h-10 w-10 aspect-square p-0 rounded-lg ' +
  'border border-input hover:bg-accent transition-colors duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  'motion-reduce:transition-none';

const ACTIVE = 'ring-2 ring-ring ring-offset-2 ring-offset-background';

export function ThemeToggle({ withSystem = false }: { withSystem?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
      setTheme(stored ?? 'system');
    } catch {}
  }, []);

  function apply(next: 'light' | 'dark' | 'system') {
    setTheme(next);
    if (
      typeof window !== 'undefined' &&
      typeof window.__setTheme === 'function'
    ) {
      window.__setTheme(next);
    }
  }

  if (!mounted) {
    return (
      <button className={SQUARE} aria-disabled='true'>
        <SunIcon className='h-5 w-5' />
        <span className='sr-only'>Toggle theme</span>
      </button>
    );
  }

  if (withSystem) {
    return (
      <div className='flex items-center gap-1'>
        <button
          type='button'
          className={`${SQUARE} ${theme === 'light' ? ACTIVE : ''}`}
          aria-label='Use light theme'
          aria-pressed={theme === 'light'}
          onClick={() => apply('light')}
          title='Light'
        >
          <SunIcon className='h-5 w-5' />
        </button>
        <button
          type='button'
          className={`${SQUARE} ${theme === 'dark' ? ACTIVE : ''}`}
          aria-label='Use dark theme'
          aria-pressed={theme === 'dark'}
          onClick={() => apply('dark')}
          title='Dark'
        >
          <MoonIcon className='h-5 w-5' />
        </button>
        <button
          type='button'
          className={`${SQUARE} ${theme === 'system' ? ACTIVE : ''}`}
          aria-label='Follow system theme'
          aria-pressed={theme === 'system'}
          onClick={() => apply('system')}
          title='System'
        >
          <LaptopIcon className='h-5 w-5' />
        </button>
      </div>
    );
  }

  const isDark = theme === 'dark';
  return (
    <button
      type='button'
      className={SQUARE}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => apply(isDark ? 'light' : 'dark')}
      title={isDark ? 'Light' : 'Dark'}
    >
      {isDark ? (
        <SunIcon className='h-5 w-5' />
      ) : (
        <MoonIcon className='h-5 w-5' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </button>
  );
}

/* Inline icons */
function SunIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <path
        d='M12 1v2m0 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}
function MoonIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
function LaptopIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <rect
        x='3'
        y='4'
        width='18'
        height='12'
        rx='2'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <path
        d='M2 20h20'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}

declare global {
  interface Window {
    __setTheme?: (next: 'light' | 'dark' | 'system') => void;
  }
}
