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

const LAYOUT_OPTIONS = [
  "display: none;",
  "flex-direction: column;",
  "overflow: hidden;",
  "position: absolute;",
] as const;

const ACCESSIBILITY_OPTIONS = [
  { id: "ghost", label: "→", className: "a11y-ghost", note: "No accessible name" },
  { id: "faint", label: "Continue", className: "a11y-faint", note: "Text disappears into the mist" },
  { id: "tiny", label: "Next", className: "a11y-tiny", note: "Too small for the crossing" },
  { id: "clear", label: "Continue to Frontend Forest", className: "a11y-clear", note: "Clear label, contrast, focus, and touch target" },
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
  const [layoutChoice, setLayoutChoice] = useState("");
  const [accessibilityChoice, setAccessibilityChoice] = useState("");
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("Inspect the broken rule and choose the repair.");

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
      setFeedback("The card settles into a clear vertical path.");
      markSolved("layout");
    } else {
      setFeedback("That rule hides or displaces the problem instead of repairing the flow.");
    }
  }

  function chooseAccessibility(id: string) {
    setAccessibilityChoice(id);
    if (id === "clear") markSolved("accessibility");
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
          <p>The checkpoint’s content is squeezed into one horizontal line. Choose the single CSS rule that restores its intended flow.</p>
          <div className="code-panel">
            <span>.checkpoint-card {"{"}</span>
            <span>&nbsp;&nbsp;display: flex;</span>
            <span className="broken-code">&nbsp;&nbsp;flex-direction: row;</span>
            <span>&nbsp;&nbsp;align-items: center;</span>
            <span>{"}"}</span>
          </div>
          <div className="code-options">
            {LAYOUT_OPTIONS.map((option) => (
              <button
                className={layoutChoice === option ? (option.includes("column") ? "correct" : "wrong") : ""}
                disabled={solved("layout")}
                key={option}
                onClick={() => chooseLayout(option)}
              >
                <code>{option}</code>{layoutChoice === option && (option.includes("column") ? <Check /> : "×")}
              </button>
            ))}
          </div>
          <p className="inline-feedback" aria-live="polite">{solved("layout") && <Check />} {feedback}</p>
        </div>
        <motion.div className={`checkpoint-preview ${solved("layout") ? "fixed" : ""}`} layout>
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
          <p>Choose the trail control with a descriptive label, readable contrast, a visible focus state, and a comfortable target.</p>
        </div>
        <div className="button-crossing">
          {ACCESSIBILITY_OPTIONS.map((option) => (
            <button
              key={option.id}
              className={`${option.className} ${accessibilityChoice === option.id ? (option.id === "clear" ? "correct" : "wrong") : ""}`}
              disabled={solved("accessibility")}
              aria-label={option.id === "ghost" ? "Unlabeled arrow option" : option.label}
              onClick={() => chooseAccessibility(option.id)}
            >
              <span>{option.label}</span><small>{option.note}</small>
              {accessibilityChoice === option.id && (option.id === "clear" ? <Check /> : "Try another crossing")}
            </button>
          ))}
          <AnimatePresence>
            {solved("accessibility") && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
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
          <p>Arrange the blocks from the root downward. The first four form one branch; the ProgressBar remains a direct child of App.</p>
          <div className="tree-legend"><span>App → TrailMap → CheckpointCard → HintButton</span><span>App → ProgressBar</span></div>
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
                  <small>{index === 0 ? "root" : index === 4 ? "direct child" : `level ${index}`}</small>
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
