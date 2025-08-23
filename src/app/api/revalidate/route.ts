import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  // In a real app, use process.env.REVALIDATION_TOKEN
  if (secret !== 'AMIGAS_SECRET_REVALIDATE_TOKEN') {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Revalidate specific post if slug is provided (e.g., from CMS webhook)
    if (body?.entry?.slug) {
      const slug = body.entry.slug;
      revalidatePath('/');
      revalidatePath(`/posts/${slug}`);
      return NextResponse.json({ revalidated: true, slug, now: Date.now() });
    }

    // Generic revalidation for landing page and all posts
    revalidatePath('/');
    revalidatePath('/posts');
    return NextResponse.json({ revalidated: true, now: Date.now() });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error revalidating', error: errorMessage }, { status: 500 });
  }
}
