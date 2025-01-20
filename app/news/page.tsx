import { getAllPosts } from '@/app/lib/mdx';
import Image from "next/image";
import Link from "next/link";

const categories = ["All", "Games", "Esports", "Reviews", "Industry", "Tech"];

export default async function NewsPage() {
  const allPosts = await getAllPosts();
  const newsArticles = allPosts.filter(post => post.slug.startsWith('news/'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latestArticle = newsArticles[0];
  const remainingArticles = newsArticles.slice(1);

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section with Latest Article */}
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="relative h-[600px] rounded-xl overflow-hidden">
          <Image
            src={latestArticle.image}
            alt={latestArticle.title}
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent">
            <div className="h-full flex items-end pb-20 px-8">
              <div className="max-w-3xl">
                <span className="inline-block bg-cherry-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                  {latestArticle.category}
                </span>
                <Link href={`/${latestArticle.slug}`}>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 hover:text-cherry-500 transition-colors">
                    {latestArticle.title}
                  </h1>
                </Link>
                <p className="text-xl text-gray-300 mb-6">
                  {latestArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-gray-400">
                  <time dateTime={latestArticle.date}>
                    {new Date(latestArticle.date).toLocaleDateString('en-US', {
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

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/${article.slug}`}
              className="group h-full"
            >
              <article className="bg-zinc-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-cherry-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cherry-500 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {article.excerpt}
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

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-zinc-800 text-white px-8 py-3 rounded-full hover:bg-cherry-500 transition-colors duration-200">
            Load More Articles
          </button>
        </div>
      </main>
    </div>
  );
} 