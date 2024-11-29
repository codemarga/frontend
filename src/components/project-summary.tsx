import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserIcon, LayoutDashboardIcon, CalendarIcon } from "lucide-react"

export function ProjectSummary() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Project Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="contestant">
          <TabsList>
            <TabsTrigger value="contestant">
              <UserIcon className="mr-2 h-4 w-4" />
              Contestant
            </TabsTrigger>
            <TabsTrigger value="board">
              <LayoutDashboardIcon className="mr-2 h-4 w-4" />
              Board
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Upcoming
            </TabsTrigger>
          </TabsList>
          <TabsContent value="contestant">Contestant content here</TabsContent>
          <TabsContent value="board">Board content here</TabsContent>
          <TabsContent value="upcoming">Upcoming content here</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

