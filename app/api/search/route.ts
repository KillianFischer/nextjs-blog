import { searchPosts } from '@/app/lib/mdx';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = await searchPosts(query);
  return NextResponse.json({ results });
} 