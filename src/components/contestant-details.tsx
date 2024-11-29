import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const contestants = [
  {
    name: "Swarnim Bajracharya",
    rank: 1,
    description: "Swarnim has consistently topped the leaderboard with her excellent problem-solving skills and quick coding abilities in the recent competition.",
  },
  {
    name: "Safal Gautam",
    rank: 2,
    description: "Safal is known for his innovative algorithms and has secured the second position in the competition.",
  },
  {
    name: "Tank Prasad Awasthi",
    rank: 3,
    description: "Tank's strategic approach to problem-solving has earned him the third spot in the competition.",
  },
]

export function ContestantDetails() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contestant Details</h2>
      <p className="text-muted-foreground mb-4">
        Explore the current coding task and contest details, including objectives, deadlines, and submission guidelines.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {contestants.map((contestant, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{contestant.name}</CardTitle>
              <CardDescription>Rank: {contestant.rank}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{contestant.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

