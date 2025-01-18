"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const defaultConsent: CookieConsent = {
  necessary: true, // Always true as these are essential
  analytics: false,
  marketing: false,
  preferences: false,
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem("cookie-consent");
    if (!savedConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveConsent(fullConsent);
  };

  const handleAcceptNecessary = () => {
    saveConsent(defaultConsent);
  };

  const handleSaveSettings = () => {
    saveConsent(consent);
  };

  const saveConsent = (consentSettings: CookieConsent) => {
    localStorage.setItem("cookie-consent", JSON.stringify(consentSettings));
    setIsVisible(false);
    setShowSettings(false);
    // Here you would typically trigger your cookie/tracking initialization
    // based on the user's choices
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-2xl w-full shadow-xl">
        {!showSettings ? (
          // Main Banner
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Cookie-Einstellungen</h2>
            <p className="text-gray-300 text-sm mb-6">
              Wir verwenden Cookies, um unsere Webseite zu verbessern. Sie können Ihre Einstellungen anpassen und 
              entscheiden, welche Cookies Sie zulassen möchten. Notwendige Cookies sind für die Grundfunktionen 
              der Website erforderlich. Weitere Informationen finden Sie in unserer{" "}
              <Link href="/privacy" className="text-cherry-500 hover:text-cherry-400 underline">
                Datenschutzerklärung
              </Link>{" "}
              und{" "}
              <Link href="/cookies" className="text-cherry-500 hover:text-cherry-400 underline">
                Cookie-Richtlinie
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={handleAcceptNecessary}
                className="px-6 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
              >
                Nur notwendige Cookies
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-6 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
              >
                Einstellungen anpassen
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm font-medium text-white bg-cherry-500 hover:bg-cherry-600 rounded-full transition-colors"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        ) : (
          // Detailed Settings
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Cookie-Einstellungen anpassen</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-white font-medium">Notwendige Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    Diese Cookies sind für die Grundfunktionen der Website erforderlich.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.necessary}
                  disabled
                  className="rounded border-zinc-600 text-cherry-500 focus:ring-cherry-500"
                />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-white font-medium">Analyse-Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    Helfen uns zu verstehen, wie Besucher mit der Website interagieren.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                  className="rounded border-zinc-600 text-cherry-500 focus:ring-cherry-500"
                />
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-white font-medium">Marketing-Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    Werden verwendet, um Besuchern relevante Werbung anzuzeigen.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                  className="rounded border-zinc-600 text-cherry-500 focus:ring-cherry-500"
                />
              </div>

              {/* Preference Cookies */}
              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-white font-medium">Präferenz-Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    Ermöglichen die Speicherung von Benutzereinstellungen.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.preferences}
                  onChange={(e) => setConsent({ ...consent, preferences: e.target.checked })}
                  className="rounded border-zinc-600 text-cherry-500 focus:ring-cherry-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowSettings(false)}
                className="px-6 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
              >
                Zurück
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-6 py-2 text-sm font-medium text-white bg-cherry-500 hover:bg-cherry-600 rounded-full transition-colors"
              >
                Einstellungen speichern
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 