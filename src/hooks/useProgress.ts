import { useState, useEffect, useCallback } from "react";
import { resources } from "@/data/resources";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: string;
  requirement: number;
  type: "category" | "total" | "special";
}

export interface ProgressState {
  completedActivities: string[];
  stars: number;
  unlockedAchievements: string[];
  activityProgress: Record<string, number>;
}

const STORAGE_KEY = "curiokids_progress";

const achievements: Achievement[] = [
  // First activity achievements
  { id: "first-steps", title: "First Steps!", description: "Complete your very first activity", icon: "🌟", requirement: 1, type: "total" },
  { id: "first-drawing", title: "First Drawing!", description: "Complete your first drawing activity", icon: "🎨", category: "drawing", requirement: 1, type: "category" },
  { id: "first-worksheet", title: "Puzzle Starter!", description: "Complete your first worksheet", icon: "📝", category: "worksheets", requirement: 1, type: "category" },
  { id: "first-craft", title: "Crafty Hands!", description: "Complete your first craft project", icon: "✂️", category: "crafts", requirement: 1, type: "category" },
  { id: "first-story", title: "Story Starter!", description: "Create your first story", icon: "📚", category: "storytelling", requirement: 1, type: "category" },
  
  // Progress achievements
  { id: "star-collector-5", title: "Star Collector!", description: "Earn 5 stars", icon: "⭐", requirement: 5, type: "total" },
  { id: "star-collector-10", title: "Star Master!", description: "Earn 10 stars", icon: "🌟", requirement: 10, type: "total" },
  { id: "star-collector-25", title: "Superstar!", description: "Earn 25 stars", icon: "💫", requirement: 25, type: "total" },
  
  // Category mastery
  { id: "art-explorer", title: "Art Explorer!", description: "Complete 3 drawing activities", icon: "🖌️", category: "drawing", requirement: 3, type: "category" },
  { id: "puzzle-master", title: "Puzzle Master!", description: "Complete 3 worksheets", icon: "🧩", category: "worksheets", requirement: 3, type: "category" },
  { id: "craft-champion", title: "Craft Champion!", description: "Complete 3 craft projects", icon: "🏆", category: "crafts", requirement: 3, type: "category" },
  { id: "story-explorer", title: "Story Explorer!", description: "Complete 3 storytelling activities", icon: "📖", category: "storytelling", requirement: 3, type: "category" },
  
  // Special achievements
  { id: "all-rounder", title: "All-Rounder!", description: "Complete at least one activity in each category", icon: "🌈", requirement: 4, type: "special" },
];

const defaultProgress: ProgressState = {
  completedActivities: [],
  stars: 0,
  unlockedAchievements: [],
  activityProgress: {},
};

const loadProgress = (): ProgressState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load progress:", error);
  }
  return defaultProgress;
};

const saveProgress = (progress: ProgressState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
};

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const getResourceCategory = (resourceId: string) => {
    const resource = resources.find((r) => r.id === resourceId);
    return resource?.category;
  };

  const getCategoryCompletionCount = (category: string) => {
    return progress.completedActivities.filter((id) => {
      const resource = resources.find((r) => r.id === id);
      return resource?.category === category;
    }).length;
  };

  const getUniqueCategoriesCompleted = () => {
    const categories = new Set<string>();
    progress.completedActivities.forEach((id) => {
      const resource = resources.find((r) => r.id === id);
      if (resource) categories.add(resource.category);
    });
    return categories.size;
  };

  const checkForNewAchievements = useCallback((newProgress: ProgressState): string[] => {
    const newlyUnlocked: string[] = [];
    
    achievements.forEach((achievement) => {
      if (newProgress.unlockedAchievements.includes(achievement.id)) return;
      
      let unlocked = false;
      
      if (achievement.type === "total") {
        if (achievement.id.startsWith("star-collector")) {
          unlocked = newProgress.stars >= achievement.requirement;
        } else {
          unlocked = newProgress.completedActivities.length >= achievement.requirement;
        }
      } else if (achievement.type === "category" && achievement.category) {
        const count = newProgress.completedActivities.filter((id) => {
          const resource = resources.find((r) => r.id === id);
          return resource?.category === achievement.category;
        }).length;
        unlocked = count >= achievement.requirement;
      } else if (achievement.type === "special" && achievement.id === "all-rounder") {
        const categories = new Set<string>();
        newProgress.completedActivities.forEach((id) => {
          const resource = resources.find((r) => r.id === id);
          if (resource) categories.add(resource.category);
        });
        unlocked = categories.size >= 4;
      }
      
      if (unlocked) {
        newlyUnlocked.push(achievement.id);
      }
    });
    
    return newlyUnlocked;
  }, []);

  const completeActivity = useCallback((resourceId: string, starsEarned: number = 1) => {
    setProgress((prev) => {
      if (prev.completedActivities.includes(resourceId)) {
        return prev;
      }
      
      const newProgress: ProgressState = {
        ...prev,
        completedActivities: [...prev.completedActivities, resourceId],
        stars: prev.stars + starsEarned,
      };
      
      const newlyUnlocked = checkForNewAchievements(newProgress);
      if (newlyUnlocked.length > 0) {
        newProgress.unlockedAchievements = [...prev.unlockedAchievements, ...newlyUnlocked];
        const firstNewAchievement = achievements.find((a) => a.id === newlyUnlocked[0]);
        if (firstNewAchievement) {
          setNewAchievement(firstNewAchievement);
        }
      }
      
      return newProgress;
    });
  }, [checkForNewAchievements]);

  const updateActivityProgress = useCallback((resourceId: string, progressPercent: number) => {
    setProgress((prev) => ({
      ...prev,
      activityProgress: {
        ...prev.activityProgress,
        [resourceId]: Math.min(100, Math.max(0, progressPercent)),
      },
    }));
  }, []);

  const isActivityCompleted = useCallback((resourceId: string) => {
    return progress.completedActivities.includes(resourceId);
  }, [progress.completedActivities]);

  const getActivityProgress = useCallback((resourceId: string) => {
    return progress.activityProgress[resourceId] || 0;
  }, [progress.activityProgress]);

  const getTotalProgress = useCallback(() => {
    const totalResources = resources.length;
    const completed = progress.completedActivities.length;
    return Math.round((completed / totalResources) * 100);
  }, [progress.completedActivities.length]);

  const getCategoryProgress = useCallback((category: string) => {
    const categoryResources = resources.filter((r) => r.category === category);
    const completed = progress.completedActivities.filter((id) => {
      const resource = resources.find((r) => r.id === id);
      return resource?.category === category;
    }).length;
    return Math.round((completed / categoryResources.length) * 100);
  }, [progress.completedActivities]);

  const getAchievements = useCallback(() => {
    return achievements.map((achievement) => ({
      ...achievement,
      unlocked: progress.unlockedAchievements.includes(achievement.id),
    }));
  }, [progress.unlockedAchievements]);

  const dismissNewAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  return {
    stars: progress.stars,
    completedActivities: progress.completedActivities,
    completeActivity,
    updateActivityProgress,
    isActivityCompleted,
    getActivityProgress,
    getTotalProgress,
    getCategoryProgress,
    getAchievements,
    newAchievement,
    dismissNewAchievement,
    resetProgress,
    getCategoryCompletionCount,
    getUniqueCategoriesCompleted,
  };
};

export { achievements };
