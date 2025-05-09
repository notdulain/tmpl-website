"use client";

import React, { useState, useEffect, useRef } from "react";
import { Trophy, Award } from "lucide-react";
import { getDatabase, onValue, ref } from "firebase/database";
import { FinalsProp } from "@/app/types/interfaces";

const group1Teams = ["Central Link", "Colombo", "Team C", "Team D"];
const group2Teams = ["Jaffna", "Trinco", "Team E", "Team F"];

// Semi Finals:
// SF1: 1st Group 1 vs 2nd Group 2
// SF2: 2nd Group 1 vs 1st Group 2
const semiFinals = [
  [group1Teams[0], group2Teams[1]], // SF1: 1st Group 1 vs 2nd Group 2
  [group1Teams[1], group2Teams[0]], // SF2: 2nd Group 1 vs 1st Group 2
];

const final = ["Winner SF1", "Winner SF2"];

export const Bracket = () => {
  const [bracketMounted, setBracketMounted] = React.useState(false);
  const [finals, setFinals] = useState<FinalsProp>();

  React.useEffect(() => {
    // Set bracket as mounted after initial render to ensure DOM elements are available
    setBracketMounted(true);
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const finalsRef = ref(db, "finals");

    onValue(finalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFinals(data);
      }
    });
  }, []);

  return (
    <div className="mt-12 sm:mt-16">
      <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
        <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#800000]" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#800000]">
          Road to the Finals
        </h2>
      </div>

      <div className="md:hidden text-center text-sm px-4 mb-4 text-[#666666]">
        <p>Scroll horizontally to view the full tournament bracket</p>
      </div>

      <div className="overflow-x-auto pb-6 sm:pb-8 scrollbar-thin scrollbar-thumb-[#E6E6E6] scrollbar-track-transparent">
        <div className="min-w-[900px] sm:min-w-[1000px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="relative grid grid-cols-5 gap-4 sm:gap-8 md:gap-12">
            {/* Group 1 Teams */}
            <div className="flex flex-col justify-center items-center">
              <Stage
                title="Group 1"
                teams={group1Teams}
                highlights={[0, 1]} // Highlight 1st and 2nd place
                badges={["1", "2", "", ""]} // Add position badges
              />
            </div>

            {/* Semi Finals Left */}
            <div className="flex flex-col justify-center items-center">
              <MatchPair
                title="Semi Final 1"
                teams={semiFinals[0]}
                subtitle="#1 of Group-1 vs #2 of Group-2"
              />
            </div>

            {/* Final */}
            <div className="flex flex-col justify-center items-center">
              <MatchPair
                title="Final"
                teams={final}
                align="center"
                isHorizontal={true}
                isFinal={true}
              />
            </div>

            {/* Semi Finals Right */}
            <div className="flex flex-col justify-center items-center">
              <MatchPair
                title="Semi Final 2"
                teams={semiFinals[1]}
                subtitle="#2 of Group-1 vs #1 of Group-2"
              />
            </div>

            {/* Group 2 Teams */}
            <div className="flex flex-col justify-center items-center">
              <Stage
                title="Group 2"
                teams={group2Teams}
                highlights={[0, 1]} // Highlight 1st and 2nd place
                badges={["1", "2", "", ""]} // Add position badges
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stage = ({
  title,
  teams,
  align = "start",
  subtitle,
  highlights = [],
  badges = [],
}: {
  title: string;
  teams: string[];
  align?: "start" | "center";
  subtitle?: string;
  highlights?: number[];
  badges?: string[];
}) => (
  <div className="flex flex-col items-center gap-2 sm:gap-3">
    <div className="text-sm sm:text-base font-semibold text-[#800000] mb-1 sm:mb-2">
      {title}
    </div>
    {subtitle && <div className="text-xs text-[#666666] mb-1">{subtitle}</div>}
    <div className="flex flex-col gap-2 sm:gap-3">
      {teams.map((team, i) => (
        <div
          key={i}
          className={`relative px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 text-xs sm:text-sm font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors ${
            highlights.includes(i) ? "border-[#800000] border-2" : ""
          }`}
        >
          {team}
          {badges[i] && (
            <div className="absolute -left-1 sm:-left-2 -top-1 sm:-top-2 bg-[#800000] text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
              {badges[i]}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const MatchPair = ({
  title,
  teams,
  align = "start",
  subtitle,
  isHorizontal = false,
  isFinal = false,
}: {
  title: string;
  teams: string[];
  align?: "start" | "center";
  subtitle?: string;
  isHorizontal?: boolean;
  isFinal?: boolean;
}) => {
  const teamPairRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect is for future line position calculations if needed
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div className="text-sm sm:text-base font-semibold text-[#800000] text-center mb-1 sm:mb-2">
        {title}
      </div>
      {subtitle && (
        <div className="text-[10px] sm:text-xs text-[#666666] text-center mb-1">
          {subtitle}
        </div>
      )}
      <div
        ref={teamPairRef}
        className={`flex ${
          isHorizontal
            ? "flex-row items-center gap-2 sm:gap-3"
            : "flex-col gap-2 sm:gap-2"
        }`}
      >
        <TeamBox team={teams[0]} isFinal={isFinal} />
        <div className="flex items-center justify-center h-4 sm:h-6 text-xs sm:text-sm font-bold text-[#800000]">
          VS
        </div>
        <TeamBox team={teams[1]} isFinal={isFinal} />
      </div>
    </div>
  );
};

const TeamBox = ({
  team,
  isFinal = false,
}: {
  team: string;
  isFinal?: boolean;
}) => (
  <div
    className={`bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center ${
      isFinal
        ? "w-24 sm:w-28 md:w-32 h-16 sm:h-20 md:h-24 px-2 py-2 sm:py-3 md:py-4 flex items-center justify-center"
        : "w-28 sm:w-32 md:w-40 px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3"
    } font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors`}
  >
    <div
      className={
        isFinal ? "text-[10px] sm:text-xs leading-tight" : "text-xs sm:text-sm"
      }
    >
      {team}
    </div>
  </div>
);
