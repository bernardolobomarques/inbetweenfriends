
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full">
        <Card className={cn("overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 bg-card border-border/50", className)}>
            <CardHeader className="p-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        data-ai-hint={`${post.slug.split('-').slice(0, 2).join(' ')}`}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                <CardTitle className="font-body text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                </CardTitle>
                <p className="text-muted-foreground font-headline leading-relaxed">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-headline">
                    <Image src={post.authorImage} alt={post.authorName} width={24} height={24} className="rounded-full" data-ai-hint="person portrait" />
                    <span>{post.publishDate}</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Leia Mais <ArrowRight className="ml-2 h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    </Link>
  );
}
