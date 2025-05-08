'use client';

import React from 'react';
import { Trophy, Info } from 'lucide-react';

// Mock data for the leaderboard
const mockData = {
  groupA: [
    { name: 'Central Link', played: 3, wins: 3, losses: 0, points: 6 },
    { name: 'Colombo', played: 3, wins: 2, losses: 1, points: 4 },
    { name: 'Kandy', played: 3, wins: 1, losses: 2, points: 2 },
    { name: 'Galle', played: 3, wins: 0, losses: 3, points: 0 },
  ],
  groupB: [
    { name: 'Jaffna', played: 3, wins: 3, losses: 0, points: 6 },
    { name: 'Trinco', played: 3, wins: 2, losses: 1, points: 4 },
    { name: 'Batticaloa', played: 3, wins: 1, losses: 2, points: 2 },
    { name: 'Ampara', played: 3, wins: 0, losses: 3, points: 0 },
  ],
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Trophy className="h-8 w-8 text-[#800000]" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Leaderboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Group A */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E6E6]">
            <div className="border-l-4 border-[#800000] bg-gradient-to-r from-[#800000]/5 to-transparent px-6 py-4">
              <h2 className="text-xl font-bold text-[#800000] uppercase tracking-wide">Group 1</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F2F2F2]">
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C] w-12">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C2C2C]">Team</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">P</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">W</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">L</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E6E6]">
                  {mockData.groupA.map((team, index) => (
                    <tr 
                      key={team.name}
                      className="hover:bg-[#f9f6f5] transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-center font-medium text-[#444444]">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[#2C2C2C]">
                        {team.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-[#444444]">{team.played}</td>
                      <td className="px-6 py-4 text-sm text-center text-[#444444]">{team.wins}</td>
                      <td className="px-6 py-4 text-sm text-center text-[#444444]">{team.losses}</td>
                      <td className="px-6 py-4 text-sm text-center font-bold text-[#800000]">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Group B */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E6E6]">
            <div className="border-l-4 border-[#800000] bg-gradient-to-r from-[#800000]/5 to-transparent px-6 py-4">
              <h2 className="text-xl font-bold text-[#800000] uppercase tracking-wide">Group 2</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F2F2F2]">
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C] w-12">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C2C2C]">Team</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">P</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">W</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">L</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C2C2C]">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E6E6]">
                  {mockData.groupB.map((team, index) => (
                    <tr 
                      key={team.name}
                      className="hover:bg-[#f9f6f5] transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-center font-medium text-[#444444]">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[#2C2C2C]">
                        {team.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-[#444444]">{team.played}</td>
                      <td className="px-6 py-4 text-sm text-center text-[#444444]">{team.wins}</td>
                      <td className="px-6 py-4 text-sm text-center text-[#444444]">{team.losses}</td>
                      <td className="px-6 py-4 text-sm text-center font-bold text-[#800000]">{team.points}</td>
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
      </div>
    </div>
  );
} 