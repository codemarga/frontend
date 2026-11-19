/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Shuffle,
  Terminal,
  Filter,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen
} from "lucide-react";
import axios from "axios";

export default function ProblemListPage() {
  const router = useRouter();
  const [problems, setProblems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const url = process.env.NEXT_PUBLIC_PROBLEMS_URL || "http://localhost:8000/problems/";
        const cleanUrl = url.trim().endsWith('/') ? url.trim() : `${url.trim()}/`;
        const response = await axios.get(cleanUrl);
        setProblems(Array.isArray(response.data) ? response.data : []);
      } catch (e) {
        console.error("Failed to fetch problems:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const topics = [
    "All",
    "Array",
    "String",
    "Math",
    "Dynamic Programming",
    "Binary Search",
    "Sorting"
  ];

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query);

      // Topic match
      let matchTopic = true;
      if (selectedTopic !== "All") {
        const topicLower = selectedTopic.toLowerCase();
        const titleLower = p.title?.toLowerCase() || "";
        const descLower = p.description?.toLowerCase() || "";
        matchTopic = titleLower.includes(topicLower) || descLower.includes(topicLower);
      }

      // Difficulty match
      let matchDiff = true;
      if (selectedDifficulty !== "All") {
        matchDiff = p.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();
      }

      return matchSearch && matchTopic && matchDiff;
    });
  }, [problems, searchQuery, selectedTopic, selectedDifficulty]);

  const handlePickRandom = () => {
    if (problems.length === 0) return;
    const randomIndex = Math.floor(Math.random() * problems.length);
    const chosenProblem = problems[randomIndex];
    router.push(`/problems/${chosenProblem.id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-6 h-6 text-indigo-500" />
              <h1 className="text-3xl font-black tracking-tight text-foreground">Problem Library</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Select from curated coding problems, test with custom inputs, and optimize complexity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handlePickRandom}
              variant="outline"
              className="border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/10 text-xs font-semibold h-9"
            >
              <Shuffle className="w-3.5 h-3.5 mr-1.5" /> Pick Random Problem
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-4 mb-6">
          {/* Topic Pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Topics:
            </span>
            {topics.map((topic) => {
              const isSelected = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          {/* Search & Difficulty Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems by title, keyword..."
                className="pl-9 h-9 text-xs bg-muted/30 border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[140px] h-9 text-xs bg-muted/30 border-border">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Showing <strong className="text-foreground">{filteredProblems.length}</strong> problems
              </span>
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <div className="rounded-xl border border-border bg-card/60 backdrop-blur overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-16 text-center font-bold text-xs">#</TableHead>
                <TableHead className="font-bold text-xs">Title</TableHead>
                <TableHead className="hidden md:table-cell font-bold text-xs">Description Preview</TableHead>
                <TableHead className="w-28 font-bold text-xs text-center">Difficulty</TableHead>
                <TableHead className="w-28 text-right font-bold text-xs pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell className="text-center"><div className="h-4 w-4 bg-muted rounded mx-auto" /></TableCell>
                    <TableCell><div className="h-4 w-48 bg-muted rounded" /></TableCell>
                    <TableCell className="hidden md:table-cell"><div className="h-4 w-72 bg-muted rounded" /></TableCell>
                    <TableCell><div className="h-4 w-16 bg-muted rounded mx-auto" /></TableCell>
                    <TableCell><div className="h-8 w-16 bg-muted rounded ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredProblems.length > 0 ? (
                filteredProblems.map((problem, idx) => (
                  <TableRow key={problem.id} className="hover:bg-muted/40 transition-colors group">
                    <TableCell className="text-center font-mono text-xs text-muted-foreground">
                      {problem.id || idx + 1}
                    </TableCell>

                    <TableCell>
                      <Link
                        href={`/problems/${problem.id}`}
                        className="font-semibold text-sm text-foreground group-hover:text-indigo-500 transition-colors flex items-center gap-1.5"
                      >
                        {problem.title}
                      </Link>
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground line-clamp-1 max-w-md pt-4">
                      {problem.description}
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        className={`text-[11px] px-2 py-0.5 font-medium border ${
                          problem.difficulty === "Easy"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : problem.difficulty === "Medium"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }`}
                      >
                        {problem.difficulty || "Easy"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right pr-6">
                      <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-8 px-3 font-medium">
                        <Link href={`/problems/${problem.id}`}>
                          Solve <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground text-sm">
                    No problems match your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
