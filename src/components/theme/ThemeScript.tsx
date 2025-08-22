// Runs before React to set the correct theme class on <html>,
// prevent flash, and keep the favicon in sync with theme.
export function ThemeScript() {
  const code = `
  (function () {
    try {
      const storageKey = 'theme';
      const LIGHT = '/brand/logo-mark-light.png';
      const DARK  = '/brand/logo-mark-dark.png';
      const root = document.documentElement;
      const stored = localStorage.getItem(storageKey);
      const systemMql = window.matchMedia('(prefers-color-scheme: dark)');
      const systemDark = systemMql.matches;

      function setFavicon(src) {
        var link = document.getElementById('site-favicon');
        if (!link) {
          link = document.createElement('link');
          link.id = 'site-favicon';
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        if (link.getAttribute('href') !== src) link.setAttribute('href', src);
      }

      function apply(theme) {
        if (theme === 'dark') {
          root.classList.add('dark');
          setFavicon(DARK);
        } else {
          root.classList.remove('dark');
          setFavicon(LIGHT);
        }
      }

      // Initial theme
      var theme = stored || (systemDark ? 'dark' : 'light');
      apply(theme);

      // Public setter for toggles
      window.__setTheme = function(next) {
        if (next === 'system') {
          localStorage.removeItem(storageKey);
          apply(systemMql.matches ? 'dark' : 'light');
          return;
        }
        localStorage.setItem(storageKey, next);
        apply(next);
      };

      // Follow system if user hasn't chosen a theme
      if (!stored) {
        systemMql.addEventListener('change', function (e) {
          if (!localStorage.getItem(storageKey)) {
            apply(e.matches ? 'dark' : 'light');
          }
        });
      }
    } catch {}
  })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

declare global {
  interface Window {
    __setTheme?: (next: 'light' | 'dark' | 'system') => void;
  }
}
