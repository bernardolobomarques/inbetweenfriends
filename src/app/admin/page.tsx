import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
        <header className="bg-card border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-2xl font-body font-bold text-foreground">
                        Admin Panel
                    </h1>
                    <Button asChild variant="outline">
                        <Link href="/">Back to Site</Link>
                    </Button>
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