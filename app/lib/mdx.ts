import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostMetadata = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  image: string;
  slug: string;
};

let postsCache: PostMetadata[] | null = null;

export async function getAllPosts(): Promise<PostMetadata[]> {
  if (postsCache) {
    return postsCache;
  }

  const categories = ['news', 'reviews', 'tutorials'];
  let posts: PostMetadata[] = [];

  for (const category of categories) {
    const categoryPath = path.join(process.cwd(), 'app/content', category);
    
    try {
      const files = await fs.readdir(categoryPath);
      
      for (const file of files) {
        if (file.endsWith('.mdx')) {
          const filePath = path.join(categoryPath, file);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContent);
          posts.push({
            ...data,
            slug: `${category}/${file.replace('.mdx', '')}`,
          } as PostMetadata);
        }
      }
    } catch (error) {
      // Skip if directory doesn't exist
      console.log(`Directory ${category} not found`);
    }
  }

  postsCache = posts;
  return posts;
}

export async function searchPosts(query: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts();
  const searchQuery = query.toLowerCase();

  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery) ||
    post.excerpt.toLowerCase().includes(searchQuery) ||
    post.category.toLowerCase().includes(searchQuery)
  );
} 