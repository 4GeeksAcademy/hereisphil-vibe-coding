import beginTaskSound from "../assets/audio/begin-task.mp3";
import breakStartSound from "../assets/audio/break-start.mp3";
import clockTickingSound from "../assets/audio/clock-ticking.ogg";

const MUTE_KEY = "autopomo:muted";

class AudioManager {
  private muted: boolean;
  private tickingAudio: HTMLAudioElement | null = null;

  constructor() {
    this.muted = localStorage.getItem(MUTE_KEY) === "true";
  }

  isMuted(): boolean {
    return this.muted;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    localStorage.setItem(MUTE_KEY, String(muted));
    if (muted) {
      this.stopTicking();
    }
  }

  playBeginTask() {
    if (this.muted) return;
    const audio = new Audio(beginTaskSound);
    audio.play().catch((e) => console.log("playBeginTask", e));
  }

  playBreakStart() {
    if (this.muted) return;
    const audio = new Audio(breakStartSound);
    audio.play().catch((e) => console.log("playBreakStart", e));
  }

  startTicking() {
    if (this.muted) return;
    if (this.tickingAudio) return;
    this.tickingAudio = new Audio(clockTickingSound);
    this.tickingAudio.loop = true;
    this.tickingAudio.play().catch((e) => console.log("startTicking", e));
  }

  stopTicking() {
    if (!this.tickingAudio) return;
    this.tickingAudio.pause();
    this.tickingAudio.currentTime = 0;
    this.tickingAudio = null;
  }
}

export const audioManager = new AudioManager();
