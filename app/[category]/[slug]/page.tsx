import { getAllPosts } from '@/app/lib/mdx';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import ShareButtons from '@/app/components/ShareButtons';
import { Metadata } from 'next';

async function getPostContent(category: string, slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'app/content', category, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(fileContent);
    return { content, metadata: data };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    category: post.slug.split('/')[0],
    slug: post.slug.split('/')[1],
  }));
}

type Props = {
  params: {
    category: string;
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const post = await getPostContent(params.category, params.slug);
  
  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.category}/${params.slug}`;

  return {
    title: post.metadata.title,
    description: post.metadata.excerpt,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt,
      images: [
        {
          url: post.metadata.image,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
      url: currentUrl,
      type: 'article',
    },
  };
}

const PostPage = async ({ params }: Props) => {
  const post = await getPostContent(params.category, params.slug);

  if (!post) {
    notFound();
  }

  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.category}/${params.slug}`;

  return (
    <article className="min-h-screen bg-zinc-900">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={post.metadata.image}
          alt={post.metadata.title}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-32 relative z-10">
        {/* Back Button */}
        <Link 
          href={`/${params.category}`}
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {params.category}
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {post.metadata.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <time dateTime={post.metadata.date}>
                {new Date(post.metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.metadata.author}
            </div>
            {post.metadata.readTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.metadata.readTime}
              </div>
            )}
            <span className="bg-cherry-500 text-white px-3 py-1 rounded-full text-sm">
              {post.metadata.category}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-cherry max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* Share and Tags Section */}
        <div className="mt-12 pt-6 border-t border-zinc-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {post.metadata.tags?.map((tag: string) => (
                <span 
                  key={tag}
                  className="bg-zinc-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ShareButtons 
              url={currentUrl}
              title={post.metadata.title}
              image={post.metadata.image}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostPage;