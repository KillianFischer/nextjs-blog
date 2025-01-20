"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/80 backdrop-blur-md fixed w-full z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cherry-400 to-cherry-600">
                Nerror
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1">
              <Link href="/news" className="text-gray-300 hover:text-white px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/10">
                News
              </Link>
              <Link href="/reviews" className="text-gray-300 hover:text-white px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/10">
                Reviews
              </Link>
              <Link href="/tutorials" className="text-gray-300 hover:text-white px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/10">
                Tutorials
              </Link>
            </div>
            <SearchBar />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/news"
                className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                News
              </Link>
              <Link
                href="/reviews"
                className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/tutorials"
                className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                Tutorials
              </Link>
              <div className="px-3 py-2">
                <SearchBar />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 