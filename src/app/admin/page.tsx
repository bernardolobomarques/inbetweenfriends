"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { addPost } from '@/lib/posts';

const postFormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  excerpt: z.string().min(1, "Excerpt is required."),
  content: z.string().min(1, "Content is required."),
  category: z.string().min(1, "Category is required."),
  authorName: z.string().min(1, "Author Name is required."),
});

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isAdmin = sessionStorage.getItem('isAdminAuthenticated') === 'true';
      if (!isAdmin) {
        router.replace('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      authorName: "Amigas Blog",
    },
  });

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    setIsSubmitting(true);
    toast({ title: "Creating post..." });

    // This simulates calling your n8n webhook which would then add the post to your data source.
    const webhookUrl = "https://your-n8n-webhook-url.com/placeholder"; // <-- REPLACE WITH YOUR N8N WEBHOOK

    try {
      // Step 1: Add the post to our in-memory cache for this demo.
      // In your real app, your n8n webhook would handle this.
      const newPostData = {
        ...values,
        slug: values.title.toLowerCase().replace(/\s+/g, '-'),
        featuredImage: 'https://placehold.co/800x600.png',
        authorImage: 'https://placehold.co/100x100.png',
      };
      await addPost(newPostData);

      console.log("Simulating webhook call to:", webhookUrl);
      console.log("Post data:", newPostData);
      
      // Step 2: Call the revalidate API route to update the static pages
      const revalidateResponse = await fetch(`/api/revalidate?secret=AMIGAS_SECRET_REVALIDATE_TOKEN`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Sending empty body
      });
      
      if (!revalidateResponse.ok) {
          const errorData = await revalidateResponse.json();
          throw new Error(errorData.message || 'Failed to revalidate content.');
      }

      toast({
        title: "Success!",
        description: "Post created and site has been updated.",
      });
      form.reset();

    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
       console.error("Error creating post:", errorMessage);
       toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to create post: ${errorMessage}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }


  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    router.push('/admin/login');
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
            <header className="bg-card border-b mb-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>
            </header>
            <main className="container mx-auto">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
  }

  if (!isAuthenticated) {
    return null; // The redirect is handled in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
        <header className="bg-card border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-2xl font-body font-bold text-foreground">
                        Admin Panel
                    </h1>
                    <div className="flex items-center gap-4">
                        <Button asChild variant="outline">
                            <Link href="/">Back to Site</Link>
                        </Button>
                         <Button onClick={handleLogout} variant="destructive">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
             <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-body">Create New Post</CardTitle>
                    <CardDescription>Fill out the form below to publish a new blog post.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl><Input placeholder="Your amazing post title" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                             <FormField control={form.control} name="category" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl><Input placeholder="e.g., Mindfulness, Creativity" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="excerpt" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Excerpt</FormLabel>
                                    <FormControl><Textarea placeholder="A short summary of your post" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="content" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Content</FormLabel>
                                    <FormControl><Textarea placeholder="Write your full post content here. You can use HTML for formatting." {...field} rows={10} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="authorName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author Name</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>

                            <Button type="submit" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create Post"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
