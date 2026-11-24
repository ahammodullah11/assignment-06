import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group bg-[#14171a] border border-zinc-800/80 hover:border-[#ccff00]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
    >
      <div className="relative h-52 w-full overflow-hidden bg-zinc-900">
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {workout.muscleGroups.map((muscle, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wide"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-extrabold uppercase tracking-tight text-white group-hover:text-[#ccff00] transition">
            {workout.name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">{workout.equipment}</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-400 mt-5 pt-3 border-t border-zinc-800/60">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-zinc-500" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-zinc-500" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}