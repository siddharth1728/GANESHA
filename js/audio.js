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
        this.isMuted = false;

        // Mixer Channel Nodes
        this.masterCompressor = null;
        this.masterGain = null;
        this.musicGain = null;
        this.bellsGain = null;

        // Dedicated Sacred Song: Deva Shree Ganesha
        this.track = {
            id: 'deva_shree_ganesha',
            name: 'Deva Shree Ganesha',
            artist: 'Ajay-Atul',
            src: 'assets/audio/deva_shree_ganesha.mp3'
        };

        this.audioEl = null;
        this.mediaSourceNode = null;

        // Calibrated Safety Volume Levels (Subtle devotional background atmosphere, never loud)
        this.LEVELS = {
            MASTER_CEILING: 0.85,
            MUSIC_BASE: 0.17,      // 17% subtle background ceiling
            BELLS_BASE: 0.045     // 4.5% soft crystal chime
        };

        this.initAutoListeners();
    }

    /**
     * Seamless automatic playback: ensures music starts entirely on its own
     */
    initAutoListeners() {
        const tryAutoPlay = () => {
            this.init();
            window.removeEventListener('pointerdown', tryAutoPlay);
            window.removeEventListener('touchstart', tryAutoPlay);
            window.removeEventListener('scroll', tryAutoPlay);
            window.removeEventListener('keydown', tryAutoPlay);
            window.removeEventListener('click', tryAutoPlay);
        };

        window.addEventListener('pointerdown', tryAutoPlay, { passive: true });
        window.addEventListener('touchstart', tryAutoPlay, { passive: true });
        window.addEventListener('scroll', tryAutoPlay, { passive: true });
        window.addEventListener('keydown', tryAutoPlay, { passive: true });
        window.addEventListener('click', tryAutoPlay, { passive: true });

        // Immediate automatic load attempt
        setTimeout(() => {
            this.init();
        }, 200);
    }

    /**
     * Initialize Audio Context & Play Deva Shree Ganesha
     */
    init() {
        if (this.isStarted && this.audioEl) {
            if (this.audioEl.paused) {
                this.audioEl.play().catch(() => {});
            }
            return;
        }

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();

            // 1. Dynamics Compressor for clean, soft limiting
            this.masterCompressor = this.ctx.createDynamicsCompressor();
            this.masterCompressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
            this.masterCompressor.knee.setValueAtTime(12, this.ctx.currentTime);
            this.masterCompressor.ratio.setValueAtTime(4, this.ctx.currentTime);
            this.masterCompressor.attack.setValueAtTime(0.01, this.ctx.currentTime);
            this.masterCompressor.release.setValueAtTime(0.3, this.ctx.currentTime);
            this.masterCompressor.connect(this.ctx.destination);

            // 2. Master Gain
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
            this.masterGain.gain.linearRampToValueAtTime(this.LEVELS.MASTER_CEILING, this.ctx.currentTime + 1.8);
            this.masterGain.connect(this.masterCompressor);

            // 3. Music Bus (Locked at subtle background level)
            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.setValueAtTime(this.LEVELS.MUSIC_BASE, this.ctx.currentTime);
            this.musicGain.connect(this.masterGain);

            // 4. Temple Bells Bus
            this.bellsGain = this.ctx.createGain();
            this.bellsGain.gain.setValueAtTime(this.LEVELS.BELLS_BASE, this.ctx.currentTime);
            this.bellsGain.connect(this.masterGain);

            // 5. Audio Element Setup
            this.setupAudioElement();

            this.isStarted = true;
            this.updateSoundBadge();
        } catch (e) {
            console.warn("Audio Context init note:", e);
            this.setupAudioElement(true);
        }
    }

    setupAudioElement(fallbackDirect = false) {
        if (!this.audioEl) {
            this.audioEl = new Audio();
            this.audioEl.loop = true;
            this.audioEl.crossOrigin = 'anonymous';
            this.audioEl.preload = 'auto';
            this.audioEl.src = this.track.src;
            this.audioEl.volume = this.LEVELS.MUSIC_BASE;

            if (!fallbackDirect && this.ctx) {
                try {
                    this.mediaSourceNode = this.ctx.createMediaElementSource(this.audioEl);
                    this.mediaSourceNode.connect(this.musicGain);
                } catch (e) {
                    console.warn("Direct audio fallback:", e);
                }
            }
        }

        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }

        const playPromise = this.audioEl.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.updateSoundBadge();
            }).catch(() => {
                // Browser waiting for passive gesture
            });
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.masterGain && this.ctx) {
            const now = this.ctx.currentTime;
            this.masterGain.gain.cancelScheduledValues(now);
            this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
            this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0.0001 : this.LEVELS.MASTER_CEILING, now + 0.3);
        } else if (this.audioEl) {
            this.audioEl.muted = this.isMuted;
        }
        this.updateSoundBadge();
    }

    /**
     * Dynamic Audio Ducking during sacred intimate moments
     */
    duckMusic(targetLevel, fadeMs = 1800) {
        if (!this.ctx || !this.musicGain) {
            if (this.audioEl) {
                this.audioEl.volume = Math.max(0.01, Math.min(this.LEVELS.MUSIC_BASE, targetLevel));
            }
            return;
        }
        const now = this.ctx.currentTime;
        const targetVal = Math.max(0.01, Math.min(this.LEVELS.MUSIC_BASE, targetLevel));
        this.musicGain.gain.cancelScheduledValues(now);
        this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, now);
        this.musicGain.gain.linearRampToValueAtTime(targetVal, now + (fadeMs / 1000));
    }

    duckMaster(targetLevel, fadeMs = 2500) {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime;
        const targetVal = Math.max(0.005, Math.min(this.LEVELS.MASTER_CEILING, targetLevel));
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(targetVal, now + (fadeMs / 1000));
    }

    /**
     * Soft Harmonic Temple Bell (marking sacred visual reveals)
     */
    playTempleBell(freq = 554.37, duration = 4.0, volume = 0.28) {
        if (!this.ctx || !this.isStarted || this.isMuted) return;
        try {
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

            gain.gain.setValueAtTime(volume, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(gain);
            oscHarmonic.connect(gain);
            gain.connect(this.bellsGain);

            osc.start(now);
            oscHarmonic.start(now);
            osc.stop(now + duration + 0.1);
            oscHarmonic.stop(now + duration + 0.1);
        } catch (e) {
            // Non-critical catch
        }
    }

    updateSoundBadge() {
        const badge = document.getElementById('sound-badge');
        if (badge) {
            badge.classList.toggle('muted', this.isMuted);
            badge.title = this.isMuted ? 'Sound Muted — Click to Unmute' : 'Deva Shree Ganesha Playing — Click to Mute';
        }
    }
}
