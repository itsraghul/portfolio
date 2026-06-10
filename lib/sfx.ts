/* Tiny WebAudio synth — ported from the design prototype's sound.js.
   Every method no-ops on the server and when muted. */

const MUTE_KEY = "rs-sound-muted";

type ToneOptions = {
    freq?: number;
    dur?: number;
    type?: OscillatorType;
    vol?: number;
    slide?: number;
    delay?: number;
};

let ctx: AudioContext | null = null;
let muted: boolean | null = null;
const muteListeners = new Set<(muted: boolean) => void>();

// localStorage getters throw SecurityError when site data is blocked —
// degrade to in-memory state instead of crashing the tree
function readMuteFlag(): boolean {
    try {
        return localStorage.getItem(MUTE_KEY) === "1";
    } catch {
        return false;
    }
}

function writeMuteFlag(value: boolean) {
    try {
        localStorage.setItem(MUTE_KEY, value ? "1" : "0");
    } catch {
        /* in-memory only */
    }
}

function isMuted(): boolean {
    if (typeof window === "undefined") return true;
    if (muted === null) muted = readMuteFlag();
    return muted;
}

function ac(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!ctx) {
        if (!window.AudioContext) return null;
        ctx = new AudioContext();
    }
    if (ctx.state === "suspended") {
        // resume() is async — don't schedule against a frozen clock
        // (queued oscillators would all fire at once on the first real gesture)
        void ctx.resume();
        return null;
    }
    return ctx;
}

function tone({ freq = 440, dur = 0.08, type = "square", vol = 0.04, slide = 0, delay = 0 }: ToneOptions = {}) {
    if (isMuted()) return;
    try {
        const c = ac();
        if (!c) return;
        const t0 = c.currentTime + delay;
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, t0);
        if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t0 + dur);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g).connect(c.destination);
        o.start(t0);
        o.stop(t0 + dur + 0.05);
    } catch {
        /* audio is a nicety — never let it throw */
    }
}

export const sfx = {
    hover: () => tone({ freq: 740, dur: 0.035, type: "sine", vol: 0.012 }),
    blip: () => tone({ freq: 520, dur: 0.06, vol: 0.028 }),
    confirm: () => tone({ freq: 587, dur: 0.1, vol: 0.03, slide: 300 }),
    back: () => tone({ freq: 440, dur: 0.08, vol: 0.025, slide: -160 }),
    coin: () => {
        tone({ freq: 988, dur: 0.07, vol: 0.032 });
        tone({ freq: 1319, dur: 0.2, vol: 0.032, delay: 0.07 });
    },
    hit: () => tone({ freq: 150, dur: 0.14, type: "sawtooth", vol: 0.05, slide: -80 }),
    slash: () => tone({ freq: 900, dur: 0.1, type: "sawtooth", vol: 0.03, slide: -700 }),
    heal: () => [523, 659, 784].forEach((f, i) => tone({ freq: f, dur: 0.12, type: "sine", vol: 0.035, delay: i * 0.09 })),
    success: () => [523, 659, 784, 1047].forEach((f, i) => tone({ freq: f, dur: 0.13, type: "triangle", vol: 0.04, delay: i * 0.09 })),
    fanfare: () => [392, 392, 392, 523, 659, 784].forEach((f, i) =>
        tone({ freq: f, dur: i < 3 ? 0.09 : 0.22, vol: 0.035, delay: i * 0.11 })),
    error: () => tone({ freq: 220, dur: 0.16, type: "sawtooth", vol: 0.04, slide: -110 }),
    type: () => tone({ freq: 1100 + Math.random() * 300, dur: 0.015, vol: 0.006 }),
    wave: () => tone({ freq: 196, dur: 0.5, type: "sine", vol: 0.02, slide: 60 }),
    warp: () => tone({ freq: 200, dur: 0.35, type: "sawtooth", vol: 0.03, slide: 900 }),

    get muted(): boolean {
        return isMuted();
    },
    toggleMuted(): boolean {
        muted = !isMuted();
        if (typeof window !== "undefined") writeMuteFlag(muted);
        muteListeners.forEach((fn) => fn(muted as boolean));
        return muted;
    },
    onMuteChange(fn: (muted: boolean) => void): () => void {
        muteListeners.add(fn);
        return () => muteListeners.delete(fn);
    },
};
