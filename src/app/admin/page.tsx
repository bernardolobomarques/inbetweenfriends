
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
  title: z.string().min(1, 'O título é obrigatório.'),
  excerpt: z.string().min(1, 'O resumo é obrigatório.'),
  content: z.string().min(1, 'O conteúdo é obrigatório.'),
  category: z.string().min(1, 'A categoria é obrigatória.'),
  authorName: z.string().min(1, 'O nome do autor é obrigatório.'),
  featuredImage: z.string().min(1, 'Selecione uma imagem.'),
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
        title: "Post Enviado!",
        description: "Seu fluxo de trabalho n8n foi acionado. Uma nova implantação começará em breve.",
      });
      form.reset();
    } catch (error) {
      console.error("Falha ao acionar o fluxo de trabalho n8n:", error);
      toast({
        variant: "destructive",
        title: "Falha no Envio",
        description: "Não foi possível enviar os dados do post para o webhook. Verifique o console e sua configuração n8n.",
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
    return null; // O redirecionamento é feito no useEffect
  }

  return (
    <div className="min-h-screen bg-background">
        <header className="bg-card border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-2xl font-body font-bold text-foreground">
                        Painel de Admin
                    </h1>
                    <div className="flex items-center gap-4">
                        <Button asChild variant="outline">
                            <Link href="/">Voltar ao Site</Link>
                        </Button>
                         <Button onClick={handleLogout} variant="destructive">
                            Sair
                        </Button>
                    </div>
                </div>
            </div>
        </header>
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="grid gap-8 max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-body">Gerenciamento de Conteúdo</CardTitle>
                        <CardDescription>Como adicionar, editar ou excluir posts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-card-foreground">
                        <p>
                            Para adicionar, editar ou excluir um post manualmente, você pode modificar o array de posts localizado no arquivo:
                            <code className="bg-muted text-muted-foreground font-code p-1 rounded-md mx-1">src/lib/posts.ts</code>.
                             Qualquer alteração enviada ao seu repositório Git acionará automaticamente uma nova implantação, atualizando seu site.
                        </p>
                         <p>
                            Alternativamente, use o formulário abaixo para adicionar um novo post. Isso enviará os dados para um fluxo de trabalho n8n pré-configurado que atualizará automaticamente o arquivo de posts e acionará uma nova implantação.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-body">Criar Novo Post</CardTitle>
                        <CardDescription>Preencha o formulário abaixo para adicionar um novo post no blog.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField control={form.control} name="title" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Título</FormLabel>
                                        <FormControl><Input placeholder="Título do seu Post" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="excerpt" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Resumo</FormLabel>
                                        <FormControl><Textarea placeholder="Um breve resumo do post..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="content" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Conteúdo</FormLabel>
                                        <FormControl><Textarea placeholder="O conteúdo completo do post (suporta HTML)..." {...field} rows={10} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                 <FormField control={form.control} name="featuredImage" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imagem de Destaque</FormLabel>
                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione uma imagem" />
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
                                        <FormLabel>Categoria</FormLabel>
                                        <FormControl><Input placeholder="Ex: Autoconhecimento" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                 <FormField control={form.control} name="authorName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome do Autor</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <Button type="submit" size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : 'Criar Post'}
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
