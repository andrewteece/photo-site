// Runs before React to set the correct theme class on <html> and prevent flash.
export function ThemeScript() {
  const code = `
  (function () {
    try {
      const storageKey = 'theme';
      const root = document.documentElement;
      const stored = localStorage.getItem(storageKey);
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored || (systemDark ? 'dark' : 'light');
      if (theme === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
      // Expose a tiny setter for later toggles
      window.__setTheme = function(next) {
        if (next === 'system') {
          localStorage.removeItem(storageKey);
          const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (sysDark) root.classList.add('dark'); else root.classList.remove('dark');
          return;
        }
        localStorage.setItem(storageKey, next);
        if (next === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
      };
      // React to system changes if user chose "system" (no localStorage key)
      if (!stored) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          if (!localStorage.getItem(storageKey)) {
            if (e.matches) root.classList.add('dark'); else root.classList.remove('dark');
          }
        });
      }
    } catch {}
  })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

// Type declarations to keep TS happy when using window.__setTheme
declare global {
  interface Window {
    __setTheme?: (next: 'light' | 'dark' | 'system') => void;
  }
}
