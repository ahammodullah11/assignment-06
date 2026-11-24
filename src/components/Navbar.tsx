"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkouts } from "@/context/WorkoutContext";
import logoImg from "@/app/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedList } = useWorkouts();

  return (
    <header className="sticky top-0 z-50 bg-[#0d0f10]/95 backdrop-blur border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-white font-black tracking-wider text-xl">
          <img
            src={logoImg.src}
            alt="FitLog Logo"
            className="w-6 h-6 object-contain"
          />
          <span>FITLOG</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              pathname === "/"
                ? "bg-[#222b14] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              pathname === "/my-plan"
                ? "bg-[#222b14] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="flex items-center gap-4 text-sm">
          <Link href="/my-plan" className="flex items-center gap-2 text-zinc-300 hover:text-white">
            <span>Plan</span>
            <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-bold text-xs flex items-center justify-center">
              {todayPlan.length}
            </span>
          </Link>
          <Link href="/my-plan?tab=saved" className="flex items-center gap-2 text-zinc-300 hover:text-white">
            <span>Saved</span>
            <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs flex items-center justify-center">
              {savedList.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}