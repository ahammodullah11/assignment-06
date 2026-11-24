"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Workout } from "@/types/workout";

interface WorkoutContextType {
  workouts: Workout[];
  loading: boolean;
  todayPlan: Workout[];
  savedList: Workout[];
  completedIds: number[];
  addToTodayPlan: (workout: Workout) => void;
  removeFromTodayPlan: (id: number) => void;
  toggleSaveWorkout: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  toggleCompleteWorkout: (id: number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/Curd-data.json");
        if (!res.ok) throw new Error("Failed to fetch workout data");
        const data: Workout[] = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load workouts!");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();

    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    const storedCompleted = localStorage.getItem("fitlog_completed");

    if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
    if (storedSaved) setSavedList(JSON.parse(storedSaved));
    if (storedCompleted) setCompletedIds(JSON.parse(storedCompleted));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(savedList));
  }, [savedList]);

  useEffect(() => {
    localStorage.setItem("fitlog_completed", JSON.stringify(completedIds));
  }, [completedIds]);

  const addToTodayPlan = (workout: Workout) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.info("Already in Today's Plan!");
      return;
    }
    if (todayPlan.length >= 5) {
      toast.warning("Cap of five lifts for today! Finish them first.");
      return;
    }
    setTodayPlan((prev) => [...prev, workout]);
    toast.success(`${workout.name} added to Today's Plan!`);
  };

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    setCompletedIds((prev) => prev.filter((itemId) => itemId !== id));
    toast.error("Removed from Today's Plan");
  };

  const toggleSaveWorkout = (workout: Workout) => {
    const exists = savedList.some((item) => item.id === workout.id);
    if (exists) {
      setSavedList((prev) => prev.filter((item) => item.id !== workout.id));
      toast.info("Removed from Saved list");
    } else {
      setSavedList((prev) => [...prev, workout]);
      toast.success(`${workout.name} saved for later!`);
    }
  };

  const removeFromSaved = (id: number) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
    toast.error("Removed from Saved list");
  };

  const toggleCompleteWorkout = (id: number) => {
    if (completedIds.includes(id)) {
      setCompletedIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setCompletedIds((prev) => [...prev, id]);
      toast.success("Workout marked as done! 💪");
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        loading,
        todayPlan,
        savedList,
        completedIds,
        addToTodayPlan,
        removeFromTodayPlan,
        toggleSaveWorkout,
        removeFromSaved,
        toggleCompleteWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkouts must be used within a WorkoutProvider");
  }
  return context;
};