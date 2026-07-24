import { Map, RotateCcw, Volume2, VolumeX, Wind } from "lucide-react";

type Props = {
  soundEnabled: boolean;
  reducedMotion: boolean;
  onSound: () => void;
  onMotion: () => void;
  onMap: () => void;
  onRestart: () => void;
  started: boolean;
};

export function TopControls(props: Props) {
  return (
    <nav className="top-controls" aria-label="Expedition controls">
      <button onClick={props.onSound} aria-pressed={props.soundEnabled} title="Toggle sound">
        {props.soundEnabled ? <Volume2 /> : <VolumeX />}<span>Sound</span>
      </button>
      <button onClick={props.onMotion} aria-pressed={props.reducedMotion} title="Toggle reduced motion">
        <Wind /><span>{props.reducedMotion ? "Motion off" : "Reduce motion"}</span>
      </button>
      {props.started && <button onClick={props.onMap}><Map /><span>Trail map</span></button>}
      <button onClick={props.onRestart}><RotateCcw /><span>Restart</span></button>
    </nav>
  );
}
