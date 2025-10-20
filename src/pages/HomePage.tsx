import React from 'react';
import { Github } from 'lucide-react';
import { CurlPlayground } from '@/components/CurlPlayground';
import { CurlDocs } from '@/components/CurlDocs';
import { CurlCookbook } from '@/components/CurlCookbook';
import { Button } from '@/components/ui/button';
const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-neon-green/20 bg-[#0D1117]/80 backdrop-blur-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <a href="#" className="font-display text-2xl text-neon-green hover:text-magenta transition-colors">
            CurlCraft
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#playground" className="font-mono text-sm text-neon-green/80 hover:text-neon-green transition-colors">Playground</a>
          <a href="#docs" className="font-mono text-sm text-neon-green/80 hover:text-neon-green transition-colors">Docs</a>
          <a href="#cookbook" className="font-mono text-sm text-neon-green/80 hover:text-neon-green transition-colors">Cookbook</a>
        </nav>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/curl/curl" target="_blank" rel="noopener noreferrer" aria-label="cURL GitHub Repository">
              <Github className="h-5 w-5 text-neon-green/80 hover:text-neon-green" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </header>
);
const Hero = () => (
  <section className="text-center py-20 md:py-32">
    <h1 className="font-display text-5xl md:text-7xl text-neon-green tracking-widest">
      CurlCraft
    </h1>
    <p className="mt-4 text-lg md:text-xl text-magenta font-mono">
      The Interactive cURL Playground
    </p>
    <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-neon-green/80">
      Learn, build, and test cURL commands directly in your browser with a nostalgic, retro-themed interface.
    </p>
  </section>
);
const Footer = () => (
  <footer className="border-t-2 border-dashed border-neon-green/20 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neon-green/60 font-mono text-sm">
      <p>Built with ❤️ at Cloudflare</p>
      <p className="mt-2">CurlCraft is an educational tool. Not affiliated with the official cURL project.</p>
    </div>
  </footer>
);
export function HomePage() {
  return (
    <div className="grainy-background bg-[#0D1117] text-neon-green">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <section id="playground" className="py-12 md:py-20">
          <CurlPlayground />
        </section>
        <section id="docs" className="py-12 md:py-20">
          <CurlDocs />
        </section>
        <section id="cookbook" className="py-12 md:py-20">
          <CurlCookbook />
        </section>
      </main>
      <Footer />
    </div>
  );
}