"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Compass,
  Eye,
  Flower2,
  GripVertical,
  Sparkles,
  Sun,
  Trees,
} from "lucide-react";
import { useMemo, useState } from "react";

const LAYOUT_PATCHES = [
  { id: "hidden", rule: "display: none;", label: "Remove from flow" },
  { id: "vertical", rule: "flex-direction: column;", label: "Turn the axis" },
  { id: "clip", rule: "overflow: hidden;", label: "Clip the edges" },
  { id: "float", rule: "position: absolute;", label: "Lift from flow" },
] as const;

const ACCESSIBILITY_REPAIRS = [
  { id: "label", label: "Clarify the label", detail: "Say where the crossing leads." },
  { id: "contrast", label: "Raise the contrast", detail: "Bring the words out of the mist." },
  { id: "focus", label: "Mark keyboard focus", detail: "Make the active step visible." },
  { id: "target", label: "Widen the target", detail: "Leave room for touch and movement." },
] as const;

const TREE_SOLUTION = ["App", "TrailMap", "CheckpointCard", "HintButton", "ProgressBar"];
const INITIAL_TREE = ["HintButton", "App", "ProgressBar", "CheckpointCard", "TrailMap"];

export function FrontendForest({
  initialCompleted,
  initialTree,
  alreadyComplete,
  reducedMotion,
  onBack,
  onSave,
  onComplete,
}: {
  initialCompleted: string[];
  initialTree: string[];
  alreadyComplete: boolean;
  reducedMotion: boolean;
  onBack: () => void;
  onSave: (completed: string[], tree: string[]) => void;
  onComplete: () => void;
}) {
  const [completed, setCompleted] = useState<string[]>(alreadyComplete ? ["layout", "accessibility", "components"] : initialCompleted);
  const [tree, setTree] = useState<string[]>(initialTree.length === TREE_SOLUTION.length ? initialTree : INITIAL_TREE);
  const [layoutChoice, setLayoutChoice] = useState(solvedInitial(initialCompleted, alreadyComplete, "layout") ? "flex-direction: column;" : "");
  const [a11yRepairs, setA11yRepairs] = useState<string[]>(solvedInitial(initialCompleted, alreadyComplete, "accessibility") ? ACCESSIBILITY_REPAIRS.map((repair) => repair.id) : []);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("The highlighted declaration controls the direction of the trail card.");
  const [treeAttempts, setTreeAttempts] = useState(0);

  const solved = (id: string) => completed.includes(id);
  const allSolved = completed.length === 3 || alreadyComplete;
  const forestHealth = useMemo(() => Math.min(100, completed.length * 33 + (allSolved ? 1 : 0)), [completed.length, allSolved]);

  function markSolved(id: string, nextTree = tree) {
    const next = Array.from(new Set([...completed, id]));
    setCompleted(next);
    onSave(next, nextTree);
  }

  function chooseLayout(option: string) {
    setLayoutChoice(option);
    if (option === "flex-direction: column;") {
      setFeedback("The sign straightens. The card now follows a clear vertical path.");
      markSolved("layout");
    } else if (option === "display: none;") {
      setFeedback("The whole checkpoint vanishes into the trees. The path still needs its content.");
    } else if (option === "overflow: hidden;") {
      setFeedback("The edges are trimmed, but the trail still runs sideways.");
    } else {
      setFeedback("The card lifts out of the trail flow. Try a patch that changes its direction.");
    }
  }

  function toggleAccessibility(id: string) {
    if (solved("accessibility")) return;
    const next = a11yRepairs.includes(id) ? a11yRepairs.filter((repair) => repair !== id) : [...a11yRepairs, id];
    setA11yRepairs(next);
    if (next.length === ACCESSIBILITY_REPAIRS.length) markSolved("accessibility");
  }

  function moveBlock(from: number, to: number) {
    if (to < 0 || to >= tree.length) return;
    const next = [...tree];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setTree(next);
    onSave(completed, next);
  }

  function placeSelected(index: number) {
    if (!selectedBlock) {
      setSelectedBlock(tree[index]);
      return;
    }
    const from = tree.indexOf(selectedBlock);
    const next = [...tree];
    [next[from], next[index]] = [next[index], next[from]];
    setTree(next);
    setSelectedBlock(null);
    onSave(completed, next);
  }

  function checkTree() {
    if (TREE_SOLUTION.every((item, index) => tree[index] === item)) {
      markSolved("components", tree);
    } else {
      setTreeAttempts((attempts) => attempts + 1);
    }
  }

  return (
    <motion.main
      className={`frontend-stage ${allSolved ? "forest-restored" : ""}`}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <nav className="stage-nav">
        <button onClick={onBack}><ArrowLeft /> Base camp</button>
        <div><span>Checkpoint 04</span><strong>3,260 ft</strong></div>
      </nav>

      <header className="frontend-hero">
        <div>
          <p className="eyebrow"><Code2 /> Phase 4 · Make the path usable</p>
          <h1>Frontend<br /><em>Forest</em></h1>
          <p>The trail is technically open, but it is not yet clear, usable, or thoughtful. Repair what people can see—and what they need to navigate.</p>
        </div>
        <div className="broken-forest" aria-hidden="true">
          <span className="crooked-sign">PATH <b>?</b></span>
          <i /><i /><i /><i />
          <span className="forest-sun"><Sun /></span>
        </div>
      </header>

      <section className="forest-health" aria-label={`Forest interface ${forestHealth}% restored`}>
        <div><span>Interface restoration</span><strong>{forestHealth}%</strong></div>
        <div className="health-track"><motion.span animate={{ width: `${forestHealth}%` }} /></div>
        <div className="repair-markers">
          {["Layout", "Accessibility", "Components"].map((label, index) => (
            <span className={completed.length > index ? "repaired" : ""} key={label}>{completed.length > index ? <Check /> : index + 1} {label}</span>
          ))}
        </div>
      </section>

      <section className={`frontend-puzzle layout-puzzle ${solved("layout") ? "solved" : ""}`}>
        <div className="puzzle-copy">
          <p className="eyebrow">Repair 01 · Layout clearing</p>
          <h2>Turn the card toward the trail.</h2>
          <p>The checkpoint’s content is squeezed into one horizontal line. Pull a patch from the workbench and apply it to the highlighted declaration.</p>
          <div
            className={`code-panel patch-target ${layoutChoice ? "has-patch" : ""}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => chooseLayout(event.dataTransfer.getData("text/plain"))}
          >
            <span>.checkpoint-card {"{"}</span>
            <span>&nbsp;&nbsp;display: flex;</span>
            <span className="broken-code">&nbsp;&nbsp;{layoutChoice || "flex-direction: row;"} <small>{layoutChoice ? "patch applied" : "drop patch here"}</small></span>
            <span>&nbsp;&nbsp;align-items: center;</span>
            <span>{"}"}</span>
          </div>
          <div className="patch-workbench" aria-label="CSS patch workbench">
            <small>Patch workbench · drag or tap to test</small>
            <div>
            {LAYOUT_PATCHES.map((patch) => (
              <button
                className={`${layoutChoice === patch.rule ? "is-applied" : ""} ${solved("layout") ? "locked" : ""}`}
                aria-disabled={solved("layout")}
                draggable={!solved("layout")}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", patch.rule)}
                key={patch.id}
                onClick={() => !solved("layout") && chooseLayout(patch.rule)}
              >
                <span>{patch.label}</span><code>{patch.rule}</code>
              </button>
            ))}
            </div>
          </div>
          {solved("layout") && (
            <div className="applied-repair" role="status">
              <Check />
              <span><small>Applied repair</small><code>flex-direction: column;</code></span>
            </div>
          )}
          <p className="inline-feedback" aria-live="polite">{solved("layout") && <Check />} {feedback}</p>
        </div>
        <motion.div className={`checkpoint-preview ${solved("layout") ? "fixed" : ""}`}>
          <small>Live trail preview</small>
          <div>
            <Trees />
            <h3>Frontend Forest</h3>
            <p>The next path is hidden.</p>
            <button tabIndex={-1}>Reveal Path</button>
          </div>
        </motion.div>
      </section>

      <section className={`frontend-puzzle accessibility-puzzle ${solved("accessibility") ? "solved" : ""}`}>
        <div className="puzzle-copy">
          <p className="eyebrow">Repair 02 · Accessibility crossing</p>
          <h2>Build a crossing more people can use.</h2>
          <p>A crossing should not ask people to guess. Tune the control until its purpose and state are clear through sight, keyboard, and touch.</p>
        </div>
        <div className="accessibility-workbench">
          <div className="crossing-preview">
            <small>Trail control · live preview</small>
            <button
              className={[
                a11yRepairs.includes("contrast") ? "has-contrast" : "",
                a11yRepairs.includes("focus") ? "has-focus" : "",
                a11yRepairs.includes("target") ? "has-target" : "",
              ].join(" ")}
              tabIndex={-1}
            >
              {a11yRepairs.includes("label") ? "Continue to Frontend Forest" : "→"}
            </button>
          </div>
          <div className="a11y-controls">
            {ACCESSIBILITY_REPAIRS.map((repair) => {
              const active = a11yRepairs.includes(repair.id);
              return (
                <button
                  key={repair.id}
                  className={active ? "active" : ""}
                  aria-pressed={active}
                  onClick={() => toggleAccessibility(repair.id)}
                >
                  <span>{active ? <Check /> : <Eye />}</span>
                  <strong>{repair.label}</strong>
                  <small>{repair.detail}</small>
                </button>
              );
            })}
          </div>
          <AnimatePresence>
            {solved("accessibility") && (
              <motion.p className="crossing-message" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Eye /> Good interfaces communicate clearly before anyone has to guess.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className={`frontend-puzzle component-puzzle ${solved("components") ? "solved" : ""}`}>
        <div className="puzzle-copy">
          <p className="eyebrow">Repair 03 · Component canopy</p>
          <h2>Give every component a sensible place.</h2>
          <p>Arrange the blocks into a component tree. Think about ownership: what contains the route, what belongs to a checkpoint, and what should remain visible across the whole experience.</p>
          {treeAttempts > 0 && (
            <div className="canopy-hint" aria-live="polite">
              <Sparkles />
              <span>
                {treeAttempts === 1 && "The branches rustle, but the data still has too far to travel."}
                {treeAttempts === 2 && "Hint: the map owns the checkpoints it displays."}
                {treeAttempts >= 3 && "Hint: progress should stay close to the root, while a hint belongs to its checkpoint."}
              </span>
            </div>
          )}
        </div>
        <div className="component-builder">
          <p>Select two blocks to swap them, drag them, or use the arrow controls.</p>
          <ol>
            {tree.map((block, index) => (
              <li
                key={block}
                draggable={!solved("components")}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", String(index))}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => moveBlock(Number(event.dataTransfer.getData("text/plain")), index)}
                className={`${selectedBlock === block ? "selected" : ""} depth-${Math.min(index, 3)} ${index === 4 ? "sibling" : ""}`}
              >
                <button className="block-main" onClick={() => placeSelected(index)} disabled={solved("components")}>
                  <GripVertical /><code>{block}</code>
                  <small>{index === 0 ? "canopy root" : index === 4 ? "second branch" : "nested branch"}</small>
                </button>
                <span className="block-moves">
                  <button aria-label={`Move ${block} up`} onClick={() => moveBlock(index, index - 1)} disabled={index === 0 || solved("components")}><ChevronUp /></button>
                  <button aria-label={`Move ${block} down`} onClick={() => moveBlock(index, index + 1)} disabled={index === tree.length - 1 || solved("components")}><ChevronDown /></button>
                </span>
              </li>
            ))}
          </ol>
          <button className="check-tree" onClick={checkTree} disabled={solved("components")}>
            {solved("components") ? <><Check /> Canopy connected</> : <>Check component tree <ArrowRight /></>}
          </button>
        </div>
      </section>

      <AnimatePresence>
        {allSolved && (
          <motion.section className="frontend-success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="interface-compass"><Compass /><Sparkles /></div>
            <div>
              <p className="eyebrow"><Flower2 /> Frontend Forest restored</p>
              <h2>The path is clear.</h2>
              <blockquote>Frontend work taught me that engineering is not only about making something function. It is also about making the experience clear, usable, and thoughtful.</blockquote>
              <div className="badge-earned"><span>Item earned</span><strong>Interface Compass</strong></div>
              <button onClick={() => { onComplete(); onBack(); }}>Return to base camp <ArrowRight /></button>
            </div>
            <div className="forest-bloom" aria-hidden="true"><Flower2 /><Flower2 /><Flower2 /><Sun /></div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

function solvedInitial(completed: string[], alreadyComplete: boolean, id: string) {
  return alreadyComplete || completed.includes(id);
}
