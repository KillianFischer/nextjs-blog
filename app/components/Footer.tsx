import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">CHERRY</span>
              <span className="text-2xl font-bold text-cherry-500">NEWS</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your premier source for gaming news, reviews, and entertainment coverage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/games" className="text-gray-400 hover:text-cherry-500 text-sm">Games</Link></li>
              <li><Link href="/reviews" className="text-gray-400 hover:text-cherry-500 text-sm">Reviews</Link></li>
              <li><Link href="/movies" className="text-gray-400 hover:text-cherry-500 text-sm">Movies</Link></li>
              <li><Link href="/esports" className="text-gray-400 hover:text-cherry-500 text-sm">Esports</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-cherry-500 text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-cherry-500 text-sm">Contact</Link></li>
              <li><Link href="/advertise" className="text-gray-400 hover:text-cherry-500 text-sm">Advertise</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-cherry-500 text-sm">Careers</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CherryNews. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-cherry-500 text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-cherry-500 text-sm">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-cherry-500 text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 