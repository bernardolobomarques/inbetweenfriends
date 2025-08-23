import { Header } from '@/components/header';
import { PostCard } from '@/components/post-card';
import { getPosts } from '@/lib/posts';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default async function Home() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative pt-32 pb-20 text-center bg-background isolate">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('https://placehold.co/1920x1080.png')]" data-ai-hint="library books" />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <h1 className="text-5xl md:text-7xl font-body mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                Welcome to Amigas Blog
                </h1>
                <p className="max-w-3xl mx-auto text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200 font-headline">
                A cozy corner of the internet for thoughtful conversations on mindfulness, friendship, and creativity.
                </p>
            </div>
        </section>

        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-body text-center mb-12">Latest Musings</h2>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {latestPosts.map((post) => (
                  <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                       <PostCard post={post} className="h-full"/>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/posts">View All Posts</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-body mb-4">About the Author</h2>
            <p className="max-w-2xl mx-auto text-lg mb-8 font-headline">
              Hi, we're a collective of voices sharing stories and insights to inspire a more connected and creative life. We believe in the power of friendship, the beauty of the present moment, and the creative spirit that lives in all of us. Join our community!
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p className="font-headline">&copy; {new Date().getFullYear()} Amigas Blog. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
