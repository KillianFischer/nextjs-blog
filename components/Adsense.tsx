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
      (window.adsbygoogle = window.adsbygoogle || []).push({ test: true });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={style || { display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
} 