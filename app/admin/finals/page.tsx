"use client";
import { useState } from "react";

import { FinalsProp } from "@/app/types/interfaces";
import { getDatabase, ref, get, set } from "firebase/database";
import { useEffect } from "react";
import { app } from "@/lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function FinalPage() {
  const [finalsData, setFinalData] = useState<FinalsProp>();
  const [teams, setTeams] = useState<string[] | null>(null);
  const db = getDatabase(app);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    const fetchData = async () => {
      const finalsRef = ref(db, "finals");
      try {
        const snapshot = await get(finalsRef);
        if (snapshot.exists()) {
          setFinalData(snapshot.val());
        } else {
          console.log("No data available");
          setFinalData({
            l1: "",
            l2: "",
            l3: "",
            l4: "",
            r1: "",
            r2: "",
            r3: "",
            r4: "",
            ll1: "",
            ll2: "",
            rr1: "",
            rr2: "",
            fl: "",
            fr: "",
            winner: "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "teams/");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const teamNames = Object.values(data).map((team: any) => team.name);
          console.log("Fetched team names:", teamNames); // Debug log
          setTeams(teamNames);
        } else {
          console.log("No teams found in database");
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchData();
  }, [db]);

  useEffect(() => {
    const saveFinalsData = async () => {
      const refference = ref(db, "finals");
      set(refference, finalsData);
    };

    if(finalsData){
      saveFinalsData();
    }
  }, [finalsData]);

  return (
    <div className="m-10">
      <h1>Set Finals Teams</h1>
      {teams ? (
        <div className="w-full p-10">
          {finalsData &&
            Object.keys(finalsData).map((key) => (
              <div key={key} className="w-[50%] flex flex-col space-y-2">
                <label
                  htmlFor={key}
                  className="text-sm font-medium text-gray-700"
                >
                  {key.toUpperCase()}:
                </label>
                <select
                  id={key}
                  value={(finalsData as any)[key]}
                  onChange={(e) =>
                    setFinalData({
                      ...finalsData,
                      [key]: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a team</option>
                  {teams &&
                    teams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                </select>
              </div>
            ))}
        </div>
      ) : (
        <p>Loading teams...</p>
      )}
    </div>
  );
}
