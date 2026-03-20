'use client';

import { reportWebVitals } from '@/lib/analytics';
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
    if (process.env.NODE_ENV === 'production') {
      reportWebVitals(metric);
    }

    // Warn about poor metrics
    if (metric.rating === 'poor') {
      console.warn(
        `[Performance] ${metric.name} is ${metric.rating}:`,
        Math.round(metric.value),
      );
    }
  });

  return null;
}
