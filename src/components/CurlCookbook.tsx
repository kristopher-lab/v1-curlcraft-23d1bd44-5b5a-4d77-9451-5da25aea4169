import React from 'react';
import { Terminal, Copy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cookbookExamples } from '@/lib/curlData';
import { useCurlStore } from '@/store/curlStore';
import { Toaster, toast } from '@/components/ui/sonner';
export function CurlCookbook() {
  const loadCookbookExample = useCurlStore((s) => s.loadCookbookExample);
  const handleLoadExample = (example: (typeof cookbookExamples)[0]) => {
    loadCookbookExample(example);
    toast.success(`Loaded "${example.title}" into Playground!`);
    document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    toast.info("Command copied to clipboard!");
  };
  return (
    <section id="cookbook" className="border-t-2 border-dashed border-neon-green/20">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl text-neon-green">Command Cookbook</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-neon-green/80">
          Practical, real-world examples to get you started with cURL.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cookbookExamples.map((example) => (
          <Card key={example.id} className="bg-black/30 border-magenta/30 flex flex-col hover:border-neon-green transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-magenta font-display text-2xl">{example.title}</CardTitle>
              <CardDescription className="text-neon-green/70">{example.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="bg-[#0D1117] p-3 rounded-md border border-neon-green/20">
                <code className="text-sm text-neon-green break-all font-mono">{example.command}</code>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => handleCopyCommand(example.command)} className="text-neon-green hover:bg-neon-green/10 hover:text-neon-green">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleLoadExample(example)} className="text-magenta hover:bg-magenta/10 hover:text-magenta">
                <Terminal className="h-4 w-4 mr-2" />
                Load
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Toaster theme="dark" richColors closeButton />
    </section>
  );
}