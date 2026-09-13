/**
 * =========================================================================
 * PROJECT GANESHA — SACRED DEVOTIONAL AUDIO SYSTEM (js/audio.js)
 * Dedicated High-Fidelity "Deva Shree Ganesha" Audio Engine with Dynamic Mixer
 * =========================================================================
 */

export class SacredAudioEngine {
    constructor() {
        this.ctx = null;
        this.isStarted = false;
        this.isPlaying = false;
        this.isMuted = false;

        // Volume fade state
        this.volumeFadeInterval = null;

        // Dedicated Sacred Song: Deva Shree Ganesha
        this.track = {
            id: 'deva_shree_ganesha',
            name: 'Deva Shree Ganesha',
            artist: 'Ajay-Atul',
            src: 'assets/audio/deva_shree_ganesha.mp3'
        };

        this.audioEl = null;

        // Calibrated Safety Volume Levels (Subtle devotional background atmosphere, never loud)
        this.LEVELS = {
            MASTER_CEILING: 0.85,
            MUSIC_BASE: 0.17,      // 17% subtle background ceiling
            BELLS_BASE: 0.045     // 4.5% soft crystal chime
        };

        this.setupAudioElement();
        this.initAutoListeners();
    }

    /**
     * Setup HTML5 Audio element for direct, reliable hardware playback across all browsers & CDNs
     */
    setupAudioElement() {
        if (!this.audioEl) {
            this.audioEl = new Audio();
            this.audioEl.loop = true;
            this.audioEl.preload = 'auto';
            // Note: crossOrigin is intentionally omitted for local assets to avoid CORS issues on Vercel/CDNs
            this.audioEl.src = this.track.src;
            this.audioEl.volume = this.LEVELS.MUSIC_BASE;

            this.audioEl.addEventListener('play', () => {
                this.isPlaying = true;
                this.isStarted = true;
                this.updateSoundBadge();
            });

            this.audioEl.addEventListener('pause', () => {
                this.isPlaying = false;
                this.updateSoundBadge();
            });

            this.audioEl.addEventListener('ended', () => {
                this.isPlaying = false;
                this.updateSoundBadge();
            });

            this.audioEl.addEventListener('error', (e) => {
                console.warn("Audio element playback note:", e);
            });
        }
    }

