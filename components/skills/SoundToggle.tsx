"use client";

import { useState, useRef, useCallback } from "react";
import { Volume2Icon, VolumeXIcon } from "lucide-react";

// Place a royalty-free ambient audio file at /public/audio/space-ambient.mp3
// Suggested source: https://freesound.org (CC0 license)
const AUDIO_SRC = "/audio/space-ambient.mp3";

export default function SoundToggle() {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const initAudio = useCallback(() => {
    if (audioRef.current) return; // already created

    try {
      const audio = new Audio(AUDIO_SRC);
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;

      const ctx = new AudioContext();
      ctxRef.current = ctx;

      const source = ctx.createMediaElementSource(audio);
      sourceRef.current = source;

      const gain = ctx.createGain();
      gain.gain.value = 0;
      gainRef.current = gain;

      source.connect(gain);
      gain.connect(ctx.destination);
    } catch {
      setSupported(false);
    }
  }, []);

  const toggle = useCallback(async () => {
    initAudio();
    if (!audioRef.current || !gainRef.current || !ctxRef.current) return;

    if (!playing) {
      if (ctxRef.current.state === "suspended") {
        await ctxRef.current.resume();
      }
      audioRef.current.play().catch(() => setSupported(false));
      gainRef.current.gain.cancelScheduledValues(ctxRef.current.currentTime);
      gainRef.current.gain.setValueAtTime(0, ctxRef.current.currentTime);
      gainRef.current.gain.linearRampToValueAtTime(0.28, ctxRef.current.currentTime + 1.5);
      setPlaying(true);
    } else {
      const now = ctxRef.current.currentTime;
      gainRef.current.gain.cancelScheduledValues(now);
      gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, now);
      gainRef.current.gain.linearRampToValueAtTime(0, now + 0.8);
      setTimeout(() => {
        audioRef.current?.pause();
      }, 850);
      setPlaying(false);
    }
  }, [playing, initAudio]);

  if (!supported) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
      title={playing ? "Mute" : "Ambient sound"}
      className="absolute bottom-4 left-4 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/50 hover:text-white/80 hover:bg-black/50 transition-all duration-200"
    >
      {playing ? (
        <Volume2Icon className="w-4 h-4" />
      ) : (
        <VolumeXIcon className="w-4 h-4" />
      )}
    </button>
  );
}
