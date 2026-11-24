"use client";

import { useParams, useRouter } from "next/navigation";
import { useWorkouts } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";
import { CalendarPlus, Bookmark, ArrowLeft } from "lucide-react";

export default function WorkoutDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { workouts, loading, addToTodayPlan, toggleSaveWorkout, savedList } = useWorkouts();

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-zinc-400">
        Loading workout details...
      </div>
    );
  }

  const workout: Workout | undefined = workouts.find((item) => item.id === Number(id));

  if (!workout) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Workout not found!</h2>
        <button
          onClick={() => router.push("/")}
          className="bg-[#ccff00] text-black px-5 py-2.5 rounded-lg font-bold text-sm cursor-pointer"
        >
          Back to Workouts
        </button>
      </div>
    );
  }

  const isSaved = savedList.some((item) => item.id === workout.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
        {/* Left Image */}
        <div className="lg:col-span-5 bg-[#14171a] border border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-64 sm:h-[420px] lg:h-[460px] object-cover"
          />
        </div>

        {/* Right Details */}
        <div className="lg:col-span-7">
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            {workout.name}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-base mt-2 leading-relaxed">
            {workout.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {workout.muscleGroups.map((muscle, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full"
              >
                {muscle}
              </span>
            ))}
          </div>

          <div className="mt-6 bg-[#14171a] border border-zinc-800/80 rounded-2xl divide-y divide-zinc-800/80 text-xs sm:text-sm">
            <div className="flex justify-between px-4 sm:px-5 py-3">
              <span className="text-zinc-500 font-semibold uppercase text-[11px] sm:text-xs tracking-wider">Equipment</span>
              <span className="font-semibold text-zinc-200 text-right">{workout.equipment}</span>
            </div>
            <div className="flex justify-between px-4 sm:px-5 py-3">
              <span className="text-zinc-500 font-semibold uppercase text-[11px] sm:text-xs tracking-wider">Difficulty</span>
              <span className="font-semibold text-zinc-200">{workout.difficulty}</span>
            </div>
            <div className="flex justify-between px-4 sm:px-5 py-3">
              <span className="text-zinc-500 font-semibold uppercase text-[11px] sm:text-xs tracking-wider">Sets</span>
              <span className="font-semibold text-zinc-200">{workout.sets}</span>
            </div>
            <div className="flex justify-between px-4 sm:px-5 py-3">
              <span className="text-zinc-500 font-semibold uppercase text-[11px] sm:text-xs tracking-wider">Reps</span>
              <span className="font-semibold text-zinc-200">{workout.reps}</span>
            </div>
            <div className="flex justify-between px-4 sm:px-5 py-3">
              <span className="text-zinc-500 font-semibold uppercase text-[11px] sm:text-xs tracking-wider">Duration</span>
              <span className="font-semibold text-zinc-200">{workout.duration} min</span>
            </div>
            <div className="flex justify-between px-4 sm:px-5 py-3">
              <span className="text-zinc-500 font-semibold uppercase text-[11px] sm:text-xs tracking-wider">Calories</span>
              <span className="font-semibold text-zinc-200">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex justify-between px-4 sm:px-5 py-3">
              <span className="text-zinc-500 font-semibold uppercase text-[11px] sm:text-xs tracking-wider">Rating</span>
              <span className="font-semibold text-zinc-200">{workout.rating}</span>
            </div>
          </div>

          <div className="mt-6 sm:mt-7">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-3">
              INSTRUCTIONS
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-zinc-400">
              {workout.instructions.map((step, index) => (
                <li key={index} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-7">
            <button
              onClick={() => addToTodayPlan(workout)}
              className="flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-sm px-6 py-3.5 rounded-xl transition cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              Add to today&apos;s plan
            </button>

            <button
              onClick={() => toggleSaveWorkout(workout)}
              className={`flex items-center justify-center gap-2 border font-semibold text-sm px-6 py-3.5 rounded-xl transition cursor-pointer ${
                isSaved
                  ? "bg-zinc-800 border-[#ccff00] text-[#ccff00]"
                  : "bg-[#14171a] border-zinc-700 text-zinc-200 hover:border-zinc-500"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}