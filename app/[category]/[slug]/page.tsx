import { getAllPosts } from '@/app/lib/mdx';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';

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

  return posts.map((post) => {
    const [category, slug] = post.slug.split('/');
    return { category, slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
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

const PostPage = async ({
  params,
}: {
  params: { category: string; slug: string };
}) => {
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
        <Link href={`/${params.category}`} className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {params.category}
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {post.metadata.title}
          </h1>
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
          </div>
        </div>

        <div className="prose prose-invert prose-cherry max-w-none">
          {/* Render MDX Content */}
        </div>
      </div>
    </article>
  );
};

export default PostPage;