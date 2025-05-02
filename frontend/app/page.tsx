import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Calendar, ExternalLink } from "lucide-react"

export default function Home() {
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
          <Button
            variant="outline"
            className="hidden md:flex border-maroon-500 text-maroon-500 hover:bg-maroon-500 hover:text-light-white"
          >
            <Link href="/admin">Admin</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-charcoal-500">
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-10 overflow-hidden bg-light-grey">
        <div className="container relative z-20 mx-auto px-4 py-6 md:py-12">
          <div className="flex flex-col items-center text-center space-y-8">
            <Image
              src="/TMPL_Logo_Maroon.png"
              alt="TMPL Logo"
              width={800}
              height={800}
              className="rounded-full"
            />
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-maroon-500">TMPL 2.0</span>
              <span className="block text-charcoal-500">Toastmasters Premier League</span>
            </h1>
            <p className="text-xl md:text-2xl text-charcoal-300 max-w-2xl">
              A friendly cricket tournament organized by Division J and hosted by Central Link Toastmasters
            </p>
            <div className="flex items-center gap-2 text-charcoal-400">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">May 10, 2025</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="bg-maroon-500 hover:bg-maroon-600 text-light-white px-8 py-6 text-lg rounded-lg">
                <Link href="/live-scores">View Live Scores</Link>
              </Button>
              <Button
                variant="outline"
                className="border-maroon-500 text-maroon-500 hover:bg-maroon-500 hover:text-light-white px-8 py-6 text-lg rounded-lg"
              >
                <Link href="#teams">Team Profiles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-light-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-maroon-500">TMPL 2.0</span>
            </h2>
            <p className="text-charcoal-300 text-lg leading-relaxed">
              TMPL 2.0 is the second edition of the Toastmasters Premier League, a friendly cricket tournament that
              brings together Toastmasters from across Division J. The tournament aims to foster camaraderie, teamwork,
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
            <div className="bg-light-white rounded-lg p-6 flex flex-col items-center shadow-sm">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
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
            <div className="bg-light-white rounded-lg p-6 flex flex-col items-center shadow-sm">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
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

      {/* Footer */}
      <footer className="bg-light-grey border-t border-light-grey py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-charcoal-300">© 2025 TMPL 2.0 - All rights reserved</p>
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
