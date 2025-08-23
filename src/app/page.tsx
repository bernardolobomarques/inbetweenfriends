import { Header } from '@/components/header';
import { PostCard } from '@/components/post-card';
import { getPosts } from '@/lib/posts';
import { Feather } from 'lucide-react';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-20 text-center bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-7xl font-body font-bold mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
              Welcome to Amigas Blog
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200 font-headline">
              A cozy corner of the internet for thoughtful conversations on mindfulness, friendship, and creativity.
            </p>
          </div>
        </section>

        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-body font-bold text-center mb-12">Latest Musings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div key={post.id} className="animate-in fade-in slide-in-from-bottom-5" style={{ animationDelay: `${index * 150}ms`}}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Feather className="h-16 w-16 mx-auto mb-6"/>
            <h2 className="text-4xl font-body font-bold mb-4">About the Author</h2>
            <p className="max-w-2xl mx-auto text-lg mb-8 font-headline">
              Hi, we're a collective of voices sharing stories and insights to inspire a more connected and creative life. We believe in the power of friendship, the beauty of the present moment, and the creative spirit that lives in all of us. Join our community!
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p className="font-headline">&copy; {new Date().getFullYear()} Amigas Blog. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
