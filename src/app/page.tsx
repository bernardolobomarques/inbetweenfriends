
import { Header } from '@/components/header';
import { PostCard } from '@/components/post-card';
import { getPosts } from '@/lib/posts';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section 
            className="relative pt-32 pb-20 text-center text-white"
            style={{
                backgroundImage: `url(/hero-home-1.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <h1 className="text-5xl md:text-7xl font-body mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                Welcome to Amigas Blog
                </h1>
                <p className="max-w-3xl mx-auto text-xl text-white/90 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200 font-headline">
                A cozy corner of the internet for thoughtful conversations on mindfulness, friendship, and creativity.
                </p>
            </div>
        </section>

        {featuredPost && (
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
               <h2 className="text-4xl font-body text-center mb-12">Featured Post</h2>
               <Link href={`/posts/${featuredPost.slug}`} className="group block">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                         <Image
                            src={featuredPost.featuredImage}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            priority
                            data-ai-hint={`${featuredPost.slug.split('-').slice(0, 2).join(' ')}`}
                         />
                    </div>
                    <div>
                        <p className="text-primary font-headline font-semibold mb-2">{featuredPost.category}</p>
                        <h3 className="text-4xl font-body mb-4 text-foreground group-hover:text-primary transition-colors">{featuredPost.title}</h3>
                        <p className="text-lg text-muted-foreground font-headline mb-6">{featuredPost.excerpt}</p>
                         <div className="flex items-center text-sm font-semibold text-primary">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                    </div>
                </div>
               </Link>
            </div>
          </section>
        )}

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-body text-center mb-12">Latest Musings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post, index) => (
                   <div key={post.id} className="animate-in fade-in slide-in-from-bottom-5" style={{ animationDelay: `${index * 100}ms`}}>
                    <PostCard post={post} className="h-full"/>
                  </div>
                ))}
              </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/posts">View All Posts</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square w-full max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://placehold.co/600x600.png"
                  alt="Carolina Bianchi"
                  fill
                  className="object-cover"
                  data-ai-hint="woman portrait"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-body mb-4 text-secondary-foreground">A Little About Me</h2>
                <p className="text-lg text-secondary-foreground/90 font-headline mb-4">
                  Hi, I'm Carol! I created this space to share some of the ideas and thoughts from my journey as an international law student in Barcelona, though my heart is still in Rio de Janeiro. 
                </p>
                <p className="text-lg text-secondary-foreground/90 font-headline mb-8">
                  This blog is an invitation to chat about life, friendship, and the little things that connect us all. It's a place for quiet reflection and joyful discovery. So grab a cup of coffee, make yourself at home, and let's explore together!
                </p>
                 <Button asChild size="lg" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                    <Link href="/posts">Start Reading</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <h2 className="text-4xl font-body mb-4">Stay Connected</h2>
                 <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8 font-headline">
                    Subscribe to our newsletter to receive the latest posts and updates directly in your inbox.
                 </p>
                 <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input type="email" placeholder="Enter your email" className="flex-grow text-base" />
                    <Button type="submit" size="lg">Subscribe</Button>
                 </form>
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
