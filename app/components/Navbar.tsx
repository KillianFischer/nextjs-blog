"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/90 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">CHERRY</span>
              <span className="text-2xl font-bold text-cherry-500">NEWS</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex space-x-6">
              <Link href="/news" className="text-gray-300 hover:text-white px-3 py-2">News</Link>
              <Link href="/reviews" className="text-gray-300 hover:text-white px-3 py-2">Reviews</Link>
              <Link href="/tutorials" className="text-gray-300 hover:text-white px-3 py-2">Tutorials</Link>
            </div>

            {/* Search Bar Component */}
            <SearchBar />

            {/* Subscribe Button */}
            <button className="bg-cherry-500 text-white px-4 py-2 rounded-full hover:bg-cherry-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-black/95`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/news" 
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            News
          </Link>
          <Link 
            href="/reviews" 
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Reviews
          </Link>
          <Link 
            href="/tutorials" 
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Tutorials
          </Link>
          <div className="px-3 py-2">
            <SearchBar />
          </div>
          <div className="px-3 py-2">
            <button className="w-full bg-cherry-500 text-white px-4 py-2 rounded-full hover:bg-cherry-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 