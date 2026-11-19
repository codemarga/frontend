/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const ContestDescription = ({ contest }: { contest?: any }) => {
  const [selectedProblem, setSelectedProblem] = useState<any | null>(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/session");
        const data = await response.json();
        setSession(data?.data || null);
      } catch (e) {
        console.error("Failed to fetch session:", e);
      }
    };
    fetchSession();
  }, []);

  const handleProblemSolve = (problem_id: string | number) => {
    const email = session?.user?.email || "anonymous@codemarga.com";
    const contest_id = contest?.contest_id || contest?.id || "";
    router.push(`/contest/problems/${problem_id}?email=${encodeURIComponent(email)}&contestId=${contest_id}`);
  };

  const handleJoin = async () => {
    const email = session?.user?.email || "anonymous@codemarga.com";
    const contest_id = contest?.contest_id || contest?.id;
    if (!contest_id) return;

    setIsJoining(true);
    try {
      const joinUrl = process.env.NEXT_PUBLIC_JOINCONTEST_URL || "http://localhost:8000/joincontest/";
      const cleanUrl = joinUrl.trim().endsWith('/') ? joinUrl.trim() : `${joinUrl.trim()}/`;
      const response = await axios.post(cleanUrl, {
        contest_id,
        email,
      });
      console.log("Joined contest:", response.data);
      setHasJoined(true);
    } catch (error: any) {
      console.error("Failed to join contest:", error);
      // Still allow solving if already joined
      setHasJoined(true);
    } finally {
      setIsJoining(false);
    }
  };

  if (!contest) {
    return <div className="p-8 text-center text-muted-foreground">Loading contest details...</div>;
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6 text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {contest.contest_name || contest.name}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {contest.contest_description || contest.description}
          </p>
        </div>

        <Button
          variant="default"
          onClick={handleJoin}
          disabled={hasJoined || isJoining}
          className={`${
            hasJoined
              ? "bg-emerald-600 hover:bg-emerald-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
          }`}
        >
          {hasJoined ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Joined
            </span>
          ) : isJoining ? (
            "Joining..."
          ) : (
            "Join Contest"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-muted/40 rounded-lg border border-border text-sm">
        <div className="text-muted-foreground flex items-center">
          <Clock className="w-4 h-4 mr-2 text-indigo-500" />
          <span>Start Time: <strong className="text-foreground">{contest.start_time || "Now"}</strong></span>
        </div>
        <div className="text-muted-foreground flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
          <span>Duration: <strong className="text-foreground">{contest.time_duration || "2 hours"}</strong></span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-foreground">Contest Problems</h3>
        <div className="space-y-2">
          {contest.problems && contest.problems.length > 0 ? (
            contest.problems.map((problem: any) => {
              const categoryName = Array.isArray(problem.categories) && problem.categories.length > 0
                ? problem.categories[0]
                : "Standard";

              return (
                <div
                  key={problem.id}
                  className="flex items-center justify-between border border-border bg-card hover:bg-muted/50 p-4 rounded-lg transition-colors"
                >
                  <div>
                    <span className="font-medium text-foreground">{problem.title}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          categoryName === "Easy"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : categoryName === "Medium"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                            : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30"
                        }`}
                      >
                        {categoryName}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {problem.points ?? 100} points
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white"
                    onClick={() => handleProblemSolve(problem.id)}
                  >
                    Solve
                  </Button>
                </div>
              );
            })
          ) : (
            <div className="text-muted-foreground p-6 bg-muted/30 rounded-lg text-center text-sm">
              No problems assigned to this contest yet.
            </div>
          )}
        </div>
      </div>

      <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 p-4 rounded-lg mt-6">
        <h3 className="font-medium text-indigo-900 dark:text-indigo-300 mb-2">Contest Rules</h3>
        <ul className="list-disc list-inside text-indigo-800/80 dark:text-indigo-200/80 space-y-1 text-xs">
          <li>Duration: {contest.time_duration || "As specified"}</li>
          <li>Individual participation only</li>
          <li>Scores are computed based on test cases passed, code time complexity, and submission speed</li>
          <li>Problems can be solved and submitted in any order</li>
        </ul>
      </div>
    </div>
  );
};

export default ContestDescription;
