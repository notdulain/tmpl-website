"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Calendar, ExternalLink, Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-light-white text-charcoal-500">
      {/* Header */}
      <header className="sticky top-0 bg-light-white border-b border-light-grey">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/TMPL_Logo_Maroon.png"
              alt="TMPL Logo"
              width={200}
              height={200}
              className="rounded-full"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-charcoal-500 hover:text-maroon-500 hover:underline transition-colors">
              Home
            </Link>
            <Link href="/live-scores" className="text-charcoal-500 hover:text-maroon-500 hover:underline transition-colors">
              Live Scores
            </Link>
            <Link href="#about" className="text-charcoal-500 hover:text-maroon-500 hover:underline transition-colors">
              About
            </Link>
            <Link href="#organizers" className="text-charcoal-500 hover:text-maroon-500 hover:underline transition-colors">
              Organizers
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden md:flex border-maroon-500 text-maroon-500 hover:bg-maroon-500 hover:text-light-white"
              onClick={() => router.push("/admin")}
            >
              Admin
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-charcoal-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed right-0 top-0 h-full w-64 bg-light-white shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <div className="flex justify-end mb-8">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col gap-6">
              <Link 
                href="/" 
                className="text-charcoal-500 hover:text-maroon-500 transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/live-scores" 
                className="text-charcoal-500 hover:text-maroon-500 transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Live Scores
              </Link>
              <Link 
                href="#about" 
                className="text-charcoal-500 hover:text-maroon-500 transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="#organizers" 
                className="text-charcoal-500 hover:text-maroon-500 transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Organizers
              </Link>
              <Button
                variant="outline"
                className="border-maroon-500 text-maroon-500 hover:bg-maroon-500 hover:text-light-white mt-4"
                onClick={() => router.push("/admin")}
              >
                Admin
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-light-grey">
        <div className="container relative z-20 mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-6">
            <Image
              src="/wordmark.png"
              alt="TMPL Logo"
              width={1000}
              height={1000}
              className="rounded-full"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-500">
              TMPL 2.0
            </h1>
            <p className="text-lg md:text-xl text-charcoal-300 max-w-2xl leading-relaxed">
              A friendly cricket tournament organized by Division J and hosted by Central Link Toastmasters
            </p>
            <div className="flex items-center gap-2 text-charcoal-400 text-sm md:text-base">
              <Calendar className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-medium">May 10, 2025</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button className="bg-maroon-500 hover:bg-maroon-600 text-light-white px-6 py-5 text-base md:text-lg rounded-lg">
                <Link href="/live-scores">View Live Scores</Link>
              </Button>
              <Button
                variant="outline"
                className="border-maroon-500 text-maroon-500 hover:bg-maroon-500 hover:text-light-white px-6 py-5 text-base md:text-lg rounded-lg"
              >
                <Link href="#teams">Leaderboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-light-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image
                src="/TMPL_Logo_Maroon.png"
                alt="TMPL Logo"
                width={500}
                height={500}
                className="rounded-full"
              />
            </div>
            <p className="text-charcoal-300 text-lg leading-relaxed">
              TMPL 2.0 is the second edition of the Toastmasters Premier League, a friendly cricket tournament that
              brings together Toastmasters from across the District 82. The tournament aims to foster camaraderie, teamwork,
              and leadership skills through the spirit of cricket.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-light-grey rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-maroon-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-maroon-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal-500">Competitive Spirit</h3>
              <p className="text-charcoal-300">
                Experience the thrill of cricket in a friendly yet competitive environment.
              </p>
            </div>
            <div className="bg-light-grey rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-maroon-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-maroon-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal-500">Team Building</h3>
              <p className="text-charcoal-300">
                Strengthen bonds and develop leadership skills through teamwork and collaboration.
              </p>
            </div>
            <div className="bg-light-grey rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-maroon-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="h-8 w-8 text-maroon-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal-500">Networking</h3>
              <p className="text-charcoal-300">
                Connect with fellow Toastmasters from different clubs in a relaxed setting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organizers Section */}
      <section id="organizers" className="py-16 bg-light-grey">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-charcoal-500">
            <span className="text-maroon-500">Organized</span> By
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-shadow">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-2 ring-maroon-500/20">
                <Image
                  src="/divJDP.jpeg"
                  alt="Division J"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-charcoal-500">Division J</h3>
              <p className="text-charcoal-300 text-center">Toastmasters International</p>
              <p className="mt-4 text-charcoal-300 text-center">
                Proudly organizing the tournament to promote leadership and communication skills through sports.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-shadow">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-2 ring-maroon-500/20">
                <Image
                  src="/CLTC_DP.jpg"
                  alt="Central Link Toastmasters"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-charcoal-500">Central Link Toastmasters</h3>
              <p className="text-charcoal-300 text-center">Host Club</p>
              <p className="mt-4 text-charcoal-300 text-center">
                Hosting and facilitating the tournament with enthusiasm and dedication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section id="developers" className="py-16 bg-light-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-charcoal-500">
            <span className="text-maroon-500">Developed</span> By
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-shadow">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-2 ring-maroon-500/20">
                <Image
                  src="/dulain.jpg"
                  alt="TM Dulain Gunawardhana"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-charcoal-500">TM Dulain Gunawardhana</h3>
              <p className="text-charcoal-300 text-center">Frontend Developer</p>
              <p className="mt-4 text-charcoal-300 text-center">
                Club VPPR - Central Link Toastmasters<br />
                PR Manager - Division J
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-shadow">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-2 ring-maroon-500/20">
                <Image
                  src="/sathindu.jpg"
                  alt="Sathindu De Zoysa"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-charcoal-500">Sathindu De Zoysa</h3>
              <p className="text-charcoal-300 text-center">Backend Developer</p>
              <p className="mt-4 text-charcoal-300 text-center">
                Full Stack Developer<br />
                Specializing in Firebase & Next.js
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light-grey border-t border-light-grey py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-charcoal-300">
                © 2025 TMPL 2.0. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-charcoal-300 hover:text-maroon-500 transition-colors">
                Home
              </Link>
              <Link href="/live-scores" className="text-charcoal-300 hover:text-maroon-500 transition-colors">
                Live Scores
              </Link>
              <Link href="#about" className="text-charcoal-300 hover:text-maroon-500 transition-colors">
                About
              </Link>
              <Link href="#organizers" className="text-charcoal-300 hover:text-maroon-500 transition-colors">
                Organizers
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
