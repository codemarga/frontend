'use client';

import { useState, useEffect } from 'react';
import { Maximize2, Minimize2, CheckSquare, ChevronRight, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axios from 'axios';

function formatValue(val: any): string {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'string') return `"${val}"`;
  if (Array.isArray(val)) return `[${val.map(formatValue).join(', ')}]`;
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}

function parseOutputLine(line: string): any {
  try {
    // Handle Python repr format: 'string' -> "string"
    const normalized = line.trim().replace(/^'(.*)'$/, '"$1"');
    return JSON.parse(normalized);
  } catch {
    // If JSON parse fails, try eval-style (for Python True/False/None)
    const cleaned = line.trim()
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null');
    try {
      return JSON.parse(cleaned);
    } catch {
      return line.trim();
    }
  }
}

export default function TestCase({ problemId, outputs }: { problemId: string, outputs: any }) {
  const [activeTab, setActiveTab] = useState('0');
  const [testCases, setTestCases] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_TESTCASE_URL || "http://localhost:8000/testcases/";
        const cleanBase = baseUrl.trim().endsWith('/') ? baseUrl.trim() : `${baseUrl.trim()}/`;
        const response = await axios.get(`${cleanBase}${problemId}/`);
        console.log('Test cases:', response.data);
        setTestCases(Array.isArray(response.data) ? response.data : []);
      } catch (error: any) {
        console.error('Failed to fetch test cases:', error.message);
      }
    };

    if (problemId) {
      fetchTestCases();
    }
  }, [problemId]);

  return (
    <div className="w-full h-full max-w-3xl mx-auto bg-card text-card-foreground rounded-xl overflow-hidden border border-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-emerald-500" />
          <span className="font-semibold text-foreground text-sm">Testcase</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">Test Result</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted">
            {testCases.map((_: any, index: number) => (
              <TabsTrigger
                key={index}
                value={String(index)}
                className="data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Case {index + 1}
              </TabsTrigger>
            ))}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Plus className="w-4 h-4" />
            </Button>
          </TabsList>

          {/* Content for each tab */}
          {testCases.map((data: any, index: number) => {
            const expectedOutput = data.output;
            const outputKey = `output${index + 1}`;
            let actualOutput: any = undefined;
            let hasOutput = false;

            if (outputs && outputs[outputKey]) {
              try {
                actualOutput = parseOutputLine(outputs[outputKey]);
                hasOutput = true;
              } catch {
                actualOutput = outputs[outputKey];
                hasOutput = true;
              }
            }

            const isMatch = hasOutput && JSON.stringify(expectedOutput) === JSON.stringify(actualOutput);

            return (
              <TabsContent key={index} value={String(index)} className="mt-6 space-y-4">
                {/* Input fields - render each key dynamically */}
                {data.input && typeof data.input === 'object' && Object.entries(data.input).map(([key, value]: [string, any]) => (
                  <div className="space-y-1.5" key={key}>
                    <div className="text-muted-foreground text-xs font-mono">{key} =</div>
                    <div className="p-3 bg-muted/40 rounded-md text-foreground font-mono text-xs border border-border">
                      {formatValue(value)}
                    </div>
                  </div>
                ))}

                {/* Expected Output */}
                <div className="space-y-1.5">
                  <div className="text-muted-foreground text-xs font-mono">Expected Output =</div>
                  <div className="p-3 bg-muted/40 rounded-md text-foreground font-mono text-xs border border-border">
                    {formatValue(expectedOutput)}
                  </div>
                </div>

                {/* Actual Output */}
                <div className="space-y-1.5">
                  <div className="text-muted-foreground text-xs font-mono">Your Output =</div>
                  <div className={`p-3 bg-muted/40 rounded-md font-mono text-xs border border-border ${
                    !hasOutput ? 'text-muted-foreground' :
                    isMatch ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-red-600 dark:text-red-400 font-semibold'
                  }`}>
                    {hasOutput ? formatValue(actualOutput) : 'No output yet — run your code'}
                  </div>
                </div>

                {/* Status badge */}
                {hasOutput && (
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                    isMatch
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
                  }`}>
                    {isMatch ? '✓ Passed' : '✗ Failed'}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
