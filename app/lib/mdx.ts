import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
  tags?: string[];
  rating?: number;
  difficulty?: string;
  timeToComplete?: string;
};

export async function getAllPosts(): Promise<Post[]> {
  const contentDir = path.join(process.cwd(), 'app/content');
  const categories = ['news', 'reviews', 'tutorials'];
  const posts: Post[] = [];

  try {
    for (const category of categories) {
      const categoryPath = path.join(contentDir, category);
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
            } as Post);
          }
        }
      } catch {
        // Skip if category directory doesn't exist
        continue;
      }
    }
    
    return posts;
  } catch {
    return [];
  }
}

export async function searchPosts(query: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  const searchQuery = query.toLowerCase();

  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery) ||
    post.excerpt.toLowerCase().includes(searchQuery) ||
    post.category.toLowerCase().includes(searchQuery)
  );
} 