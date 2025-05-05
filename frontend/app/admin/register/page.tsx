"use client";
import { useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";

interface TeamProps {
  name: string;
  member1: string;
  member2: string;
  member3: string;
  member4: string;
  member5: string;
  member6: string;
  member7: string;
  member8: string;
}

export default function Register() {
  const db = getDatabase(app);
  const router = useRouter();

  const [teamData, setTeamData] = useState<TeamProps>({
    name: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handelSubmit = () => {
    if (teamId) {
      const refference = ref(db, `teams/${teamId}`);
      set(refference, teamData);
      router.push("/admin");
    } else {
      console.log("Set a team Id");
    }
  };
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Team Registration</h2>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Id
          </label>
          <input
            type="text"
            name="teamId"
            placeholder="Enter team name"
            className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            onChange={(e) => {
              setTeamId(e.target.value);
            }}
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter team name"
            className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            onChange={handleChange}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Team Members</h3>

          <div className="space-y-2">
            <input
              type="text"
              name="member1"
              placeholder="Member 1 Name"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="member2"
              placeholder="Member 2 Name"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="member3"
              placeholder="Member 3 Name"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="member4"
              placeholder="Member 4 Name"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="member5"
              placeholder="Member 5 Name"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="member6"
              placeholder="Member 6 Name"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="member7"
              placeholder="Member 7 Name"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="member8"
              placeholder="Member 8 Name"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
            onClick={handelSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
