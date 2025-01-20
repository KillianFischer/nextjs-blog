import { getAllPosts } from '@/app/lib/mdx';
import Image from 'next/image';
import Link from 'next/link';

const categories = ["All", "Gaming", "Hardware", "Streaming", "Software", "Modding"];

export default async function TutorialsPage() {
  const allPosts = await getAllPosts();
  const tutorials = allPosts
    .filter(post => post.slug.startsWith('tutorials/'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latestTutorial = tutorials[0];
  const remainingTutorials = tutorials.slice(1);

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section with Latest Tutorial */}
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
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-zinc-900/90 text-white px-3 py-1 rounded-full text-sm">
                    {latestTutorial.difficulty}
                  </span>
                  <span className="bg-cherry-500 text-white px-3 py-1 rounded-full text-sm">
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
              className="px-4 py-2 rounded-full text-sm font-medium 
                       transition-colors duration-200 ease-in-out
                       hover:bg-cherry-500 hover:text-white
                       focus:outline-none focus:ring-2 focus:ring-cherry-500
                       bg-zinc-800 text-gray-300"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tutorials Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingTutorials.map((tutorial) => (
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

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-zinc-800 text-white px-8 py-3 rounded-full hover:bg-cherry-500 transition-colors duration-200">
            Load More Tutorials
          </button>
        </div>
      </main>
    </div>
  );
} 