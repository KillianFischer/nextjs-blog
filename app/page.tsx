import { getAllPosts } from '@/app/lib/mdx';
import Image from "next/image";
import Link from "next/link";
import Adsense from "@/components/Adsense";

export default async function Home() {
  const allPosts = await getAllPosts();
  // Sort posts by date, newest first
  const latestPosts = allPosts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 6); // Get the 6 most recent posts

  // Get featured post (most recent)
  const featuredPost = latestPosts[0];
  const remainingPosts = latestPosts.slice(1);

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <Image
          src={featuredPost.image}
          alt={featuredPost.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-3xl">
              <span className="inline-block bg-cherry-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                {featuredPost.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {featuredPost.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 line-clamp-2">
                {featuredPost.excerpt}
              </p>
              <Link 
                href={`/${featuredPost.slug}`}
                className="inline-flex items-center bg-white text-zinc-900 px-6 py-3 rounded-full font-medium hover:bg-cherry-500 hover:text-white transition-colors duration-200"
              >
                Read Article
                <svg 
                  className="w-4 h-4 ml-2" 
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
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* AdSense Unit */}
        <Adsense 
          slot="4100849960" 
          className="my-8 min-h-[250px]" 
          style={{ 
            display: 'block',
            minWidth: '300px',
            width: '100%',
            height: '250px',
            backgroundColor: '#18181b' // Optional: adds a background while loading
          }}
        />
        
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Latest Articles</h2>
          <Link 
            href="/news" 
            className="text-cherry-500 hover:text-cherry-400 font-medium flex items-center gap-1"
          >
            View All
            <svg 
              className="w-4 h-4" 
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
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/${post.slug}`}
              className="group h-full"
            >
              <article className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200 h-full flex flex-col border border-zinc-700/50">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-cherry-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cherry-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-cherry-500 text-sm font-medium mt-auto">
                    Read More
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
