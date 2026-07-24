import {
  Backpack,
  Brain,
  Code2,
  Compass,
  Flame,
  Footprints,
  Mountain,
  Network,
  Sparkles,
  Trees,
} from "lucide-react";

export const TRAIL_STAGES = [
  { id: "trailhead", title: "Trailhead", subtitle: "The journey begins", elevation: 1240, icon: Footprints },
  { id: "summer-one", title: "The First Summer", subtitle: "Memories & reflection", elevation: 1880, icon: Trees },
  { id: "curiosity", title: "Backpack of Curiosity", subtitle: "Pack a learning mindset", elevation: 2510, icon: Backpack },
  { id: "frontend", title: "Frontend Forest", subtitle: "Make the path usable", elevation: 3260, icon: Code2 },
  { id: "backend", title: "Backend Caverns", subtitle: "Follow the hidden flow", elevation: 4080, icon: Flame },
  { id: "process", title: "Process Bridge", subtitle: "Build with intention", elevation: 4870, icon: Network },
  { id: "ridge", title: "Puzzle Ridge", subtitle: "See the whole system", elevation: 5710, icon: Brain },
  { id: "community", title: "Community Camp", subtitle: "76 lights, one trail", elevation: 6480, icon: Sparkles },
  { id: "mentor", title: "Mentor’s Peak", subtitle: "Ask · Try · Learn · Reflect", elevation: 7210, icon: Compass },
  { id: "summit", title: "The Summit", subtitle: "The final ascent", elevation: 8000, icon: Mountain },
] as const;

export const STARTER_ITEMS = [
  { id: "curiosity", name: "Curiosity", note: "Makes every trail worth taking.", icon: Compass },
  { id: "questions", name: "Questions", note: "Turns uncertainty into a way forward.", icon: Sparkles },
  { id: "mindset", name: "Beginner’s Mindset", note: "Leaves room for everything still to learn.", icon: Brain },
] as const;

export const MEMORY_TILES = [
  { id: "arrive", label: "Arrive", detail: "A new city and a new trail.", icon: Footprints },
  { id: "meet", label: "Meet the team", detail: "Names became familiar faces.", icon: Network },
  { id: "chicago", label: "Explore Chicago", detail: "A skyline full of possibility.", icon: Mountain },
  { id: "whirlyball", label: "Play WhirlyBall", detail: "Fast turns, loud laughs, good memories.", icon: Sparkles },
  { id: "connections", label: "Build connections", detail: "Belonging grew between the work.", icon: Trees },
  { id: "reflect", label: "Reflect", detail: "The trail looks different in hindsight.", icon: Brain },
] as const;

export const STORAGE_KEY = "full-stack-expedition-progress-v1";
