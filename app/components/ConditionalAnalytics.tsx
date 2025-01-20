"use client";

import { Analytics } from '@vercel/analytics/react';
import { useAnalytics } from '../context/AnalyticsContext';

export function ConditionalAnalytics() {
  const { analyticsEnabled } = useAnalytics();
  return analyticsEnabled ? <Analytics /> : null;
} 