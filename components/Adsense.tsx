'use client';

// components/AdSense.js
import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: Array<object> & {
      push: (params: object) => void;
    }[];
  }
}

const AdSense = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.setAttribute('data-ad-client', 'ca-pub-9320499470430652');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-9320499470430652"
      data-ad-slot="4100849960"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdSense;