/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import { FaPlay } from "react-icons/fa";
import { IoCloudUploadSharp } from "react-icons/io5";
import { Loader2, ArrowLeft, Trophy, Zap, Clock, Award } from "lucide-react";
import axios from "axios";
import TestCase from "@/components/testcase";
import { useTheme } from "@/components/theme-provider";

export default function ContestProblemPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  const problem_id = params?.id as string;
  const emailParam = searchParams?.get("email");
  const contest_id = searchParams?.get("contestId");

  const [language, setLanguage] = useState<string>("python");
  const [code, setCode] = useState<string>("# Loading code template...");
  const [activeTab, setActiveTab] = useState<string>("code");
  const [problemDetails, setProblemDetails] = useState<any>(null);
  const [loadingProblem, setLoadingProblem] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [ter_res, setTerRes] = useState<any>({});
  const [output, setOutput] = useState<any>({});
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

  useEffect(() => {
    const fetchProblemDetails = async () => {
      if (!problem_id) return;
      setLoadingProblem(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_PROBLEMDETAILS_URL || "http://localhost:8000/pbs/";
        const cleanBase = baseUrl.trim().endsWith('/') ? baseUrl.trim() : `${baseUrl.trim()}/`;
        const response = await axios.get(`${cleanBase}${problem_id}/`);
        const data = response.data;
        setProblemDetails(data);

        // Initialize editor with default code for current language
        if (data.default_code && data.default_code[language]) {
          setCode(data.default_code[language]);
        } else if (data.default_code?.python) {
          setCode(data.default_code.python);
          setLanguage("python");
        }
      } catch (error: any) {
        console.error("Failed to fetch problem details:", error?.message);
      } finally {
        setLoadingProblem(false);
      }
    };
    fetchProblemDetails();
  }, [problem_id]);

  const handleLanguageChange = (selected: string) => {
    setLanguage(selected);
    if (problemDetails?.default_code?.[selected]) {
      setCode(problemDetails.default_code[selected]);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  // Run code against test cases (test without contest penalty)
  const handleRunCode = async () => {
    if (!problem_id) return;
    setIsRunning(true);
    setStatusMessage("Running test cases...");

    const email = emailParam || session?.user?.email || "anonymous@codemarga.com";

    try {
      const runUrl = process.env.NEXT_PUBLIC_RUNCODE_URL?.trim() || "http://localhost:8000/runcode/";
      const cleanUrl = runUrl.endsWith('/') ? runUrl : `${runUrl}/`;

      const response = await axios.post(
        cleanUrl,
        { code, language, problem_id: Number(problem_id), email, time: 0 },
        { headers: { "Content-Type": "application/json" } }
      );

      const resData = response.data;
      setTerRes(resData);
      setStatusMessage(`Result: ${resData.description || "Completed"}`);

      if (resData.stdout) {
        const lines = (resData.stdout as string)
          .split('\n')
          .filter((line: string) => line.trim() !== '');

        const outputs: any = {};
        lines.forEach((line: string, index: number) => {
          outputs[`output${index + 1}`] = line;
        });
        setOutput(outputs);
      }

      if (resData.description === "Accepted") {
        setActiveTab("testcases");
      } else {
        setActiveTab("terminal");
      }
    } catch (error: any) {
      console.error("Run error:", error);
      const errMsg = error.response?.data?.error || error.message || "Failed to execute code";
      setStatusMessage(`Error: ${errMsg}`);
      setTerRes({ stderr: errMsg, description: "Execution Error" });
      setActiveTab("terminal");
    } finally {
      setIsRunning(false);
    }
  };

  // Submit code for official contest scoring
  const handleSubmitCode = async () => {
    if (!problem_id) return;
    setIsSubmitting(true);
    setStatusMessage("Submitting for contest evaluation...");

    const email = emailParam || session?.user?.email || "anonymous@codemarga.com";

    try {
      const submitUrl = process.env.NEXT_PUBLIC_SUBMITCONTESTPROBLEM_URL?.trim() || "http://localhost:8000/submitcontestproblem/";
      const cleanUrl = submitUrl.endsWith('/') ? submitUrl : `${submitUrl}/`;

      const response = await axios.post(
        cleanUrl,
        {
          code,
          language,
          email,
          contest_id: contest_id ? Number(contest_id) : undefined,
          problem_id: Number(problem_id)
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const resData = response.data;
      setSubmissionResult(resData);
      setTerRes(resData);
      setStatusMessage(`Submission Recorded: ${resData.description || "Success"} | Score: ${resData.total_score || 0}`);

      if (resData.stdout) {
        const lines = (resData.stdout as string)
          .split('\n')
          .filter((line: string) => line.trim() !== '');

        const outputs: any = {};
        lines.forEach((line: string, index: number) => {
          outputs[`output${index + 1}`] = line;
        });
        setOutput(outputs);
      }

      if (resData.description === "Accepted") {
        setActiveTab("testcases");
      } else {
        setActiveTab("terminal");
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      const errMsg = error.response?.data?.error || error.message || "Failed to submit code";
      setStatusMessage(`Error: ${errMsg}`);
      setTerRes({ stderr: errMsg, description: "Submission Error" });
      setActiveTab("terminal");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto px-6 py-4">
        {/* Contest Header bar */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <button
            onClick={() => router.push("/contest")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Contest</span>
          </button>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {contest_id && (
              <span className="px-2 py-1 bg-muted rounded border border-border text-foreground">
                Contest #{contest_id}
              </span>
            )}
            <span className="text-foreground">
              Candidate: {emailParam || session?.user?.email || "Guest"}
            </span>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-3 px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm border border-border flex items-center justify-between">
            <span>{statusMessage}</span>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-muted-foreground hover:text-foreground text-xs ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* Contest Score Banner if submitted */}
        {submissionResult && (
          <div className="mb-4 p-4 rounded-xl bg-card border border-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-center shadow-sm">
            <div className="p-2.5 bg-muted/40 rounded-lg border border-border">
              <div className="flex items-center justify-center gap-1 text-xs text-indigo-500 mb-1">
                <Trophy className="w-3.5 h-3.5" /> Total Points
              </div>
              <div className="text-xl font-bold text-foreground">{submissionResult.total_score ?? 0}</div>
            </div>

            <div className="p-2.5 bg-muted/40 rounded-lg border border-border">
              <div className="flex items-center justify-center gap-1 text-xs text-emerald-500 mb-1">
                <Award className="w-3.5 h-3.5" /> Test Cases
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {submissionResult.matched_cases ?? 0}/{submissionResult.total_cases ?? 0}
              </div>
            </div>

            <div className="p-2.5 bg-muted/40 rounded-lg border border-border">
              <div className="flex items-center justify-center gap-1 text-xs text-amber-500 mb-1">
                <Zap className="w-3.5 h-3.5" /> Complexity
              </div>
              <div className="text-xl font-bold text-amber-600 dark:text-amber-400">+{submissionResult.complexity_bonus ?? 0}</div>
            </div>

            <div className="p-2.5 bg-muted/40 rounded-lg border border-border">
              <div className="flex items-center justify-center gap-1 text-xs text-sky-500 mb-1">
                <Clock className="w-3.5 h-3.5" /> Time Bonus
              </div>
              <div className="text-xl font-bold text-sky-600 dark:text-sky-400">+{submissionResult.time_bonus ?? 0}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Problem Details */}
          <Card className="h-[calc(100vh-170px)] overflow-y-auto bg-card border-border">
            {loadingProblem ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : problemDetails ? (
              <>
                <h1 className="text-2xl font-bold p-6 pb-2 text-foreground">
                  {problemDetails.title}
                </h1>
                <CardHeader className="pt-2 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {Array.isArray(problemDetails.category) && problemDetails.category.map((cat: string, i: number) => {
                      const lower = cat.toLowerCase();
                      const isDifficulty = ["easy", "medium", "hard"].includes(lower);
                      return (
                        <span
                          key={i}
                          className={`px-2.5 py-0.5 rounded text-xs font-medium border ${
                            isDifficulty
                              ? lower === "easy"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                : lower === "medium"
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                                : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30"
                              : "bg-secondary text-secondary-foreground border-border"
                          }`}
                        >
                          {cat}
                        </span>
                      );
                    })}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-foreground/90">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">Description</h3>
                    <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground dark:text-zinc-300">
                      {problemDetails.description}
                    </p>
                  </div>

                  {problemDetails.examples && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 text-sm">Examples:</h3>
                      {(Array.isArray(problemDetails.examples) ? problemDetails.examples : []).map((example: any, idx: number) => (
                        <div
                          key={idx}
                          className="mb-3 p-3.5 bg-muted/50 dark:bg-zinc-900/80 rounded-lg border border-border dark:border-zinc-800 space-y-1.5 font-mono text-xs"
                        >
                          <p>
                            <strong className="text-foreground dark:text-zinc-200 font-semibold">Input:</strong>{" "}
                            <span className="text-muted-foreground dark:text-zinc-300">
                              {typeof example.input === 'object' ? JSON.stringify(example.input) : example.input}
                            </span>
                          </p>
                          <p>
                            <strong className="text-foreground dark:text-zinc-200 font-semibold">Output:</strong>{" "}
                            <span className="text-muted-foreground dark:text-zinc-300">
                              {typeof example.output === 'object' ? JSON.stringify(example.output) : example.output}
                            </span>
                          </p>
                          {example.explanation && (
                            <p>
                              <strong className="text-foreground dark:text-zinc-200 font-semibold">Explanation:</strong>{" "}
                              <span className="text-muted-foreground dark:text-zinc-300">{example.explanation}</span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {problemDetails.constraints && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 text-sm">Constraints:</h3>
                      <div className="p-3.5 bg-muted/50 dark:bg-zinc-900/80 rounded-lg border border-border dark:border-zinc-800 font-mono text-xs text-foreground dark:text-zinc-300">
                        {Array.isArray(problemDetails.constraints) ? (
                          <ul className="list-disc list-inside space-y-1">
                            {problemDetails.constraints.map((c: string, idx: number) => (
                              <li key={idx}>{c}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{problemDetails.constraints}</p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </>
            ) : (
              <div className="p-6 text-muted-foreground">Problem not found.</div>
            )}
          </Card>

          {/* Right: Code Editor & Results */}
          <div className="w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted mb-2">
                <TabsTrigger value="code">Code Editor</TabsTrigger>
                <TabsTrigger value="testcases">Test Cases</TabsTrigger>
                <TabsTrigger value="terminal">
                  Terminal
                  {ter_res.description && (
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                      ter_res.description === "Accepted"
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium"
                        : "bg-red-500/20 text-red-600 dark:text-red-400 font-medium"
                    }`}>
                      {ter_res.description}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Code Tab */}
              <TabsContent value="code" className="m-0">
                <div className="flex items-center justify-between p-2 bg-muted/60 dark:bg-zinc-900 rounded-t-lg border border-border dark:border-zinc-800 border-b-0">
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[140px] h-8 bg-background border-border text-foreground text-xs">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python 3</SelectItem>
                      <SelectItem value="cpp">C++ (GCC)</SelectItem>
                      <SelectItem value="java">Java (OpenJDK)</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isRunning || isSubmitting}
                      onClick={handleRunCode}
                      className="h-8 gap-2 bg-background hover:bg-muted text-foreground border-border"
                    >
                      {isRunning ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <FaPlay className="w-3 h-3 text-emerald-500" />
                      )}
                      <span>Run</span>
                    </Button>

                    <Button
                      size="sm"
                      disabled={isRunning || isSubmitting}
                      onClick={handleSubmitCode}
                      className="h-8 gap-2 bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <IoCloudUploadSharp className="w-4 h-4" />
                      )}
                      <span>Submit</span>
                    </Button>
                  </div>
                </div>

                <div className="border border-border dark:border-zinc-800 rounded-b-lg overflow-hidden">
                  <Editor
                    height="calc(100vh - 240px)"
                    theme={theme === "dark" ? "vs-dark" : "light"}
                    language={language === "cpp" ? "cpp" : language === "java" ? "java" : "python"}
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      tabSize: 4,
                      automaticLayout: true,
                    }}
                  />
                </div>
              </TabsContent>

              {/* Test Cases Tab */}
              <TabsContent value="testcases" className="m-0">
                <TestCase problemId={problem_id} outputs={output} />
              </TabsContent>

              {/* Terminal Tab */}
              <TabsContent value="terminal" className="m-0">
                <div className="bg-zinc-950 text-zinc-200 rounded-lg p-4 font-mono text-sm h-[calc(100vh-240px)] overflow-auto border border-zinc-800 space-y-4">
                  {ter_res.description && (
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div>
                        <span className="text-zinc-400 text-xs uppercase tracking-wider">Status: </span>
                        <span className={`font-semibold ${
                          ter_res.description === "Accepted" ? "text-emerald-400" : "text-red-400"
                        }`}>
                          {ter_res.description}
                        </span>
                      </div>
                      {ter_res.time && (
                        <span className="text-xs text-zinc-400">Execution Time: {ter_res.time}s</span>
                      )}
                    </div>
                  )}

                  {ter_res.compile_output && (
                    <div>
                      <div className="text-red-400 font-semibold mb-1 text-xs uppercase tracking-wider">Compilation Output:</div>
                      <pre className="p-3 bg-red-950/30 border border-red-900/50 rounded text-red-300 text-xs whitespace-pre-wrap">
                        {ter_res.compile_output}
                      </pre>
                    </div>
                  )}

                  {ter_res.stderr && (
                    <div>
                      <div className="text-amber-400 font-semibold mb-1 text-xs uppercase tracking-wider">Error Details (stderr):</div>
                      <pre className="p-3 bg-amber-950/30 border border-amber-900/50 rounded text-amber-300 text-xs whitespace-pre-wrap">
                        {ter_res.stderr}
                      </pre>
                    </div>
                  )}

                  {ter_res.stdout && (
                    <div>
                      <div className="text-emerald-400 font-semibold mb-1 text-xs uppercase tracking-wider">Program Output (stdout):</div>
                      <pre className="p-3 bg-zinc-900 border border-zinc-800 rounded text-zinc-100 text-xs whitespace-pre-wrap">
                        {ter_res.stdout}
                      </pre>
                    </div>
                  )}

                  {!ter_res.compile_output && !ter_res.stderr && !ter_res.stdout && !ter_res.description && (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500 py-20">
                      <p className="text-base mb-2">No execution output yet</p>
                      <p className="text-xs text-zinc-600">Click &quot;Run&quot; to test your solution or &quot;Submit&quot; for contest scoring.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
