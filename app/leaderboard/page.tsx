"use client";

import React, { useEffect, useState } from "react";
import { Trophy, Info, ArrowLeft } from "lucide-react";
import { get, getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { TeamProps, InningDataProps } from "../types/interfaces";
import { Bracket } from "@/components/finalTree";

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

export default function LeaderboardPage() {
  const db = getDatabase(app);
  const [teamData, setTeamData] = useState<Record<string, TeamProps>>({});
  const [matchData, setMatchData] = useState<Record<string, MatchProp>>({});
  const [stats, setStats] = useState<
    Record<
      string,
      {
        teamname: string;
        group: string;
        played: number;
        wins: number;
        losses: number;
        pts: number;
        totalRunsScored: number;
        totalOversFaced: number;
        totalRunsConceded: number;
        totalOversBowled: number;
        nrr: number;
      }
    >
  >({});
  useEffect(() => {
    const fetchTeamData = async () => {
      const teams: Record<string, TeamProps> = {};

      // Fetch all teams from the database
      const teamsRef = ref(db, "teams");
      onValue(teamsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach((teamId) => {
            teams[teamId] = data[teamId];
          });
          console.log(teams);
          setTeamData(teams);
        }
      });
    };

    fetchTeamData();
  }, []);

  useEffect(() => {
    const fetchMatchData = async () => {
      const matches: Record<string, MatchProp> = {};

      // Fetch all matches from the database
      const matchesRef = ref(db, "matches");
      onValue(matchesRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach((matchId) => {
            matches[matchId] = data[matchId];
          });
          console.log(matches);
          setMatchData(matches);
        }
      });
    };

    fetchMatchData();
  }, []);

  useEffect(() => {
    if (matchData) {
      if (teamData) {
        calculateTeamStats(matchData);
      }
    }
  }, [matchData]);

  const getTeamName = (match: MatchProp, teamId: string) => {
    if (teamId == match.team1) {
      return match.team1;
    } else {
      return match.team2;
    }
  };

  const getTeamName2 = (match: MatchProp, teamId: string) => {
    if (teamId == "team1") {
      return match.team1;
    } else {
      return match.team2;
    }
  };

  const calculateTeamStats = (matches: Record<string, MatchProp>) => {
    const newStats: Record<
      string,
      {
        teamname: string;
        group: string;
        played: number;
        wins: number;
        losses: number;
        pts: number;
        totalRunsScored: number;
        totalOversFaced: number;
        totalRunsConceded: number;
        totalOversBowled: number;
        nrr: number;
      }
    > = {};

    Object.values(matches).forEach((match) => {
      const { team1, team2, innings } = match;

      // Initialize stats for both teams if not already present
      if (!newStats[team1])
        newStats[team1] = {
          teamname: getTeamName(match, team1) || "",
          group: teamData[getTeamName(match, team1)]?.group || "",
          played: 0,
          wins: 0,
          losses: 0,
          pts: 0,
          totalRunsScored: 0,
          totalOversFaced: 0,
          totalRunsConceded: 0,
          totalOversBowled: 0,
          nrr: 0,
        };
      if (!newStats[team2])
        newStats[team2] = {
          teamname: teamData[getTeamName(match, team2)]?.name || "",
          group: teamData[getTeamName(match, team2)]?.group || "",
          played: 0,
          wins: 0,
          losses: 0,
          pts: 0,
          totalRunsScored: 0,
          totalOversFaced: 0,
          totalRunsConceded: 0,
          totalOversBowled: 0,
          nrr: 0,
        };

      // Check if the team has scored in the innings before incrementing played count
      innings.forEach((inning) => {
        if (
          getTeamName2(match, inning?.battingTeam) === team1 &&
          inning.completed
        ) {
          newStats[team1].played += 1;
          // Add runs and overs for team1 when batting
          newStats[team1].totalRunsScored += inning.runs;
          newStats[team1].totalOversFaced += inning.overs;
          // Add runs and overs for team2 when bowling
          newStats[team2].totalRunsConceded += inning.runs;
          newStats[team2].totalOversBowled += inning.overs;
        }
        if (
          getTeamName2(match, inning?.battingTeam) === team2 &&
          inning.completed
        ) {
          newStats[team2].played += 1;
          // Add runs and overs for team2 when batting
          newStats[team2].totalRunsScored += inning.runs;
          newStats[team2].totalOversFaced += inning.overs;
          // Add runs and overs for team1 when bowling
          newStats[team1].totalRunsConceded += inning.runs;
          newStats[team1].totalOversBowled += inning.overs;
        }
      });

      let team1Score = 0;
      let team2Score = 0;

      innings.forEach((inning: InningDataProps) => {
        if (
          getTeamName2(match, inning?.battingTeam) === team1 &&
          inning.completed
        ) {
          team1Score = inning.runs;
        } else if (
          getTeamName2(match, inning?.battingTeam) === team2 &&
          inning.completed
        ) {
          team2Score = inning.runs;
        }
      });

      if (team1Score > team2Score) {
        newStats[team1].wins += 1;
        newStats[team2].losses += 1;
      } else if (team2Score > team1Score) {
        newStats[team2].wins += 1;
        newStats[team1].losses += 1;
      }
    });

    // Calculate NRR for each team
    Object.keys(newStats).forEach((team) => {
      const stats = newStats[team];
      // Calculate NRR using the formula: (runs scored/overs faced) - (runs conceded/overs bowled)
      const runRateScored =
        stats.totalOversFaced > 0
          ? stats.totalRunsScored / (stats.totalOversFaced / 4)
          : 0;
      const runRateConceded =
        stats.totalOversBowled > 0
          ? stats.totalRunsConceded / (stats.totalOversBowled / 4)
          : 0;
      stats.nrr = Number((runRateScored - runRateConceded).toFixed(3));
    });

    // Assign points based on wins
    Object.keys(newStats).forEach((team) => {
      newStats[team].pts = newStats[team].wins * 2;
    });

    console.log(newStats);
    setStats(newStats);
    return newStats;
  };
  useEffect(() => {
    console.log(stats);
  }, [stats]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="h-8 w-8 text-[#800000]" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Leaderboard
          </h1>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mb-12">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-[#800000] text-sm md:text-base"
            asChild
          >
            <Link href="/home">
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Group A */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E6E6]">
            <div className="border-l-4 border-[#800000] bg-gradient-to-r from-[#800000]/5 to-transparent px-6 py-4">
              <h2 className="text-xl font-bold text-[#800000] uppercase tracking-wide">
                Group 1
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F2F2F2]">
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C] w-12">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C2C2C]">
                      Team
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">
                      P
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">
                      W
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">
                      L
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">
                      Pts
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">
                      NRR
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E6E6]">
                  {Object.values(stats)
                    .filter((team) => team.group === "group1")
                    .sort((a, b) => b.pts - a.pts)
                    .map((team, index) => (
                      <tr
                        key={team.teamname}
                        className="hover:bg-[#f9f6f5] transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-center font-medium text-[#444444]">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-[#2C2C2C]">
                          {team.teamname}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-[#444444]">
                          {team.played}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-[#444444]">
                          {team.wins}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-[#444444]">
                          {team.losses}
                        </td>
                        <td className="px-6 py-4 text-sm text-center font-bold text-[#800000]">
                          {team.pts}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-[#444444]">
                          {team.nrr.toFixed(3)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Group B */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E6E6]">
            <div className="border-l-4 border-[#800000] bg-gradient-to-r from-[#800000]/5 to-transparent px-6 py-4">
              <h2 className="text-xl font-bold text-[#800000] uppercase tracking-wide">
                Group 2
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F2F2F2]">
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C] w-12">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C2C2C]">
                      Team
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">
                      P
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">
                      W
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">
                      L
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">
                      Pts
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">
                      NRR
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E6E6]">
                  {Object.values(stats)
                    .filter((team) => team.group === "group2")
                    .sort((a, b) => b.pts - a.pts)
                    .map((team, index) => (
                      <tr
                        key={team.teamname}
                        className="hover:bg-[#f9f6f5] transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-center font-medium text-[#444444]">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-[#2C2C2C]">
                          {team.teamname}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-[#444444]">
                          {team.played}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-[#444444]">
                          {team.wins}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-[#444444]">
                          {team.losses}
                        </td>
                        <td className="px-6 py-4 text-sm text-center font-bold text-[#800000]">
                          {team.pts}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-[#444444]">
                          {team.nrr.toFixed(3)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-[#E6E6E6]">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-[#800000]" />
            <h3 className="text-lg font-semibold text-[#2C2C2C]">Legend</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#800000]">P:</span>
              <span className="text-[#444444]">Matches Played</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#800000]">W:</span>
              <span className="text-[#444444]">Wins</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#800000]">L:</span>
              <span className="text-[#444444]">Losses</span>
            </div>
          </div>
        </div>
        <Bracket />
      </div>
    </div>
  );
}
