"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const settings = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    localStorage.setItem("cookie-consent", JSON.stringify(settings));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const settings = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    localStorage.setItem("cookie-consent", JSON.stringify(settings));
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(cookieSettings));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-zinc-900 border border-zinc-800 w-full sm:max-w-2xl rounded-t-xl sm:rounded-xl p-6">
        {!showSettings ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Cookie Settings</h2>
              <p className="text-gray-300 text-sm">
                We use cookies to enhance your experience on our website. 
                You can choose which types of cookies you allow. 
                Necessary cookies are required for the website&apos;s basic functionality.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="bg-cherry-500 hover:bg-cherry-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="border border-zinc-700 hover:border-zinc-600 text-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Necessary Only
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="border border-zinc-700 hover:border-zinc-600 text-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Customize Settings
              </button>
            </div>

            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-cherry-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-cherry-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Customize Cookie Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Necessary Cookies</p>
                    <p className="text-sm text-gray-400">Required for basic website functionality</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookieSettings.necessary}
                    disabled
                    className="h-4 w-4 rounded border-gray-600 text-cherry-500 focus:ring-cherry-500"
                  />
                </div>
                
                {[
                  {
                    id: 'analytics',
                    title: 'Analytics Cookies',
                    description: 'Help us understand how visitors use our website'
                  },
                  {
                    id: 'marketing',
                    title: 'Marketing Cookies',
                    description: 'Used for personalized advertising'
                  },
                  {
                    id: 'functional',
                    title: 'Functional Cookies',
                    description: 'Enable advanced website features'
                  }
                ].map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{category.title}</p>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookieSettings[category.id as keyof Omit<CookieSettings, 'necessary'>]}
                      onChange={(e) => setCookieSettings(prev => ({
                        ...prev,
                        [category.id]: e.target.checked
                      }))}
                      className="h-4 w-4 rounded border-gray-600 text-cherry-500 focus:ring-cherry-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSaveSettings}
                className="bg-cherry-500 hover:bg-cherry-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Save Settings
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="border border-zinc-700 hover:border-zinc-600 text-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 