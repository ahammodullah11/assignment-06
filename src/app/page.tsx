"use client";

import { useWorkouts } from "@/context/WorkoutContext";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";
import bannerImg from "@/app/banner.png";

export default function HomePage() {
  const { workouts, loading } = useWorkouts();

  const scrollToLibrary = () => {
    const el = document.getElementById("library");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero Banner */}
      <section className="bg-[#14171a] border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-12 mb-10 sm:mb-14 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="max-w-xl text-left w-full">
          <p className="text-[#ccff00] text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3">
            WORKOUT LIBRARY
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight sm:leading-none tracking-tight text-white">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-zinc-400 text-xs sm:text-base mt-3 sm:mt-4 leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <button
            onClick={scrollToLibrary}
            className="mt-5 sm:mt-7 w-full sm:w-auto bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition cursor-pointer"
          >
            BROWSE WORKOUTS
          </button>
        </div>

        {/* Hero Banner Image */}
        <div className="w-44 sm:w-72 lg:w-80 shrink-0 flex justify-center">
          <img
            src={bannerImg.src}
            alt="Workout Machine Illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Workout Library Section */}
      <section id="library">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-[#14171a] border border-zinc-800 rounded-2xl h-80 animate-pulse p-5 flex flex-col justify-between"
              >
                <div className="bg-zinc-800 h-44 rounded-xl w-full" />
                <div className="space-y-2">
                  <div className="bg-zinc-800 h-4 w-1/3 rounded" />
                  <div className="bg-zinc-800 h-6 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {workouts.map((workout: Workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}