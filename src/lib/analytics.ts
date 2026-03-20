// Analytics utilities for Google Analytics 4 and other providers

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track Core Web Vitals
export const reportWebVitals = (metric: {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}) => {
  if (!window.gtag) return;
  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(
      metric.name === 'CLS' ? metric.value * 1000 : metric.value,
    ),
    event_label: metric.id,
    non_interaction: true,
  });
};

// Track image views (for portfolio analytics)
export const trackImageView = (imageName: string, location: string) => {
  event({
    action: 'view_image',
    category: 'Portfolio',
    label: `${location}:${imageName}`,
  });
};

// Track lightbox opens
export const trackLightboxOpen = (imageName: string) => {
  event({
    action: 'open_lightbox',
    category: 'Engagement',
    label: imageName,
  });
};

// Track contact form submissions
export const trackContactSubmit = () => {
  event({
    action: 'submit_contact',
    category: 'Conversion',
  });
};

// Track social link clicks
export const trackSocialClick = (platform: string) => {
  event({
    action: 'click_social',
    category: 'Engagement',
    label: platform,
  });
};
