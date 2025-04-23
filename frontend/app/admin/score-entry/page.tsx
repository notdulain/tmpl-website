"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Plus, Minus, LogOut } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

export default function ScoreEntry() {
  const router = useRouter()

  // Mock data
  const matches = [
    { id: "match-1", team1: "Eloquent Eagles", team2: "Dynamic Dragons", status: "In Progress" },
    { id: "match-2", team1: "Vocal Vikings", team2: "Speaking Spartans", status: "Upcoming" },
  ]

  const teams = {
    "Eloquent Eagles": {
      players: [
        "A. Smith",
        "J. Kumar",
        "R. Johnson",
        "S. Patel",
        "M. Williams",
        "D. Brown",
        "T. Garcia",
        "K. Lee",
        "N. Taylor",
        "P. Wilson",
      ],
    },
    "Dynamic Dragons": {
      players: [
        "L. Anderson",
        "R. Patel",
        "C. Martinez",
        "J. Thompson",
        "B. Jackson",
        "S. Clark",
        "H. Rodriguez",
        "F. Lewis",
        "G. Walker",
        "V. Hall",
      ],
    },
  }

  const [selectedMatch, setSelectedMatch] = useState("match-1")
  const [selectedTab, setSelectedTab] = useState("runs")
  const [runs, setRuns] = useState(0)
  const [wickets, setWickets] = useState(0)
  const [selectedBatsman, setSelectedBatsman] = useState("")
  const [selectedBowler, setSelectedBowler] = useState("")
  const [extraType, setExtraType] = useState("wide")
  const [extraRuns, setExtraRuns] = useState(1)

  const handleRunsSubmit = (e) => {
    e.preventDefault()
    // Here you would handle the submission to update the score
    alert(`Added ${runs} runs for ${selectedBatsman}`)
    setRuns(0)
  }

  const handleWicketSubmit = (e) => {
    e.preventDefault()
    // Here you would handle the submission to update wickets
    alert(`Wicket: ${selectedBatsman} out, bowled by ${selectedBowler}`)
  }

  const handleExtraSubmit = (e) => {
    e.preventDefault()
    // Here you would handle the submission to update extras
    alert(`Added ${extraRuns} runs as ${extraType}`)
    setExtraRuns(1)
  }

  const handleLogout = () => {
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="TMPL Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl text-maroon-500">TMPL 2.0</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white hover:text-yellow-300 transition-colors">
              Home
            </Link>
            <Link href="/live-scores" className="text-white hover:text-yellow-300 transition-colors">
              Live Scores
            </Link>
            <Link href="/#about" className="text-white hover:text-yellow-300 transition-colors">
              About
            </Link>
            <Link href="/#organizers" className="text-white hover:text-yellow-300 transition-colors">
              Organizers
            </Link>
          </nav>
          <Button
            variant="outline"
            className="hidden md:flex border-maroon-500 text-maroon-500 hover:bg-maroon-500 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to admin</span>
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Score Entry</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-maroon-500 text-maroon-500 hover:bg-maroon-500 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle>Match Selection</CardTitle>
            <CardDescription className="text-gray-400">Select the match you want to update</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedMatch} onValueChange={setSelectedMatch}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select match" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {matches.map((match) => (
                  <SelectItem key={match.id} value={match.id}>
                    {match.team1} vs {match.team2} ({match.status})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="runs" className="data-[state=active]:bg-maroon-500">
              Runs
            </TabsTrigger>
            <TabsTrigger value="wickets" className="data-[state=active]:bg-maroon-500">
              Wickets
            </TabsTrigger>
            <TabsTrigger value="extras" className="data-[state=active]:bg-maroon-500">
              Extras
            </TabsTrigger>
          </TabsList>

          <TabsContent value="runs" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Add Runs</CardTitle>
                <CardDescription className="text-gray-400">Update the score by adding runs</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRunsSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="batsman">Batsman</Label>
                    <Select value={selectedBatsman} onValueChange={setSelectedBatsman} required>
                      <SelectTrigger id="batsman" className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select batsman" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {teams["Eloquent Eagles"].players.map((player) => (
                          <SelectItem key={player} value={player}>
                            {player}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="runs">Runs</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gray-700"
                        onClick={() => setRuns(Math.max(0, runs - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="runs"
                        type="number"
                        value={runs}
                        onChange={(e) => setRuns(Number.parseInt(e.target.value) || 0)}
                        min="0"
                        max="6"
                        className="bg-gray-800 border-gray-700 text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gray-700"
                        onClick={() => setRuns(Math.min(6, runs + 1))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-maroon-600 hover:bg-maroon-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Runs
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wickets" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Add Wicket</CardTitle>
                <CardDescription className="text-gray-400">Update the score by adding a wicket</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWicketSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="out-batsman">Batsman Out</Label>
                    <Select value={selectedBatsman} onValueChange={setSelectedBatsman} required>
                      <SelectTrigger id="out-batsman" className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select batsman" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {teams["Eloquent Eagles"].players.map((player) => (
                          <SelectItem key={player} value={player}>
                            {player}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bowler">Bowler</Label>
                    <Select value={selectedBowler} onValueChange={setSelectedBowler} required>
                      <SelectTrigger id="bowler" className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select bowler" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {teams["Dynamic Dragons"].players.map((player) => (
                          <SelectItem key={player} value={player}>
                            {player}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dismissal Type</Label>
                    <RadioGroup defaultValue="bowled" className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bowled" id="bowled" className="border-gray-600" />
                        <Label htmlFor="bowled" className="font-normal">
                          Bowled
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="caught" id="caught" className="border-gray-600" />
                        <Label htmlFor="caught" className="font-normal">
                          Caught
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lbw" id="lbw" className="border-gray-600" />
                        <Label htmlFor="lbw" className="font-normal">
                          LBW
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="run-out" id="run-out" className="border-gray-600" />
                        <Label htmlFor="run-out" className="font-normal">
                          Run Out
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-maroon-600 hover:bg-maroon-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Wicket
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="extras" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Add Extras</CardTitle>
                <CardDescription className="text-gray-400">Update the score by adding extras</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleExtraSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Extra Type</Label>
                    <RadioGroup value={extraType} onValueChange={setExtraType} className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wide" id="wide" className="border-gray-600" />
                        <Label htmlFor="wide" className="font-normal">
                          Wide
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no-ball" id="no-ball" className="border-gray-600" />
                        <Label htmlFor="no-ball" className="font-normal">
                          No Ball
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bye" id="bye" className="border-gray-600" />
                        <Label htmlFor="bye" className="font-normal">
                          Bye
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="leg-bye" id="leg-bye" className="border-gray-600" />
                        <Label htmlFor="leg-bye" className="font-normal">
                          Leg Bye
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="extra-runs">Runs</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gray-700"
                        onClick={() => setExtraRuns(Math.max(1, extraRuns - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="extra-runs"
                        type="number"
                        value={extraRuns}
                        onChange={(e) => setExtraRuns(Number.parseInt(e.target.value) || 1)}
                        min="1"
                        max="5"
                        className="bg-gray-800 border-gray-700 text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gray-700"
                        onClick={() => setExtraRuns(Math.min(5, extraRuns + 1))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-maroon-600 hover:bg-maroon-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Extras
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2025 TMPL 2.0 - All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-400 hover:text-maroon-500 transition-colors">
                Home
              </Link>
              <Link href="/live-scores" className="text-gray-400 hover:text-maroon-500 transition-colors">
                Live Scores
              </Link>
              <Link href="/#about" className="text-gray-400 hover:text-maroon-500 transition-colors">
                About
              </Link>
              <Link href="/#organizers" className="text-gray-400 hover:text-maroon-500 transition-colors">
                Organizers
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
