import Link from "next/link";
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
