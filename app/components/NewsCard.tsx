import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export default function NewsCard({
  id,
  title,
  category,
  image,
  excerpt,
  date,
  readTime,
}: NewsCardProps) {
  return (
    <article className="bg-zinc-800 rounded-lg overflow-hidden group hover:transform hover:scale-[1.02] transition-all duration-200">
      <Link href={`/news/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-cherry-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{readTime}</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cherry-500 transition-colors">
            {title}
          </h2>
          <p className="text-gray-400 text-sm line-clamp-2">
            {excerpt}
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
  );
} 