"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Save,
  Undo2,
  Plus,
  Minus,
  ArrowLeftRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { get, getDatabase, ref, set, update } from "firebase/database";
import { run } from "node:test";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Swal from "sweetalert2";

import { MatchProp, TeamProps, InningDataProps } from "@/app/types/interfaces";

export default function ScoreEntry() {
  const router = useRouter();
  const auth = getAuth(app);
  const [authState, setAuthState] = useState(false);
  const [matches, setMatches] = useState<Record<string, MatchProp> | null>(
    null
  );
  const [selectedMatch, setSelectedMatch] = useState<string>();
  const [tossWinner, setTossWinner] = useState<string>("");
  const [tossDecision, setTossDecision] = useState<string>("");

  const [team1, setTeam1] = useState<TeamProps | null>();
  const [team2, setTeam2] = useState<TeamProps | null>();
  const [isLive, setIsLive] = useState(false);
  const [inning, setInning] = useState("");
  const [over, setOver] = useState("0");
  const [ball, setBall] = useState("0");
  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [bowler, setBowler] = useState("");
  const [runs, setRuns] = useState("0");
  const [isWicket, setIsWicket] = useState(false);
  const [isExtra, setIsExtra] = useState(false);
  const [extraType, setExtraType] = useState("");
  const [dismissalType, setDismissalType] = useState("");
  const [comment, setComment] = useState("");
  const [battingTeam, setBattingTeam] = useState("");
  const [lossBatsman, setLossBatsman] = useState("");
  const [inningData, setInningData] = useState<InningDataProps>({
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
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUndoModal, setShowUndoModal] = useState(false);
  const [inningComplete, setInningComplete] = useState(false);

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

  const db = getDatabase();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/admin");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (matches != null && matches[selectedMatch as string].status == "live") {
      setIsLive(true);
    } else {
      setIsLive(false);
    }
  }, [selectedMatch]);

  // useEffect(() => {
  //   if (isLive) {

  //   }
  // }, [isLive]);

  const handelLiveButton = () => {
    if (
      selectedMatch &&
      matches &&
      matches[selectedMatch as string].status != "live"
    ) {
      const refference = ref(db, `matches/${selectedMatch}`);
      update(refference, { status: "live" });
      matches[selectedMatch as string].status = "live";
    } else if (
      selectedMatch &&
      matches &&
      matches[selectedMatch as string].status == "live"
    ) {
      const refference = ref(db, `matches/${selectedMatch}`);
      update(refference, { status: "pending" });
      matches[selectedMatch as string].status = "pending";
    } else {
      setIsLive(false);
      window.alert("Please select the match");
    }
  };

  // get matches from the database
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(db, "matches/");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        // Get only the keys
        const data = snapshot.val();
        setMatches(data);
      } else {
        console.log("doesn't founds");
      }
    };
    fetchData();
  }, []);

  //get teams data from the database
  useEffect(() => {
    const fetchData = async () => {
      if (matches && selectedMatch && selectedMatch in matches) {
        const match = matches[selectedMatch as string];

        const dbRef = ref(db, `teams/${match.team1}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          // Get only the keys
          const data = snapshot.val();
          console.log(data);
          setTeam1(data);
        } else {
          console.log("doesn't founds");
        }
        const dbRef2 = ref(db, `teams/${match.team2}`);
        const snapshot2 = await get(dbRef2);
        if (snapshot2.exists()) {
          // Get only the keys
          const data = snapshot2.val();
          console.log(data);
          setTeam2(data);
        } else {
          console.log("doesn't founds");
        }
      }
    };
    if (matches) {
      fetchData();
      setStriker("");
      setNonStriker("");
      setBattingTeam("");
      setBattingTeam("");
    }
  }, [selectedMatch]);

  useEffect(() => {
    const fetchData = async (x: string) => {
      if (selectedMatch && inning != "") {
        const dbRef = ref(db, `matches/${selectedMatch}/innings/${x}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data: InningDataProps = snapshot.val();
          setInningData(data);
          setBattingTeam(data.battingTeam);
          const batsman1 = data.batsman1;
          const batsman2 = data.batsman2;
          if (batsman1 == data.stricker) {
            setStriker(batsman1);
            setNonStriker(batsman2);
          } else {
            setStriker(batsman1);
            setNonStriker(batsman2);
          }
          setBowler(data.bowler);
          setInningComplete(data.completed);
        } else {
          set(ref(db, `matches/${selectedMatch}/innings/1`), inningData);
          set(ref(db, `matches/${selectedMatch}/innings/2`), inningData);
        }
      }
    };
    fetchData(inning);
  }, [inning]);

  useEffect(() => {
    if (striker != "") {
      const i = inningData;
      i.stricker = striker;
      if (selectedMatch && inning != "") {
        const refference = ref(
          db,
          `matches/${selectedMatch}/innings/${inning}`
        );
        set(refference, i);
      }
      setInningData(i);
    }
  }, [striker]);

  useEffect(() => {
    const i = inningData;
    console.log("hello");

    if (striker != inningData.batsman1 && striker != inningData.batsman2) {
      console.log("hello");

      if (nonStriker == inningData.batsman1) {
        i.batsman2 = striker;
      } else {
        i.batsman1 = striker;
      }
    }
    if (
      nonStriker != inningData.batsman1 &&
      nonStriker != inningData.batsman2
    ) {
      console.log("hello");

      if (striker == inningData.batsman1) {
        i.batsman2 = nonStriker;
      } else {
        i.batsman1 = nonStriker;
      }
    }
    if (selectedMatch && inning != "") {
      const refference = ref(db, `matches/${selectedMatch}/innings/${inning}`);
      set(refference, i);
    }
  }, [striker, nonStriker]);

  useEffect(() => {
    const i = inningData;

    if (battingTeam != inningData.battingTeam) {
      if (selectedMatch && inning != "") {
        const refference = ref(
          db,
          `matches/${selectedMatch}/innings/${inning}`
        );
        i.battingTeam = battingTeam;
        set(refference, i);
      }
    }
  }, [battingTeam]);
  useEffect(() => {
    const i = inningData;

    if (bowler != inningData.bowler) {
      if (selectedMatch && inning != "") {
        const refference = ref(
          db,
          `matches/${selectedMatch}/innings/${inning}`
        );
        i.bowler = bowler;
        set(refference, i);
      }
    }
  }, [bowler]);

  const handleInningCompleteButton = () => {
    if (selectedMatch && inning != "") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, complete the match",
      }).then((result) => {
        if (result.isConfirmed) {
          const refference = ref(
            db,
            `matches/${selectedMatch}/innings/${inning}`
          );
          update(refference, { completed: true });
          inningData.completed = true;
          setInningComplete(true);
          setInning("");
          setBattingTeam("");
          setStriker("");
          setBowler("");
          setNonStriker("");

          Swal.fire({
            title: "Innining Completed!",
            text: `${inning} was completed successfully`,
            icon: "success",
          });
        }
      });
    } else {
      setInningComplete(false);
      window.alert("Please select the match");
    }
  };

  const handleExtra = (data: InningDataProps) => {
    switch (extraType) {
      case "wide":
        data.wides = inningData.wides + 1;
        break;
      case "no ball":
        data.noBals = inningData.noBals + 1;
        break;
      case "bye":
        data.byes = inningData.byes + 1;
        break;
      case "leg bye":
        data.legByes = inningData.legByes + 1;
        break;
    }
    return data;
  };

  const handleWicket = (data: InningDataProps) => {
    // Remove the dismissed batsman from the batting pair
    if (lossBatsman === striker) {
      setStriker("");
      data.batsman1 = "";
      data.batsman1Runs = 0;
      data.batsman1Balls = 0;
    } else if (lossBatsman === nonStriker) {
      setNonStriker("");
      data.batsman2 = "";
      data.batsman2Runs = 0;
      data.batsman2Balls = 0;
    }

    data.wickets = inningData.wickets + 1;
    return data;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inningComplete) {
      Swal.fire({
        title: "Error",
        text: "Can not update the ball because the Inning was completed",
        icon: "error",
        confirmButtonColor: "#800000",
        confirmButtonText: "Continue",
      });
      return;
    }

    let data = inningData;
    data.runs = inningData.runs + Number(runs);
    data.overs = data.overs + 1;

    // Add the ball to recentDeliveries
    let ballResult = runs;
    if (isWicket) {
      ballResult = "W";
    } else if (isExtra) {
      if (extraType === "wide") {
        ballResult = "WD";
      } else if (extraType === "no ball") {
        ballResult = "NB";
      }
    }
    data.recentDeliveries = [
      ...(data.recentDeliveries || []),
      ballResult.toString(),
    ].slice(-20); // Keep last 20 balls

    if (striker == inningData.batsman1) {
      data.batsman1Balls = inningData.batsman1Balls + 1;
      data.batsman1Runs = inningData.batsman1Runs + Number(runs);
    } else {
      data.batsman2Balls = inningData.batsman2Balls + 1;
      data.batsman2Runs = inningData.batsman2Runs + Number(runs);
    }

    if (isExtra) {
      data = handleExtra(data);
    }
    if (isWicket) {
      data = handleWicket(data);
    }

    if (selectedMatch && inning != "") {
      const refference = ref(db, `matches/${selectedMatch}/innings/${inning}`);
      await set(refference, data);

      // Show success message using SweetAlert2
      Swal.fire({
        title: "Ball Submitted Successfully!",
        text: "The ball has been recorded and the score has been updated.",
        icon: "success",
        confirmButtonColor: "#800000",
        confirmButtonText: "Continue",
      });

      // Reset form fields
      setRuns("0");
      setIsWicket(false);
      setIsExtra(false);
      setExtraType("");
      setDismissalType("");
      setComment("");
    }
  };

  const handleUndo = () => {
    setShowUndoModal(true);
  };

  const handleUndoConfirm = async () => {
    if (selectedMatch && inning && inningData.recentDeliveries.length > 0) {
      const lastBall =
        inningData.recentDeliveries[inningData.recentDeliveries.length - 1];
      let updatedData = { ...inningData };

      // Remove the last ball from recentDeliveries
      updatedData.recentDeliveries = updatedData.recentDeliveries.slice(0, -1);

      // Update runs based on the last ball
      if (lastBall === "W") {
        updatedData.wickets = Math.max(0, updatedData.wickets - 1);
      } else if (lastBall === "WD") {
        updatedData.wides = Math.max(0, updatedData.wides - 1);
        updatedData.runs = Math.max(0, updatedData.runs - 1);
      } else if (lastBall === "NB") {
        updatedData.noBals = Math.max(0, updatedData.noBals - 1);
        updatedData.runs = Math.max(0, updatedData.runs - 1);
      } else {
        const runs = parseInt(lastBall);
        if (!isNaN(runs)) {
          updatedData.runs = Math.max(0, updatedData.runs - runs);
        }
      }

      // Update batsmen statistics
      if (updatedData.stricker === updatedData.batsman1) {
        if (lastBall === "W") {
          updatedData.batsman1 = "";
          updatedData.batsman1Runs = 0;
          updatedData.batsman1Balls = 0;
        } else if (lastBall === "WD" || lastBall === "NB") {
          // No change to batsman statistics for extras
        } else {
          const runs = parseInt(lastBall);
          if (!isNaN(runs)) {
            updatedData.batsman1Runs = Math.max(
              0,
              updatedData.batsman1Runs - runs
            );
            updatedData.batsman1Balls = Math.max(
              0,
              updatedData.batsman1Balls - 1
            );
          }
        }
      } else if (updatedData.stricker === updatedData.batsman2) {
        if (lastBall === "W") {
          updatedData.batsman2 = "";
          updatedData.batsman2Runs = 0;
          updatedData.batsman2Balls = 0;
        } else if (lastBall === "WD" || lastBall === "NB") {
          // No change to batsman statistics for extras
        } else {
          const runs = parseInt(lastBall);
          if (!isNaN(runs)) {
            updatedData.batsman2Runs = Math.max(
              0,
              updatedData.batsman2Runs - runs
            );
            updatedData.batsman2Balls = Math.max(
              0,
              updatedData.batsman2Balls - 1
            );
          }
        }
      }

      // Update overs
      if (lastBall !== "WD" && lastBall !== "NB") {
        updatedData.overs = Math.max(0, updatedData.overs - 1);
      }

      // Save the updated data
      const reference = ref(db, `matches/${selectedMatch}/innings/${inning}`);
      await set(reference, updatedData);
      setInningData(updatedData);

      // Show success message
      Swal.fire({
        title: "Ball Undone Successfully!",
        text: "The last ball has been removed and the score has been updated.",
        icon: "success",
        confirmButtonColor: "#800000",
        confirmButtonText: "Continue",
      });
    }
    setShowUndoModal(false);
  };

  // Update toss information when match changes
  useEffect(() => {
    if (matches && selectedMatch) {
      setTossWinner(matches[selectedMatch].toss || "");
      setTossDecision(matches[selectedMatch].tossDecision || "");
    } else {
      setTossWinner("");
      setTossDecision("");
    }
  }, [selectedMatch, matches]);

  return (
    authState && (
      <div className="min-h-screen bg-[#FAF8F5]">
        {/* Header */}
        <header className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="cursor-pointer"
                onClick={logOut}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-[#1A1A1A]">
                  Score Entry
                </h1>
                <p className="text-sm text-[#666666]">
                  TMPL 2.0 - Match {selectedMatch}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-[#666666]">Current Score</div>
                <div className="text-xl font-bold text-[#800000]">
                  {inningData.runs}/{inningData.wickets} (
                  {parseFloat(
                    `${Math.floor(inningData.overs / 4)}.${
                      inningData.overs % 4
                    }`
                  )}
                  )
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Match Info Section */}
            <Card className="bg-white border-[#E5E5E5]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#1A1A1A]">
                  Match Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="match">Match</Label>
                  <Select onValueChange={setSelectedMatch}>
                    <SelectTrigger
                      id="match"
                      className="bg-white border-[#E5E5E5]"
                    >
                      <SelectValue placeholder="Select match" />
                    </SelectTrigger>
                    <SelectContent>
                      {matches &&
                        Object.entries(matches).map(([key, match]) => (
                          <SelectItem key={key} value={key}>
                            {match.team1} vs {match.team2}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inning">Inning</Label>
                  <Select value={inning} onValueChange={setInning}>
                    <SelectTrigger
                      id="inning"
                      className="bg-white border-[#E5E5E5]"
                    >
                      <SelectValue placeholder="Select inning" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Inning</SelectItem>
                      <SelectItem value="2">2nd Inning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Over Progress</Label>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="live-toggle"
                      className="flex items-center cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="live-toggle"
                          className="sr-only"
                          checked={isLive}
                          onChange={() => {
                            handelLiveButton();
                            setIsLive(!isLive);
                          }}
                        />
                        <div className="w-14 h-8 bg-gray-300 rounded-full shadow-inner transition" />
                        <div
                          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                            isLive ? "translate-x-6" : ""
                          }`}
                        />
                      </div>
                      <span className="ml-3 text-lg font-medium">
                        {isLive ? "Live" : "Not Live"}
                      </span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Toss Information Card */}
            <Card className="bg-white border-[#E5E5E5]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#1A1A1A]">
                  Toss Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Toss Winner</Label>
                  <Select
                    value={tossWinner}
                    onValueChange={(value) => {
                      if (matches && selectedMatch) {
                        const matchData = { ...matches[selectedMatch] };
                        matchData.toss = value;
                        setTossWinner(value);
                        const refference = ref(db, `matches/${selectedMatch}`);
                        set(refference, matchData);
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white border-[#E5E5E5]">
                      <SelectValue placeholder="Select toss winner">
                        {tossWinner || "Select toss winner"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {matches && selectedMatch && (
                        <>
                          <SelectItem value={matches[selectedMatch].team1}>
                            {matches[selectedMatch].team1}
                          </SelectItem>
                          <SelectItem value={matches[selectedMatch].team2}>
                            {matches[selectedMatch].team2}
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Toss Decision</Label>
                  <Select
                    value={tossDecision}
                    onValueChange={(value) => {
                      if (matches && selectedMatch) {
                        const matchData = { ...matches[selectedMatch] };
                        matchData.tossDecision = value;
                        setTossDecision(value);
                        const refference = ref(db, `matches/${selectedMatch}`);
                        set(refference, matchData);
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white border-[#E5E5E5]">
                      <SelectValue placeholder="Select toss decision">
                        {tossDecision === "bat"
                          ? "Bat"
                          : tossDecision === "bowl"
                          ? "Bowl"
                          : "Select toss decision"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bat">Bat</SelectItem>
                      <SelectItem value="bowl">Bowl</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            {/* Match and Inning Completed */}
            <Card className="bg-white border-[#E5E5E5]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#1A1A1A]">
                  Complete Inning
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Complete the Inning</Label>
                    <Button
                      type="button"
                      variant="outline"
                      className={`h-12 w-full border-2 ${
                        inningComplete
                          ? "border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
                          : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#F5F5F5]"
                      }`}
                      onClick={handleInningCompleteButton}
                    >
                      Complete Inning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Players Section */}
            <Card className="bg-white border-[#E5E5E5]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#1A1A1A]">
                  Players
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-6">
                <div className="col-span-3 w-full space-y-2">
                  <Label htmlFor="bowler">Select Batting Team</Label>
                  <Select value={battingTeam} onValueChange={setBattingTeam}>
                    <SelectTrigger
                      id="battingTeam"
                      className="bg-white border-[#E5E5E5]"
                    >
                      <SelectValue placeholder="Select Batting Team" />
                    </SelectTrigger>
                    <SelectContent>
                      {matches && selectedMatch && (
                        <>
                          <SelectItem key="team1" value="team1">
                            {matches[selectedMatch].team1}
                          </SelectItem>
                          <SelectItem key="team2" value="team2">
                            {matches[selectedMatch].team2}
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="striker">Striker</Label>
                  <Select value={striker} onValueChange={setStriker}>
                    <SelectTrigger
                      id="striker"
                      className="bg-white border-[#E5E5E5]"
                    >
                      <SelectValue placeholder="Select striker" />
                    </SelectTrigger>
                    <SelectContent>
                      {battingTeam && battingTeam == "team1"
                        ? team1 &&
                          Object.entries(team1)
                            .filter(([key]) => key.startsWith("member"))
                            .map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value as string}
                              </SelectItem>
                            ))
                        : team2 &&
                          Object.entries(team2)
                            .filter(([key]) => key.startsWith("member"))
                            .map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value as string}
                              </SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end justify-center pb-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 border-[#E5E5E5] hover:bg-[#F5F5F5]"
                    onClick={() => {
                      const temp = striker;
                      setStriker(nonStriker);
                      setNonStriker(temp);
                    }}
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nonStriker">Non-Striker</Label>
                  <Select value={nonStriker} onValueChange={setNonStriker}>
                    <SelectTrigger
                      id="nonStriker"
                      className="bg-white border-[#E5E5E5]"
                    >
                      <SelectValue placeholder="Select non-striker" />
                    </SelectTrigger>
                    <SelectContent>
                      {battingTeam && battingTeam == "team1"
                        ? team1 &&
                          Object.entries(team1)
                            .filter(([key]) => key.startsWith("member"))
                            .map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value as string}
                              </SelectItem>
                            ))
                        : team2 &&
                          Object.entries(team2)
                            .filter(([key]) => key.startsWith("member"))
                            .map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value as string}
                              </SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bowler">Bowler</Label>
                  <Select value={bowler} onValueChange={setBowler}>
                    <SelectTrigger
                      id="bowler"
                      className="bg-white border-[#E5E5E5]"
                    >
                      <SelectValue placeholder="Select bowler" />
                    </SelectTrigger>
                    <SelectContent>
                      {battingTeam && battingTeam == "team1"
                        ? team2 &&
                          Object.entries(team2)
                            .filter(([key]) => key.startsWith("member"))
                            .map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value as string}
                              </SelectItem>
                            ))
                        : team1 &&
                          Object.entries(team1)
                            .filter(([key]) => key.startsWith("member"))
                            .map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value as string}
                              </SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Result Section */}
            <Card className="bg-white border-[#E5E5E5]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#1A1A1A]">
                  Delivery Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Runs</Label>
                  <RadioGroup
                    value={runs}
                    onValueChange={setRuns}
                    className="grid grid-cols-7 gap-2"
                  >
                    {["0", "1", "2", "3", "4", "6"].map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={value}
                          id={`runs-${value}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`runs-${value}`}
                          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-2 border-[#E5E5E5] bg-white text-sm font-medium peer-data-[state=checked]:border-[#800000] peer-data-[state=checked]:bg-[#800000] peer-data-[state=checked]:text-white [&:has([data-state=checked])]:border-[#800000]"
                        >
                          {value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Wicket</Label>
                    <Button
                      type="button"
                      variant="outline"
                      className={`h-12 w-full border-2 ${
                        isWicket
                          ? "border-red-500 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                          : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#F5F5F5]"
                      }`}
                      onClick={() => setIsWicket(!isWicket)}
                    >
                      Wicket
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Extra</Label>
                    <Button
                      type="button"
                      variant="outline"
                      className={`h-12 w-full border-2 ${
                        isExtra
                          ? "border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
                          : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#F5F5F5]"
                      }`}
                      onClick={() => setIsExtra(!isExtra)}
                    >
                      Extra
                    </Button>
                  </div>
                </div>

                {isExtra && (
                  <div className="space-y-2">
                    <Label>Extra Type</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Wide", "No Ball", "Bye", "Leg Bye"].map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant="outline"
                          className={`h-12 w-full border-2 ${
                            extraType === type.toLowerCase()
                              ? "border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
                              : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#F5F5F5]"
                          }`}
                          onClick={() =>
                            setExtraType(
                              extraType === type.toLowerCase()
                                ? ""
                                : type.toLowerCase()
                            )
                          }
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {isWicket && (
                  <div className="space-y-2">
                    <Label>Dismissal Type</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Bowled", "Caught", "LBW", "Run Out"].map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant="outline"
                          className={`h-12 w-full border-2 ${
                            dismissalType === type.toLowerCase()
                              ? "border-red-500 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                              : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#F5F5F5]"
                          }`}
                          onClick={() =>
                            setDismissalType(
                              dismissalType === type.toLowerCase()
                                ? ""
                                : type.toLowerCase()
                            )
                          }
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="dismissedBatsman">
                        Dismissed Batsman
                      </Label>

                      <Select
                        value={lossBatsman}
                        onValueChange={setLossBatsman}
                      >
                        <SelectTrigger
                          id="dismissedBatsman"
                          className="bg-white border-[#E5E5E5]"
                        >
                          <SelectValue placeholder="Select dismissed batsman" />
                        </SelectTrigger>
                        <SelectContent>
                          {striker && nonStriker && (
                            <>
                              <SelectItem key={striker} value={striker}>
                                {team1 &&
                                  team2 &&
                                  (battingTeam == "team1"
                                    ? team1[striker]
                                    : team2[striker])}
                              </SelectItem>
                              <SelectItem key={nonStriker} value={nonStriker}>
                                {team1 &&
                                  team2 &&
                                  (battingTeam == "team1"
                                    ? team1[nonStriker]
                                    : team2[nonStriker])}
                              </SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="comment">Comment (Optional)</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add any additional notes..."
                    className="bg-white border-[#E5E5E5]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-[#E5E5E5] text-[#666666] hover:bg-[#F5F5F5]"
                onClick={handleUndo}
              >
                <Undo2 className="h-4 w-4 mr-2" />
                Undo Last Ball
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#800000] hover:bg-[#600000] text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Submit Ball
              </Button>
            </div>
          </form>
          <Button
            variant="outline"
            className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
            onClick={() => router.push("/admin/register")}
          >
            Register a new team
          </Button>
          <Button
            variant="outline"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
            onClick={() => router.push("/admin/matches")}
          >
            Create a match
          </Button>
        </main>

        {/* Undo Modal */}
        <Dialog open={showUndoModal} onOpenChange={setShowUndoModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-semibold text-[#800000]">
                Undo Last Ball
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Are you sure you want to undo the last ball? This action cannot
                be reversed.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowUndoModal(false)}
                className="border-[#E5E5E5] text-[#666666] hover:bg-[#F5F5F5]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUndoConfirm}
                className="bg-[#800000] hover:bg-[#600000] text-white"
              >
                Undo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  );
}
