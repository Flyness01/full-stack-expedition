import { motion } from "framer-motion";

export function Hiker({ started, reducedMotion }: { started: boolean; reducedMotion: boolean }) {
  return (
    <motion.div
      className="hiker-wrap"
      animate={started && !reducedMotion ? { x: [0, 10, 22], y: [0, -3, -18] } : undefined}
      transition={{ duration: 2.4, ease: "easeInOut" }}
      aria-label="A hiker waiting at the trailhead"
      role="img"
    >
      <div className="hiker">
        <span className="hiker-head" />
        <span className="hiker-pack" />
        <span className="hiker-body" />
        <span className="hiker-leg left" />
        <span className="hiker-leg right" />
      </div>
      <span className="hiker-shadow" />
    </motion.div>
  );
}
