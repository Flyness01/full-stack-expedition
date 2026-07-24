import { Backpack, ChevronRight, Check, Map, Mountain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { STARTER_ITEMS, TRAIL_STAGES } from "../data/expedition";

export function GameDashboard({ packedItems, collectibles, completedStages, elevation, onMap, onContinue, reducedMotion }: {
  packedItems: string[];
  collectibles: string[];
  completedStages: string[];
  elevation: number;
  onMap: () => void;
  onContinue: () => void;
  reducedMotion: boolean;
}) {
  const summerComplete = completedStages.includes("summer-one");
  return (
    <motion.main
      className="dashboard"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8 }}
    >
      <section className="trail-status">
        <div className="status-copy">
          <p className="eyebrow"><Sparkles /> {summerComplete ? "First ascent complete" : "Expedition initialized"}</p>
          <h1>{summerComplete ? "A clearer trail." : "The trail is ready."}</h1>
          <p>{summerComplete ? "The first summer is now part of the map—and its honest lesson travels forward." : "Your essentials are packed. The First Summer Trail is open and waiting."}</p>
        </div>
        <div className="elevation-card">
          <Mountain />
          <div><small>Current elevation</small><strong>{elevation.toLocaleString()} <span>/ 8,000 ft</span></strong></div>
          <div className="elevation-track"><span style={{ width: `${elevation / 80}%` }} /></div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel next-stage">
          <header><div><p className="eyebrow">{summerComplete ? "Completed checkpoint" : "Next on the route"}</p><h2>{TRAIL_STAGES[1].title}</h2></div><span className={`locked-pill ${summerComplete ? "complete" : "open"}`}>{summerComplete ? <><Check /> Complete</> : "Trail open"}</span></header>
          <div className="stage-art"><span className="city-line">▂▅▃▇▂▆▃▅</span><span className="sun-disc" /></div>
          <p>{summerComplete ? "Six memories, one reflection, and a lesson worth carrying." : "Follow the city-meets-trail path through memories, WhirlyBall, connection, and honest reflection."}</p>
          <button className="stage-button" onClick={onContinue}>{summerComplete ? "Revisit the trail" : "Enter the First Summer"} <ChevronRight /></button>
        </section>

        <section className="panel inventory-panel">
          <header><div><p className="eyebrow">Inventory</p><h2>What you carry</h2></div><Backpack /></header>
          <div className="inventory-list">
            {STARTER_ITEMS.map((item) => {
              const Icon = item.icon;
              return <article key={item.id} className={packedItems.includes(item.id) ? "packed" : ""}><span><Icon /></span><div><strong>{item.name}</strong><small>{item.note}</small></div></article>;
            })}
            {collectibles.includes("reflection-map") && <article className="packed collectible"><span><Map /></span><div><strong>Reflection Map</strong><small>Honesty helps reveal the next path.</small></div></article>}
          </div>
        </section>

        <button className="panel map-teaser" onClick={onMap}>
          <span className="map-icon"><Map /></span>
          <span><small>10 checkpoints · {(8000 - elevation).toLocaleString()} ft to climb</small><strong>Open the expedition map</strong></span>
          <ChevronRight />
        </button>
      </div>
      <p className="phase-note"><span /> {summerComplete ? "First Summer Trail complete · Phase 2" : "First Summer Trail ready · Phase 2"}</p>
    </motion.main>
  );
}