    /**
     * Ensure Web Audio context is initialized and resumed for harmonic temple bells
     */
    ensureAudioContext() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                try {
                    this.ctx = new AudioContextClass();
                } catch (e) {
                    console.warn("AudioContext note:", e);
                }
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    }

    /**
     * Seamless automatic playback: attempts immediate autoplay and sets up passive interaction fallback
     */
    initAutoListeners() {
        const unlockAndPlay = async () => {
            try {
                await this.play();
                removeListeners();
            } catch (e) {
                // Keep listeners until first successful user interaction
            }
        };

        const events = ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'];
        const removeListeners = () => {
            events.forEach(evt => window.removeEventListener(evt, unlockAndPlay));
        };

        events.forEach(evt => window.addEventListener(evt, unlockAndPlay, { passive: true }));

        // Immediate automatic load attempt
        setTimeout(() => {
            this.play().then(() => {
                removeListeners();
            }).catch(() => {
                // Browser Autoplay Policy blocked immediate playback; waiting for earliest user interaction
                this.updateSoundBadge();
            });
        }, 150);
    }

    /**
     * Start / Resume audio playback
     */
    async play() {
        this.setupAudioElement();
        this.ensureAudioContext();

        if (this.isMuted) {
            this.isMuted = false;
            this.audioEl.muted = false;
        }

        try {
            const promise = this.audioEl.play();
            if (promise !== undefined) {
                await promise;
            }
            this.isPlaying = true;
            this.isStarted = true;
            this.updateSoundBadge();
            return true;
        } catch (err) {
            this.isPlaying = false;
            this.updateSoundBadge();
            throw err;
        }
    }

    /**
     * Backwards-compatible init entry point
     */
    init() {
        return this.play().catch(() => {});
    }

    /**
     * Toggle sound mute/unmute
     */
    toggleMute() {
        // If not playing yet, clicking toggles music on
        if (!this.isPlaying && !this.isStarted) {
            this.play().catch(() => {});
            return;
        }

        this.isMuted = !this.isMuted;
        if (this.audioEl) {
            this.audioEl.muted = this.isMuted;
        }
        this.updateSoundBadge();
    }

    /**
     * Dynamic Audio Ducking during sacred intimate moments
     */
    duckMusic(targetLevel, fadeMs = 1800) {
        const clampedTarget = Math.max(0.005, Math.min(this.LEVELS.MUSIC_BASE, targetLevel));
        this.fadeVolume(clampedTarget, fadeMs);
    }

    duckMaster(targetLevel, fadeMs = 2500) {
        const clampedTarget = Math.max(0.002, Math.min(this.LEVELS.MASTER_CEILING, targetLevel));
        this.fadeVolume(clampedTarget, fadeMs);
    }

    fadeVolume(targetVolume, fadeMs = 1800) {
        if (!this.audioEl) return;
        if (this.volumeFadeInterval) {
            clearInterval(this.volumeFadeInterval);
            this.volumeFadeInterval = null;
        }

        const startVol = this.audioEl.volume;
        const startTime = performance.now();
        const duration = Math.max(100, fadeMs);

        this.volumeFadeInterval = setInterval(() => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(1.0, elapsed / duration);

            // Smooth cosine easing for gentle organic volume transition
            const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI);
            const newVol = startVol + (targetVolume - startVol) * ease;

            if (this.audioEl) {
                this.audioEl.volume = Math.max(0, Math.min(1, newVol));
            }

            if (progress >= 1.0) {
                clearInterval(this.volumeFadeInterval);
                this.volumeFadeInterval = null;
            }
        }, 25);
    }

    /**
     * Soft Harmonic Temple Bell (marking sacred visual reveals)
     */
    playTempleBell(freq = 554.37, duration = 4.0, volume = 0.28) {
        if (this.isMuted) return;
        this.ensureAudioContext();
        if (!this.ctx) return;

        try {
            if (this.ctx.state === 'suspended') {
                this.ctx.resume().catch(() => {});
            }

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const oscHarmonic = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = 'sine';
            oscHarmonic.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            oscHarmonic.frequency.setValueAtTime(freq * 2.76, now);

            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(freq * 1.5, now);
            filter.Q.value = 5.0;

            const safeVol = Math.min(volume, 0.4) * (this.LEVELS.BELLS_BASE / 0.045);
            gain.gain.setValueAtTime(safeVol, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(gain);
            oscHarmonic.connect(gain);
            gain.connect(filter);
            filter.connect(this.ctx.destination);

            osc.start(now);
            oscHarmonic.start(now);
            osc.stop(now + duration + 0.1);
            oscHarmonic.stop(now + duration + 0.1);
        } catch (e) {
            // Non-critical bell chime catch
        }
    }

    updateSoundBadge() {
        const badge = document.getElementById('sound-badge');
        if (!badge) return;

        const label = badge.querySelector('.sound-label');

        badge.classList.remove('playing', 'muted', 'awaiting-interaction');

        if (this.isMuted) {
            badge.classList.add('muted');
            badge.title = 'Sound Muted — Click to Unmute';
            if (label) label.textContent = 'Muted';
        } else if (this.isPlaying) {
            badge.classList.add('playing');
            badge.title = 'Deva Shree Ganesha Playing — Click to Mute';
            if (label) label.textContent = 'Deva Shree Ganesha';
        } else {
            badge.classList.add('awaiting-interaction');
            badge.title = 'Click anywhere or tap here to play sacred music';
            if (label) label.textContent = 'Tap for Music';
        }
    }
}
