/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, ArrowRight, Flame, Medal, User } from "lucide-react";
import axios from "axios";

export function ContestantDetails() {
  const [topContestants, setTopContestants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/leaderboard/");
        const data = Array.isArray(response.data) ? response.data : [];
        if (data.length > 0) {
          setTopContestants(data.slice(0, 3));
        } else {
          // Fallback if DB empty
          setTopContestants([
            { username: "Panda", points: 830 },
            { username: "Swarnim Bajracharya", points: 817 },
            { username: "hp", points: 496 }
          ]);
        }
      } catch (e) {
        setTopContestants([
          { username: "Panda", points: 830 },
          { username: "Swarnim Bajracharya", points: 817 },
          { username: "hp", points: 496 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const rankThemes = [
    {
      badge: "🥇 Rank 1",
      title: "Gold Master",
      color: "from-amber-500/10 to-yellow-500/10 border-amber-500/30 text-amber-500",
      avatarBg: "bg-amber-500 text-white"
    },
    {
      badge: "🥈 Rank 2",
      title: "Silver Contender",
      color: "from-slate-400/10 to-zinc-400/10 border-slate-400/30 text-slate-400",
      avatarBg: "bg-slate-500 text-white"
    },
    {
      badge: "🥉 Rank 3",
      title: "Bronze Achiever",
      color: "from-amber-700/10 to-orange-700/10 border-amber-700/30 text-amber-600",
      avatarBg: "bg-amber-700 text-white"
    }
  ];

  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Medal className="w-6 h-6 text-indigo-500" />
            Top Contestant Hall of Fame
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Recognizing the fastest problem-solvers and top competitors on CodeMarga.
          </p>
        </div>

        <Button asChild variant="outline" size="sm" className="text-xs h-8">
          <Link href="/leaderboard">
            View Full Leaderboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {topContestants.map((contestant, index) => {
          const theme = rankThemes[index] || rankThemes[2];
          return (
            <Card
              key={index}
              className={`border hover:shadow-lg transition-all relative overflow-hidden ${theme.color}`}
            >
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${theme.avatarBg}`}>
                    {contestant.username ? contestant.username[0].toUpperCase() : "U"}
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-foreground">
                      {contestant.username}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {theme.title}
                    </CardDescription>
                  </div>
                </div>

                <Badge className="bg-background/80 text-foreground border text-xs font-semibold">
                  {theme.badge}
                </Badge>
              </CardHeader>

              <CardContent className="pt-2">
                <div className="p-3 rounded-lg bg-background/50 border border-border/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Total Score</span>
                    <span className="text-base font-bold text-foreground">{contestant.points} pts</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground block text-[11px]">Level</span>
                    <span className="font-semibold text-indigo-500 flex items-center gap-1 justify-end">
                      <Flame className="w-3 h-3 text-rose-500" /> Pro Coder
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
