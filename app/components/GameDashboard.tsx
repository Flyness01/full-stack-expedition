import { Backpack, ChevronRight, Lock, Map, Mountain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { STARTER_ITEMS, TRAIL_STAGES } from "../data/expedition";

export function GameDashboard({ packedItems, onMap, reducedMotion }: {
  packedItems: string[];
  onMap: () => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.main
      className="dashboard"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8 }}
    >
      <section className="trail-status">
        <div className="status-copy">
          <p className="eyebrow"><Sparkles /> Expedition initialized</p>
          <h1>The trail is ready.</h1>
          <p>Your essentials are packed. Every higher checkpoint will unlock as the journey continues.</p>
        </div>
        <div className="elevation-card">
          <Mountain />
          <div><small>Current elevation</small><strong>1,240 <span>/ 8,000 ft</span></strong></div>
          <div className="elevation-track"><span style={{ width: "15.5%" }} /></div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel next-stage">
          <header><div><p className="eyebrow">Next on the route</p><h2>{TRAIL_STAGES[1].title}</h2></div><span className="locked-pill"><Lock /> Locked</span></header>
          <div className="stage-art"><span className="city-line">▂▅▃▇▂▆▃▅</span><span className="sun-disc" /></div>
          <p>{TRAIL_STAGES[1].subtitle}. This checkpoint arrives in Phase 2.</p>
          <button className="disabled-button" disabled>Trail continues soon <ChevronRight /></button>
        </section>

        <section className="panel inventory-panel">
          <header><div><p className="eyebrow">Inventory</p><h2>What you carry</h2></div><Backpack /></header>
          <div className="inventory-list">
            {STARTER_ITEMS.map((item) => {
              const Icon = item.icon;
              return <article key={item.id} className={packedItems.includes(item.id) ? "packed" : ""}><span><Icon /></span><div><strong>{item.name}</strong><small>{item.note}</small></div></article>;
            })}
          </div>
        </section>

        <button className="panel map-teaser" onClick={onMap}>
          <span className="map-icon"><Map /></span>
          <span><small>10 checkpoints · 6,760 ft to climb</small><strong>Open the expedition map</strong></span>
          <ChevronRight />
        </button>
      </div>
      <p className="phase-note"><span /> Base camp established · Phase 1 complete</p>
    </motion.main>
  );
}
