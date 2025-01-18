"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">
            We use cookies to enhance your browsing experience. By continuing to use our site, you agree to our cookie policy.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex space-x-4">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-cherry-500 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-cherry-500 text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="text-gray-400 hover:text-cherry-500 text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
            <button
              onClick={handleAccept}
              className="bg-cherry-500 hover:bg-cherry-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 