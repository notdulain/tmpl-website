"use client";

import { get, getDatabase, ref, set } from "firebase/database";
import { FormEvent, useEffect, useState } from "react";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MatchProp, InningDataProps } from "@/app/types/interfaces";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Matches() {
  const db = getDatabase(app);
  const router = useRouter();
  const [teams, setTeams] = useState<string[] | null>(null);
  const [selectedTeam1, setSelectedTeam1] = useState<string>("");
  const [selectedTeam2, setSelectedTeam2] = useState<string>("");
  const [selectedGroup, setSeletectedGroup] = useState<string>("");
  const auth = getAuth(app);
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin");
      } else {
        setAuthState(true);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "teams/");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);
          console.log("Fetched teams:", keys); // Debug log
          setTeams(keys);
        } else {
          console.log("No teams found in database");
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchData();
  }, [db]); // Added db as dependency

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const mathId = formData.get("matchId") as string;

    if (!selectedTeam1 || !selectedTeam2) {
      alert("Please select both teams");
      return;
    }

    const matchData: MatchProp = {
      team1: selectedTeam1,
      team2: selectedTeam2,
      group: selectedGroup,
      status: "pending",
      toss: "pending",
      tossDecision: "pending",
    };

    const inningData: InningDataProps = {
      battingTeam: "",
      runs: 0,
      wickets: 0,
      overs: 0.0,
      stricker: "",
      batsman1: "",
      batsman2: "",
      batsman1Runs: 0,
      batsman1Balls: 0,
      batsman2Runs: 0,
      batsman2Balls: 0,
      bowler: "",
      wides: 0,
      noBals: 0,
      byes: 0,
      legByes: 0,
      completed: false,
      recentDeliveries: [],
    };

    console.log(matchData);

    if (mathId) {
      const refference = ref(db, `matches/${mathId}`);
      set(refference, matchData);
      set(ref(db, `matches/${mathId}/innings/1`), inningData);
      set(ref(db, `matches/${mathId}/innings/2`), inningData);
      // Clear the form
      form.reset();
      setSelectedTeam1("");
      setSelectedTeam2("");
      alert("Match created successfully!");
    } else {
      alert("Please enter a Match ID");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() => router.push("/admin/score-entry")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#1A1A1A]">
                Create a Match
              </h1>
              <p className="text-sm text-[#666666]">TMPL 2.0 - New Match</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white border-[#E5E5E5]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#1A1A1A]">
              Match Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handelSubmit}>
              <div>
                <Label htmlFor="matchId">Match ID</Label>
                <Input
                  id="matchId"
                  type="text"
                  name="matchId"
                  placeholder="Enter Match ID"
                  className="bg-white border-[#E5E5E5]"
                />
              </div>
              <div>
                <Label htmlFor="matchId">Group</Label>
                <Select
                  name="group"
                  required
                  value={selectedGroup}
                  onValueChange={setSeletectedGroup}
                >
                  <SelectTrigger className="bg-white border-[#E5E5E5]">
                    <SelectValue placeholder="Select a Team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="GROUP 1" value="GROUP 1">
                      GROUP 1
                    </SelectItem>
                    <SelectItem key="GROUP 2" value="GROUP 2">
                      GROUP 2
                    </SelectItem>
                    <SelectItem key="GROUP 2" value="GROUP 2">
                      SEMI FINALS
                    </SelectItem>
                    <SelectItem key="GROUP 2" value="GROUP 2">
                      FINALS
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="team1">Team 1</Label>
                <Select
                  name="team1"
                  required
                  value={selectedTeam1}
                  onValueChange={setSelectedTeam1}
                >
                  <SelectTrigger className="bg-white border-[#E5E5E5]">
                    <SelectValue placeholder="Select a Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams ? (
                      teams.map((team, index) => (
                        <SelectItem key={`${team}-${index}`} value={team}>
                          {team}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>
                        Loading teams...
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="team2">Team 2</Label>
                <Select
                  name="team2"
                  required
                  value={selectedTeam2}
                  onValueChange={setSelectedTeam2}
                >
                  <SelectTrigger className="bg-white border-[#E5E5E5]">
                    <SelectValue placeholder="Select a Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams ? (
                      teams.map((team, index) => (
                        <SelectItem key={`${team}-${index}`} value={team}>
                          {team}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>
                        Loading teams...
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#800000] hover:bg-[#600000] text-white"
              >
                Create Match
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
