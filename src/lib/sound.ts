// Subtle Web Audio API tactile feedback (zero external audio files needed)
export function playChime(type: "fix" | "success" | "click" = "fix") {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === "fix") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } else if (type === "success") {
      // 3-note celebratory chord for 98% Audit-Ready
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.36);
      });
    }
  } catch (e) {
    // Ignore audio errors if audio context blocked by browser policy
  }
}

