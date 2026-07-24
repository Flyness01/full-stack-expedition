"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Backpack, Minus, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { CURIOSITY_ITEMS, STARTER_ITEMS } from "../data/expedition";
import { useExpeditionProgress } from "../hooks/useExpeditionProgress";
import { useAmbientAudio } from "../hooks/useAmbientAudio";
import { FirstSummerTrail } from "./FirstSummerTrail";
import { CuriosityBackpack } from "./CuriosityBackpack";
import { GameDashboard } from "./GameDashboard";
import { FrontendForest } from "./FrontendForest";
import { BackendCaverns } from "./BackendCaverns";
import { Hiker } from "./Hiker";
import { MountainScene } from "./MountainScene";
import { TopControls } from "./TopControls";
import { TrailMap } from "./TrailMap";

export function Expedition() {
  const { progress, update, restart, hydrated } = useExpeditionProgress();
  const [mapOpen, setMapOpen] = useState(false);
  const [packing, setPacking] = useState(false);
  const [packed, setPacked] = useState<string[]>(progress.packedItems);
  const [showDashboard, setShowDashboard] = useState(progress.started);
  const [view, setView] = useState<"dashboard" | "summer" | "curiosity" | "frontend" | "backend">("dashboard");
  useAmbientAudio(progress.soundEnabled);

  useEffect(() => {
    if (hydrated) {
      setPacked(progress.packedItems);
      setShowDashboard(progress.started);
    }
  }, [hydrated, progress.packedItems, progress.started]);

  async function begin() {
    if (packing) return;
    setPacking(true);
    for (const item of STARTER_ITEMS) {
      await new Promise((resolve) => setTimeout(resolve, progress.reducedMotion ? 80 : 620));
      setPacked((current) => [...current, item.id]);
    }
    await new Promise((resolve) => setTimeout(resolve, progress.reducedMotion ? 80 : 650));
    update({ started: true, packedItems: STARTER_ITEMS.map((item) => item.id) });
    setShowDashboard(true);
    setPacking(false);
  }

  function handleRestart() {
    restart();
    setPacked([]);
    setPacking(false);
    setShowDashboard(false);
    setMapOpen(false);
    setView("dashboard");
  }

  if (!hydrated) return <div className="loading-screen"><MountainScene started={false} reducedMotion /></div>;

  return (
    <div className={`expedition ${showDashboard ? "dashboard-mode" : ""} ${view === "summer" ? "summer-mode" : ""} ${view === "curiosity" ? "curiosity-mode" : ""} ${view === "frontend" ? "frontend-mode" : ""} ${view === "backend" ? "backend-mode" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to expedition</a>
      <MountainScene started={showDashboard} reducedMotion={progress.reducedMotion} />
      <TopControls
        soundEnabled={progress.soundEnabled}
        reducedMotion={progress.reducedMotion}
        onSound={() => update({ soundEnabled: !progress.soundEnabled })}
        onMotion={() => update({ reducedMotion: !progress.reducedMotion })}
        onMap={() => setMapOpen(true)}
        onRestart={handleRestart}
        started={showDashboard}
      />

      <AnimatePresence mode="wait">
        {!showDashboard ? (
          <motion.main
            id="main-content"
            key="opening"
            className="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="opening-copy">
              <motion.div className="title-mark" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}><Minus /><MountainMini /><Minus /></motion.div>
              <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}>A journey of curiosity & growth</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}>
                The Full-Stack<br /><em>Expedition</em>
              </motion.h1>
              <motion.p className="opening-deck" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }}>
                Two summers. One team. Countless lessons.<br /><strong>One final trail.</strong>
              </motion.p>
              <motion.blockquote initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                You do not need to know the entire path.<br />You only need the curiosity to begin.
              </motion.blockquote>
              <motion.button className="begin-button" onClick={begin} disabled={packing} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}>
                {packing ? "Packing essentials…" : "Begin the climb"} <ArrowRight />
              </motion.button>
              <p className="scroll-hint"><span /> Base camp · 1,240 ft</p>
            </div>

            <div className="trailhead-figure">
              <div className="trail-sign"><span>TRAILHEAD</span><small>SUMMIT · 6,760 FT</small></div>
              <Hiker started={packing} reducedMotion={progress.reducedMotion} />
            </div>

            <AnimatePresence>
              {packing && (
                <motion.aside className="packing-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="pack-visual"><Backpack /></div>
                  <p className="eyebrow">Packing for the trail</p>
                  <div className="flying-items">
                    {STARTER_ITEMS.map((item, index) => {
                      const Icon = item.icon;
                      const isPacked = packed.includes(item.id);
                      return (
                        <motion.div
                          key={item.id}
                          className={isPacked ? "is-packed" : ""}
                          initial={{ opacity: 0, y: -25 }}
                          animate={{ opacity: 1, y: isPacked ? 28 : 0, scale: isPacked ? .72 : 1 }}
                          transition={{ delay: index * .15 }}
                        >
                          <Icon /><span>{item.name}</span>{isPacked && <Sparkles />}
                        </motion.div>
                      );
                    })}
                    <motion.div className="rejected-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>
                      <span>Fear of Looking Foolish</span><b>Leave behind</b>
                    </motion.div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </motion.main>
        ) : view === "summer" ? (
          <FirstSummerTrail
            key="summer"
            initialOrder={progress.memoryOrder}
            alreadyComplete={progress.completedStages.includes("summer-one")}
            reducedMotion={progress.reducedMotion}
            onBack={() => setView("dashboard")}
            onSaveOrder={(memoryOrder) => update({ memoryOrder })}
            onComplete={() => update({
              elevation: 1880,
              currentStage: "curiosity",
              completedStages: Array.from(new Set([...progress.completedStages, "trailhead", "summer-one"])),
              collectibles: Array.from(new Set([...progress.collectibles, "reflection-map"])),
            })}
          />
        ) : view === "curiosity" ? (
          <CuriosityBackpack
            key="curiosity"
            initialSelections={progress.curiositySelections}
            alreadyComplete={progress.completedStages.includes("curiosity")}
            reducedMotion={progress.reducedMotion}
            onBack={() => setView("dashboard")}
            onSave={(curiositySelections) => update({ curiositySelections })}
            onComplete={() => update({
              elevation: 2510,
              currentStage: "frontend",
              curiositySelections: CURIOSITY_ITEMS.filter((item) => item.helpful).map((item) => item.id),
              completedStages: Array.from(new Set([...progress.completedStages, "curiosity"])),
              collectibles: Array.from(new Set([...progress.collectibles, "sponge-badge"])),
            })}
          />
        ) : view === "frontend" ? (
          <FrontendForest
            key="frontend"
            initialCompleted={progress.frontendCompleted}
            initialTree={progress.componentTree}
            alreadyComplete={progress.completedStages.includes("frontend")}
            reducedMotion={progress.reducedMotion}
            onBack={() => setView("dashboard")}
            onSave={(frontendCompleted, componentTree) => update({ frontendCompleted, componentTree })}
            onComplete={() => update({
              elevation: 3260,
              currentStage: "backend",
              frontendCompleted: ["layout", "accessibility", "components"],
              componentTree: ["App", "TrailMap", "CheckpointCard", "HintButton", "ProgressBar"],
              completedStages: Array.from(new Set([...progress.completedStages, "frontend"])),
              collectibles: Array.from(new Set([...progress.collectibles, "interface-compass"])),
            })}
          />
        ) : view === "backend" ? (
          <BackendCaverns
            key="backend"
            initialCompleted={progress.backendCompleted}
            initialFlow={progress.backendFlow}
            alreadyComplete={progress.completedStages.includes("backend")}
            reducedMotion={progress.reducedMotion}
            onBack={() => setView("dashboard")}
            onSave={(backendCompleted, backendFlow) => update({ backendCompleted, backendFlow })}
            onComplete={() => update({
              elevation: 4080,
              currentStage: "process",
              backendCompleted: ["flow", "permission", "debug"],
              backendFlow: ["User Action", "Frontend", "API", "Authorization", "Business Logic", "Database", "Response"],
              completedStages: Array.from(new Set([...progress.completedStages, "backend"])),
              collectibles: Array.from(new Set([...progress.collectibles, "full-stack-lantern"])),
            })}
          />
        ) : (
          <GameDashboard
            key="dashboard"
            packedItems={packed}
            collectibles={progress.collectibles}
            completedStages={progress.completedStages}
            elevation={progress.elevation}
            onMap={() => setMapOpen(true)}
            onContinue={(stage) => setView(stage)}
            reducedMotion={progress.reducedMotion}
          />
        )}
      </AnimatePresence>
      <TrailMap open={mapOpen} onClose={() => setMapOpen(false)} completedStages={progress.completedStages} currentStage={progress.currentStage} elevation={progress.elevation} />
    </div>
  );
}

function MountainMini() {
  return <span className="mountain-mini"><i /><b /></span>;
}
