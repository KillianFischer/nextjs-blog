import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
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
    </nav>
  );
} 