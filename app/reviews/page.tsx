import { getAllPosts } from '@/app/lib/mdx';
import Image from 'next/image';
import Link from 'next/link';

const platforms = ["All", "PC", "PS5", "Xbox", "Switch", "Mobile"];

export default async function ReviewsPage() {
  const allPosts = await getAllPosts();
  const reviews = allPosts
    .filter(post => post.slug.startsWith('reviews/'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latestReview = reviews[0];
  const remainingReviews = reviews.slice(1);

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section with Latest Review */}
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="relative h-[600px] rounded-xl overflow-hidden">
          <Image
            src={latestReview.image}
            alt={latestReview.title}
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent">
            <div className="h-full flex items-end pb-20 px-8">
              <div className="max-w-3xl">
                {latestReview.rating && (
                  <div className="inline-flex items-center gap-2 bg-cherry-500 text-white px-4 py-2 rounded-full text-lg font-bold mb-4">
                    Score: {latestReview.rating}/10
                  </div>
                )}
                <Link href={`/${latestReview.slug}`}>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 hover:text-cherry-500 transition-colors">
                    {latestReview.title}
                  </h1>
                </Link>
                <p className="text-xl text-gray-300 mb-6">
                  {latestReview.excerpt}
                </p>
                <div className="flex items-center gap-4 text-gray-400">
                  <time dateTime={latestReview.date}>
                    {new Date(latestReview.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                  <span>•</span>
                  <span>{latestReview.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <button
              key={platform}
              className="px-4 py-2 rounded-full text-sm font-medium 
                       transition-colors duration-200 ease-in-out
                       hover:bg-cherry-500 hover:text-white
                       focus:outline-none focus:ring-2 focus:ring-cherry-500
                       bg-zinc-800 text-gray-300"
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingReviews.map((review) => (
            <Link 
              key={review.slug}
              href={`/${review.slug}`}
              className="group h-full"
            >
              <article className="bg-zinc-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={review.image}
                    alt={review.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {review.rating && (
                    <div className="absolute top-4 right-4 bg-cherry-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {review.rating}/10
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <time dateTime={review.date}>
                      {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cherry-500 transition-colors">
                    {review.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {review.excerpt}
                  </p>
                  <div className="flex items-center text-cherry-500 text-sm font-medium mt-auto">
                    Read Review
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
            Load More Reviews
          </button>
        </div>
      </main>
    </div>
  );
} 