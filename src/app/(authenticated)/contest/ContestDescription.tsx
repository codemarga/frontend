'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Play, Upload } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface Contest {
  title: 'Weekly Contest 430' | 'Biweekly Contest 147';
  startTime?: string;
  type?: 'weekly' | 'biweekly';
}

interface Problem {
  name: string;
  description: string;
  difficulty: string;
  points: number;
}

const contestData = {
  'Weekly Contest 430': {
    title: 'Weekly Contest 430',
    problems: [
      { name: 'Maximum Sum Queries', description: 'Given an array, find the maximum sum of subarrays...', difficulty: 'Medium', points: 10 },
      { name: 'Minimum Array Length', description: 'Find the minimum length of the array such that...', difficulty: 'Easy', points: 5 },
      { name: 'Maximum Points After Collection', description: 'Collect the maximum points from the array while adhering to...', difficulty: 'Medium', points: 10 },
      { name: 'Count Subarrays', description: 'Given an array, count the number of subarrays...', difficulty: 'Hard', points: 20 },
    ],
    duration: '1 hour 30 minutes',
    startTime: 'Sunday 8:15 AM GMT+5:45',
  },
  'Biweekly Contest 147': {
    title: 'Biweekly Contest 147',
    problems: [
      { name: 'Binary Tree Maximum Path', description: 'Find the maximum path sum in a binary tree...', difficulty: 'Medium', points: 10 },
      { name: 'String Operations', description: 'Perform operations on strings to modify them...', difficulty: 'Easy', points: 5 },
      { name: 'Dynamic Programming Challenge', description: 'Solve using dynamic programming to maximize the result...', difficulty: 'Medium', points: 10 },
      { name: 'Graph Optimization', description: 'Optimize the given graph to find the shortest path...', difficulty: 'Hard', points: 20 },
    ],
    duration: '2 hours',
    startTime: 'Saturday 8:15 PM GMT+5:45',
  },
};

const defaultCode = {
  python: `def solve():
    # Write your solution here
    pass

# Example usage
if __name__ == "__main__":
    solve()`,
  javascript: `function solve() {
    // Write your solution here
}

// Example usage
solve();`,
  cpp: `#include <iostream>
using namespace std;

void solve() {
    // Write your solution here
}

int main() {
    solve();
    return 0;
}`,
  java: `public class Solution {
    public static void solve() {
        // Write your solution here
    }

    public static void main(String[] args) {
        solve();
    }
}`
};

const defaultContest: Contest = {
  title: 'Weekly Contest 430',
  type: 'weekly',
};

const ContestDescription = ({ contest = defaultContest }: { contest?: Contest }) => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<string>('javascript');
  const [activeTab, setActiveTab] = useState<string>('code');
  const [terminalResult, setTerminalResult] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const data = contestData[contest.title];

  const handleLanguageChange = (selected: string) => {
    setLanguage(selected);
    setCode(defaultCode[selected as keyof typeof defaultCode]);
  };

  React.useEffect(() => {
    setCode(defaultCode[language as keyof typeof defaultCode]);
  }, [language]);

  const executeCode = async () => {
    setIsRunning(true);
    setActiveTab('terminal');
    setTerminalResult('Running code...');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const output = `[${language.toUpperCase()} Execution Output]
-----------------------------
Compiling code...
Running test cases...
${Math.random() > 0.5 ? 'All test cases passed!' : 'Some test cases failed.'}
-----------------------------
Memory used: ${Math.floor(Math.random() * 100)}MB
Time taken: ${(Math.random() * 2).toFixed(2)}s`;

      setTerminalResult(output);
    } catch (error) {
      setTerminalResult(`Error executing code: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  if (!data) {
    return <div className="text-white">Contest not found</div>;
  }

  return (
    <div className="bg-white-900 rounded-lg p-6 shadow-md border border-white-800 mb-6">
      {!selectedProblem ? (
        <div>
          <h2 className="text-xl font-bold mb-4 text-white-100">Welcome to {data.title}</h2>
          <div className="mb-4">
            <div className="text-white-400 mb-2">
              <Clock className="inline-block w-4 h-4 mr-2" />
              Start Time: {data.startTime}
            </div>
            <div className="text-white-400">
              <Calendar className="inline-block w-4 h-4 mr-2" />
              Duration: {data.duration}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-white-100">Contest Problems:</h3>
            <div className="space-y-2">
              {data.problems.map((problem, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProblem(problem)}
                  className="flex items-center justify-between border-b border-zinc-700 py-2 cursor-pointer hover:bg-zinc-200"
                >
                  <span className="text-white-100">{problem.name}</span>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        problem.difficulty === 'Easy'
                          ? 'bg-green-900 text-green-100'
                          : problem.difficulty === 'Medium'
                          ? 'bg-yellow-900 text-yellow-100'
                          : 'bg-red-900 text-red-100'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="text-white-400">{problem.points} points</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mt-6">
            <h3 className="font-medium text-blue-800 mb-2">Contest Rules</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
              <li>Duration: {data.duration}</li>
              <li>Individual participation only</li>
              <li>Penalty for incorrect submissions: 5 minutes</li>
              <li>Problems can be solved in any order</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white-900 border-white-800">
            <CardHeader>
              <CardTitle className="text-white-100">{selectedProblem.name}</CardTitle>
              <div className="flex items-center space-x-4 mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    selectedProblem.difficulty === 'Easy'
                      ? 'bg-green-900 text-green-100'
                      : selectedProblem.difficulty === 'Medium'
                      ? 'bg-yellow-900 text-yellow-100'
                      : 'bg-red-900 text-red-100'
                  }`}
                >
                  {selectedProblem.difficulty}
                </span>
                <span className="text-white-400">{selectedProblem.points} points</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-white-300">{selectedProblem.description}</p>
              <button
                onClick={() => setSelectedProblem(null)}
                className="px-4 py-2 bg-white-800 text-white-100 rounded-lg hover:bg-zinc-300"
              >
                Back to Contest
              </button>
            </CardContent>
          </Card>

          <div className="w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 bg-white-800">
                <TabsTrigger value="code" className="data-[state=active]:bg-white-700">Code</TabsTrigger>
                <TabsTrigger value="terminal" className="data-[state=active]:bg-white-700">Terminal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="code">
                <div className="flex items-center bg-white-800 text-white-100 border-none p-2 rounded-t-lg">
                  <Select onValueChange={handleLanguageChange}>
                    <SelectTrigger id="language" className="w-32 h-8 bg-white-700">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 text-zinc-100">
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    className="flex items-center space-x-2 ml-4 px-3 py-1 bg-white-700 rounded hover:bg-white-600 disabled:opacity-50"
                    onClick={executeCode}
                    disabled={isRunning}
                  >
                    <Play className="h-4 w-4" />
                    <span>{isRunning ? 'Running...' : 'Run'}</span>
                  </button>
                </div>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono text-sm h-[60vh] bg-zinc-900 text-zinc-100 p-4 rounded-none rounded-b-lg border-zinc-700 focus:ring-zinc-700 focus:border-zinc-700"
                  placeholder="Write your code here..."
                  spellCheck={false}
                />
              </TabsContent>
              
              <TabsContent value="terminal">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-zinc-100">Output</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="font-mono text-sm bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                      {terminalResult || 'Run your code to see output here'}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDescription;