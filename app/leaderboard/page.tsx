'use client';

import React from 'react';
import { Trophy, Info } from 'lucide-react';

// Mock data for the leaderboard
const mockData = {
  groupA: [
    { name: 'Central Link', played: 3, wins: 3, losses: 0, points: 6, nrr: '+1.234' },
    { name: 'Colombo', played: 3, wins: 2, losses: 1, points: 4, nrr: '+0.567' },
    { name: 'Kandy', played: 3, wins: 1, losses: 2, points: 2, nrr: '-0.123' },
    { name: 'Galle', played: 3, wins: 0, losses: 3, points: 0, nrr: '-1.678' },
  ],
  groupB: [
    { name: 'Jaffna', played: 3, wins: 3, losses: 0, points: 6, nrr: '+1.456' },
    { name: 'Trinco', played: 3, wins: 2, losses: 1, points: 4, nrr: '+0.789' },
    { name: 'Batticaloa', played: 3, wins: 1, losses: 2, points: 2, nrr: '-0.234' },
    { name: 'Ampara', played: 3, wins: 0, losses: 3, points: 0, nrr: '-2.012' },
  ],
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-light-white text-charcoal-500">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Trophy className="h-8 w-8 text-maroon-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal-500">Leaderboard</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Group A */}
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
            <div className="bg-maroon-500/10 px-6 py-4">
              <h2 className="text-xl font-bold text-maroon-500 uppercase">Group A</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-light-grey">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-charcoal-500">Team</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-charcoal-500">P</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-charcoal-500">W</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-charcoal-500">L</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-charcoal-500">Pts</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-charcoal-500">NRR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-grey">
                  {mockData.groupA.map((team, index) => (
                    <tr 
                      key={team.name}
                      className="hover:bg-light-grey/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-charcoal-500">
                        {team.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-charcoal-500">{team.played}</td>
                      <td className="px-6 py-4 text-sm text-center text-charcoal-500">{team.wins}</td>
                      <td className="px-6 py-4 text-sm text-center text-charcoal-500">{team.losses}</td>
                      <td className="px-6 py-4 text-sm text-center font-semibold text-maroon-500">{team.points}</td>
                      <td className="px-6 py-4 text-sm text-center text-charcoal-500">{team.nrr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Group B */}
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
            <div className="bg-maroon-500/10 px-6 py-4">
              <h2 className="text-xl font-bold text-maroon-500 uppercase">Group B</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-light-grey">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-charcoal-500">Team</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-charcoal-500">P</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-charcoal-500">W</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-charcoal-500">L</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-charcoal-500">Pts</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-charcoal-500">NRR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-grey">
                  {mockData.groupB.map((team, index) => (
                    <tr 
                      key={team.name}
                      className="hover:bg-light-grey/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-charcoal-500">
                        {team.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-charcoal-500">{team.played}</td>
                      <td className="px-6 py-4 text-sm text-center text-charcoal-500">{team.wins}</td>
                      <td className="px-6 py-4 text-sm text-center text-charcoal-500">{team.losses}</td>
                      <td className="px-6 py-4 text-sm text-center font-semibold text-maroon-500">{team.points}</td>
                      <td className="px-6 py-4 text-sm text-center text-charcoal-500">{team.nrr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-maroon-500" />
            <h3 className="text-lg font-semibold text-charcoal-500">Legend</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-maroon-500">P:</span>
              <span className="text-charcoal-500">Matches Played</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-maroon-500">W:</span>
              <span className="text-charcoal-500">Wins</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-maroon-500">L:</span>
              <span className="text-charcoal-500">Losses</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-maroon-500">NRR:</span>
              <span className="text-charcoal-500">Net Run Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 