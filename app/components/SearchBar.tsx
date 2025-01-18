'use client';

import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type SearchResult = {
  title: string;
  category: string;
  slug: string;
  excerpt: string;
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setResults(data.results);
        } catch (error) {
          console.error('Search failed:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${isLoading ? 'text-cherry-500 animate-spin' : 'text-gray-400'}`} />
        </div>
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          className="w-64 bg-zinc-800 text-white pl-10 pr-4 py-2 rounded-full 
                   border border-zinc-700 focus:outline-none focus:border-cherry-500
                   placeholder-gray-400"
          onFocus={() => query.length > 0 && setIsOpen(true)}
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 w-96 bg-zinc-800 rounded-lg shadow-lg border border-zinc-700 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              results.map((result, index) => (
                <Link
                  key={index}
                  href={`/${result.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 hover:bg-zinc-700 transition-colors"
                >
                  <div className="text-white text-sm font-medium">{result.title}</div>
                  <div className="text-gray-400 text-xs mt-1">{result.excerpt}</div>
                  <div className="text-cherry-500 text-xs mt-1">{result.category}</div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-400 text-sm">
                {isLoading ? 'Searching...' : 'No results found'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 