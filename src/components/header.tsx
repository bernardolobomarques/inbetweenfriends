"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out bg-background/80 backdrop-blur-sm border-b",
      { " -translate-y-full": hidden }
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-headline font-bold text-foreground hover:text-primary transition-colors">
            Amigas Blog
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-lg">
            <Link href="/" className="font-body hover:text-primary transition-colors duration-300">
              Home
            </Link>
            <Link href="/#about" className="font-body hover:text-primary transition-colors duration-300">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
