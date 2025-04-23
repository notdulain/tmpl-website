import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Calendar, ExternalLink } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="TMPL Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl text-maroon-500">TMPL 2.0</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white hover:text-yellow-300 transition-colors">
              Home
            </Link>
            <Link href="/live-scores" className="text-white hover:text-yellow-300 transition-colors">
              Live Scores
            </Link>
            <Link href="#about" className="text-white hover:text-yellow-300 transition-colors">
              About
            </Link>
            <Link href="#organizers" className="text-white hover:text-yellow-300 transition-colors">
              Organizers
            </Link>
          </nav>
          <Button
            variant="outline"
            className="hidden md:flex border-maroon-500 text-maroon-500 hover:bg-maroon-500 hover:text-white"
          >
            <Link href="/admin">Admin</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-gray-950"></div>
        <div className="container relative z-20 mx-auto px-4 py-12 md:py-24">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="rounded-full bg-gray-800/50 p-6 backdrop-blur-sm">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="TMPL Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-maroon-500">TMPL 2.0</span>
              <span className="block text-white">Toastmasters Premier League</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
              A friendly cricket tournament organized by Division J and hosted by Central Link Toastmasters
            </p>
            <div className="flex items-center gap-2 text-yellow-300">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">June 15-30, 2025</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="bg-maroon-600 hover:bg-maroon-700 text-white px-8 py-6 text-lg">
                <Link href="/live-scores">View Live Scores</Link>
              </Button>
              <Button
                variant="outline"
                className="border-navy-500 text-navy-500 hover:bg-navy-500 hover:text-white px-8 py-6 text-lg"
              >
                <Link href="#teams">Team Profiles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-maroon-500">TMPL 2.0</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              TMPL 2.0 is the second edition of the Toastmasters Premier League, a friendly cricket tournament that
              brings together Toastmasters from across Division J. The tournament aims to foster camaraderie, teamwork,
              and leadership skills through the spirit of cricket.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-colors">
              <div className="w-16 h-16 bg-maroon-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-maroon-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Spirit</h3>
              <p className="text-gray-400">
                Experience the thrill of cricket in a friendly yet competitive environment.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-colors">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Team Building</h3>
              <p className="text-gray-400">
                Strengthen bonds and develop leadership skills through teamwork and collaboration.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-colors">
              <div className="w-16 h-16 bg-navy-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="h-8 w-8 text-navy-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Networking</h3>
              <p className="text-gray-400">
                Connect with fellow Toastmasters from different clubs in a relaxed setting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organizers Section */}
      <section id="organizers" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-yellow-300">Organized</span> By
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Division J"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Division J</h3>
              <p className="text-gray-400 text-center">Toastmasters International</p>
              <p className="mt-4 text-gray-300 text-center">
                Proudly organizing the tournament to promote leadership and communication skills through sports.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Central Link Toastmasters"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Central Link Toastmasters</h3>
              <p className="text-gray-400 text-center">Host Club</p>
              <p className="mt-4 text-gray-300 text-center">
                Hosting and facilitating the tournament with enthusiasm and dedication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2025 TMPL 2.0 - All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-400 hover:text-maroon-500 transition-colors">
                Home
              </Link>
              <Link href="/live-scores" className="text-gray-400 hover:text-maroon-500 transition-colors">
                Live Scores
              </Link>
              <Link href="#about" className="text-gray-400 hover:text-maroon-500 transition-colors">
                About
              </Link>
              <Link href="#organizers" className="text-gray-400 hover:text-maroon-500 transition-colors">
                Organizers
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
