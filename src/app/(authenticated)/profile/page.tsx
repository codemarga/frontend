/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Trophy,
  Award,
  CheckCircle2,
  Calendar,
  Flame,
  Code2,
  Sparkles,
  Zap,
  ArrowRight
} from "lucide-react";
import axios from "axios";

export default function ProfilePage() {
  const [session, setSession] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [userRank, setUserRank] = useState<number>(2);
  const [userPoints, setUserPoints] = useState<number>(817);

  useEffect(() => {
    // Fetch session
    fetch("/api/session")
      .then((res) => res.json())
      .then((d) => {
        setSession(d?.data);
      })
      .catch(() => {});

    // Fetch leaderboard
    axios.get("http://localhost:8000/leaderboard/")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setLeaderboard(data);
        const found = data.findIndex(
          (u: any) => u.username === session?.user?.name || u.username === "Swarnim Bajracharya"
        );
        if (found !== -1) {
          setUserRank(found + 1);
          setUserPoints(data[found].points);
        }
      })
      .catch(() => {});
  }, [session?.user?.name]);

  const solvedProblems = [
    { id: 1, title: "Reverse a String", difficulty: "Easy", points: 500, date: "2026-09-25", status: "Accepted" },
    { id: 3, title: "Two Sum", difficulty: "Easy", points: 500, date: "2026-09-25", status: "Accepted" },
    { id: 2, title: "Count Distinct Words", difficulty: "Medium", points: 1000, date: "2026-09-24", status: "Accepted" },
    { id: 8, title: "Climbing Stairs", difficulty: "Easy", points: 500, date: "2026-09-23", status: "Accepted" },
  ];

  const badges = [
    {
      title: "First Step",
      desc: "Solved your first problem on CodeMarga",
      icon: Sparkles,
      color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      unlocked: true,
    },
    {
      title: "String Virtuoso",
      desc: "Completed String Manipulation challenge",
      icon: Code2,
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      unlocked: true,
    },
    {
      title: "Speed Demon",
      desc: "Achieved sub-100ms execution time",
      icon: Zap,
      color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      unlocked: true,
    },
    {
      title: "Contest Champion",
      desc: "Ranked Top 3 in an official contest",
      icon: Trophy,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      unlocked: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        {/* Profile Header Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border mb-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User Avatar"
                  width={80}
                  height={80}
                  className="rounded-full ring-4 ring-indigo-500/30 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
                  {session?.user?.name ? session.user.name[0].toUpperCase() : "U"}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-foreground">
                    {session?.user?.name || "Swarnim Bajracharya"}
                  </h1>
                  <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/30 text-xs">
                    Grandmaster
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  {session?.user?.email || "bajraswarnim@gmail.com"}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Joined Sep 2026
                  </span>
                  <span className="flex items-center gap-1 text-rose-500 font-medium">
                    <Flame className="w-3.5 h-3.5" /> 3-Day Active Streak
                  </span>
                </div>
              </div>
            </div>

            <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-9">
              <Link href="/problems">
                Practice More <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-border bg-card">
            <span className="text-xs text-muted-foreground block mb-1">Global Standing</span>
            <div className="text-2xl font-bold text-amber-500 flex items-center gap-1.5">
              <Trophy className="w-5 h-5" /> #{userRank}
            </div>
            <span className="text-[11px] text-muted-foreground">Top 5% of candidates</span>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <span className="text-xs text-muted-foreground block mb-1">Total Rating Points</span>
            <div className="text-2xl font-bold text-foreground">
              {userPoints} <span className="text-xs font-normal text-muted-foreground">pts</span>
            </div>
            <span className="text-[11px] text-emerald-500 font-medium">+160 pts this week</span>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <span className="text-xs text-muted-foreground block mb-1">Problems Solved</span>
            <div className="text-2xl font-bold text-foreground">
              {solvedProblems.length} <span className="text-xs font-normal text-muted-foreground">/ 12</span>
            </div>
            <span className="text-[11px] text-muted-foreground">33% completion rate</span>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <span className="text-xs text-muted-foreground block mb-1">Contests Entered</span>
            <div className="text-2xl font-bold text-foreground">
              3 <span className="text-xs font-normal text-muted-foreground">contests</span>
            </div>
            <span className="text-[11px] text-indigo-400 font-medium">100% submission rate</span>
          </div>
        </div>

        {/* Tabbed Activity & History */}
        <Tabs defaultValue="submissions" className="w-full">
          <TabsList className="grid grid-cols-2 max-w-sm mb-6 bg-muted/60">
            <TabsTrigger value="submissions" className="text-xs sm:text-sm">
              Solved History
            </TabsTrigger>
            <TabsTrigger value="badges" className="text-xs sm:text-sm">
              Badges & Milestones
            </TabsTrigger>
          </TabsList>

          {/* Submissions History */}
          <TabsContent value="submissions">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">Solved Problems History</CardTitle>
                <CardDescription className="text-xs">
                  Review your successfully accepted submissions and revisit problem solutions.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {solvedProblems.map((prob) => (
                    <div
                      key={prob.id}
                      className="p-4 flex items-center justify-between hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div>
                          <Link
                            href={`/problems/${prob.id}`}
                            className="font-semibold text-sm text-foreground hover:text-indigo-500 transition-colors"
                          >
                            {prob.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                            <span>Solved on {prob.date}</span>
                            <span>•</span>
                            <span className="text-emerald-500 font-medium">+{prob.points} points</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge
                          className={`text-xs ${
                            prob.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          }`}
                        >
                          {prob.difficulty}
                        </Badge>
                        <Button asChild size="sm" variant="outline" className="text-xs h-7">
                          <Link href={`/problems/${prob.id}`}>Review</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-border bg-card flex items-start space-x-4 shadow-sm"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${b.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{b.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                      <Badge className="mt-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                        ✓ Unlocked
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
