"use client";

import { AnimatePresence, motion, Reorder } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Map, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { MEMORY_TILES } from "../data/expedition";

type Props = {
  initialOrder: string[];
  alreadyComplete: boolean;
  reducedMotion: boolean;
  onBack: () => void;
  onSaveOrder: (order: string[]) => void;
  onComplete: () => void;
};

const SHUFFLED = ["meet", "reflect", "whirlyball", "arrive", "connections", "chicago"];

export function FirstSummerTrail(props: Props) {
  const [order, setOrder] = useState<string[]>(props.initialOrder.length ? props.initialOrder : SHUFFLED);
  const [checked, setChecked] = useState(props.alreadyComplete);
  const [reflection, setReflection] = useState<"opportunities" | "intention" | null>(props.alreadyComplete ? "intention" : null);
  const [message, setMessage] = useState("");

  const tiles = useMemo(() => order.map((id) => MEMORY_TILES.find((tile) => tile.id === id)!), [order]);
  const orderCorrect = order[0] === "arrive" && order[order.length - 1] === "reflect";

  function move(id: string, direction: -1 | 1) {
    const index = order.indexOf(id);
    const next = index + direction;
    if (next < 0 || next >= order.length) return;
    const updated = [...order];
    [updated[index], updated[next]] = [updated[next], updated[index]];
    setOrder(updated);
    setChecked(false);
    setMessage("");
  }

  function checkTrail() {
    if (orderCorrect) {
      setChecked(true);
      setMessage("The trail settles into place.");
      props.onSaveOrder(order);
    } else {
      setMessage("Every story needs a beginning and a moment to look back. Try placing Arrive first and Reflect last.");
    }
  }

  function chooseReflection(choice: "opportunities" | "intention") {
    setReflection(choice);
    if (choice === "intention") {
      props.onComplete();
    }
  }

  return (
    <main className="summer-stage" id="main-content">
      <header className="stage-nav">
        <button onClick={props.onBack}><ArrowLeft /> Base camp</button>
        <div><span>Checkpoint 01</span><strong>1,240 → 1,880 ft</strong></div>
      </header>

      <section className="summer-hero">
        <div className="chicago-skyline" aria-hidden="true">
          <span className="willis">▥</span><span>▦</span><span>▤</span><span>▥</span><span>▦</span><i />
        </div>
        <motion.div initial={props.reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="eyebrow">Summer One · Discovery</p>
          <h1>The First<br /><em>Summer Trail</em></h1>
          <p>A new city. A generous team. The kind of memories that make a place feel familiar—and the perspective that only comes after walking farther.</p>
        </motion.div>
        <div className="summer-sign"><span>CHICAGO</span><small>MEMORY TRAIL</small></div>
      </section>

      <section className="memory-lookout">
        <div className="section-heading">
          <p className="eyebrow">Trail discoveries</p>
          <h2>What made the first summer memorable</h2>
          <p>This chapter begins with people and place—not a claim that every connection was deep, but an appreciation for the welcome surrounding the work.</p>
        </div>
        <div className="memory-cards">
          <article><span className="memory-number">01</span><div className="arena-mark"><i /><i /><i /></div><p className="eyebrow">Team memory</p><h3>WhirlyBall</h3><p>A fast, chaotic, laughter-filled reminder that connection happens beyond a desk.</p></article>
          <article><span className="memory-number">02</span><div className="people-mark"><i /><i /><i /><i /></div><p className="eyebrow">First impressions</p><h3>Meet the team</h3><p>New names, new perspectives, and the beginning of feeling part of something larger.</p></article>
          <article><span className="memory-number">03</span><div className="city-mark">▂▆▃▇▂▅</div><p className="eyebrow">A new backdrop</p><h3>Chicago</h3><p>The city became part of the story: energetic, unfamiliar, and full of paths to explore.</p></article>
        </div>
      </section>

      <section className="memory-puzzle">
        <div className="puzzle-intro">
          <p className="eyebrow">Trail puzzle 01</p>
          <h2>Reconstruct the memory trail</h2>
          <p>Drag the six memories into a path—or use the arrow controls. The middle is yours to interpret, but every story needs the right beginning and ending.</p>
        </div>
        <Reorder.Group axis="y" values={order} onReorder={(values) => { setOrder(values); setChecked(false); setMessage(""); }} className="memory-tiles">
          {tiles.map((tile, index) => {
            const Icon = tile.icon;
            return (
              <Reorder.Item value={tile.id} key={tile.id} className={checked ? "solved" : ""}>
                <span className="tile-order">{String(index + 1).padStart(2, "0")}</span>
                <span className="tile-icon"><Icon /></span>
                <div><strong>{tile.label}</strong><small>{tile.detail}</small></div>
                <div className="move-controls">
                  <button onClick={() => move(tile.id, -1)} disabled={index === 0} aria-label={`Move ${tile.label} up`}><ArrowUp /></button>
                  <button onClick={() => move(tile.id, 1)} disabled={index === tiles.length - 1} aria-label={`Move ${tile.label} down`}><ArrowDown /></button>
                </div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
        <div className={`puzzle-feedback ${orderCorrect && checked ? "success" : ""}`} aria-live="polite">
          <p>{message || "Place Arrive at the trailhead and Reflect at the overlook."}</p>
          <button onClick={checkTrail}>{checked ? <><Check /> Trail reconstructed</> : <>Check the route <ArrowRight /></>}</button>
        </div>
      </section>

      <AnimatePresence>
        {checked && (
          <motion.section className="reflection-reveal" initial={props.reducedMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="reflection-copy">
              <p className="eyebrow"><Sparkles /> Look back honestly</p>
              <h2>The first summer created unforgettable memories.</h2>
              <p>But a great journey also teaches us to look back honestly. Which reflection reveals the way forward?</p>
            </div>
            <div className="reflection-choices">
              <button className={reflection === "opportunities" ? "wrong" : ""} onClick={() => chooseReflection("opportunities")}>
                <span>A</span><strong>The opportunities were not there.</strong>
                {reflection === "opportunities" && <small>The trail was open. Look inward, not outward.</small>}
              </button>
              <button className={reflection === "intention" ? "correct" : ""} onClick={() => chooseReflection("intention")}>
                <span>B</span><strong>I was not yet making full use of them.</strong>
                {reflection === "intention" && <small><Check /> Honest reflection clears the path.</small>}
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {reflection === "intention" && (
        <motion.section className="trail-complete" initial={props.reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="earned-item"><Map /><span>Item earned</span><strong>Reflection Map</strong></div>
          <blockquote>“The team had already opened the door.<br />The next step was learning how to walk through it with intention.”</blockquote>
          <button onClick={props.onBack}>Return to base camp <ArrowRight /></button>
        </motion.section>
      )}
    </main>
  );
}
