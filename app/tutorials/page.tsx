"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

type Tutorial = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  difficulty: string;
  timeToComplete: string;
};

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [latestTutorial, setLatestTutorial] = useState<Tutorial | null>(null);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTutorials() {
      try {
        const response = await fetch('/api/posts');
        const allPosts = await response.json();
        
        const tutorialPosts = allPosts
          .filter((post: Tutorial) => post.slug.startsWith('tutorials/'))
          .sort((a: Tutorial, b: Tutorial) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(tutorialPosts.map((tutorial: Tutorial) => tutorial.category))];
        
        setTutorials(tutorialPosts);
        setCategories(uniqueCategories);
        setLatestTutorial(tutorialPosts[0]);
        setFilteredTutorials(tutorialPosts.slice(1));
      } catch (error) {
        console.error('Failed to fetch tutorials:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTutorials();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredTutorials(tutorials.slice(1));
    } else {
      const filtered = tutorials
        .filter(tutorial => tutorial.category === selectedCategory)
        .slice(selectedCategory === tutorials[0]?.category ? 1 : 0);
      setFilteredTutorials(filtered);
    }
  }, [selectedCategory, tutorials]);

  if (isLoading || !latestTutorial) {
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
            src={latestTutorial.image}
            alt={latestTutorial.title}
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent">
            <div className="h-full flex items-end pb-20 px-8">
              <div className="max-w-3xl">
                <div className="flex gap-2 mb-4">
                  <span className="inline-block bg-zinc-900/90 text-white px-3 py-1 rounded-full text-sm">
                    {latestTutorial.difficulty}
                  </span>
                  <span className="inline-block bg-cherry-500 text-white px-3 py-1 rounded-full text-sm">
                    {latestTutorial.timeToComplete}
                  </span>
                </div>
                <Link href={`/${latestTutorial.slug}`}>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 hover:text-cherry-500 transition-colors">
                    {latestTutorial.title}
                  </h1>
                </Link>
                <p className="text-xl text-gray-300 mb-6">
                  {latestTutorial.excerpt}
                </p>
                <div className="flex items-center gap-4 text-gray-400">
                  <time dateTime={latestTutorial.date}>
                    {new Date(latestTutorial.date).toLocaleDateString('en-US', {
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

      {/* Tutorials Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <Link
              key={tutorial.slug}
              href={`/${tutorial.slug}`}
              className="group h-full"
            >
              <article className="bg-zinc-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tutorial.image}
                    alt={tutorial.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-zinc-900/90 text-white px-3 py-1 rounded-full text-sm">
                      {tutorial.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-cherry-500 text-white px-3 py-1 rounded-full text-sm">
                      {tutorial.timeToComplete}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <time dateTime={tutorial.date}>
                      {new Date(tutorial.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cherry-500 transition-colors">
                    {tutorial.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {tutorial.excerpt}
                  </p>
                  <div className="flex items-center text-cherry-500 text-sm font-medium mt-auto">
                    Read Tutorial
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