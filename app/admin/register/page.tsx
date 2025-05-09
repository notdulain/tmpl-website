"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

import { TeamProps } from "@/app/types/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Register() {
  const db = getDatabase(app);
  const router = useRouter();
  const auth = getAuth(app);
  const [authState, setAuthState] = useState(false);
  const [selectedGroup, setSeletectedGroup] = useState<string>("");

  const [teamData, setTeamData] = useState<TeamProps>({
    name: "",
    group: "",
    member1: "",
    member2: "",
    member3: "",
    member4: "",
    member5: "",
    member6: "",
    member7: "",
    member8: "",
  });
  const [teamId, setTeamId] = useState<string | null>(null);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handelSubmit = () => {
    if (teamId) {
      const refference = ref(db, `teams/${teamId}`);
      set(refference, teamData);
      // Clear the form
      setTeamId(null);
      setTeamData({
        name: "",
        group: "",
        member1: "",
        member2: "",
        member3: "",
        member4: "",
        member5: "",
        member6: "",
        member7: "",
        member8: "",
      });
      alert("Team registered successfully!");
    } else {
      alert("Please enter a Team ID");
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/admin/score-entry");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
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
                Team Registration
              </h1>
              <p className="text-sm text-[#666666]">
                TMPL 2.0 - Register New Team
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white border-[#E5E5E5]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#1A1A1A]">
              Team Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handelSubmit();
              }}
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="teamId">Team ID</Label>
                  <Input
                    id="teamId"
                    type="text"
                    placeholder="Enter team ID"
                    className="bg-white border-[#E5E5E5]"
                    value={teamId || ""}
                    onChange={(e) => setTeamId(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="name">Team Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter team name"
                    className="bg-white border-[#E5E5E5]"
                    value={teamData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="name">Group Name</Label>
                  <Select
                    name="group"
                    required
                    value={selectedGroup}
                    onValueChange={(value) => {
                      setTeamData({ ...teamData, group: value });
                      setSeletectedGroup(value);
                    }}
                  >
                    <SelectTrigger className="bg-white border-[#E5E5E5]">
                      <SelectValue placeholder="Select a Team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="Group1" value="Group1">
                        Group 1
                      </SelectItem>
                      <SelectItem key="Group2" value="Group2">
                        Group 2
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A]">
                  Team Members
                </h3>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div key={num}>
                    <Label htmlFor={`member${num}`}>Member {num}</Label>
                    <Input
                      id={`member${num}`}
                      name={`member${num}`}
                      type="text"
                      placeholder={`Enter member ${num} name`}
                      className="bg-white border-[#E5E5E5]"
                      value={teamData[`member${num}` as keyof TeamProps]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#800000] hover:bg-[#600000] text-white mt-6"
              >
                Register Team
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
