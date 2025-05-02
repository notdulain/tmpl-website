"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Undo2, Plus, Minus, ArrowLeftRight } from "lucide-react"
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
      ],
    },
  }

  const [selectedMatch, setSelectedMatch] = useState("match-1")
  const [inning, setInning] = useState("1")
  const [over, setOver] = useState("0")
  const [ball, setBall] = useState("0")
  const [striker, setStriker] = useState("")
  const [nonStriker, setNonStriker] = useState("")
  const [bowler, setBowler] = useState("")
  const [runs, setRuns] = useState("0")
  const [isWicket, setIsWicket] = useState(false)
  const [isExtra, setIsExtra] = useState(false)
  const [extraType, setExtraType] = useState("")
  const [dismissalType, setDismissalType] = useState("")
  const [comment, setComment] = useState("")

  // Current score state
  const [currentScore, setCurrentScore] = useState({
    runs: 0,
    wickets: 0,
    overs: "0.0",
    extras: {
      wides: 0,
      noBalls: 0,
      byes: 0,
      legByes: 0,
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would handle the submission to update the score
    alert("Ball submitted successfully!")
    // Reset form fields
    setRuns("0")
    setIsWicket(false)
    setIsExtra(false)
    setExtraType("")
    setDismissalType("")
    setComment("")
  }

  const handleUndo = () => {
    // Here you would handle undoing the last ball
    alert("Last ball undone!")
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#1A1A1A]">Score Entry</h1>
              <p className="text-sm text-[#666666]">TMPL 2.0 - Match {selectedMatch}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-[#666666]">Current Score</div>
              <div className="text-xl font-bold text-[#800000]">
                {currentScore.runs}/{currentScore.wickets} ({currentScore.overs})
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Match Info Section */}
          <Card className="bg-white border-[#E5E5E5]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#1A1A1A]">Match Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="match">Match</Label>
                <Select value={selectedMatch} onValueChange={setSelectedMatch}>
                  <SelectTrigger id="match" className="bg-white border-[#E5E5E5]">
                    <SelectValue placeholder="Select match" />
                  </SelectTrigger>
                  <SelectContent>
                    {matches.map((match) => (
                      <SelectItem key={match.id} value={match.id}>
                        {match.team1} vs {match.team2}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inning">Inning</Label>
                <Select value={inning} onValueChange={setInning}>
                  <SelectTrigger id="inning" className="bg-white border-[#E5E5E5]">
                    <SelectValue placeholder="Select inning" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Inning</SelectItem>
                    <SelectItem value="2">2nd Inning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Over Progress</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="4"
                    value={over}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= 4) {
                        setOver(value.toString());
                      }
                    }}
                    className="w-20 bg-white border-[#E5E5E5]"
                  />
                  <span className="text-lg font-medium">.</span>
                  <Input
                    type="number"
                    min="1"
                    max="4"
                    value={ball}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= 4) {
                        setBall(value.toString());
                      }
                    }}
                    className="w-20 bg-white border-[#E5E5E5]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Players Section */}
          <Card className="bg-white border-[#E5E5E5]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#1A1A1A]">Players</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="striker">Striker</Label>
                <Select value={striker} onValueChange={setStriker}>
                  <SelectTrigger id="striker" className="bg-white border-[#E5E5E5]">
                    <SelectValue placeholder="Select striker" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams["Eloquent Eagles"].players.map((player) => (
                      <SelectItem key={player} value={player}>
                        {player}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end justify-center pb-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-[#E5E5E5] hover:bg-[#F5F5F5]"
                  onClick={() => {
                    const temp = striker;
                    setStriker(nonStriker);
                    setNonStriker(temp);
                  }}
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nonStriker">Non-Striker</Label>
                <Select value={nonStriker} onValueChange={setNonStriker}>
                  <SelectTrigger id="nonStriker" className="bg-white border-[#E5E5E5]">
                    <SelectValue placeholder="Select non-striker" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Select value={bowler} onValueChange={setBowler}>
                  <SelectTrigger id="bowler" className="bg-white border-[#E5E5E5]">
                    <SelectValue placeholder="Select bowler" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams["Dynamic Dragons"].players.map((player) => (
                      <SelectItem key={player} value={player}>
                        {player}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Result Section */}
          <Card className="bg-white border-[#E5E5E5]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#1A1A1A]">Delivery Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Runs</Label>
                <RadioGroup value={runs} onValueChange={setRuns} className="grid grid-cols-7 gap-2">
                  {["0", "1", "2", "3", "4", "6"].map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={value}
                        id={`runs-${value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`runs-${value}`}
                        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-2 border-[#E5E5E5] bg-white text-sm font-medium peer-data-[state=checked]:border-[#800000] peer-data-[state=checked]:bg-[#800000] peer-data-[state=checked]:text-white [&:has([data-state=checked])]:border-[#800000]"
                      >
                        {value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Wicket</Label>
                  <Button
                    type="button"
                    variant="outline"
                    className={`h-12 w-full border-2 ${
                      isWicket
                        ? "border-red-500 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                        : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#F5F5F5]"
                    }`}
                    onClick={() => setIsWicket(!isWicket)}
                  >
                    Wicket
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Extra</Label>
                  <Button
                    type="button"
                    variant="outline"
                    className={`h-12 w-full border-2 ${
                      isExtra
                        ? "border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
                        : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#F5F5F5]"
                    }`}
                    onClick={() => setIsExtra(!isExtra)}
                  >
                    Extra
                  </Button>
                </div>
              </div>

              {isExtra && (
                <div className="space-y-2">
                  <Label>Extra Type</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["Wide", "No Ball", "Bye", "Leg Bye"].map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant="outline"
                        className={`h-12 w-full border-2 ${
                          extraType === type.toLowerCase()
                            ? "border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
                            : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#F5F5F5]"
                        }`}
                        onClick={() => setExtraType(extraType === type.toLowerCase() ? "" : type.toLowerCase())}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {isWicket && (
                <div className="space-y-2">
                  <Label>Dismissal Type</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["Bowled", "Caught", "LBW", "Run Out"].map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant="outline"
                        className={`h-12 w-full border-2 ${
                          dismissalType === type.toLowerCase()
                            ? "border-red-500 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                            : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#F5F5F5]"
                        }`}
                        onClick={() => setDismissalType(dismissalType === type.toLowerCase() ? "" : type.toLowerCase())}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="comment">Comment (Optional)</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add any additional notes..."
                  className="bg-white border-[#E5E5E5]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-[#E5E5E5] text-[#666666] hover:bg-[#F5F5F5]"
              onClick={handleUndo}
            >
              <Undo2 className="h-4 w-4 mr-2" />
              Undo Last Ball
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#800000] hover:bg-[#600000] text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Submit Ball
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
