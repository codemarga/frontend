import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrophyIcon, CalendarIcon, RadioIcon, StarIcon } from 'lucide-react'
import axios from 'axios';
import { useEffect, useState } from 'react'

export function CodingContests() {
    const [contestsstate, setContests] = useState<any[]>([]);

    useEffect(()=>{
      const fetchcontests= async ()=>{
        const response = await axios.get(process.env.NEXT_PUBLIC_CONTESTS_URL!);
        console.log(JSON.stringify(response.data));
        setContests(response.data.contests);
      }
      fetchcontests();
    },[]);

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

        {contestsstate.length>0 ?(
          contestsstate.map((contest, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{contest.name}</CardTitle>
              <CardDescription>{contest.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Starts: {contest.start_time}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Explore</Button>
            </CardFooter>
          </Card>
        ))):(
          <p>Loading...</p>
        )}
        
      </div>
    </div>
  )
}

