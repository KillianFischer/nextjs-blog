"use client";

import { Twitter } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  image?: string;
}

export default function ShareButtons({ url, title, image }: ShareButtonsProps) {
  const handleShare = () => {
    const shareText = `${title}\n\n`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}${image ? `&image=${encodeURIComponent(image)}` : ''}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400">Share:</span>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full transition-colors"
      >
        <Twitter className="w-4 h-4" />
        Share on X
      </button>
    </div>
  );
} 