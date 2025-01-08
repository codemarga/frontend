'use client';

import { useState, useEffect } from 'react';
import { Maximize2, Minimize2, CheckSquare, ChevronRight, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axios from 'axios';

export default function TestCase({ problemId, outputs }: { problemId: string, outputs: any }) {
  const [activeTab, setActiveTab] = useState('0');
  const [testCases, setTestCases] = useState<any>({});

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_TESTCASE_URL}${problemId}`
        );
        console.log('Test cases:', response.data);
        setTestCases(response.data);
      } catch (error: any) {
        console.error('Failed to fetch test cases:', error.message);
      }
    };

    if (problemId) {
      fetchTestCases();
    }
  }, [problemId]);

  return (
    <div className="w-full h-full max-w-3xl mx-auto bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-emerald-500" />
          <span className="font-medium text-zinc-100">Testcase</span>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
          <span className="text-zinc-400">Test Result</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-800/50 border-0">
            {Object.keys(testCases).map((caseId) => (
              <TabsTrigger
                key={caseId}
                value={caseId}
                className="data-[state=active]:bg-zinc-700"
              >
                Case {Number(caseId) + 1}
              </TabsTrigger>
            ))}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
              <Plus className="w-4 h-4" />
            </Button>
          </TabsList>

          {/* Content for each tab */}
          {Object.entries(testCases).map(([caseId, data]: [string, any], index: number) => {
            const expectedOutput = Array.isArray(data.output) ? data.output : [];
            let actualOutput: any[] = [];

              actualOutput = JSON.parse(outputs[`output${index + 1}`]);
            
            return (
              <TabsContent key={caseId} value={caseId} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <div className="text-zinc-400">nums =</div>
                  <div className="p-3 bg-zinc-800/50 rounded-md text-zinc-100 font-mono">
                    [{data.input.nums.join(',')}]
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-zinc-400">target =</div>
                  <div className="p-3 bg-zinc-800/50 rounded-md text-zinc-100 font-mono">
                    {data.input.target}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-zinc-400">Expected Output =</div>
                  <div className="p-3 bg-zinc-800/50 rounded-md text-zinc-100 font-mono">
                    [{expectedOutput.join(', ')}]
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-zinc-400">output =</div>
                  <div className="p-3 bg-zinc-800/50 rounded-md text-zinc-100 font-mono">
                    [
                    {expectedOutput.map((expected:any, idx:any) => {
                      const actual = actualOutput[idx];
                      const isMatch = expected === actual;
                      return (
                        <span key={idx}>
          <span className={isMatch ? 'text-green-500' : 'text-red-500'}>
            {actual ?? 'undefined'}
          </span>
          {idx < expectedOutput.length - 1 && ', '}
        </span>
                      );
                    })}
                    ]
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
