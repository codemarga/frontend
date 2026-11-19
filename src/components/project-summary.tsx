/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UserIcon,
  LayoutDashboardIcon,
  CalendarIcon,
  Trophy,
  CheckCircle2,
  Flame,
  ArrowRight,
  Code,
  Clock,
  Sparkles,
  ChevronRight
} from "lucide-react";
import axios from "axios";

export function ProjectSummary() {
  const [contests, setContests] = useState<any[]>([]);
  const [problems, setProblems] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Fetch session
    fetch("/api/session")
      .then((res) => res.json())
      .then((d) => setSession(d?.data))
      .catch(() => {});

    // Fetch contests
    const contestsUrl = process.env.NEXT_PUBLIC_CONTESTS_URL || "http://localhost:8000/contestlist/";
    axios.get(contestsUrl.trim())
      .then((res) => setContests(res.data?.contests || []))
      .catch(() => {});

    // Fetch problems
    const problemsUrl = process.env.NEXT_PUBLIC_PROBLEMS_URL || "http://localhost:8000/problems/";
    axios.get(problemsUrl.trim())
      .then((res) => setProblems(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});

    // Fetch leaderboard
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://django-backend-6qja.onrender.com/";
    const leaderboardUrl = `${apiBase.replace(/\/$/, "")}/leaderboard/`;
    axios.get(leaderboardUrl)
      .then((res) => setLeaderboard(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
  }, []);

  const topics = [
    {
      name: "Strings & Manipulation",
      problems: [
        { id: 1, title: "Reverse a String", difficulty: "Easy" },
        { id: 4, title: "Palindrome Check", difficulty: "Easy" },
        { id: 2, title: "Count Distinct Words", difficulty: "Medium" }
      ],
      color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-400"
    },
    {
      name: "Arrays & Hashing",
      problems: [
        { id: 3, title: "Two Sum", difficulty: "Easy" },
        { id: 7, title: "Remove Duplicates", difficulty: "Easy" },
        { id: 5, title: "Maximum Subarray", difficulty: "Medium" }
      ],
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400"
    },
    {
      name: "Dynamic Programming",
      problems: [
        { id: 8, title: "Climbing Stairs", difficulty: "Easy" },
        { id: 10, title: "Best Time to Buy/Sell Stock", difficulty: "Easy" }
      ],
      color: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400"
    },
    {
      name: "Searching & Sorting",
      problems: [
        { id: 11, title: "Binary Search", difficulty: "Easy" },
        { id: 9, title: "Search Insert Position", difficulty: "Easy" },
        { id: 12, title: "Find Peak Element", difficulty: "Medium" }
      ],
      color: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400"
    }
  ];

  return (
    <Card className="mb-8 border border-border/80 shadow-sm bg-card/60 backdrop-blur">
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Practice & Contest Hub
            </CardTitle>
            <CardDescription>
              Track your stats, practice by data structure topics, and view upcoming competitive contests.
            </CardDescription>
          </div>
          <Button asChild size="sm" variant="outline" className="text-xs h-8">
            <Link href="/problems">
              Browse All ({problems.length || 12} Problems) <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <Tabs defaultValue="contestant" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mb-6 bg-muted/60">
            <TabsTrigger value="contestant" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <UserIcon className="h-4 w-4" />
              <span>My Stats</span>
            </TabsTrigger>
            <TabsTrigger value="board" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <LayoutDashboardIcon className="h-4 w-4" />
              <span>Practice Topics</span>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <CalendarIcon className="h-4 w-4" />
              <span>Upcoming</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Contestant / User Performance */}
          <TabsContent value="contestant" className="space-y-6 m-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20">
                <div className="flex items-center justify-between text-indigo-400 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Solved</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-foreground">4 <span className="text-xs font-normal text-muted-foreground">/ 12</span></div>
                <div className="text-xs text-muted-foreground mt-1">33% Completed</div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
                <div className="flex items-center justify-between text-amber-400 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Rating</span>
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-foreground">817</div>
                <div className="text-xs text-amber-500/90 mt-1 font-medium">Rank #2 Global</div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center justify-between text-emerald-400 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Contests</span>
                  <Code className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-foreground">{contests.length || 3}</div>
                <div className="text-xs text-muted-foreground mt-1">Participated</div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-500/20">
                <div className="flex items-center justify-between text-rose-400 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Streak</span>
                  <Flame className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-2xl font-bold text-foreground">3 <span className="text-xs font-normal text-muted-foreground">Days</span></div>
                <div className="text-xs text-rose-500/90 mt-1 font-medium">Active streak!</div>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-sm text-foreground">Recommended Next Problem</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  &quot;Reverse a String&quot; — Practice basic two-pointer technique and in-place manipulation.
                </p>
              </div>
              <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 text-xs">
                <Link href="/problems/1">
                  Solve Reverse a String <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* TAB 2: Practice Topics Board */}
          <TabsContent value="board" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-border bg-card hover:border-indigo-500/40 transition-colors"
                >
                  <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center justify-between">
                    <span>{topic.name}</span>
                    <Badge variant="outline" className="text-xs font-normal">
                      {topic.problems.length} problems
                    </Badge>
                  </h4>
                  <div className="space-y-2">
                    {topic.problems.map((p) => (
                      <Link
                        key={p.id}
                        href={`/problems/${p.id}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-muted/80 text-xs transition-colors group"
                      >
                        <span className="font-medium text-foreground group-hover:text-indigo-500 transition-colors">
                          {p.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            p.difficulty === "Easy" ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"
                          }`}>
                            {p.difficulty}
                          </span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: Upcoming Contests & Events */}
          <TabsContent value="upcoming" className="m-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contests.length > 0 ? (
                contests.map((c, i) => (
                  <div
                    key={c.id || i}
                    className="p-4 rounded-xl border border-border bg-card flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 text-xs">
                          Contest #{c.id || i + 1}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 2h duration
                        </span>
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{c.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                        {c.description}
                      </p>
                    </div>

                    <Button asChild size="sm" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs">
                      <Link href="/contest">
                        Join Contest <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-muted-foreground text-sm">
                  Loading upcoming contests schedule...
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
