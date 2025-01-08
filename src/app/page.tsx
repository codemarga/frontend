"use client"

import { ProjectSummary } from "@/components/project-summary"
import { CodingContests } from "@/components/coding-contests"
import { ContestantDetails } from "@/components/contestant-details"
import { DashboardHeader } from "@/components/dashboard-header";



export default function DashboardPage() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        
        <ProjectSummary />
        <CodingContests />
        <ContestantDetails />
      </main>
    </div>
  )
}

