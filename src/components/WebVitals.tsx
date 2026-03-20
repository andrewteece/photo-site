'use client';

import { useReportWebVitals } from 'next/web-vitals';

type Metric = {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
};

export function WebVitals() {
  useReportWebVitals((metric: Metric) => {
    // Log metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
      });
    }

    // Send to analytics in production
    // Examples:
    // - Google Analytics: gtag('event', metric.name, { value: metric.value })
    // - Vercel Analytics: analytics.track(metric.name, { value: metric.value })
    // - Custom endpoint: fetch('/api/vitals', { method: 'POST', body: JSON.stringify(metric) })

    // For now, just log key metrics
    if (metric.rating === 'poor') {
      console.warn(
        `[Performance] ${metric.name} is ${metric.rating}:`,
        Math.round(metric.value),
      );
    }
  });

  return null;
}
