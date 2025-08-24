
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/header';
import { PostCard } from '@/components/post-card';
import { getPosts } from '@/lib/posts';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Post } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const categories = useMemo(() => {
    const allCategories = posts.map(post => post.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [posts]);

  const filteredAndSortedPosts = useMemo(() => {
    return posts
      .filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'all' || post.category === selectedCategory)
      )
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (sortOrder === 'newest') {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
  }, [posts, searchTerm, sortOrder, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section 
            className="relative w-full h-[50vh] md:h-[70vh] text-center text-white"
        >
            <Image
                src="/all-posts-hero.png"
                alt="All Posts Hero Background"
                layout="fill"
                objectFit="cover"
                className="z-0"
                priority
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center justify-center h-full">
                <h1 className="text-5xl md:text-7xl font-body mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                All Posts
                </h1>
                <p className="max-w-3xl mx-auto text-xl text-white/90 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200 font-headline">
                Browse through our collection of thoughtful conversations on mindfulness, friendship, and creativity.
                </p>
            </div>
        </section>

        <section className="py-12 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <Input
                type="text"
                placeholder="Search by post title..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
               <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-[250px] w-full" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedPosts.map((post, index) => (
                  <div key={post.id} className="animate-in fade-in slide-in-from-bottom-5" style={{ animationDelay: `${index * 100}ms`}}>
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            )}
             {filteredAndSortedPosts.length === 0 && !loading && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No posts found.</p>
              </div>
            )}
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
