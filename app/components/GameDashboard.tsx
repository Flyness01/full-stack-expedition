import { Backpack, ChevronRight, Check, Map, Mountain, Sparkles, Waves } from "lucide-react";
import { motion } from "framer-motion";
import { STARTER_ITEMS, TRAIL_STAGES } from "../data/expedition";

export function GameDashboard({ packedItems, collectibles, completedStages, elevation, onMap, onContinue, reducedMotion }: {
  packedItems: string[];
  collectibles: string[];
  completedStages: string[];
  elevation: number;
  onMap: () => void;
  onContinue: (stage: "summer" | "curiosity") => void;
  reducedMotion: boolean;
}) {
  const summerComplete = completedStages.includes("summer-one");
  const curiosityComplete = completedStages.includes("curiosity");
  const activeStage = summerComplete ? TRAIL_STAGES[2] : TRAIL_STAGES[1];
  return (
    <motion.main
      className="dashboard"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8 }}
    >
      <section className="trail-status">
        <div className="status-copy">
          <p className="eyebrow"><Sparkles /> {curiosityComplete ? "Learning kit complete" : summerComplete ? "A more intentional climb" : "Expedition initialized"}</p>
          <h1>{curiosityComplete ? "Ready to absorb." : summerComplete ? "Pack with purpose." : "The trail is ready."}</h1>
          <p>{curiosityComplete ? "The Sponge Badge joins the Reflection Map. Frontend Forest waits higher on the trail." : summerComplete ? "A new summer begins with a different goal: arrive ready to ask, absorb, and try." : "Your essentials are packed. The First Summer Trail is open and waiting."}</p>
        </div>
        <div className="elevation-card">
          <Mountain />
          <div><small>Current elevation</small><strong>{elevation.toLocaleString()} <span>/ 8,000 ft</span></strong></div>
          <div className="elevation-track"><span style={{ width: `${elevation / 80}%` }} /></div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel next-stage">
          <header><div><p className="eyebrow">{curiosityComplete ? "Completed checkpoint" : "Next on the route"}</p><h2>{activeStage.title}</h2></div><span className={`locked-pill ${curiosityComplete ? "complete" : "open"}`}>{curiosityComplete ? <><Check /> Complete</> : "Trail open"}</span></header>
          <div className={`stage-art ${summerComplete ? "forest-art" : ""}`}><span className="city-line">{summerComplete ? "▲ ▲ ▲ ▲ ▲" : "▂▅▃▇▂▆▃▅"}</span><span className="sun-disc" /></div>
          <p>{summerComplete ? "Choose what supports growth—and leave behind what makes learning heavier." : "Follow the city-meets-trail path through memories, WhirlyBall, connection, and honest reflection."}</p>
          <button className="stage-button" onClick={() => onContinue(summerComplete ? "curiosity" : "summer")}>{curiosityComplete ? "Revisit the backpack" : summerComplete ? "Pack for Summer Two" : "Enter the First Summer"} <ChevronRight /></button>
        </section>

        <section className="panel inventory-panel">
          <header><div><p className="eyebrow">Inventory</p><h2>What you carry</h2></div><Backpack /></header>
          <div className="inventory-list">
            {STARTER_ITEMS.map((item) => {
              const Icon = item.icon;
              return <article key={item.id} className={packedItems.includes(item.id) ? "packed" : ""}><span><Icon /></span><div><strong>{item.name}</strong><small>{item.note}</small></div></article>;
            })}
            {collectibles.includes("reflection-map") && <article className="packed collectible"><span><Map /></span><div><strong>Reflection Map</strong><small>Honesty helps reveal the next path.</small></div></article>}
            {collectibles.includes("sponge-badge") && <article className="packed collectible sponge"><span><Waves /></span><div><strong>Sponge Badge</strong><small>Ask, absorb, try, and keep learning.</small></div></article>}
          </div>
        </section>

        <button className="panel map-teaser" onClick={onMap}>
          <span className="map-icon"><Map /></span>
          <span><small>10 checkpoints · {(8000 - elevation).toLocaleString()} ft to climb</small><strong>Open the expedition map</strong></span>
          <ChevronRight />
        </button>
      </div>
      <p className="phase-note"><span /> {curiosityComplete ? "Backpack of Curiosity complete · Phase 3" : summerComplete ? "Backpack of Curiosity ready · Phase 3" : "First Summer Trail ready · Phase 2"}</p>
    </motion.main>
  );
}
