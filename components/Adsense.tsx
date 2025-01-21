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
  slot: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function Adsense({ slot, style, className }: AdsenseProps) {
  useEffect(() => {
    try {
      // Load AdSense script
      const script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9320499470430652";
      script.crossOrigin = "anonymous";
      script.async = true;
      document.head.appendChild(script);

      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (err) {
      console.error('Adsense error:', err);
    }
  }, []);

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={style || { display: 'block', minWidth: '300px', width: '100%', height: '250px' }}
        data-ad-client="ca-pub-9320499470430652"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
} 