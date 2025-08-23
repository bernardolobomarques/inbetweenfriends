"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
    return null; // or a loading spinner, but the router should have redirected
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
             <Card>
                <CardHeader>
                    <CardTitle>Welcome, Admin!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This is your admin dashboard. From here, you will be able to manage your blog posts through the n8n integration.</p>
                    <p className="mt-4">Future functionality will be added here.</p>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
