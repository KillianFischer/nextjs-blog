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
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query) {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setResults(data.results);
        } catch (error) {
          console.error('Search failed:', error);
          setResults([]);
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
        setQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full bg-zinc-800 text-white placeholder-gray-400 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-cherry-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Search Results Dropdown */}
      {results.length > 0 && query && (
        <div className="absolute z-50 w-full mt-2 bg-zinc-800 rounded-lg shadow-lg border border-zinc-700 max-h-[60vh] overflow-y-auto">
          {results.map((result) => (
            <Link
              key={result.slug}
              href={`/${result.slug}`}
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="block px-4 py-3 hover:bg-zinc-700 transition-colors"
            >
              <h3 className="text-white font-medium">{result.title}</h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{result.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 