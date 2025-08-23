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
    // Revalidate landing page and all posts page
    revalidatePath('/');
    revalidatePath('/posts');
    
    // Also revalidate all individual post pages
    // Note: In a real app with many posts, you might want a more targeted approach
    // based on a slug passed in the request body. For this project, revalidating all is fine.
    // For example:
    // const body = await request.json().catch(() => ({}));
    // if (body?.slug) {
    //   revalidatePath(`/posts/${body.slug}`);
    // }

    return NextResponse.json({ revalidated: true, now: Date.now() });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error revalidating', error: errorMessage }, { status: 500 });
  }
}
