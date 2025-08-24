
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { availableImages } from '@/lib/images';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  excerpt: z.string().min(1, 'Excerpt is required.'),
  content: z.string().min(1, 'Content is required.'),
  category: z.string().min(1, 'Category is required.'),
  authorName: z.string().min(1, 'Author name is required.'),
  featuredImage: z.string().min(1, 'Please select an image.'),
});

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This check must run only on the client side.
    const isAdmin = sessionStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAdmin) {
      router.replace('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      category: '',
      authorName: 'Carolina Bianchi',
      featuredImage: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const webhookUrl = "https://n8n.bernardolobo.com.br:5678/webhook-test/a4566907-4030-4f23-a271-8f2aa7d12a4e"; 

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        mode: 'no-cors'
      });
      
      toast({
        title: "Post Submitted!",
        description: "Your n8n workflow has been triggered. A new deployment will start shortly.",
      });
      form.reset();
    } catch (error) {
      console.error("Failed to trigger n8n workflow:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Could not send post data to the webhook. Check the console and your n8n setup.",
      });
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
            <div className="grid gap-8 max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-body">Content Management</CardTitle>
                        <CardDescription>How to add, edit, or delete posts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-card-foreground">
                        <p>
                            To manually add, edit, or delete a post, you can modify the array of posts located in the file:
                            <code className="bg-muted text-muted-foreground font-code p-1 rounded-md mx-1">src/lib/posts.ts</code>.
                             Any changes committed to your Git repository will automatically trigger a new deployment, updating your live site.
                        </p>
                         <p>
                            Alternatively, use the form below to add a new post. This will send the data to a pre-configured n8n workflow that will automatically update the posts file and trigger a new deployment.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-body">Create New Post</CardTitle>
                        <CardDescription>Fill out the form below to add a new blog post.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField control={form.control} name="title" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl><Input placeholder="Your Post Title" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="excerpt" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Excerpt</FormLabel>
                                        <FormControl><Textarea placeholder="A short summary of the post..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="content" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl><Textarea placeholder="The full content of the post (supports HTML)..." {...field} rows={10} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                 <FormField control={form.control} name="featuredImage" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Featured Image</FormLabel>
                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an image" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {availableImages.map(image => (
                                                    <SelectItem key={image.key} value={image.key}>
                                                        {image.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="category" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl><Input placeholder="e.g., Mindfulness" {...field} /></FormControl>
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
                                    {isSubmitting ? 'Submitting...' : 'Create Post'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
             </div>
        </main>
    </div>
  );
}
