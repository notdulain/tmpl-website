"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { app } from "@/lib/firebase";
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

import { InningDataProps } from "../types/interfaces";

interface MatchProp {
  team1: string;
  team2: string;
  group: string;
  status: string;
  toss: string;
  tossDecision: string;
  innings: InningDataProps[];
  battingTeam?: string;
}

interface TeamProps {
  [key: string]: string;
  name: string;
  member1: string;
  member2: string;
  member3: string;
  member4: string;
  member5: string;
  member6: string;
  member7: string;
  member8: string;
}

// Dynamically import react-confetti to avoid SSR issues
const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});

// Custom hook for window dimensions
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const styles = `
  @keyframes pulse-slow {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  .animate-pulse-slow {
    animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

export default function LiveScores() {
  const database = getDatabase(app);
  const [matches, setMatches] = useState<MatchProp[]>();
  const [teamNames, setTeamNames] = useState<Record<string, string>>({});
  const [teamData, setTeamData] = useState<Record<string, TeamProps>>({});
  const [showWinner, setShowWinner] = useState(false);
  const [winner, setWinner] = useState("");
  const { width, height } = useWindowSize();

  useEffect(() => {
    const dataRef = ref(database, "matches/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setMatches(data);
      console.log("Real-time data:", data);
    });
  }, []);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (matches) {
        const names: Record<string, string> = {};
        const teams: Record<string, TeamProps> = {};
        const uniqueTeamIds = new Set<string>();

        // Collect all unique team IDs
        Object.values(matches).forEach((match) => {
          uniqueTeamIds.add(match.team1);
          uniqueTeamIds.add(match.team2);
        });

        // Fetch team data for each unique team ID
        for (const teamId of uniqueTeamIds) {
          const teamRef = ref(database, `teams/${teamId}`);
          const snapshot = await get(teamRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            names[teamId] = data.name;
            teams[teamId] = data;
          }
        }

        setTeamNames(names);
        setTeamData(teams);
      }
    };

    fetchTeamData();
  }, [matches, database]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleTarget = (match: MatchProp) => {
    if (match.innings && match.innings[1].completed) {
      return match.innings[1].runs;
    }
    return "";
  };

  const showTossWinner = (match: MatchProp) => {
    if (match.toss != "" && match.tossDecision != "") {
      return `${teamNames[match.toss]} won the toss and decided to ${
        match.tossDecision
      }`;
    } else {
      return "";
    }
  };

  const showWinningTeam = (match: MatchProp) => {
    const innings = match.innings;

    if (innings == null) return "";

    const firstInning = innings[1];
    const secondInning = innings[2];

    if (firstInning == null || secondInning == null) return "";

    if (!secondInning.completed) return "";

    const runsToWin = firstInning.runs + 1;
    const runsScored = secondInning.runs;
    const wicketsLost = secondInning.wickets;
    const oversPlayed = secondInning.overs;

    const totalBalls = 4 * 4;

    const ballsLeft = totalBalls - oversPlayed;

    if (runsScored >= runsToWin) {
      const wicketsRemaining = 8 - wicketsLost;
      if (secondInning.battingTeam == "team1") {
        return `${
          teamNames[match.team1]
        } won by ${wicketsRemaining} wickets (${ballsLeft} balls left)`;
      } else {
        return `${
          teamNames[match.team2]
        } won by ${wicketsRemaining} wickets (${ballsLeft} balls left)`;
      }
    } else {
      const runsShort = runsToWin - runsScored;
      if (firstInning.battingTeam == "team1") {
        return `${teamNames[match.team1]} won by ${runsShort - 1} runs`;
      } else {
        return `${teamNames[match.team2]} won by ${runsShort - 1} runs`;
      }
    }
  };

  // Add new useEffect for winner
  useEffect(() => {
    const db = getDatabase();
    const finalsRef = ref(db, "finals");

    onValue(finalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.winner && data.winner !== "") {
        setWinner(data.winner);
        setShowWinner(true);
      } else {
        setShowWinner(false);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Confetti Container */}
      {showWinner && winner && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <ReactConfetti
            width={width}
            height={height}
            recycle={true}
            numberOfPieces={width < 768 ? 100 : 200}
            gravity={0.2}
            initialVelocityY={5}
            tweenDuration={10000}
            confettiSource={{
              x: 0,
              y: 0,
              w: width,
              h: 0,
            }}
            colors={["#800000", "#FFD700", "#FFFFFF", "#FF6B6B", "#4ECDC4"]}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50">
        <div className="px-4 md:px-8 py-3 flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center">
            <Image
              src="/TMPL_Logo_Maroon.png"
              alt="TMPL Logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white text-sm md:text-base"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 md:h-5 md:w-5 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            Refresh
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 py-4 space-y-4 max-w-7xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-[#800000] text-sm md:text-base"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            Back to Home
          </Link>
        </Button>

        {/* Live Match Card */}
        {matches &&
          Object.values(matches).map((match, index) =>
            match.status == "live" ? (
              <Card className="bg-white border-[#E5E5E5] shadow-sm" key={index}>
                <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
                  {/* Match Header */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
                          <Badge className="bg-green-500 text-white text-xs md:text-sm relative">
                            LIVE
                          </Badge>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-[#800000] text-[#800000] text-xs md:text-sm"
                        >
                          {match.group}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-lg md:text-2xl font-bold">
                          {teamNames[match.team1] || match.team1} vs{" "}
                          {teamNames[match.team2] || match.team2}
                        </h1>
                        {(() => {
                          const target = handleTarget(match);
                          if (target === "") return null;
                          return (
                            <span className="text-sm md:text-base text-[#666666]">
                              (Target: {target})
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {match.innings &&
                    (() => {
                      const inning: InningDataProps = match?.innings[1]
                        .completed
                        ? match.innings[2]
                        : match.innings[1];

                      return (
                        <div>
                          {/* Score Display */}
                          <div className="bg-[#F5F5F5] rounded-lg p-4 md:p-6">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-sm md:text-base text-[#666666]">
                                  Batting
                                </div>
                                <div className="text-2xl md:text-4xl font-bold text-[#800000]">
                                  {inning.runs} / {inning.wickets}
                                  {/* {liveMatch.team1.runs}/{liveMatch.team1.wickets} */}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm md:text-base text-[#666666]">
                                  Overs
                                </div>
                                <div className="text-lg md:text-2xl font-medium">
                                  {parseFloat(
                                    `${Math.floor(inning.overs / 4)}.${
                                      inning.overs % 4
                                    }`
                                  )}
                                  /
                                  {match.group == "SEMI FINALS" ||
                                  match.group == "FINALS"
                                    ? "6.0"
                                    : "5.0"}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Current Batsmen */}
                          <div className="space-y-3">
                            <h2 className="text-sm md:text-base font-medium text-[#666666]">
                              Current Batsmen
                            </h2>

                            <div className="flex justify-between items-center bg-[#F5F5F5] rounded-lg p-3 md:p-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm md:text-base">
                                    {(() => {
                                      console.log("Debug batsman1:", {
                                        battingTeam: inning.battingTeam,
                                        team1: match.team1,
                                        team2: match.team2,
                                        batsman1: inning.batsman1,
                                        teamData: teamData,
                                      });
                                      return (
                                        inning.batsman1 &&
                                        teamData[
                                          inning.battingTeam === "team1"
                                            ? match.team1
                                            : match.team2
                                        ]?.[inning.batsman1]
                                      );
                                    })()}
                                  </span>
                                  {inning.stricker == inning.batsman1 &&
                                    inning.stricker != "" && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs md:text-sm border-[#800000] text-[#800000]"
                                      >
                                        Striker
                                      </Badge>
                                    )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-[#800000] text-sm md:text-base">
                                  {inning.batsman1Runs}
                                </div>
                                <div className="text-xs md:text-sm text-[#666666]">
                                  {inning.batsman1Balls} balls
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center bg-[#F5F5F5] rounded-lg p-3 md:p-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm md:text-base">
                                    {inning.batsman2 &&
                                      teamData[
                                        inning.battingTeam === "team1"
                                          ? match.team1
                                          : match.team2
                                      ]?.[inning.batsman2]}
                                  </span>
                                  {inning.stricker == inning.batsman2 &&
                                    inning.stricker != "" && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs md:text-sm border-[#800000] text-[#800000]"
                                      >
                                        Striker
                                      </Badge>
                                    )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-[#800000] text-sm md:text-base">
                                  {inning.batsman2Runs}
                                </div>
                                <div className="text-xs md:text-sm text-[#666666]">
                                  {inning.batsman2Balls} balls
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Current Bowler */}
                          <div className="space-y-2">
                            <h2 className="text-sm md:text-base font-medium text-[#666666]">
                              Current Bowler
                            </h2>
                            <div className="flex justify-between items-center bg-[#F5F5F5] rounded-lg p-3 md:p-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm md:text-base">
                                    {inning.bowler &&
                                      teamData[
                                        inning.battingTeam === "team1"
                                          ? match.team2
                                          : match.team1
                                      ]?.[inning.bowler]}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Recent Deliveries */}
                          <div className="space-y-2">
                            <h2 className="text-sm md:text-base font-medium text-[#666666]">
                              Recent Deliveries
                            </h2>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {inning.recentDeliveries
                                ?.slice(-4)
                                .map((ball, index) => (
                                  <div
                                    key={index}
                                    className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium ${
                                      ball === "W"
                                        ? "bg-[#800000]/10 text-[#800000]"
                                        : ball === "4" || ball === "6"
                                        ? "bg-[#800000]/10 text-[#800000]"
                                        : ball === "NB" || ball === "WD"
                                        ? "bg-yellow-500/10 text-yellow-600"
                                        : "bg-[#F5F5F5] text-[#1A1A1A]"
                                    }`}
                                  >
                                    {ball}
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Extras */}
                          <div className="space-y-2">
                            <h2 className="text-sm md:text-base font-medium text-[#666666]">
                              Extras
                            </h2>
                            <div className="grid grid-cols-4 gap-2 bg-[#F5F5F5] rounded-lg p-3 md:p-4">
                              <div className="text-center">
                                <div className="text-xs md:text-sm text-[#666666]">
                                  Wides
                                </div>
                                <div className="font-medium text-sm md:text-base">
                                  {inning.wides}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs md:text-sm text-[#666666]">
                                  No Balls
                                </div>
                                <div className="font-medium text-sm md:text-base">
                                  {inning.noBals}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs md:text-sm text-[#666666]">
                                  Byes
                                </div>
                                <div className="font-medium text-sm md:text-base">
                                  {inning.byes}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs md:text-sm text-[#666666]">
                                  Leg Byes
                                </div>
                                <div className="font-medium text-sm md:text-base">
                                  {inning.legByes}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 font-medium self-center text-center">
                            {showWinningTeam(match) || showTossWinner(match)}
                          </div>
                        </div>
                      );
                    })()}
                </CardContent>
              </Card>
            ) : (
              " "
            )
          )}

        {/* Previous Matches Section */}
        <div className="px-4 md:px-8 py-4 max-w-7xl mx-auto">
          <h2 className="text-lg md:text-xl font-medium text-[#666666] mb-4">
            Matches
          </h2>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="space-y-3">
              {matches &&
                Object.entries(matches)
                  .filter(
                    ([, match]) =>
                      match.status != "live" && !match.innings?.[2]?.completed
                  )
                  .sort(
                    ([keyA], [keyB]) => parseInt(keyA, 10) - parseInt(keyB, 10)
                  )
                  .map(([key, match], index) => (
                    <Card
                      key={key}
                      className="bg-white border-[#E5E5E5] shadow-sm"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm text-[#666666]">
                            Match {index + 1}
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs border-[#800000] text-[#800000]"
                          >
                            Pending
                          </Badge>
                        </div>
                        {match.innings &&
                          (() => {
                            const inning1: InningDataProps = match?.innings[1];
                            const inning2: InningDataProps = match?.innings[2];

                            if (inning1.completed && inning2.completed) {
                              return (
                                <div className="flex justify-between items-center mb-2">
                                  <div className="text-sm text-[#666666]">
                                    date
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="text-xs border-[#800000] text-[#800000]"
                                  >
                                    Completed
                                  </Badge>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })()}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="font-medium">
                                {teamNames[match.team1] || match.team1}
                              </div>
                              <div className="text-sm text-[#666666]">
                                {match.innings && match.innings[1]
                                  ? `${Math.floor(
                                      match.innings[1].overs / 4
                                    )}.${match.innings[1].overs % 4}`
                                  : "0.0"}{" "}
                                overs
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-[#800000]">
                                {match.innings && match.innings[1]
                                  ? `${match.innings[1].runs}/${match.innings[1].wickets}`
                                  : "0/0"}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="font-medium">
                                {teamNames[match.team2] || match.team2}
                              </div>
                              <div className="text-sm text-[#666666]">
                                {match.innings && match.innings[2]
                                  ? `${Math.floor(
                                      match.innings[2].overs / 4
                                    )}.${match.innings[2].overs % 4}`
                                  : "0.0"}{" "}
                                overs
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-[#800000]">
                                {match.innings && match.innings[2]
                                  ? `${match.innings[2].runs}/${match.innings[2].wickets}`
                                  : "0/0"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 font-medium self-center">
                          {showWinningTeam(match)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </TabsContent>
            <TabsContent value="completed" className="space-y-3">
              {matches &&
                Object.values(matches)
                  .filter(
                    (match) =>
                      match.status != "live" && match.innings?.[2]?.completed
                  )
                  .sort((a, b) => {
                    // Get the completion time from the second innings
                    const timeA = a.innings?.[2]?.completedAt || 0;
                    const timeB = b.innings?.[2]?.completedAt || 0;
                    // Sort in descending order (newest first)
                    return timeB - timeA;
                  })
                  .map((match, index) => (
                    <Card
                      key={index}
                      className="bg-white border-[#E5E5E5] shadow-sm"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm text-[#666666]">
                            {match.innings?.[2]?.completedAt
                              ? new Date(
                                  match.innings[2].completedAt
                                ).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                              : "time"}
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs border-[#800000] text-[#800000]"
                          >
                            Completed
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="font-medium">
                                {teamNames[match.team1] || match.team1}
                              </div>
                              <div className="text-sm text-[#666666]">
                                {match.innings && match.innings[1]
                                  ? `${Math.floor(
                                      match.innings[1].overs / 4
                                    )}.${match.innings[1].overs % 4}`
                                  : "0.0"}{" "}
                                overs
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-[#800000]">
                                {match.innings && match.innings[1]
                                  ? `${match.innings[1].runs}/${match.innings[1].wickets}`
                                  : "0/0"}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="font-medium">
                                {teamNames[match.team2] || match.team2}
                              </div>
                              <div className="text-sm text-[#666666]">
                                {match.innings && match.innings[2]
                                  ? `${Math.floor(
                                      match.innings[2].overs / 4
                                    )}.${match.innings[2].overs % 4}`
                                  : "0.0"}{" "}
                                overs
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-[#800000]">
                                {match.innings && match.innings[2]
                                  ? `${match.innings[2].runs}/${match.innings[2].wickets}`
                                  : "0/0"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 font-medium self-center text-[#004165]">
                          {showWinningTeam(match)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
