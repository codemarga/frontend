/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProjectSummary } from "@/components/project-summary";
import { CodingContests } from "@/components/coding-contests";
import { ContestantDetails } from "@/components/contestant-details";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Trophy,
  Terminal,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers
} from "lucide-react";

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => setSession(data?.data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <DashboardHeader />

      <main className="container mx-auto px-4 sm:px-6 py-8 flex-1 max-w-7xl">
        {/* HERO SECTION */}
        <section className="mb-10 p-6 sm:p-8 rounded-xl bg-card border border-border">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              Welcome back,{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                {session?.user?.name || "Code Pioneer"}
              </span>
            </h1>

            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Practice data structures &amp; algorithms, compete in live contests,
              and climb the global leaderboard.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button asChild size="default" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm h-9 px-5">
                <Link href="/problems">
                  <Terminal className="w-4 h-4 mr-2" />
                  Explore Problems
                </Link>
              </Button>

              <Button asChild variant="outline" size="default" className="border-border text-foreground hover:bg-muted font-medium text-sm h-9 px-5">
                <Link href="/contest">
                  <Trophy className="w-4 h-4 mr-2 text-amber-500" />
                  Live Contests
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                <span>Python, C++, Java</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Auto Test Evaluation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Sub-100ms Execution</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: Practice & Contest Hub */}
        <ProjectSummary />

        {/* SECTION 2: Competitive Contests Showcase */}
        <CodingContests />

        {/* SECTION 3: Hall of Fame Leaderboard */}
        <ContestantDetails />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 bg-muted/20 text-center text-xs text-muted-foreground">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} CodeMarga — Open Source Competitive Programming Platform.</span>
          <div className="flex items-center gap-4">
            <Link href="/problems" className="hover:text-foreground transition-colors">Problems</Link>
            <Link href="/contest" className="hover:text-foreground transition-colors">Contests</Link>
            <Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link>
            <Link href="/profile" className="hover:text-foreground transition-colors">Profile</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
