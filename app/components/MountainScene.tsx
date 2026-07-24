type MountainSceneProps = {
  started: boolean;
  reducedMotion: boolean;
};

export function MountainScene({ started, reducedMotion }: MountainSceneProps) {
  return (
    <div className={`mountain-scene ${started ? "is-started" : ""} ${reducedMotion ? "reduce-motion" : ""}`} aria-hidden="true">
      <div className="sky-glow" />
      <div className="stars">
        {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
      </div>
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <div className="cloud cloud-three" />
      <div className="range range-far" />
      <div className="range range-mid" />
      <div className="range range-near" />
      <div className="mist mist-one" />
      <div className="mist mist-two" />
      <div className="pine-line">
        {Array.from({ length: 26 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
      </div>
      <div className="trail" />
      <div className="summit-light"><span /></div>
    </div>
  );
}
