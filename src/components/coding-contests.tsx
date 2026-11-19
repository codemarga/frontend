/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Radio, Star, ArrowRight, Clock, Users } from "lucide-react";
import axios from "axios";

export function CodingContests() {
  const [contests, setContests] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      try {
        const url = process.env.NEXT_PUBLIC_CONTESTS_URL || "http://localhost:8000/contestlist/";
        const cleanUrl = url.trim().endsWith('/') ? url.trim() : `${url.trim()}/`;
        const response = await axios.get(cleanUrl);
        setContests(response.data?.contests || []);
      } catch (e) {
        console.error("Failed to fetch contests:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const filterTabs = [
    { id: "all", label: "All Contests", icon: Trophy },
    { id: "live", label: "Live Now", icon: Radio },
    { id: "upcoming", label: "Upcoming", icon: Calendar },
    { id: "top", label: "Featured", icon: Star },
  ];

  const filteredContests = contests.filter((c, index) => {
    if (activeFilter === "live") return index === 0; // First contest is active
    if (activeFilter === "upcoming") return index > 0;
    if (activeFilter === "top") return true;
    return true;
  });

  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            Competitive Coding Contests
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Test your algorithmic speed, solve curated challenges, and earn ranking points.
          </p>
        </div>

        <Button asChild variant="outline" size="sm" className="text-xs h-8">
          <Link href="/contest">
            All Contests Page <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </Button>
      </div>

      {/* Interactive Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(tab.id)}
              className={`h-8 text-xs font-medium transition-all ${
                isActive
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <Icon className="mr-1.5 h-3.5 w-3.5" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Contest Cards Grid */}
      <div className="grid gap-5 md:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse bg-muted/40 h-48 border-border" />
          ))
        ) : filteredContests.length > 0 ? (
          filteredContests.map((contest, index) => {
            const isLive = index === 0;
            return (
              <Card
                key={contest.id || index}
                className="flex flex-col justify-between border-border hover:border-indigo-500/50 hover:shadow-lg transition-all group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      className={
                        isLive
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs flex items-center gap-1"
                          : "bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs flex items-center gap-1"
                      }
                    >
                      {isLive ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Now
                        </>
                      ) : (
                        "Upcoming"
                      )}
                    </Badge>

                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 2h
                    </span>
                  </div>

                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-indigo-500 transition-colors">
                    {contest.name}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2 mt-1">
                    {contest.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-3">
                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border text-xs space-y-1">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Schedule:</span>
                      <span className="font-medium text-foreground">{contest.start_time?.slice(0, 16) || "Active"}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Contest ID:</span>
                      <span className="font-medium text-foreground">#{contest.id}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-9 font-medium">
                    <Link href={`/contest`}>
                      Enter Contest <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-10 bg-muted/30 rounded-xl border border-dashed border-border text-muted-foreground text-sm">
            No contests match the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
