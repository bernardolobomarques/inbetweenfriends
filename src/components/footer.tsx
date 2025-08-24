import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-background border-t py-8 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-muted-foreground">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
            <p className="font-headline text-sm">&copy; {new Date().getFullYear()} Entre Amigas. Todos os Direitos Reservados.</p>
            <div className="flex items-center gap-4">
                <p className="text-sm font-headline">Desenvolvido por Bernardo Lobo Marques</p>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                        <a href="https://www.linkedin.com/in/bernardo-lobo/" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    </Button>
                     <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                        <a href="https://github.com/bernardolobomarques" target="_blank" rel="noopener noreferrer">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
