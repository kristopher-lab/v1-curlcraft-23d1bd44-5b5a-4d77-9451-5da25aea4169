import React from 'react';
import { Play, Loader } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useCurlStore } from '@/store/curlStore';
import { curlSwitches } from '@/lib/curlData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
const Terminal: React.FC<{ command: string; output: string; isLoading: boolean }> = ({ command, output, isLoading }) => (
  <Card className="font-mono bg-[#0D1117] border-neon-green/30 flex flex-col h-full">
    <CardHeader className="p-3 border-b border-neon-green/30 flex-shrink-0">
      <CardTitle className="text-sm text-neon-green">TERMINAL</CardTitle>
    </CardHeader>
    <CardContent className="p-0 flex flex-col flex-grow">
      <div className="p-4 bg-black/20 flex-shrink-0">
        <code className="text-magenta text-sm break-all">$ {command}</code>
      </div>
      <ScrollArea className="flex-grow h-96">
        <div className="p-4 text-sm">
          {isLoading ? (
            <div className="flex items-center gap-2 text-neon-green">
              <Loader className="animate-spin h-4 w-4" />
              <span>Executing...</span>
            </div>
          ) : (
            <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', margin: 0, padding: 0 }}>
              {output}
            </SyntaxHighlighter>
          )}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);
const SwitchControl: React.FC<{ switchConfig: (typeof curlSwitches)[0] }> = ({ switchConfig }) => {
  const setSwitchValue = useCurlStore((s) => s.setSwitchValue);
  const value = useCurlStore((s) => s.switches[switchConfig.id]);
  const commonProps = {
    id: switchConfig.id,
    className: "bg-transparent border-neon-green/50 text-neon-green placeholder:text-neon-green/50 focus:ring-magenta focus:border-magenta",
  };
  switch (switchConfig.inputType) {
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            {...commonProps}
            id={switchConfig.id}
            checked={!!value}
            onCheckedChange={(checked) => setSwitchValue(switchConfig.id, !!checked)}
            className="border-neon-green/50 data-[state=checked]:bg-magenta data-[state=checked]:text-black data-[state=checked]:border-magenta"
          />
          <Label htmlFor={switchConfig.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neon-green">
            {switchConfig.flag}
          </Label>
        </div>
      );
    case 'text':
      return (
        <Input
          {...commonProps}
          type="text"
          placeholder={switchConfig.placeholder}
          value={String(value)}
          onChange={(e) => setSwitchValue(switchConfig.id, e.target.value)}
        />
      );
    case 'textarea':
      return (
        <Textarea
          {...commonProps}
          placeholder={switchConfig.placeholder}
          value={String(value)}
          onChange={(e) => setSwitchValue(switchConfig.id, e.target.value)}
          rows={3}
        />
      );
    default:
      return null;
  }
};
export function CurlPlayground() {
  const command = useCurlStore((s) => s.command);
  const response = useCurlStore((s) => s.response);
  const isLoading = useCurlStore((s) => s.isLoading);
  const runCommand = useCurlStore((s) => s.runCommand);
  const groupedSwitches = curlSwitches.reduce((acc, s) => {
    acc[s.category] = [...(acc[s.category] || []), s];
    return acc;
  }, {} as Record<string, typeof curlSwitches>);
  return (
    <section id="playground">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {Object.entries(groupedSwitches).map(([category, switches]) => (
            <Card key={category} className="bg-black/30 border-neon-green/30">
              <CardHeader>
                <CardTitle className="font-display text-magenta text-2xl">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {switches.map((s) => (
                  <div key={s.id} className="space-y-2">
                    <Label className="text-neon-green">{s.flag}</Label>
                    <p className="text-xs text-neon-green/70">{s.description}</p>
                    <SwitchControl switchConfig={s} />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          <Button
            onClick={runCommand}
            disabled={isLoading}
            className="w-full font-display text-lg bg-neon-green text-black hover:bg-magenta hover:text-black transition-all duration-300 flex items-center gap-2"
          >
            {isLoading ? <Loader className="animate-spin h-5 w-5" /> : <Play className="h-5 w-5" />}
            RUN
          </Button>
        </div>
        <div className="sticky top-24 h-[calc(100vh-7rem)]">
          <Terminal command={command} output={response} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
}