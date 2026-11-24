"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useWorkouts } from "@/context/WorkoutContext";
import logoImg from "@/app/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedList } = useWorkouts();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0d0f10]/95 backdrop-blur border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-1.5 sm:gap-2 text-white font-black tracking-wider text-base sm:text-xl shrink-0"
        >
          <img
            src={logoImg.src}
            alt="FitLog Logo"
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
          />
          <span>FITLOG</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-3">
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

        {/* Right Side: Counters + Mobile Hamburger Button */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm shrink-0">
          <Link
            href="/my-plan"
            onClick={closeMenu}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white"
          >
            <span>Plan</span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#ccff00] text-black font-bold text-[11px] sm:text-xs flex items-center justify-center">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            onClick={closeMenu}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white"
          >
            <span>Saved</span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-[11px] sm:text-xs flex items-center justify-center">
              {savedList.length}
            </span>
          </Link>

          {/* Hamburger Button (Only on Mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="md:hidden p-2 rounded-lg border border-zinc-800 bg-[#14171a] text-zinc-200 hover:text-[#ccff00] hover:border-zinc-700 transition cursor-pointer"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800/80 bg-[#0d0f10] px-4 py-3 space-y-2">
          <Link
            href="/"
            onClick={closeMenu}
            className={`block w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
              pathname === "/"
                ? "bg-[#222b14] text-[#ccff00]"
                : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={closeMenu}
            className={`block w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
              pathname === "/my-plan"
                ? "bg-[#222b14] text-[#ccff00]"
                : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </header>
  );
}