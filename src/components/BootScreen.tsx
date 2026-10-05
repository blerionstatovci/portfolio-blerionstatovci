import { motion } from "framer-motion";

export function BootScreen({ onSkip, reducedMotion = false }: { onSkip: () => void; reducedMotion?: boolean }) {
  return (
    <motion.div
      className={`boot-screen ${reducedMotion ? "reduce-motion" : ""}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="button"
      tabIndex={0}
      aria-label="BlerionOS is starting. Click or press any key to skip."
      onClick={onSkip}
      onKeyDown={(event) => {
        if (event.key !== "Tab") onSkip();
      }}
    >
      <div className="boot-mark">BS</div>
      <p>BlerionOS</p>
      <span>Starting personal workspace…</span>
      <div className="boot-progress"><i /></div>
      <small>Click or press any key to skip</small>
    </motion.div>
  );
}
