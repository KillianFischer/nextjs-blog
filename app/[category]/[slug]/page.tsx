import { getAllPosts } from '@/app/lib/mdx';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

async function getPostContent(category: string, slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'app/content', category, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(fileContent);
    return { content, metadata: data };
  } catch (error) {
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

export default async function PostPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const post = await getPostContent(params.category, params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-zinc-900 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {post.metadata.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            <time dateTime={post.metadata.date}>
              {new Date(post.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.metadata.category}</span>
            <span>•</span>
            <span>{post.metadata.author}</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-cherry max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
} 