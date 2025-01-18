import Image from "next/image";
import Link from "next/link";

// You would typically fetch this from an API
const newsArticles = [
  {
    id: 1,
    title: "Upcoming RPG Reveals Revolutionary Combat System",
    category: "Games",
    image: "/game-1.jpg",
    excerpt: "The highly anticipated RPG showcases its unique approach to real-time combat...",
    date: "2024-03-15",
    readTime: "5 min read"
  },
  // Add more articles...
];

const categories = ["All", "Games", "Esports", "Reviews", "Industry", "Tech"];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="h-[300px] relative">
          <Image
            src="/news-hero.jpg"
            alt="News Hero"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-12">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">Latest News</h1>
                <p className="text-lg text-gray-300">
                  Stay updated with the latest in gaming and entertainment
                </p>
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
          {newsArticles.map((article) => (
            <article 
              key={article.id}
              className="bg-zinc-800 rounded-lg overflow-hidden group hover:transform hover:scale-[1.02] transition-all duration-200"
            >
              <Link href={`/news/${article.id}`}>
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
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cherry-500 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-cherry-500 text-sm font-medium">
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
              </Link>
            </article>
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