import { useEffect } from 'react';

// Core Web Vitals tracking
interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Performance thresholds based on Google's Core Web Vitals
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }  // Time to First Byte
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_rating: metric.rating,
        metric_delta: metric.delta
      }
    });
  }

  // Send to custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      })
    }).catch(error => {
      console.warn('Failed to send web vitals data:', error);
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta
    });
  }
}

function getCLS(onPerfEntry: (metric: WebVitalsMetric) => void) {
  let clsValue = 0;
  let clsEntries: LayoutShift[] = [];
  let sessionValue = 0;
  let sessionEntries: LayoutShift[] = [];

  const entryHandler = (entry: LayoutShift) => {
    if (!entry.hadRecentInput) {
      const firstSessionEntry = sessionEntries[0];
      const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

      if (sessionValue &&
          entry.startTime - lastSessionEntry.startTime < 1000 &&
          entry.startTime - firstSessionEntry.startTime < 5000) {
        sessionValue += entry.value;
        sessionEntries.push(entry);
      } else {
        sessionValue = entry.value;
        sessionEntries = [entry];
      }

      if (sessionValue > clsValue) {
        clsValue = sessionValue;
        clsEntries = [...sessionEntries];

        onPerfEntry({
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
          delta: clsValue,
          id: `${clsEntries[0].startTime}-${clsEntries[clsEntries.length - 1].startTime}`
        });
      }
    }
  };

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(entryHandler as any);
  });

  observer.observe({ type: 'layout-shift', buffered: true });
}

function getFID(onPerfEntry: (metric: WebVitalsMetric) => void) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      if (entry.processingStart && entry.startTime) {
        const value = entry.processingStart - entry.startTime;
        onPerfEntry({
          name: 'FID',
          value,
          rating: getRating('FID', value),
          delta: value,
          id: entry.startTime.toString()
        });
      }
    });
  });

  observer.observe({ type: 'first-input', buffered: true });
}

function getLCP(onPerfEntry: (metric: WebVitalsMetric) => void) {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as any;
    
    if (lastEntry) {
      onPerfEntry({
        name: 'LCP',
        value: lastEntry.startTime,
        rating: getRating('LCP', lastEntry.startTime),
        delta: lastEntry.startTime,
        id: lastEntry.startTime.toString()
      });
    }
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });
}

function getFCP(onPerfEntry: (metric: WebVitalsMetric) => void) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      if (entry.name === 'first-contentful-paint') {
        onPerfEntry({
          name: 'FCP',
          value: entry.startTime,
          rating: getRating('FCP', entry.startTime),
          delta: entry.startTime,
          id: entry.startTime.toString()
        });
      }
    });
  });

  observer.observe({ type: 'paint', buffered: true });
}

function getTTFB(onPerfEntry: (metric: WebVitalsMetric) => void) {
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (navigationEntry) {
    const value = navigationEntry.responseStart - navigationEntry.requestStart;
    onPerfEntry({
      name: 'TTFB',
      value,
      rating: getRating('TTFB', value),
      delta: value,
      id: navigationEntry.startTime.toString()
    });
  }
}

// Resource loading performance
function trackResourcePerformance() {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      if (entry.duration > 1000) { // Track slow resources (>1s)
        if (typeof window !== 'undefined') {
          fetch('/api/analytics/slow-resources', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: entry.name,
              duration: entry.duration,
              size: entry.transferSize || 0,
              type: entry.initiatorType,
              url: window.location.href,
              timestamp: Date.now()
            })
          }).catch(() => {});
        }
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
}

// User interaction tracking
function trackUserInteractions() {
  let interactionCount = 0;
  let totalInteractionTime = 0;

  const trackInteraction = (eventType: string, startTime: number) => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    interactionCount++;
    totalInteractionTime += duration;

    // Track slow interactions (>100ms)
    if (duration > 100) {
      if (typeof window !== 'undefined') {
        fetch('/api/analytics/slow-interactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType,
            duration,
            url: window.location.href,
            timestamp: Date.now()
          })
        }).catch(() => {});
      }
    }
  };

  ['click', 'keydown', 'touchstart'].forEach(eventType => {
    document.addEventListener(eventType, (event) => {
      const startTime = performance.now();
      requestAnimationFrame(() => {
        trackInteraction(eventType, startTime);
      });
    }, { passive: true });
  });

  // Send interaction summary on page unload
  window.addEventListener('beforeunload', () => {
    if (interactionCount > 0) {
      const avgInteractionTime = totalInteractionTime / interactionCount;
      navigator.sendBeacon('/api/analytics/interaction-summary', JSON.stringify({
        interactionCount,
        avgInteractionTime,
        totalInteractionTime,
        url: window.location.href,
        timestamp: Date.now()
      }));
    }
  });
}

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getLCP(sendToAnalytics);
    getFCP(sendToAnalytics);
    getTTFB(sendToAnalytics);

    // Track resource performance
    trackResourcePerformance();

    // Track user interactions
    trackUserInteractions();

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          event_category: 'Performance',
          value: loadTime
        });
      }

      fetch('/api/analytics/page-load', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loadTime,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      }).catch(() => {});
    });

    // Track JavaScript errors
    window.addEventListener('error', (event) => {
      fetch('/api/analytics/js-errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      }).catch(() => {});
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      fetch('/api/analytics/promise-rejections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: event.reason?.toString() || 'Unknown',
          stack: event.reason?.stack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      }).catch(() => {});
    });

  }, []);

  return null; // This component doesn't render anything
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Export utility function for manual tracking
export function trackCustomMetric(name: string, value: number, category = 'Custom') {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', name, {
        event_category: category,
        value: Math.round(value)
      });
    }

    fetch('/api/analytics/custom-metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        value,
        category,
        url: window.location.href,
        timestamp: Date.now()
      })
    }).catch(() => {});
  }
}