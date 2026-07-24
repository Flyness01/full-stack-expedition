"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Flame,
  GripVertical,
  KeyRound,
  Lamp,
  LockKeyhole,
  Network,
  Search,
  Sparkles,
  Terminal,
  Unplug,
} from "lucide-react";
import { useMemo, useState } from "react";

const FLOW_SOLUTION = ["User Action", "Frontend", "API", "Authorization", "Business Logic", "Database", "Response"];
const INITIAL_FLOW = ["Database", "User Action", "Business Logic", "Response", "API", "Frontend", "Authorization"];
const TRACE_POINTS = [
  { id: "receive", time: "10:14:02", label: "Request received", status: "confirmed" },
  { id: "authorize", time: "10:14:03", label: "User authorized", status: "confirmed" },
  { id: "database", time: "10:14:04", label: "Database query completed", status: "confirmed" },
  { id: "response", time: "10:14:05", label: "Response construction", status: "500 returned" },
] as const;

export function BackendCaverns({
  initialCompleted,
  initialFlow,
  alreadyComplete,
  reducedMotion,
  onBack,
  onSave,
  onComplete,
}: {
  initialCompleted: string[];
  initialFlow: string[];
  alreadyComplete: boolean;
  reducedMotion: boolean;
  onBack: () => void;
  onSave: (completed: string[], flow: string[]) => void;
  onComplete: () => void;
}) {
  const fullCompletion = ["flow", "permission", "debug"];
  const [completed, setCompleted] = useState<string[]>(alreadyComplete ? fullCompletion : initialCompleted);
  const [flow, setFlow] = useState<string[]>(initialFlow.length === FLOW_SOLUTION.length ? initialFlow : INITIAL_FLOW);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [flowAttempts, setFlowAttempts] = useState(0);
  const [protectedResult, setProtectedResult] = useState<"true" | "false">(isInitiallySolved(initialCompleted, alreadyComplete, "permission") ? "false" : "true");
  const [testsRun, setTestsRun] = useState(isInitiallySolved(initialCompleted, alreadyComplete, "permission"));
  const [beacon, setBeacon] = useState<string>(isInitiallySolved(initialCompleted, alreadyComplete, "debug") ? "response" : "");
  const [traceAttempts, setTraceAttempts] = useState(0);

  const solved = (id: string) => completed.includes(id);
  const allSolved = fullCompletion.every((id) => completed.includes(id)) || alreadyComplete;
  const cavernPower = useMemo(() => Math.round((completed.length / 3) * 100), [completed.length]);

  function markSolved(id: string, nextFlow = flow) {
    const next = Array.from(new Set([...completed, id]));
    setCompleted(next);
    onSave(next, nextFlow);
  }

  function moveFlow(from: number, to: number) {
    if (to < 0 || to >= flow.length || solved("flow")) return;
    const next = [...flow];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setFlow(next);
    onSave(completed, next);
  }

  function swapFlow(index: number) {
    if (solved("flow")) return;
    if (!selectedFlow) {
      setSelectedFlow(flow[index]);
      return;
    }
    const from = flow.indexOf(selectedFlow);
    const next = [...flow];
    [next[from], next[index]] = [next[index], next[from]];
    setFlow(next);
    setSelectedFlow(null);
    onSave(completed, next);
  }

  function sendPacket() {
    if (FLOW_SOLUTION.every((item, index) => flow[index] === item)) markSolved("flow", flow);
    else setFlowAttempts((attempts) => attempts + 1);
  }

  function runPermissionTests() {
    setTestsRun(true);
    if (protectedResult === "false") markSolved("permission");
  }

  function investigate(id: string) {
    if (solved("debug")) return;
    setBeacon(id);
    if (id === "response") markSolved("debug");
    else setTraceAttempts((attempts) => attempts + 1);
  }

  return (
    <motion.main
      className={`backend-stage ${allSolved ? "cavern-open" : ""}`}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <nav className="stage-nav">
        <button onClick={onBack}><ArrowLeft /> Base camp</button>
        <div><span>Checkpoint 05</span><strong>4,080 ft</strong></div>
      </nav>

      <header className="backend-hero">
        <div>
          <p className="eyebrow"><Network /> Phase 5 · Follow the hidden flow</p>
          <h1>Backend<br /><em>Caverns</em></h1>
          <p>Beneath every visible trail is a system of requests, permissions, decisions, and data. Follow the glow deeper—and repair what the surface cannot show.</p>
        </div>
        <div className="cave-mouth" aria-hidden="true">
          <i /><i /><i /><i /><i />
          <span className="request-stream" />
          <span className="cave-flame"><Flame /></span>
        </div>
      </header>

      <section className="cavern-power" aria-label={`Cavern systems ${cavernPower}% restored`}>
        <div><span>System integrity</span><strong>{cavernPower}%</strong></div>
        <div className="power-track"><motion.span animate={{ width: `${cavernPower}%` }} /></div>
        <div>
          {["Request route", "Permission guard", "Error trace"].map((label, index) => (
            <span className={completed.length > index ? "powered" : ""} key={label}>
              {completed.length > index ? <Check /> : <CircleDot />} {label}
            </span>
          ))}
        </div>
      </section>

      <section className={`backend-puzzle flow-puzzle ${solved("flow") ? "solved" : ""}`}>
        <div className="backend-copy">
          <p className="eyebrow">System 01 · Request river</p>
          <h2>Route the packet through the cavern.</h2>
          <p>The request nodes have broken loose. Arrange them in the order a fictional action would travel from a person’s click to a returned response.</p>
          {flowAttempts > 0 && (
            <div className="cavern-hint">
              <Sparkles />
              <span>{flowAttempts === 1 ? "The packet reaches a chamber before its entrance exists." : "Trace outward from the user. Permission belongs before protected logic, and data must be gathered before the response returns."}</span>
            </div>
          )}
        </div>
        <div className="flow-console">
          <header><span><Terminal /> request-route.trace</span><small>{solved("flow") ? "route stable" : "route interrupted"}</small></header>
          <ol>
            {flow.map((node, index) => (
              <li
                key={node}
                draggable={!solved("flow")}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", String(index))}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => moveFlow(Number(event.dataTransfer.getData("text/plain")), index)}
                className={selectedFlow === node ? "selected" : ""}
              >
                <button className="flow-node" onClick={() => swapFlow(index)} disabled={solved("flow")}>
                  <span>{String(index + 1).padStart(2, "0")}</span><GripVertical /><code>{node}</code>
                </button>
                <span className="flow-moves">
                  <button aria-label={`Move ${node} up`} onClick={() => moveFlow(index, index - 1)} disabled={index === 0 || solved("flow")}><ChevronUp /></button>
                  <button aria-label={`Move ${node} down`} onClick={() => moveFlow(index, index + 1)} disabled={index === flow.length - 1 || solved("flow")}><ChevronDown /></button>
                </span>
              </li>
            ))}
          </ol>
          <button className="send-packet" onClick={sendPacket} disabled={solved("flow")}>
            {solved("flow") ? <><Check /> Packet reached the exit</> : <>Send test packet <ArrowRight /></>}
          </button>
          {solved("flow") && <motion.span className="glowing-packet" initial={{ left: "5%" }} animate={{ left: "92%" }} transition={{ duration: reducedMotion ? 0 : 2.6 }} />}
        </div>
      </section>

      <section className={`backend-puzzle permission-puzzle ${solved("permission") ? "solved" : ""}`}>
        <div className="backend-copy">
          <p className="eyebrow">System 02 · Permission seal</p>
          <h2>Repair the guard before opening the gate.</h2>
          <p>A fictional archive tool should never allow protected channels through. Inspect the highlighted return value, patch it, then run the test lanterns.</p>
          <div className="fictional-note"><LockKeyhole /> Generalized example · no company systems or code</div>
        </div>
        <div className="permission-console">
          <header><span><KeyRound /> permissions.ts</span><small>fictional sandbox</small></header>
          <div className="permission-code">
            <span>function canArchiveChannel(user, channel) {"{"}</span>
            <span>&nbsp;&nbsp;if (channel.isProtected) {"{"}</span>
            <button
              className={protectedResult === "false" ? "patched" : ""}
              onClick={() => { if (!solved("permission")) { setProtectedResult(protectedResult === "true" ? "false" : "true"); setTestsRun(false); } }}
              aria-label={`Protected channels currently return ${protectedResult}. Click to toggle.`}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;return <strong>{protectedResult}</strong>;
              <small>tap value to patch</small>
            </button>
            <span>&nbsp;&nbsp;{"}"}</span>
            <span>&nbsp;&nbsp;return user.isAdmin;</span>
            <span>{"}"}</span>
          </div>
          <div className="test-lanterns">
            <article className={testsRun ? "pass" : ""}><span>{testsRun ? <Check /> : <Flame />}</span><div><strong>Admin · open channel</strong><small>Expected: allow</small></div></article>
            <article className={testsRun && protectedResult === "false" ? "pass" : testsRun ? "fail" : ""}><span>{testsRun && protectedResult === "false" ? <Check /> : <Flame />}</span><div><strong>Admin · protected channel</strong><small>Expected: deny</small></div></article>
            <article className={testsRun ? "pass" : ""}><span>{testsRun ? <Check /> : <Flame />}</span><div><strong>Member · open channel</strong><small>Expected: deny</small></div></article>
          </div>
          <button className="run-tests" onClick={runPermissionTests} disabled={solved("permission")}>
            {solved("permission") ? <><Check /> Guard sealed</> : <><Flame /> Run test lanterns</>}
          </button>
        </div>
      </section>

      <section className={`backend-puzzle trace-puzzle ${solved("debug") ? "solved" : ""}`}>
        <div className="backend-copy">
          <p className="eyebrow">System 03 · Echo trace</p>
          <h2>Investigate from evidence, not instinct.</h2>
          <p>Each confirmed echo narrows the search. Place the debugging beacon at the earliest stage that is not proven healthy by the log.</p>
          {traceAttempts > 0 && (
            <div className="cavern-hint"><Search /><span>{traceAttempts === 1 ? "That chamber already reported success. Move downstream from the last confirmed event." : "The database completed. Investigate what transforms its result into the outgoing response."}</span></div>
          )}
        </div>
        <div className="trace-console">
          <header><span><Terminal /> expedition-api.log</span><small>status: degraded</small></header>
          <div className="trace-line" aria-hidden="true" />
          {TRACE_POINTS.map((point, index) => (
            <button
              key={point.id}
              className={`${beacon === point.id ? "beacon" : ""} ${point.id === "response" && solved("debug") ? "located" : ""}`}
              onClick={() => investigate(point.id)}
              disabled={solved("debug")}
            >
              <span className="trace-marker">{beacon === point.id ? <Search /> : index + 1}</span>
              <code>[{point.time}]</code>
              <strong>{point.label}</strong>
              <small>{point.status}</small>
            </button>
          ))}
          <AnimatePresence>
            {solved("debug") && (
              <motion.div className="trace-finding" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Check /><span><strong>Boundary isolated</strong>The failure appears after the successful query, in business logic or response construction.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {allSolved && (
          <motion.section className="backend-success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="lantern-reward"><Lamp /><Sparkles /></div>
            <div>
              <p className="eyebrow"><Unplug /> Cavern exit open</p>
              <h2>The hidden path is illuminated.</h2>
              <blockquote>Backend work taught me to look beyond what appears on the screen. Every visible experience depends on systems, decisions, and logic working together underneath.</blockquote>
              <div className="badge-earned"><span>Item earned</span><strong>Full-Stack Lantern</strong></div>
              <button onClick={() => { onComplete(); onBack(); }}>Return to base camp <ArrowRight /></button>
            </div>
            <div className="crystal-glow" aria-hidden="true"><Sparkles /><Sparkles /><Sparkles /></div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

function isInitiallySolved(completed: string[], alreadyComplete: boolean, id: string) {
  return alreadyComplete || completed.includes(id);
}
