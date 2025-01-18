import { getAllPosts } from '@/app/lib/mdx';
import Image from 'next/image';
import Link from 'next/link';

export default async function TutorialsPage() {
  const allPosts = await getAllPosts();
  const tutorials = allPosts.filter(post => post.slug.startsWith('tutorials/'));

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="h-[300px] relative">
          <Image
            src="/tutorials-hero.jpg"
            alt="Tutorials Hero"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-12">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">Gaming Tutorials</h1>
                <p className="text-lg text-gray-300">
                  Learn from our comprehensive guides and tutorials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorials Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.slug}
              href={`/${tutorial.slug}`}
              className="group"
            >
              <article className="bg-zinc-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200">
                <div className="relative h-48">
                  <Image
                    src={tutorial.image}
                    alt={tutorial.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-zinc-900/90 text-white px-3 py-1 rounded-full text-sm">
                      {tutorial.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cherry-500 transition-colors">
                    {tutorial.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {tutorial.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {tutorial.timeToComplete}
                    </span>
                    <span className="text-cherry-500 font-medium">Read Tutorial</span>
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