import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrophyIcon, CalendarIcon, RadioIcon, StarIcon } from 'lucide-react'

const contests = [
  {
    title: "AI Challenge",
    description: "Test your AI skills in a 48-hour challenge.",
    startDate: "Nov 15, 2023",
  },
  {
    title: "Web Dev Sprint",
    description: "Build a dynamic web app in 24 hours.",
    startDate: "Nov 20, 2023",
  },
  {
    title: "Data Science Hack",
    description: "Solve real-world data problems in 36 hours.",
    startDate: "Nov 28, 2023",
  },
]

export function CodingContests() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Coding Contests</h2>
      <div className="flex space-x-4 mb-4">
        <Button variant="outline" className="flex items-center">
          <TrophyIcon className="mr-2 h-4 w-4" />
          Contest
        </Button>
        <Button variant="ghost" className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Upcoming
        </Button>
        <Button variant="ghost" className="flex items-center">
          <RadioIcon className="mr-2 h-4 w-4" />
          Live
        </Button>
        <Button variant="ghost" className="flex items-center">
          <StarIcon className="mr-2 h-4 w-4" />
          Top
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {contests.map((contest, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{contest.title}</CardTitle>
              <CardDescription>{contest.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Starts: {contest.startDate}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Join</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

