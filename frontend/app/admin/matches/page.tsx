"use client";

import { get, getDatabase, ref, set } from "firebase/database";
import { FormEvent, useEffect, useState } from "react";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface MatchProp {
  team1: string;
  team2: string;
  status: string;
  toss: string;
  tossDecision: string;
}

export default function Matches() {
  const db = getDatabase(app);
  const router = useRouter();
  const [teams, setTeams] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(db, "teams/");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        // Get only the keys
        const data = snapshot.val();
        const keys = Object.keys(data);
        setTeams(keys);
      } else {
        console.log("doesn't founds");
      }
    };
    fetchData();
  }, []);

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const team1 = formData.get("team1") as string;
    const team2 = formData.get("team2") as string;
    const mathId = formData.get("matchId") as string;

    const matchData: MatchProp = {
      team1: team1,
      team2: team2,
      status: "pending",
      toss: "pending",
      tossDecision: "pending",
    };

    if (mathId) {
      const refference = ref(db, `matches/${mathId}`);
      set(refference, matchData);
      router.push("/admin");
    } else {
      console.log("Set a team Id");
    }
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Match</h2>
      <form className="space-y-4" onSubmit={handelSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Match ID
          </label>
          <input
            id="matchId"
            type="text"
            name="matchId"
            placeholder="Enter Match ID"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team 1
          </label>
          <select
            id="team1"
            name="team1"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Team</option>
            {teams &&
              teams.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team 2
          </label>
          <select
            id="team2"
            name="team2"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Team</option>
            {teams &&
              teams.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Create Match
        </button>
      </form>
    </div>
  );
}
