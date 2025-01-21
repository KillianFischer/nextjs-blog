"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [latestArticle, setLatestArticle] = useState<Post | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/posts');
        const allPosts = await response.json();
        
        const newsArticles = allPosts
          .filter((post: Post) => post.slug.startsWith('news/'))
          .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(newsArticles.map((article: Post) => article.category))] as string[];
        
        setArticles(newsArticles);
        setCategories(uniqueCategories);
        setLatestArticle(newsArticles[0]);
        setFilteredArticles(newsArticles.slice(1));
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredArticles(articles.slice(1));
    } else {
      const filtered = articles
        .filter(article => article.category === selectedCategory)
        .slice(selectedCategory === articles[0]?.category ? 1 : 0);
      setFilteredArticles(filtered);
    }
  }, [selectedCategory, articles]);

  if (isLoading || !latestArticle) {
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
            src={latestArticle.image}
            alt={latestArticle.title}
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent">
            <div className="h-full flex items-end pb-20 px-8">
              <div className="max-w-3xl">
                <span className="inline-block bg-cherry-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                  {latestArticle.category}
                </span>
                <Link href={`/${latestArticle.slug}`}>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 hover:text-cherry-500 transition-colors">
                    {latestArticle.title}
                  </h1>
                </Link>
                <p className="text-xl text-gray-300 mb-6">
                  {latestArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-gray-400">
                  <time dateTime={latestArticle.date}>
                    {new Date(latestArticle.date).toLocaleDateString('en-US', {
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

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium 
                       transition-colors duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-cherry-500
                       ${selectedCategory === category 
                         ? 'bg-cherry-500 text-white' 
                         : 'bg-zinc-800 text-gray-300 hover:bg-cherry-500 hover:text-white'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/${article.slug}`}
              className="group h-full"
            >
              <article className="bg-zinc-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-cherry-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cherry-500 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-cherry-500 text-sm font-medium mt-auto">
                    Read More
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