"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function CountdownPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const prevTimeLeft = useRef(timeLeft)

  useEffect(() => {
    const targetDate = new Date('2025-05-10T03:30:00Z') // 9:00 AM IST

    const checkTime = () => {
      const now = new Date()
      
      if (now >= targetDate) {
        router.push('/home')
        return
      }

      const difference = targetDate.getTime() - now.getTime()
      
      const newTimeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }

      if (
        newTimeLeft.days !== timeLeft.days ||
        newTimeLeft.hours !== timeLeft.hours ||
        newTimeLeft.minutes !== timeLeft.minutes ||
        newTimeLeft.seconds !== timeLeft.seconds
      ) {
        prevTimeLeft.current = timeLeft
        setTimeLeft(newTimeLeft)
      }
    }

    checkTime()
    const interval = setInterval(checkTime, 1000)
    return () => clearInterval(interval)
  }, [router, timeLeft])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/TMPL_Logo_Maroon.png"
          alt="TMPL Logo"
          width={450}
          height={450}
          className="mb-8 md:mb-16 w-[360px] md:w-[450px] h-auto"
        />

        <div className="grid grid-cols-4 gap-4 md:gap-8 lg:gap-16">
          <div className="flex flex-col items-center">
            <span className="countdown text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-2 md:mb-4">
              {timeLeft.days}
            </span>
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl text-white">Days</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="countdown text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-2 md:mb-4">
              {timeLeft.hours}
            </span>
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl text-white">Hours</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="countdown text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-2 md:mb-4">
              {timeLeft.minutes}
            </span>
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl text-white">Minutes</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="countdown text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-2 md:mb-4">
              {timeLeft.seconds}
            </span>
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl text-white">Seconds</span>
          </div>
        </div>

        <p className="mt-8 md:mt-12 text-sm sm:text-base md:text-xl text-white text-center">
          May 10, 2025 at 9:00 AM IST
        </p>
      </div>
    </div>
  )
}
