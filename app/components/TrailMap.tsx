import { Lock, MapPin, X } from "lucide-react";
import { TRAIL_STAGES } from "../data/expedition";

export function TrailMap({ open, onClose, completedStages = [], currentStage = "trailhead", elevation = 1240 }: {
  open: boolean;
  onClose: () => void;
  completedStages?: string[];
  currentStage?: string;
  elevation?: number;
}) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="trail-map" role="dialog" aria-modal="true" aria-labelledby="trail-map-title">
        <header>
          <div><p className="eyebrow">Expedition route</p><h2 id="trail-map-title">The trail ahead</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close trail map"><X /></button>
        </header>
        <div className="map-paper">
          <div className="map-route" />
          {TRAIL_STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const current = stage.id === currentStage;
            const completed = completedStages.includes(stage.id);
            return (
              <article className={`map-stop ${current ? "current" : completed ? "completed" : "locked"}`} key={stage.id}>
                <span className="map-marker">{current || completed ? <MapPin /> : <Lock />}</span>
                <Icon />
                <div><strong>{stage.title}</strong><small>{current ? "Current checkpoint" : completed ? "Trail completed" : `${stage.elevation.toLocaleString()} ft · Locked`}</small></div>
              </article>
            );
          })}
        </div>
        <footer><span><MapPin /> Current: {TRAIL_STAGES.find((stage) => stage.id === currentStage)?.title}</span><span>{elevation.toLocaleString()} / 8,000 ft</span></footer>
      </section>
    </div>
  );
}
