import { ProjectSummary } from "@/components/project-summary"
import { CodingContests } from "@/components/coding-contests"
import { ContestantDetails } from "@/components/contestant-details"


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <ProjectSummary />
        <CodingContests />
        <ContestantDetails />
      </main>
    </div>
  )
}

