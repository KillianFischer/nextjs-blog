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
      (window.adsbygoogle = window.adsbygoogle || []).push({});
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
      >
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-gray-400">
          Ad Space
        </div>
      </ins>
    </div>
  );
} 