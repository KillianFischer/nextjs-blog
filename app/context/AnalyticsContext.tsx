"use client";

import { createContext, useContext, useState, useEffect } from 'react';

type AnalyticsContextType = {
  analyticsEnabled: boolean;
  setAnalyticsEnabled: (enabled: boolean) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (cookieConsent) {
      const settings = JSON.parse(cookieConsent);
      setAnalyticsEnabled(settings.analytics);
    }
  }, []);

  return (
    <AnalyticsContext.Provider value={{ analyticsEnabled, setAnalyticsEnabled }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
} 