"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock } from "lucide-react";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "@/lib/firebase";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin/score-entry");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple mock authentication - in a real app, this would be a server request
    setTimeout(() => {
      // For demo purposes, accept any non-empty username/password
      if (username.trim() && password.trim()) {
        //Firebase authentication
        signInWithEmailAndPassword(auth, username, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            router.push("/admin/score-entry");
            // ...
          })
          .catch((error) => {
            setError(error.message);
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      } else {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-[#E5E5E5] shadow-sm">
        <CardHeader className="space-y-4 text-center">
          <div>
            <CardTitle className="text-2xl font-bold text-charcoal-500">
              Admin Login
            </CardTitle>
            <CardDescription className="text-charcoal-300 mt-2">
              Enter your credentials to access the score entry system
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-maroon-500/10 text-maroon-500 px-4 py-2 rounded-md text-sm text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-charcoal-500">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-[#E5E5E5] focus:border-maroon-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-charcoal-500">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#E5E5E5] focus:border-maroon-500"
                required
              />
            </div>
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-maroon-500 hover:bg-maroon-600 text-light-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Login</span>
                  </div>
                )}
              </Button>
            </div>
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-charcoal-300 hover:text-maroon-500"
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
