"use client";

import { useEffect, useRef } from "react";

export function useAmbientAudio(enabled: boolean) {
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!enabled) {
      contextRef.current?.close();
      contextRef.current = null;
      return;
    }

    const AudioContextClass = window.AudioContext;
    const context = new AudioContextClass();
    const master = context.createGain();
    const breeze = context.createOscillator();
    const breezeGain = context.createGain();
    const filter = context.createBiquadFilter();

    breeze.type = "sine";
    breeze.frequency.value = 118;
    breezeGain.gain.value = 0.012;
    filter.type = "lowpass";
    filter.frequency.value = 380;
    master.gain.value = 0.35;

    breeze.connect(filter);
    filter.connect(breezeGain);
    breezeGain.connect(master);
    master.connect(context.destination);
    breeze.start();
    contextRef.current = context;

    return () => {
      breeze.stop();
      context.close();
      contextRef.current = null;
    };
  }, [enabled]);
}
