
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPosts, getPostBySlug } from '@/lib/posts';
import { Header } from '@/components/header';
import type { Metadata } from 'next';
import type { Post } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

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

  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
          <header className="mb-12 text-center">
            <p className="text-primary font-headline font-semibold mb-2">{post.category}</p>
            <h1 className="text-4xl md:text-6xl font-body font-normal text-foreground mb-4">{post.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-muted-foreground font-headline">
              <div className="flex items-center space-x-2">
                <Image src={post.authorImage} alt={post.authorName} width={32} height={32} className="rounded-full" data-ai-hint="person portrait" />
                <span>{post.authorName}</span>
              </div>
              <span>&middot;</span>
              <time dateTime={post.date}>{post.publishDate}</time>
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
            className="post-content font-headline text-foreground/90 text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Separator className="my-12" />

          <section className="bg-card rounded-lg p-8 flex items-start gap-6 mb-12">
            <Image src={post.authorImage} alt={post.authorName} width={80} height={80} className="rounded-full hidden sm:block" data-ai-hint="person portrait" />
            <div>
                <h3 className="font-body text-2xl font-semibold mb-2">About {post.authorName}</h3>
                <p className="font-headline text-muted-foreground">{post.authorBio}</p>
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="mb-12">
                <h2 className="text-3xl font-body text-center mb-8">You might also like...</h2>
                <div className="grid grid-cols-1 gap-8">
                    {relatedPosts.map(relatedPost => (
                       <Link href={`/posts/${relatedPost.slug}`} key={relatedPost.id} className="group block">
                         <Card className="overflow-hidden h-full flex flex-col md:flex-row transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 bg-card border-border/50">
                            <div className="relative aspect-[4/3] w-full md:w-1/3 md:aspect-[1/1] overflow-hidden">
                                <Image
                                    src={relatedPost.featuredImage}
                                    alt={relatedPost.title}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    data-ai-hint={`${relatedPost.slug.split('-').slice(0, 2).join(' ')}`}
                                />
                            </div>
                            <CardContent className="p-6 flex-grow flex flex-col justify-center w-full md:w-2/3">
                                <Badge variant="secondary" className="mb-2 w-fit">{relatedPost.category}</Badge>
                                <CardTitle className="font-body text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">
                                    {relatedPost.title}
                                </CardTitle>
                                <p className="text-muted-foreground font-headline leading-relaxed mb-4">{relatedPost.excerpt}</p>
                                <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </CardContent>
                         </Card>
                       </Link>
                    ))}
                </div>
            </section>
          )}

          <Separator className="my-12" />
          
          <section className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <h3 className="font-headline font-semibold text-lg">Share this post:</h3>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-5 w-5" />
                        </a>
                    </Button>
                     <Button variant="outline" size="icon" asChild>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://your-domain.com/posts/' + post.slug)}`} target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-5 w-5" />
                        </a>
                    </Button>
                     <Button variant="outline" size="icon" asChild>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://your-domain.com/posts/' + post.slug)}`} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Category:</span>
                <Link href="/posts" className="text-primary hover:underline">{post.category}</Link>
            </div>
          </section>

        </article>

      </main>
      <footer className="bg-background border-t py-8 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p className="font-headline">&copy; {new Date().getFullYear()} Amigas Blog. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
