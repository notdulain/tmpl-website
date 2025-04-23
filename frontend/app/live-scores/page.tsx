import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, RefreshCw, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function LiveScores() {
  // Mock data for live match
  const liveMatch = {
    id: "match-1",
    status: "LIVE",
    team1: {
      name: "Eloquent Eagles",
      runs: 142,
      wickets: 3,
      overs: "15.2",
    },
    team2: {
      name: "Dynamic Dragons",
      runs: 0,
      wickets: 0,
      overs: "0.0",
    },
    currentBatsmen: [
      { name: "A. Smith", runs: 45, balls: 32, fours: 4, sixes: 2 },
      { name: "J. Kumar", runs: 28, balls: 19, fours: 3, sixes: 1 },
    ],
    currentBowler: { name: "R. Patel", overs: "3.2", maidens: 0, runs: 24, wickets: 1 },
    recentOvers: ["1", "4", "0", "6", "1", "W"],
  }

  // Mock data for next match
  const nextMatch = {
    id: "match-2",
    team1: "Vocal Vikings",
    team2: "Speaking Spartans",
    time: "Today, 3:00 PM",
    venue: "Central Ground",
  }

  // Mock data for upcoming matches
  const upcomingMatches = [
    { id: "match-3", team1: "Talking Titans", team2: "Rhetoric Royals" },
    { id: "match-4", team1: "Orator Outlaws", team2: "Verbal Vipers" },
    { id: "match-5", team1: "Eloquent Eagles", team2: "Speaking Spartans" },
  ]

  // Mock data for previous matches
  const previousMatches = [
    {
      id: "prev-1",
      team1: { name: "Verbal Vipers", runs: 156, wickets: 8 },
      team2: { name: "Talking Titans", runs: 158, wickets: 5 },
      result: "Talking Titans won by 5 wickets",
      date: "June 16, 2025",
    },
    {
      id: "prev-2",
      team1: { name: "Orator Outlaws", runs: 132, wickets: 10 },
      team2: { name: "Rhetoric Royals", runs: 133, wickets: 3 },
      result: "Rhetoric Royals won by 7 wickets",
      date: "June 15, 2025",
    },
  ]

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
          >
            <Link href="/admin">Admin</Link>
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
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to home</span>
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Live Scores</h1>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Live Match Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-maroon-500 text-white">LIVE</Badge>
            <h2 className="text-xl font-semibold">Current Match</h2>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="border-b border-gray-800 pb-4">
              <CardTitle className="flex justify-between items-center">
                <span>
                  {liveMatch.team1.name} vs {liveMatch.team2.name}
                </span>
                <Badge variant="outline" className="text-yellow-300 border-yellow-300">
                  <Clock className="h-3 w-3 mr-1" />
                  In Progress
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Scoreboard */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                    <div>
                      <h3 className="font-bold text-lg">{liveMatch.team1.name}</h3>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <span>Batting</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-maroon-500">
                        {liveMatch.team1.runs}/{liveMatch.team1.wickets}
                      </div>
                      <div className="text-gray-400 text-sm">Overs: {liveMatch.team1.overs}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                    <div>
                      <h3 className="font-bold text-lg">{liveMatch.team2.name}</h3>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <span>Bowling</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {liveMatch.team2.runs}/{liveMatch.team2.wickets}
                      </div>
                      <div className="text-gray-400 text-sm">Overs: {liveMatch.team2.overs}</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="text-sm text-gray-300 mb-2">Recent:</div>
                    <div className="flex gap-2">
                      {liveMatch.recentOvers.map((ball, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            ball === "W"
                              ? "bg-maroon-500/20 text-maroon-500"
                              : ball === "4" || ball === "6"
                                ? "bg-yellow-300/20 text-yellow-300"
                                : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {ball}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Current Players */}
                <div>
                  <h3 className="font-semibold mb-4 text-gray-300">Current Players</h3>

                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-sm text-gray-400 mb-3">Batsmen</h4>
                      <div className="space-y-3">
                        {liveMatch.currentBatsmen.map((batsman, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{batsman.name}</div>
                              <div className="text-xs text-gray-400">
                                {batsman.fours} fours, {batsman.sixes} sixes
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-maroon-500">{batsman.runs}</div>
                              <div className="text-xs text-gray-400">{batsman.balls} balls</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-sm text-gray-400 mb-3">Bowler</h4>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{liveMatch.currentBowler.name}</div>
                          <div className="text-xs text-gray-400">{liveMatch.currentBowler.maidens} maidens</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {liveMatch.currentBowler.wickets}/{liveMatch.currentBowler.runs}
                          </div>
                          <div className="text-xs text-gray-400">{liveMatch.currentBowler.overs} overs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Next Match */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Next Match</h2>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-bold text-lg mb-2">
                    {nextMatch.team1} vs {nextMatch.team2}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{nextMatch.time}</span>
                    </div>
                    <div className="hidden sm:block">•</div>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{nextMatch.venue}</span>
                    </div>
                  </div>
                </div>
                <Button className="bg-navy-600 hover:bg-navy-700 text-white">
                  <Link href="#" className="flex items-center gap-1">
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">More Upcoming Matches</h3>
            <Button variant="ghost" size="sm" className="text-yellow-300 hover:text-yellow-400">
              View All
            </Button>
          </div>

          <div className="mt-2 space-y-2">
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex justify-between items-center"
              >
                <span className="font-medium">
                  {match.team1} vs {match.team2}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </div>
            ))}
          </div>
        </section>

        {/* Previous Matches */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Previous Matches</h2>
          <div className="space-y-4">
            {previousMatches.map((match) => (
              <Card key={match.id} className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">{match.date}</span>
                        <span className="font-medium text-yellow-300">{match.result}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        Details
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-4">
                      <div className="text-center">
                        <div className="font-bold">{match.team1.name}</div>
                        <div className="text-2xl font-bold text-maroon-500 mt-1">
                          {match.team1.runs}/{match.team1.wickets}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{match.team2.name}</div>
                        <div className="text-2xl font-bold text-maroon-500 mt-1">
                          {match.team2.runs}/{match.team2.wickets}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
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
