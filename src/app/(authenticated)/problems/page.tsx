import Link from "next/link";
import {FaArrowDown,FaPrescription} from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "45%",
    frequency: "High",
  },
  {
    id: 2,
    title: "Reverse Integer",
    difficulty: "Medium",
    acceptance: "25%",
    frequency: "Medium",
  },
  {
    id: 3,
    title: "Palindrome Number",
    difficulty: "Easy",
    acceptance: "50%",
    frequency: "High",
  },
  {
    id: 4,
    title: "Container With Most Water",
    difficulty: "Medium",
    acceptance: "30%",
    frequency: "Medium",
  },
  {
    id: 5,
    title: "3Sum",
    difficulty: "Medium",
    acceptance: "28%",
    frequency: "High",
  },
];



export default function ProblemListPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-3 mb-6">
          {['Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting', 'Greedy'].map((topic, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-300">
              {topic} <span className="text-gray-500 ml-1">{Math.floor(Math.random() * 1000)}</span>
            </span>
          ))}
          <button className="bg-gray-200 px-3 py-1 rounded-full flex items-center text-sm text-gray-700 hover:bg-gray-300">
            Expand <FaArrowDown className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {['All Topics', 'Algorithms', 'Database', 'Shell', 'Concurrency', 'JavaScript'].map((topic, index) => (
            <button key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-300">
              {topic}
            </button>
          ))}
        </div>

        <div className="flex space-x-4 items-center mb-6">
          {['Lists', 'Difficulty', 'Status', 'Tags'].map((filter, index) => (
            <button key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center text-sm text-gray-700 hover:bg-gray-300">
              {filter} <FaArrowDown className="h-4 w-4 ml-1" />
            </button>
          ))}
          <input className="flex-grow bg-gray-200 px-3 py-2 rounded-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Search questions" />
          <button className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-400">
            <FaPrescription className="h-5 w-5" />
          </button>
          <button className="bg-blue-400 px-4 py-2 rounded-full text-white font-semibold hover:bg-blue-300">Pick One</button>
        </div>

        <h1 className="text-3xl font-bold mb-6">Problem List</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Acceptance</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>{problem.title}</TableCell>
                <TableCell>
                  <Badge
                    className={` ${
                      problem.difficulty === "Easy"
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        : problem.difficulty === "Medium"
                        ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
                        : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    }  h-5 text-sm transition-colors`}
                  >
                    {problem.difficulty}
                  </Badge>
                </TableCell>
                <TableCell>{problem.acceptance}</TableCell>
                <TableCell>{problem.frequency}</TableCell>
                <TableCell>
                  <Button asChild>
                    <Link href={`/problems/${problem.id}`}>Solve</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
