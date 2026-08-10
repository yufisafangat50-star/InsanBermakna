export type SFXType = 'typewriter' | 'unfold';
class AudioController {
  private isPlaying = false;
  private isMuted = false;
  private isInitialized = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private sfxTypewriter: HTMLAudioElement | null = null;
  private sfxUnfold: HTMLAudioElement | null = null;
  private fadeInterval: number | null = null;
  private targetVolume = 0.5; 
  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('insanbermakna:playMusic', () => this.play());
      window.addEventListener('insanbermakna:fadeOutMusic', () => this.fadeOut());
    }
  }
  init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;
    this.bgmAudio = new Audio('/audio/music.mp3');
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = 0; 
    this.bgmAudio.preload = 'auto'; 
    this.bgmAudio.addEventListener('ended', () => {
      if (this.isPlaying && this.bgmAudio) {
        this.bgmAudio.currentTime = 0;
        this.bgmAudio.play().catch(() => {});
      }
    });
    this.sfxTypewriter = new Audio('/audio/sfx-typewriter-typing.mp3');
    this.sfxTypewriter.preload = 'auto';
    this.sfxTypewriter.loop = true;
    this.sfxTypewriter.volume = this.targetVolume * 0.8; 
    this.sfxUnfold = new Audio('/audio/sfx-paper-unfold.mp3');
    this.sfxUnfold.preload = 'auto';
    this.sfxUnfold.volume = this.targetVolume * 0.4;
  }
  unlock() {
    if (!this.isInitialized) return;
    const unlockAudio = (audio: HTMLAudioElement | null) => {
      if (!audio) return;
      audio.muted = true;
      audio.play().then(() => {
        audio.pause();
        audio.muted = this.isMuted;
      }).catch(() => {});
    };
    unlockAudio(this.bgmAudio);
    unlockAudio(this.sfxTypewriter);
    unlockAudio(this.sfxUnfold);
  }
  play() {
    if (this.isPlaying || !this.bgmAudio) return;
    this.isPlaying = true;
    this.bgmAudio.play().catch(e => console.warn('BGM play blocked:', e));
    this.fadeIn();
    window.dispatchEvent(new CustomEvent('insanbermakna:audioStarted'));
  }
  fadeIn(duration = 1500) {
    if (!this.bgmAudio) return;
    if (this.fadeInterval) window.clearInterval(this.fadeInterval);
    const steps = 30;
    const stepTime = duration / steps;
    const volStep = this.targetVolume / steps;
    this.fadeInterval = window.setInterval(() => {
      if (!this.bgmAudio) return;
      if (this.bgmAudio.volume < this.targetVolume) {
        this.bgmAudio.volume = Math.min(this.targetVolume, this.bgmAudio.volume + volStep);
      } else {
        if (this.fadeInterval) window.clearInterval(this.fadeInterval);
      }
    }, stepTime);
  }
  fadeOut(duration = 2500) {
    if (!this.isPlaying || !this.bgmAudio) return;
    if (this.fadeInterval) window.clearInterval(this.fadeInterval);
    const steps = 30;
    const stepTime = duration / steps;
    const volStep = this.bgmAudio.volume / steps;
    this.fadeInterval = window.setInterval(() => {
      if (!this.bgmAudio) return;
      if (this.bgmAudio.volume > 0) {
        this.bgmAudio.volume = Math.max(0, this.bgmAudio.volume - volStep);
      } else {
        this.bgmAudio.pause();
        this.isPlaying = false;
        if (this.fadeInterval) window.clearInterval(this.fadeInterval);
      }
    }, stepTime);
  }
  playSFX(type: SFXType) {
    if (this.isMuted) return;
    let audio: HTMLAudioElement | null = null;
    if (type === 'typewriter') audio = this.sfxTypewriter;
    if (type === 'unfold') audio = this.sfxUnfold;
    if (audio) {
      if (type !== 'typewriter') {
        audio.currentTime = 0;
      }
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          if (type === 'typewriter' && audio.currentTime < 0.5) {
            audio.currentTime = 0.5;
          }
        }).catch(e => console.warn(`SFX ${type} play blocked:`, e));
      }
    }
  }
  stopSFX(type: SFXType) {
    let audio: HTMLAudioElement | null = null;
    if (type === 'typewriter') audio = this.sfxTypewriter;
    if (type === 'unfold') audio = this.sfxUnfold;
    if (audio) {
      audio.pause();
      if (type !== 'typewriter') {
        audio.currentTime = 0;
      }
    }
  }
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgmAudio) this.bgmAudio.muted = this.isMuted;
    if (this.sfxTypewriter) this.sfxTypewriter.muted = this.isMuted;
    if (this.sfxUnfold) this.sfxUnfold.muted = this.isMuted;
    window.dispatchEvent(new CustomEvent('insanbermakna:muteToggle', { detail: { isMuted: this.isMuted } }));
    return this.isMuted;
  }
  getIsMuted() {
    return this.isMuted;
  }
}
export const audioController = new AudioController();
