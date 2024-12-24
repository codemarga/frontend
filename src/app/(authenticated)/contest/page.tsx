'use client';  // Ensure this file is treated as a client-side component

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

import { Contest } from './types';
import ContestCard from './ContestCard';
import ContestDescription from './ContestDescription';
import MonacoEditor from '@monaco-editor/react';  // Import Monaco editor

const ContestPage = () => {
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [isContestStarted, setIsContestStarted] = useState(false);  // Track if the contest has started

  const upcomingContests: Contest[] = [
    { title: 'Weekly Contest 430', startTime: '5d 11h 39m 50s', type: 'weekly' },
    { title: 'Biweekly Contest 147', startTime: '1d 23h 40m 9s', type: 'biweekly' }
  ];

  const startContest = () => {
    setIsContestStarted(true);
  };

  const problemDescription = `
    # Problem Description
    The task is to write a function that solves the problem description. The goal is to implement a solution with time complexity O(n). 
    - Constraints:
      - 1 ≤ n ≤ 10000
      - Use dynamic programming to solve the problem.

    ## Example:
    Input: [1, 2, 3, 4]
    Output: 10
  `;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {selectedContest ? (
          <>
            <button 
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
              onClick={() => setSelectedContest(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Contests
            </button>
            <ContestDescription contest={selectedContest} />
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h1 className="text-2xl font-bold text-gray-800">Upcoming Contests</h1>
              {upcomingContests.map((contest, index) => (
                <ContestCard 
                  key={index} 
                  {...contest} 
                  isUpcoming={true}
                  onClick={() => setSelectedContest(contest)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestPage;
