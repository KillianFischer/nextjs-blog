'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: Array<object> & {
      push: (params: object) => void;
    }[];
  }
}

interface AdsenseProps {
  slot?: string;  // Made optional since we'll have a default ad unit
  style?: React.CSSProperties;
  className?: string;
}

export default function Adsense({ slot = "4100849960", style, className }: AdsenseProps) {
  useEffect(() => {
    try {
      // Load AdSense script
      const script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9320499470430652";
      script.crossOrigin = "anonymous";
      script.async = true;
      document.head.appendChild(script);

      // Initialize ad
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Adsense error:', err);
    }
  }, []);

  return (
    <div className={`w-full flex justify-center ${className}`}>
      {/* ad-unit-1 */}
      <ins
        className="adsbygoogle"
        style={style || { display: 'block', width: '100%' }}
        data-ad-client="ca-pub-9320499470430652"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      >
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-gray-400">
          Ad Space
        </div>
      </ins>
    </div>
  );
} 