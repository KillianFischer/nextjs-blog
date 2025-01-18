import { getAllPosts } from '@/app/lib/mdx';
import Image from 'next/image';
import Link from 'next/link';

export default async function ReviewsPage() {
  const allPosts = await getAllPosts();
  const reviews = allPosts.filter(post => post.slug.startsWith('reviews/'));

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="h-[300px] relative">
          <Image
            src="/reviews-hero.jpg"
            alt="Reviews Hero"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-12">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">Game Reviews</h1>
                <p className="text-lg text-gray-300">
                  In-depth analysis and ratings of the latest games
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Link
              key={review.slug}
              href={`/${review.slug}`}
              className="group"
            >
              <article className="bg-zinc-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200">
                <div className="relative h-48">
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
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cherry-500 transition-colors">
                    {review.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {review.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="text-cherry-500 font-medium">Read Review</span>
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