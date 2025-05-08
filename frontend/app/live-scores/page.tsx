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

interface InningDataProps {
  battingTeam: string;
  runs: number;
  wickets: number;
  overs: number;
  stricker: string;
  batsman1: string;
  batsman2: string;
  batsman1Runs: number;
  batsman1Balls: number;
  batsman2Runs: number;
  batsman2Balls: number;
  bowler: string;
  wides: number;
  noBals: number;
  byes: number;
  legByes: number;
  completed: boolean;
  recentDeliveries: string[];
}

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

  const fetchTeam = async (teamId: string): Promise<TeamProps | null> => {
    const dbRef = ref(database, `teams/${teamId}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);
      return data;
    } else {
      console.log("doesn't founds");
      return null;
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
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
                      <h1 className="text-lg md:text-2xl font-bold">
                        {teamNames[match.team1] || match.team1} vs{" "}
                        {teamNames[match.team2] || match.team2}
                      </h1>
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
                                  /4.0
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
                                    {inning.batsman1 &&
                                      teamData[match.team1]?.[inning.batsman1]}
                                  </span>
                                  {inning.stricker == inning.batsman1 && (
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
                                      teamData[match.team1]?.[inning.batsman2]}
                                  </span>
                                  {inning.stricker == inning.batsman2 && (
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
                                      teamData[match.team2]?.[inning.bowler]}
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
          <div className="space-y-3">
            {matches &&
              Object.values(matches).map((match, index) =>
                match.status != "live" ? (
                  <Card
                    key={index}
                    className="bg-white border-[#E5E5E5] shadow-sm"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-[#666666]">date</div>
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
                                ? `${Math.floor(match.innings[1].overs / 4)}.${
                                    match.innings[1].overs % 4
                                  }`
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
                                ? `${Math.floor(match.innings[2].overs / 4)}.${
                                    match.innings[2].overs % 4
                                  }`
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
                      <div className="mt-2 text-sm font-medium text-[#800000]">
                        {match.status}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  ""
                )
              )}
          </div>
        </div>
      </main>
    </div>
  );
}
