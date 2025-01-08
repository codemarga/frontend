/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { FaPlay } from "react-icons/fa";
import { IoCloudUploadSharp } from "react-icons/io5";
import axios from "axios";
import { useParams, useSearchParams } from 'next/navigation';
// Problem Details
const initialproblemDetails = {
  id: 1,
  title: "Two Sum",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
  ],
  constraints: [
    "2 <= nums.length <= 104",
    "-109 <= nums[i] <= 109",
    "-109 <= target <= 109",
    "Only one valid answer exists.",
  ],
};



// Language Map
const languageMap: Record<string, string> = {
  python: "python",
  cplusplus: "cpp",
  java: "java",
};

export default function ProblemPage() {
  const params = useParams(); // Dynamic route parameters
  const searchParams = useSearchParams(); // Query parameters

  const problem_id = params?.id; 
  const email = searchParams?.get('email'); 
  const contest_id = searchParams?.get('contestId'); 

  useEffect(() => {
      console.log(`Email: ${email}`);
      console.log(`Problem ID: ${problem_id}`);
      console.log(`Contest ID: ${contest_id}`);
  }, []);

  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState<string>("javascript");
  const [activeTab, setActiveTab] = useState<string>("code");
  const [problemDetails, setProblemDetails] = useState(initialproblemDetails);

  const [ter_res,setTerRes] = useState("check this terminal")


  const RunCode = async (code: any, language: any) => {
    console.log("hello")
    setActiveTab("terminal");
    try {
      console.log(code , language)
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SUBMITCONTESTPROBLEM_URL!,
        { code, language, email, contest_id, problem_id },
        { headers: { "Content-Type": "application/json" } }
    );
      console.log("response", response.data.output);
      setTerRes(response.data.output)
    } catch (error: any) {
      console.log("eror")
      console.log(error.message);
    }
  };

  useEffect(() => {
  const fetchProblemDetails = async () => {
    console.log("params", params);
    try {
      if (params) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_PROBLEMDETAILS_URL}${params.id}`);
        console.log("response", response.data);
        setProblemDetails(response.data);
      } else {
        console.log("params is null");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  fetchProblemDetails()
}, []);

  function handleEditorChange(value: string | undefined): void {
    setCode(value || "");
  }

  function handleLanguageChange(selected: string): void {
    setLanguage(selected);
  }


  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h1 className="text-3xl font-bold pl-2 my-3">
              {problemDetails.title}
            </h1>
            <CardHeader>
              <CardTitle>Problem Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{problemDetails.description}</p>
              <h3 className="font-semibold mb-2">Examples:</h3>
              {problemDetails.examples.map((example, index) => (
                <div key={index} className="mb-4">
                  <p>
                    <strong>Input:</strong> {example.input}
                  </p>
                  <p>
                    <strong>Output:</strong> {example.output}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {example.explanation}
                  </p>
                </div>
              ))}
              <h3 className="font-semibold mb-2">Constraints:</h3>
              <ul className="list-disc list-inside">
                {problemDetails.constraints}
              </ul>
            </CardContent>
          </Card>
          <div className="w-full ml-10">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="testcases">Test Cases</TabsTrigger>
                <TabsTrigger value="terminal">Terminal</TabsTrigger>
              </TabsList>
              <TabsContent value="code">
                <div className="flex items-center  bg-black text-white border-none ">
                  <Select
                    onValueChange={(value) =>
                      handleLanguageChange(languageMap[value])
                    }
                  >
                    <SelectTrigger
                      id="language"
                      className="w-[150px] h-[15px] ml-2"
                    >
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="cplusplus">C++</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                  <div
                    className="flex items-center space-x-3 mr-5 cursor-pointer"
                    onClick={() => RunCode(code, language)}
                  >
                    <FaPlay />
                    <div>Run</div>
                  </div>

                  <div className="flex items-center space-x-3 mr-5">
                    <IoCloudUploadSharp />
                    <button>Submit</button>
                  </div>
                </div>
                <Editor
                  height="75vh"
                  theme="vs-dark"
                  language={language}
                  value={code}
                  onChange={handleEditorChange}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                  }}
                />
              </TabsContent>
              <TabsContent value="testcases">
                <Card>
                  <CardHeader>
                    <CardTitle>Test Cases</CardTitle>
                    <CardDescription>
                      Add or modify test cases for this problem
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Test case functionality to be implemented</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="terminal">
                <Card>
                  <CardHeader>
                    <CardTitle>Terminal</CardTitle>
                    <CardDescription>Check Your Terminal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p> {ter_res}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
