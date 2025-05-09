"use client";

import React, { useState, useEffect, useRef } from "react";
import { Trophy, Award, Crown } from "lucide-react";
import { getDatabase, onValue, ref } from "firebase/database";
import { FinalsProp } from "@/app/types/interfaces";
import dynamic from 'next/dynamic';

// Dynamically import react-confetti to avoid SSR issues
const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

// Custom hook for window dimensions
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

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
  const [finalsData, setFinals] = useState<FinalsProp>();
  const [isEmpty, setEmpty] = useState(true);
  const [showWinner, setShowWinner] = useState(false);
  const [winner, setWinner] = useState("");
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    // Set bracket as mounted after initial render to ensure DOM elements are available
    setBracketMounted(true);
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const finalsRef = ref(db, "finals");

    onValue(finalsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("finale data", data);
      if (data) {
        setFinals(data);
        
        // Check if winner is set
        if (data.winner && data.winner !== "") {
          setWinner(data.winner);
          setShowWinner(true);
        } else {
          setShowWinner(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log(isFinalsDataEmpty());
    setEmpty(isFinalsDataEmpty());
  }, [finalsData]);

  const isFinalsDataEmpty = () => {
    if (!finalsData) return true;
    return Object.values(finalsData).every((value) => value === "");
  };

  // For debugging - add this for testing
  useEffect(() => {
    console.log("Winner state:", { showWinner, winner });
  }, [showWinner, winner]);

  // If there's no data, show a placeholder
  if (!finalsData || isEmpty) {
    return (
      <div className="mt-12 sm:mt-16">
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#800000]" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#800000]">
            Road to the Final
          </h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-[#E6E6E6] text-center">
          <p className="text-[#666666]">
            Bracket will be available after the group stage matches.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-12 sm:mt-16">
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#800000]" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#800000]">
            Road to the Final
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
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className="text-sm sm:text-base font-semibold text-[#800000] mb-1 sm:mb-2">
                    Group 1
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="relative px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 bg-white  border-2 rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 text-xs sm:text-sm font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      {finalsData.l1}
                      {finalsData.ll1 != "" && finalsData.ll2 != "" ? (
                        <div className="absolute -left-1 sm:-left-2 -top-1 sm:-top-2 bg-[#800000] text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                          1
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="relative px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 bg-white  border-2 rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 text-xs sm:text-sm font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      {finalsData.l2}
                      {finalsData.ll1 != "" && finalsData.ll2 != "" ? (
                        <div className="absolute -left-1 sm:-left-2 -top-1 sm:-top-2 bg-[#800000] text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                          2
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="relative px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 text-xs sm:text-sm font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      {finalsData.l3}
                    </div>
                    <div className="relative px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 text-xs sm:text-sm font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      {finalsData.l4}
                    </div>
                  </div>
                </div>
              </div>

              {/* Semi Final 1 */}
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className="text-sm sm:text-base font-semibold text-[#800000] text-center mb-1 sm:mb-2">
                    Semi Final 1
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#666666] text-center mb-1">
                    #1 of Group-1 vs #2 of Group-2
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-2">
                    <div className="bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      <div className="text-xs sm:text-sm">
                        {finalsData.ll1 == ""
                          ? "#1 of Group-1"
                          : finalsData.ll1}
                      </div>
                    </div>
                    <div className="flex items-center justify-center h-4 sm:h-6 text-xs sm:text-sm font-bold text-[#800000]">
                      VS
                    </div>
                    <div className="bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      <div className="text-xs sm:text-sm">
                        {finalsData.ll2 == ""
                          ? "#2 of Group-2"
                          : finalsData.ll2}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final */}
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className="text-sm sm:text-base font-semibold text-[#800000] text-center mb-1 sm:mb-2">
                    Final
                  </div>
                  <div className="flex flex-row items-center gap-2 sm:gap-3">
                    <div className="bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-24 sm:w-28 md:w-32 h-16 sm:h-20 md:h-24 px-2 py-2 sm:py-3 md:py-4 flex items-center justify-center font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      <div className="text-[10px] sm:text-xs leading-tight">
                        {finalsData.fl == "" ? "Winner SF1" : finalsData.fl}
                      </div>
                    </div>
                    <div className="flex items-center justify-center h-4 sm:h-6 text-xs sm:text-sm font-bold text-[#800000]">
                      VS
                    </div>
                    <div className="bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-24 sm:w-28 md:w-32 h-16 sm:h-20 md:h-24 px-2 py-2 sm:py-3 md:py-4 flex items-center justify-center font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      <div className="text-[10px] sm:text-xs leading-tight">
                        {finalsData.fr == "" ? "Winner SF2" : finalsData.fr}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Semi Final 2 */}
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className="text-sm sm:text-base font-semibold text-[#800000] text-center mb-1 sm:mb-2">
                    Semi Final 2
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#666666] text-center mb-1">
                    #2 of Group-1 vs #1 of Group-2
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-2">
                    <div className="bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      <div className="text-xs sm:text-sm">
                        {finalsData.rr1 == ""
                          ? "#2 of Group-1"
                          : finalsData.rr1}
                      </div>
                    </div>
                    <div className="flex items-center justify-center h-4 sm:h-6 text-xs sm:text-sm font-bold text-[#800000]">
                      VS
                    </div>
                    <div className="bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      <div className="text-xs sm:text-sm">
                        {finalsData.rr2 == ""
                          ? "#1 of Group-2"
                          : finalsData.rr2}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group 2 Teams */}
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className="text-sm sm:text-base font-semibold text-[#800000] mb-1 sm:mb-2">
                    Group 2
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="relative px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 bg-white border-2 rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 text-xs sm:text-sm font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      {finalsData.r1}
                      {finalsData.rr1 != "" && finalsData.rr2 != "" ? (
                        <div className="absolute -left-1 sm:-left-2 -top-1 sm:-top-2 bg-[#800000] text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                          1
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="relative px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 bg-white  border-2 rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 text-xs sm:text-sm font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      {finalsData.r2}
                      {finalsData.rr1 != "" && finalsData.rr2 != "" ? (
                        <div className="absolute -left-1 sm:-left-2 -top-1 sm:-top-2 bg-[#800000] text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                          2
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="relative px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 text-xs sm:text-sm font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      {finalsData.r3}
                    </div>
                    <div className="relative px-2 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3 bg-white border border-[#E6E6E6] rounded-lg shadow-sm text-center w-28 sm:w-32 md:w-40 text-xs sm:text-sm font-medium text-[#2C2C2C] hover:bg-[#f9f6f5] transition-colors">
                      {finalsData.r4}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Winner Display with Enhanced Confetti Animation */}
      {showWinner && winner && (
        <div className="mt-8 mb-12">
          <div className="relative flex flex-col items-center">
            {/* Confetti Container */}
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
                  h: 0
                }}
                colors={['#800000', '#FFD700', '#FFFFFF', '#FF6B6B', '#4ECDC4']}
                style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>

            {/* Winner Display */}
            <div className="relative z-10">
              {/* Winner Card */}
              <div className="relative p-8 w-[300px] md:w-[700px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border-2 border-[#800000] transform hover:scale-105 transition-transform duration-300">
                {/* Crown Icon */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400 blur-md rounded-full"></div>
                    <Crown className="h-16 w-16 text-yellow-500 drop-shadow-lg relative z-10" />
                  </div>
                </div>

                {/* Winner Content */}
                <div className="flex flex-col items-center pt-4">
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#800000] to-[#600000] bg-clip-text text-transparent tracking-tight">
                    {winner}
                  </h3>
                  <div className="mt-3 text-lg text-gray-600 font-medium">
                    TMPL 2.0 Winner
                  </div>
                  
                  {/* Trophy Icon */}
                  <div className="mt-4">
                    <Trophy className="h-12 w-12 text-yellow-500 animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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

// Define the confetti animations in your global CSS file or add them here
const confettiAnimations = `
@keyframes confetti-fall-1 {
  0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
@keyframes confetti-fall-2 {
  0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(-360deg); opacity: 0; }
}

.animate-confetti-1 {
  animation: confetti-fall-1 5s ease-out infinite;
}
.animate-confetti-2 {
  animation: confetti-fall-2 7s ease-out infinite;
  animation-delay: 0.5s;
}
.animate-confetti-3 {
  animation: confetti-fall-1 6s ease-out infinite;
  animation-delay: 1s;
}
.animate-confetti-4 {
  animation: confetti-fall-2 8s ease-out infinite;
  animation-delay: 1.5s;
}
.animate-confetti-5 {
  animation: confetti-fall-1 7s ease-out infinite;
  animation-delay: 2s;
}
.animate-confetti-6 {
  animation: confetti-fall-2 6s ease-out infinite;
  animation-delay: 2.5s;
}
.animate-confetti-7 {
  animation: confetti-fall-1 9s ease-out infinite;
  animation-delay: 3s;
}
.animate-confetti-8 {
  animation: confetti-fall-2 7s ease-out infinite;
  animation-delay: 3.5s;
}
`;
