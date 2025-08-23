import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  // IMPORTANT: In a real app, use an environment variable for the secret.
  // process.env.REVALIDATION_TOKEN
  if (secret !== 'AMIGAS_SECRET_REVALIDATE_TOKEN') {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));

    // Revalidate specific post if slug is provided
    if (body?.entry?.slug) {
      const slug = body.entry.slug;
      revalidatePath(`/posts/${slug}`);
      revalidatePath('/');
      revalidatePath('/posts');
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
