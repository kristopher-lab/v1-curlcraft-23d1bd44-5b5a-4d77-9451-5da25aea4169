import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { curlSwitches, curlDocs } from '@/lib/curlData';
export function CurlDocs() {
  return (
    <section id="docs" className="border-t-2 border-dashed border-neon-green/20">
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="font-display text-4xl md:text-5xl text-neon-green">cURL Documentation</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-neon-green/80">
            Everything you need to know about cURL and its most common switches.
          </p>
        </div>
        <Card className="bg-black/30 border-magenta/30">
          <CardHeader>
            <CardTitle className="font-display text-magenta text-3xl">What is cURL?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-neon-green/90 text-base md:text-lg">
            <p>{curlDocs.whatIsCurl}</p>
            <p>{curlDocs.whatItDoes}</p>
          </CardContent>
        </Card>
        <Card className="bg-black/30 border-neon-green/30">
          <CardHeader>
            <CardTitle className="font-display text-neon-green text-3xl">Common Switches</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {curlSwitches.filter(s => s.flag).map((s) => (
                <AccordionItem key={s.id} value={s.id} className="border-neon-green/20">
                  <AccordionTrigger className="text-magenta font-mono hover:no-underline hover:text-neon-green">
                    {s.flag}
                  </AccordionTrigger>
                  <AccordionContent className="text-neon-green/80 font-mono">
                    {s.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}