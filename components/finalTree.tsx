import React from "react";

const rounds = [
  ["Team A", "Team B"],
  ["Team C", "Team D"],
  ["Team E", "Team F"],
  ["Team G", "Team H"],
];

export const Bracket = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4 bg-gray-100">
      <div className="grid grid-cols-7 gap-4">
        {/* Left Side */}
        <BracketStage teams={rounds} direction="left" />
        <Connector />
        <SemiFinal />
        <Winner />
        <SemiFinal />
        <Connector />
        <BracketStage teams={rounds} direction="right" />
      </div>
    </div>
  );
};

const BracketStage = ({
  teams,
  direction,
}: {
  teams: string[][];
  direction: "left" | "right";
}) => {
  return (
    <div className={`flex flex-col justify-between gap-6`}>
      {teams.map((match, i) => (
        <div key={i} className="flex flex-col gap-1">
          {match.map((team, j) => (
            <div
              key={j}
              className="px-4 py-2 bg-white border rounded shadow text-center w-28"
            >
              {team}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Connector = () => <div className="w-1 bg-transparent" />;

const SemiFinal = () => (
  <div className="flex flex-col justify-center items-center gap-4">
    <div className="bg-white border shadow w-28 text-center p-2 rounded">
      Winner A
    </div>
    <div className="bg-white border shadow w-28 text-center p-2 rounded">
      Winner B
    </div>
  </div>
);

const Winner = () => (
  <div className="flex justify-center items-center">
    <div className="bg-purple-500 text-white text-center px-4 py-3 rounded shadow w-32">
      🏆 Winner
    </div>
  </div>
);
