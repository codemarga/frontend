/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState,useEffect } from "react";
import { Calendar, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const ContestDescription = ({ contest }: { contest?: any }) => {
  const [selectedProblem, setSelectedProblem] = useState<any | null>(null);
  const [hasJoined, setHasJoined] = useState(false);
  const router = useRouter();

  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch("/api/session");
      const data = await response.json();
      setSession(data.data);
    };

    fetchSession();
  }, []);


  const handleProblemSolve = (problem_id: string) => {
    console.log("session", JSON.stringify(session))
    console.log("Solving problem with id: ", problem_id);
    console.log("Contest id: ", contest.contest_id);
    const email = session.user.email
    const contest_id = contest.contest_id
    router.push(`/contest/problems/${problem_id}?email=${email}&contestId=${contest_id}`);
  };

  const handleJoin = async ()=>{
    setHasJoined(!hasJoined)
    const response = await axios.post(process.env.NEXT_PUBLIC_JOINCONTEST_URL!,{
      contest_id: contest.contest_id,
      email: session.user.email,
    })
    console.log(response.data)

  }

  return (
    <div className="bg-white-900 rounded-lg p-6 shadow-md border border-white-800 mb-6">
      {contest ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white-100">
              Welcome to {contest.contest_name} {contest.contest_id}
            </h2>
            <Button
              variant="default"
              onClick={() => handleJoin()}
              className={`bg-[#636ae8] text-white transition-opacity duration-300 ${
                hasJoined ? "opacity-100" : "opacity-50"
              }`}
          
            >
              {hasJoined ? "Joined" : "Join"}
            </Button>
          </div>
          <div className="mb-4">
            <div className="text-white-400 mb-2">
              <Clock className="inline-block w-4 h-4 mr-2" />
              Start Time: {contest.start_time}
            </div>
            <div className="text-white-400">
              <Calendar className="inline-block w-4 h-4 mr-2" />
              Duration: {contest.time_duration}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-white-100">Contest Problems:</h3>
            <div className="space-y-2">
              {contest.problems.length > 0 ? (
                contest.problems.map((problem: any) => (
                  <div
                    key={problem.id}
                    onClick={() => setSelectedProblem(problem)}
                    className="flex items-center justify-between border-b border-zinc-700 py-2 cursor-pointer hover:bg-zinc-200"
                  >
                    <span className="text-white-100">{problem.title}</span>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          problem.categories[0] === "Easy"
                            ? "bg-green-900 text-green-100"
                            : problem.categories[0] === "Medium"
                            ? "bg-yellow-900 text-yellow-100"
                            : "bg-red-900 text-red-100"
                        }`}
                      >
                        {problem.categories[0]}
                      </span>
                      <span className="text-white-400">
                        {problem.points} points
                      </span>
                      <Button
                        variant="default"
                        size="sm"
                        className={`bg-black text-white transition-opacity duration-300 ${
                          hasJoined ? "opacity-100" : "opacity-50"
                        }`}
                        disabled={!hasJoined}
                        onClick={()=>handleProblemSolve(problem.id)}
                      >
                        Solve
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No problems added</div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mt-6">
            <h3 className="font-medium text-blue-800 mb-2">Contest Rules</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
              <li>Duration: {contest.time_duration}</li>
              <li>Individual participation only</li>
              <li>Penalty for incorrect submissions: 5 minutes</li>
              <li>Problems can be solved in any order</li>
            </ul>
          </div>
          <Button className="m-2">Submit</Button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ContestDescription;

