"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Backpack, Check, Feather, Sparkles, Waves } from "lucide-react";
import { useMemo, useState } from "react";
import { CURIOSITY_ITEMS } from "../data/expedition";

type Props = {
  initialSelections: string[];
  alreadyComplete: boolean;
  reducedMotion: boolean;
  onBack: () => void;
  onSave: (selections: string[]) => void;
  onComplete: () => void;
};

export function CuriosityBackpack(props: Props) {
  const [selected, setSelected] = useState<string[]>(props.initialSelections);
  const [feedback, setFeedback] = useState("Choose the supplies that make room for growth.");
  const [rejectedId, setRejectedId] = useState<string | null>(null);
  const correctIds = useMemo(() => CURIOSITY_ITEMS.filter((item) => item.helpful).map((item) => item.id), []);
  const complete = props.alreadyComplete || correctIds.every((id) => selected.includes(id));

  function choose(id: string) {
    if (complete) return;
    const item = CURIOSITY_ITEMS.find((entry) => entry.id === id)!;
    if (!item.helpful) {
      setRejectedId(id);
      setFeedback(item.feedback ?? "That may make the climb harder.");
      window.setTimeout(() => setRejectedId(null), 700);
      return;
    }
    const next = selected.includes(id) ? selected.filter((entry) => entry !== id) : [...selected, id];
    setSelected(next);
    props.onSave(next);
    setFeedback(next.includes(id) ? `${item.name} packed.` : `${item.name} returned to the trail.` );
    if (correctIds.every((correctId) => next.includes(correctId))) props.onComplete();
  }

  return (
    <main className={`curiosity-stage ${complete ? "is-complete" : ""}`} id="main-content">
      <header className="stage-nav">
        <button onClick={props.onBack}><ArrowLeft /> Base camp</button>
        <div><span>Checkpoint 02</span><strong>1,880 → 2,510 ft</strong></div>
      </header>

      <section className="curiosity-hero">
        <motion.div initial={props.reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="eyebrow">Summer Two · Intention</p>
          <h1>The Backpack<br /><em>of Curiosity</em></h1>
          <p>This time, the goal was not to arrive knowing everything. It was to ask, absorb, try, and keep learning.</p>
        </motion.div>
        <div className="forest-gate" aria-hidden="true">
          <i /><i /><i /><i /><i /><i />
          <span className="forest-path" />
        </div>
      </section>

      <section className="packing-puzzle">
        <div className="backpack-station">
          <div className="backpack-large">
            <Backpack />
            <span>{selected.length}<small>/ 6</small></span>
          </div>
          <p className="eyebrow">Pack for growth</p>
          <h2>What belongs in the backpack?</h2>
          <p>Select six supplies. Useful tools feel light; habits that hide uncertainty make the climb harder.</p>
          <div className={`pack-feedback ${rejectedId ? "rejected" : ""}`} aria-live="polite">{feedback}</div>
        </div>

        <div className="curiosity-items" role="list" aria-label="Backpack supplies">
          {CURIOSITY_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isSelected = selected.includes(item.id);
            const isRejected = rejectedId === item.id;
            return (
              <motion.button
                type="button"
                role="listitem"
                key={item.id}
                className={`${isSelected ? "selected" : ""} ${isRejected ? "rejected" : ""}`}
                onClick={() => choose(item.id)}
                aria-pressed={isSelected}
                initial={props.reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: complete && !item.helpful ? .32 : 1, y: 0 }}
                transition={{ delay: index * .035 }}
              >
                <span className="supply-icon"><Icon /></span>
                <span><strong>{item.name}</strong><small>{item.detail}</small></span>
                <span className="supply-state">{isSelected ? <Check /> : "+"}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {complete && (
          <motion.section className="curiosity-success" initial={props.reducedMotion ? false : { opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bird-flight" aria-hidden="true"><Feather /><Feather /><Feather /></div>
            <div className="sponge-badge"><Waves /><Sparkles /></div>
            <div>
              <p className="eyebrow"><Sparkles /> Backpack ready</p>
              <h2>Arrive ready to learn.</h2>
              <blockquote>“The goal was not to know everything.<br />The goal was to ask, absorb, try, and keep learning.”</blockquote>
              <div className="badge-earned"><span>Item earned</span><strong>Sponge Badge</strong></div>
              <button onClick={props.onBack}>Return to base camp <ArrowRight /></button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
