"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

type Review = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  rating?: number;
  platform?: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [latestReview, setLatestReview] = useState<Review | null>(null);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/posts');
        const allPosts = await response.json();
        
        const reviewPosts = allPosts
          .filter((post: Review) => post.slug.startsWith('reviews/'))
          .sort((a: Review, b: Review) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Extract unique platforms
        const uniquePlatforms = ["All", ...new Set(reviewPosts.map((review: Review) => review.platform).filter(Boolean))] as string[];
        
        setReviews(reviewPosts);
        setPlatforms(uniquePlatforms);
        setLatestReview(reviewPosts[0]);
        setFilteredReviews(reviewPosts.slice(1));
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  useEffect(() => {
    if (selectedPlatform === "All") {
      setFilteredReviews(reviews.slice(1));
    } else {
      const filtered = reviews
        .filter(review => review.platform === selectedPlatform)
        .slice(selectedPlatform === reviews[0]?.platform ? 1 : 0);
      setFilteredReviews(filtered);
    }
  }, [selectedPlatform, reviews]);

  if (isLoading || !latestReview) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="relative h-[600px] rounded-xl overflow-hidden">
          <Image
            src={latestReview.image}
            alt={latestReview.title}
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent">
            <div className="h-full flex items-end pb-20 px-8">
              <div className="max-w-3xl">
                <div className="flex gap-2 mb-4">
                  {latestReview.platform && (
                    <span className="inline-block bg-zinc-900/90 text-white px-3 py-1 rounded-full text-sm">
                      {latestReview.platform}
                    </span>
                  )}
                  {latestReview.rating && (
                    <span className="inline-block bg-cherry-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {latestReview.rating}/10
                    </span>
                  )}
                </div>
                <Link href={`/${latestReview.slug}`}>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 hover:text-cherry-500 transition-colors">
                    {latestReview.title}
                  </h1>
                </Link>
                <p className="text-xl text-gray-300 mb-6">
                  {latestReview.excerpt}
                </p>
                <div className="flex items-center gap-4 text-gray-400">
                  <time dateTime={latestReview.date}>
                    {new Date(latestReview.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-4 py-2 rounded-full text-sm font-medium 
                       transition-colors duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-cherry-500
                       ${selectedPlatform === platform 
                         ? 'bg-cherry-500 text-white' 
                         : 'bg-zinc-800 text-gray-300 hover:bg-cherry-500 hover:text-white'}`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <Link
              key={review.slug}
              href={`/${review.slug}`}
              className="group h-full"
            >
              <article className="bg-zinc-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={review.image}
                    alt={review.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {review.platform && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-zinc-900/90 text-white px-3 py-1 rounded-full text-sm">
                        {review.platform}
                      </span>
                    </div>
                  )}
                  {review.rating && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-cherry-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {review.rating}/10
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <time dateTime={review.date}>
                      {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cherry-500 transition-colors">
                    {review.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {review.excerpt}
                  </p>
                  <div className="flex items-center text-cherry-500 text-sm font-medium mt-auto">
                    Read Review
                    <svg 
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
} 