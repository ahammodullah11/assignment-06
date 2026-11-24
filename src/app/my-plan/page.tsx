"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWorkouts } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star, Check, X } from "lucide-react";

function MyPlanContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "plan";

  const [activeTab, setActiveTab] = useState<"plan" | "saved">(initialTab);
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  const {
    todayPlan,
    savedList,
    completedIds,
    removeFromTodayPlan,
    removeFromSaved,
    toggleCompleteWorkout,
  } = useWorkouts();

  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((sum, item) => sum + item.duration, 0);
  const totalCalories = todayPlan.reduce((sum, item) => sum + item.caloriesBurned, 0);

  const currentList: Workout[] = activeTab === "plan" ? todayPlan : savedList;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">MY PLAN</h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="bg-[#14171a] border border-zinc-800/80 rounded-2xl p-4 sm:p-8 grid grid-cols-3 divide-x divide-zinc-800 mb-6 sm:mb-8">
        <div className="pr-2 sm:pr-4">
          <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mb-1">Exercises</p>
          <p className="text-2xl sm:text-4xl font-black text-[#ccff00]">{totalExercises}</p>
        </div>
        <div className="px-3 sm:px-8">
          <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mb-1">Minutes</p>
          <p className="text-2xl sm:text-4xl font-black text-white">{totalMinutes}</p>
        </div>
        <div className="pl-3 sm:pl-8">
          <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mb-1">Calories</p>
          <p className="text-2xl sm:text-4xl font-black text-white">{totalCalories}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="bg-[#14171a] border border-zinc-800 p-1 rounded-xl inline-flex">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === "plan"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === "saved"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
            className="bg-[#14171a] border border-zinc-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#ccff00]"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="bg-[#14171a]/60 border border-dashed border-zinc-800 rounded-2xl py-16 sm:py-20 px-4 text-center">
          <h3 className="text-base sm:text-lg font-black uppercase tracking-wide text-white">
            NOTHING HERE YET
          </h3>
          <p className="text-xs text-zinc-400 mt-1 mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs px-6 py-3 rounded-full transition"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((workout: Workout) => {
            const isCompleted = completedIds.includes(workout.id);
            return (
              <div
                key={workout.id}
                className={`bg-[#14171a] border rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition ${
                  isCompleted && activeTab === "plan"
                    ? "border-[#ccff00]/40 opacity-75"
                    : "border-zinc-800/80"
                }`}
              >
                <div className="flex items-center gap-3.5 sm:gap-4 w-full md:w-auto">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-20 h-16 sm:w-24 sm:h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h3
                      className={`font-extrabold uppercase text-sm sm:text-base truncate ${
                        isCompleted && activeTab === "plan" ? "line-through text-zinc-400" : "text-white"
                      }`}
                    >
                      {workout.name}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate">{workout.equipment}</p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-zinc-400 mt-1.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
                        {workout.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#ccff00]" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/60">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="border border-zinc-700 hover:border-zinc-500 text-zinc-200 text-xs font-semibold px-3.5 sm:px-4 py-2 rounded-full transition"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => toggleCompleteWorkout(workout.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3.5 sm:px-4 py-2 rounded-full transition cursor-pointer ${
                        isCompleted
                          ? "bg-zinc-800 text-[#ccff00] border border-[#ccff00]"
                          : "bg-[#ccff00] hover:bg-[#b8e600] text-black"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {isCompleted ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromTodayPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="p-2 text-zinc-500 hover:text-red-400 transition cursor-pointer"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-zinc-400">Loading plan...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}