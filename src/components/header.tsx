"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out bg-background/80 backdrop-blur-sm border-b",
        { " -translate-y-full": hidden && !isMenuOpen }
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-body font-bold text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Amigas Blog
            </Link>
            <nav className="hidden md:flex items-center space-x-8 text-lg">
              <Link href="/" className="font-headline hover:text-primary transition-colors duration-300">
                Home
              </Link>
              <Link href="/posts" className="font-headline hover:text-primary transition-colors duration-300">
                All Posts
              </Link>
            </nav>
            <button className="md:hidden z-50" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center md:hidden animate-in fade-in duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          <nav className="flex flex-col items-center space-y-8 text-2xl">
            <Link href="/" className="font-body hover:text-primary transition-colors duration-300" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/posts" className="font-body hover:text-primary transition-colors duration-300" onClick={toggleMenu}>
              All Posts
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
