import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CherryNews. Content and design rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-cherry-500 text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-cherry-500 text-sm">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-cherry-500 text-sm">Cookie Policy</Link>
            <Link href="/legal-notice" className="text-gray-400 hover:text-cherry-500 text-sm">Legal Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 