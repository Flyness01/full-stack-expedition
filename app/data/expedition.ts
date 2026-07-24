import {
  Backpack,
  Brain,
  CircleHelp,
  Code2,
  Compass,
  Crown,
  EyeOff,
  Flame,
  Footprints,
  Gem,
  Laptop,
  LibraryBig,
  Mountain,
  Network,
  Sparkles,
  Trees,
  VenetianMask,
  Waves,
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

export const CURIOSITY_ITEMS = [
  { id: "question-mark", name: "Question Mark", detail: "A question is a trailhead.", helpful: true, icon: CircleHelp },
  { id: "ego", name: "Ego", detail: "It leaves no room for new ideas.", helpful: false, icon: Crown, feedback: "This takes up space meant for learning." },
  { id: "notebook", name: "Notebook", detail: "Make room for what you learn.", helpful: true, icon: LibraryBig },
  { id: "fear", name: "Fear of Asking", detail: "Silence can make the trail longer.", helpful: false, icon: EyeOff, feedback: "This will make the backpack heavier." },
  { id: "sponge", name: "Sponge", detail: "Absorb first. Understand through practice.", helpful: true, icon: Waves },
  { id: "compass", name: "Compass", detail: "Direction matters more than certainty.", helpful: true, icon: Compass },
  { id: "pretending", name: "Pretending to Understand", detail: "A false shortcut obscures the route.", helpful: false, icon: VenetianMask, feedback: "This item blocks the map." },
  { id: "laptop", name: "Laptop", detail: "A tool for trying the unfamiliar.", helpful: true, icon: Laptop },
  { id: "perfectionism", name: "Perfectionism", detail: "Care is useful; impossible standards are not.", helpful: false, icon: Gem, feedback: "Useful in small amounts, but too heavy for the entire climb." },
  { id: "curiosity", name: "Curiosity", detail: "The lightest and most useful supply.", helpful: true, icon: Sparkles },
] as const;

export const STORAGE_KEY = "full-stack-expedition-progress-v1";
