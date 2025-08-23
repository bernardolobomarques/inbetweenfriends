import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPosts, getPostBySlug } from '@/lib/posts';
import { Header } from '@/components/header';
import type { Metadata } from 'next';
import type { Post } from '@/types';

export async function generateStaticParams() {
  const posts: Post[] = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type PostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Amigas Blog`,
    description: post.excerpt,
    openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [
            {
                url: post.featuredImage,
                width: 1200,
                height: 630,
                alt: post.title,
            }
        ]
    }
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-card">
      <Header />
      <main className="flex-grow pt-24">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Image src={post.authorImage} alt={post.authorName} width={32} height={32} className="rounded-full" data-ai-hint="person portrait" />
                <span>{post.authorName}</span>
              </div>
              <span>&middot;</span>
              <time dateTime={post.publishDate}>{post.publishDate}</time>
            </div>
          </header>

          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-12 shadow-lg">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={`${post.slug.split('-').slice(0, 2).join(' ')}`}
            />
          </div>

          <div
            className="post-content font-body text-foreground/90 text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <footer className="bg-secondary py-8 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Amigas Blog. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
