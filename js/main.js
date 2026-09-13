/**
 * =========================================================================
 * PROJECT GANESHA — MASTER ORCHESTRATOR (js/main.js)
 * Clean Modular Architecture for Festival World & Sacred Audio Experience
 * =========================================================================
 */

import { SacredAudioEngine } from './audio.js';
import { GaneshaGeometry, SculpturalEngine, GANESHA_PALETTE } from './ganesha.js';
import { FestivalAtmosphereRenderer } from './atmosphere.js';
import { TIMELINE_CONFIG, MATH_UTILS, ParticleSystem } from './animation.js';

class CinematicExperience {
    constructor() {
        this.canvas = document.getElementById('ganeshaCanvas');
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        this.dpr = Math.min(window.devicePixelRatio || 1, 2.5);

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // Subsystems
        this.audio = new SacredAudioEngine();
        this.geo = new GaneshaGeometry();
        this.sculptor = new SculpturalEngine(this.ctx, (pt, s, cx, cy) => this.toScreen(pt, s, cx, cy));
        this.atmosphere = new FestivalAtmosphereRenderer(this.ctx, (pt, s, cx, cy) => this.toScreen(pt, s, cx, cy));
        this.particles = new ParticleSystem();

        // Milestone Flags
        this.startTime = null;
        this.revealedLeftEyeBell = false;
        this.revealedRightEyeBell = false;
        this.revealedFullBell = false;
        this.revealedAartiBell = false;
        this.messageShown = false;
        this.prologueFinished = false;

        this.bindEvents();
        this.resize();
        this.render(0, 0);
        this.runPrologueSequence();
    }

    startPrologueAmbientLoop() {
        const ambientStep = (timestamp) => {
            if (this.prologueFinished) return;
            this.render(timestamp, 0);
            requestAnimationFrame(ambientStep);
        };
        requestAnimationFrame(ambientStep);
    }

    async runPrologueSequence() {
        this.startPrologueAmbientLoop();

        const quoteContainer = document.getElementById('prologue-quote');
        const prologueOverlay = document.getElementById('prologue-container');
        const skipBtn = document.getElementById('skip-prologue-btn');

        let skipped = false;

        const completePrologue = () => {
            if (this.prologueFinished) return;
            this.prologueFinished = true;
            skipped = true;

            const flash = document.getElementById('divine-flash');
            if (flash) {
                flash.style.opacity = '0.5';
                setTimeout(() => { flash.style.opacity = '0'; }, 1000);
            }

            if (prologueOverlay) {
                prologueOverlay.classList.add('fade-out');
                setTimeout(() => {
                    prologueOverlay.remove();
                }, 1600);
            }

            // Start master Ganesha emergence animation
            this.startTime = null;
            this.startLoop();
        };

        if (skipBtn) {
            skipBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                completePrologue();
            });
        }

        if (!quoteContainer) {
            completePrologue();
            return;
        }

        quoteContainer.innerHTML = '';

        const quoteLines = [
            {
                text: 'On this auspicious day of Ganesh Chaturthi,',
                baseDelay: 46,
                pauseAfter: 500
            },
            {
                text: 'as sacred prayers rise and divine grace descends upon the earth,',
                baseDelay: 44,
                pauseAfter: 550
            },
            {
                text: 'may Lord Ganesha remove every obstacle from your path,',
                baseDelay: 44,
                pauseAfter: 550
            },
            {
                text: 'and bless your life with boundless peace, eternal strength, and infinite joy.',
                baseDelay: 44,
                pauseAfter: 750
            },
            {
                text: 'Dedicated with all my love, for my Bangaram ',
                suffix: '<span class="heart-icon">❤️</span>',
                isDedication: true,
                baseDelay: 50,
                pauseAfter: 1500
            }
        ];

        // Create glowing golden cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';

        // Brief 1.0s breath before first handwritten stroke
        await new Promise(r => setTimeout(r, 1000));

        for (let i = 0; i < quoteLines.length; i++) {
            if (skipped) break;
            const item = quoteLines[i];
            const lineEl = document.createElement('div');
            lineEl.className = 'quote-line' + (item.isDedication ? ' quote-dedication' : '');
            quoteContainer.appendChild(lineEl);
            lineEl.classList.add('show');
            lineEl.appendChild(cursor);

            let currentText = '';
            for (let c = 0; c < item.text.length; c++) {
                if (skipped) break;
                const char = item.text[c];
                currentText += char;
                lineEl.textContent = currentText;
                lineEl.appendChild(cursor);

                // Natural human handwriting cadence
                let delay = item.baseDelay + (Math.random() * 12 - 6);
                if (char === ',' || char === ';') delay += 160;
                else if (char === '.' || char === '!' || char === '?') delay += 260;

                await new Promise(r => setTimeout(r, Math.max(10, delay)));
            }

            if (item.suffix && !skipped) {
                cursor.remove();
                lineEl.innerHTML = currentText + item.suffix;
                lineEl.appendChild(cursor);
            }

            if (!skipped && item.pauseAfter) {
                await new Promise(r => setTimeout(r, item.pauseAfter));
            }
        }

        if (!skipped) {
            // Serene peaceful hold after typing (~4.5 seconds to reach ~23 seconds total)
            await new Promise(r => setTimeout(r, 4500));
            completePrologue();
        }
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
    }

    toScreen(pt, scale, cx, cy) {
        return {
            x: cx + pt.x * scale,
            y: cy + pt.y * scale
        };
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());

        // Connect minimal sacred sound badge toggle
        const soundBadge = document.getElementById('sound-badge');
        if (soundBadge) {
            soundBadge.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!this.audio.isPlaying) {
                    this.audio.play().catch(() => {});
                } else {
                    this.audio.toggleMute();
                }
            });
        }
    }

    drawProgressiveBezier(p0, p1, p2, p3, progress, scale, cx, cy, strokeStyle, lineWidth, glow = false) {
        if (progress <= 0) return;
        const ctx = this.ctx;
        const steps = Math.max(8, Math.floor(35 * progress));

        ctx.save();
        if (glow) {
            ctx.shadowColor = 'rgba(255, 215, 120, 0.85)';
            ctx.shadowBlur = 10 * progress;
        }
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();

        for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * progress;
            const p = MATH_UTILS.bezierPoint(p0, p1, p2, p3, t);
            const s = this.toScreen(p, scale, cx, cy);
            if (i === 0) ctx.moveTo(s.x, s.y);
            else ctx.lineTo(s.x, s.y);
        }
        ctx.stroke();

        if (progress < 0.99 && steps > 0) {
            const tipPt = MATH_UTILS.bezierPoint(p0, p1, p2, p3, progress);
            const tipScreen = this.toScreen(tipPt, scale, cx, cy);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#fff2a8';
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(tipScreen.x, tipScreen.y, lineWidth * 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    async triggerMessageSequence() {
        if (this.messageShown) return;
        this.messageShown = true;

        // Dynamic Audio Ducking for Bangaram's Message
        this.audio.duckMusic(0.035, 2200);

        const container = document.getElementById('message-container');
        if (container) container.classList.add('visible');

        const card = document.querySelector('.message-card');
        let skipTyping = false;

        // Allow tapping/clicking the card to quickly fast-forward typing if desired
        const handleCardClick = () => {
            skipTyping = true;
        };
        if (card) {
            card.addEventListener('click', handleCardClick, { once: true });
        }

        const script = [
            {
                id: 't1',
                text: 'Happy Ganesh Chaturthi, Bangaram ',
                suffix: '<span class="heart-icon">❤️</span>',
                baseDelay: 38,
                pauseAfter: 550
            },
            {
                id: 'p1',
                text: 'May Lord Ganesha remove every obstacle from your path, fill your heart with peace, and guide you toward everything you dream of.',
                suffix: '',
                baseDelay: 20,
                pauseAfter: 450
            },
            {
                id: 'p2',
                text: 'May your life always be surrounded by happiness, beautiful moments, strength, and people who love you deeply.',
                suffix: '',
                baseDelay: 20,
                pauseAfter: 500
            },
            {
                id: 'p3',
                text: "I didn't want to just wish you this Ganesh Chaturthi. I wanted to create something beautiful for you, one little piece at a time. ",
                suffix: '<span class="heart-icon">❤️</span>',
                baseDelay: 22,
                pauseAfter: 600,
                onStart: () => this.audio.duckMusic(0.02, 2500)
            },
            {
                id: 'p4',
                text: 'Because you mean more to me than I can put into a simple wish.',
                suffix: '',
                baseDelay: 25,
                pauseAfter: 700
            },
            {
                id: 'sig',
                text: 'For my Bangaram. ',
                suffix: '<span class="heart-icon">❤️</span>',
                baseDelay: 42,
                pauseAfter: 1200,
                onStart: () => this.audio.duckMaster(0.012, 3000)
            }
        ];

        // Ensure all elements are clean initially so nothing is pre-typed
        script.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) {
                el.innerHTML = '';
                el.classList.remove('show');
            }
        });

        // Gentle pause for card slide-in transition before first letter types
        await new Promise(r => setTimeout(r, 900));

        // Create glowing golden caret/cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';

        for (let i = 0; i < script.length; i++) {
            const item = script[i];
            const el = document.getElementById(item.id);
            if (!el) continue;

            if (item.onStart) item.onStart();
            el.classList.add('show');
            el.appendChild(cursor);

            if (skipTyping) {
                el.innerHTML = item.text + item.suffix;
                continue;
            }

            let typed = '';
            for (let c = 0; c < item.text.length; c++) {
                if (skipTyping) {
                    typed = item.text;
                    el.textContent = typed;
                    break;
                }

                const char = item.text[c];
                typed += char;
                el.textContent = typed;
                el.appendChild(cursor);

                // Natural human typing rhythm with natural punctuation pauses
                let delay = item.baseDelay + (Math.random() * 14 - 7);
                if (char === ',' || char === ';') delay += 150;
                else if (char === '.' || char === '!' || char === '?') delay += 220;

                await new Promise(r => setTimeout(r, Math.max(10, delay)));
            }

            // Reveal heart icon with pop animation if line has suffix
            if (item.suffix) {
                cursor.remove();
                el.innerHTML = typed + item.suffix;
                el.appendChild(cursor);
            }

            if (!skipTyping && item.pauseAfter) {
                await new Promise(r => setTimeout(r, item.pauseAfter));
            }
        }

        // Linger briefly at the end of the dedication, then fade out cursor gracefully
        setTimeout(() => {
            cursor.classList.add('fade-out');
            setTimeout(() => cursor.remove(), 1000);
        }, 2000);
    }

    render(globalTime, timelinePos) {
        const ctx = this.ctx;
        const w = this.width;
        const h = this.height;

        // Two-column editorial composition:
        // Desktop widescreen: Ganesha heroically placed on the left side (~51% width)
        // Mobile portrait: Centered with natural vertical reflow
        const isDesktop = (w >= 920 && (w / h) > 1.05);
        const cx = isDesktop ? w * 0.255 : w * 0.5;
        const cy = isDesktop ? h * 0.50 : (h < w ? h * 0.35 : h * 0.32);
        const baseDim = isDesktop ? Math.min(w * 0.44, h * 0.84) : Math.min(w * 0.85, h * 0.52);
        const scale = (baseDim / 185);

        // 1. Background Fill & Aura
        ctx.fillStyle = '#030104';
        ctx.fillRect(0, 0, w, h);

        const bgGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.75);
        bgGlow.addColorStop(0, 'rgba(54, 20, 10, 0.48)');
        bgGlow.addColorStop(0.5, 'rgba(22, 8, 5, 0.28)');
        bgGlow.addColorStop(1, 'rgba(3, 1, 4, 1)');
        ctx.fillStyle = bgGlow;
        ctx.fillRect(0, 0, w, h);

        // 2. Timeline Progress Mapping
        const T = TIMELINE_CONFIG.PHASES;
        const getPhaseProgress = (startT, endT) => {
            if (timelinePos < startT) return 0;
            if (timelinePos >= endT) return 1;
            return (timelinePos - startT) / (endT - startT);
        };

        const sacredProg = getPhaseProgress(T.SACRED_CONSTRUCT, T.HEAD_START);
        const headProg = getPhaseProgress(T.HEAD_START, T.LEFT_EAR_START);
        const leftEarProg = getPhaseProgress(T.LEFT_EAR_START, T.RIGHT_EAR_START);
        const rightEarProg = getPhaseProgress(T.RIGHT_EAR_START, T.TORSO_SHOULDERS);
        const torsoProg = getPhaseProgress(T.TORSO_SHOULDERS, T.TRUNK_START);
        const trunkProg = getPhaseProgress(T.TRUNK_START, T.TUSKS_START);
        const tusksProg = getPhaseProgress(T.TUSKS_START, T.ARMS_HANDS);
        const handsProg = getPhaseProgress(T.ARMS_HANDS, T.FACE_START);
        const faceProg = getPhaseProgress(T.FACE_START, T.LEFT_EYE);
        const leftEyeProg = getPhaseProgress(T.LEFT_EYE, T.RIGHT_EYE);
        const rightEyeProg = getPhaseProgress(T.RIGHT_EYE, T.TILAK_START);
        const tilakProg = getPhaseProgress(T.TILAK_START, T.CROWN_START);
        const crownProg = getPhaseProgress(T.CROWN_START, T.JEWELRY_START);
        const jewelryProg = getPhaseProgress(T.JEWELRY_START, T.MODAK_REVEAL);
        const modakProg = getPhaseProgress(T.MODAK_REVEAL, T.MATERIALIZE_START);

        const dimensionalWeight = MATH_UTILS.smoothstep(T.MATERIALIZE_START, T.MANDAP_AWAKENS, timelinePos);
        const mandapProg = MATH_UTILS.smoothstep(T.MANDAP_AWAKENS, T.FLOWERS_DIYAS, timelinePos);
        const flowerProg = MATH_UTILS.smoothstep(T.FLOWERS_DIYAS, T.RANGOLI_KALASH, timelinePos);
        const rangoliProg = MATH_UTILS.smoothstep(T.RANGOLI_KALASH, T.AARTI_ATMOSPHERE, timelinePos);
        const aartiProg = MATH_UTILS.smoothstep(T.AARTI_ATMOSPHERE, T.GANESHA_HOLD, timelinePos);
        const haloProg = MATH_UTILS.smoothstep(T.AARTI_ATMOSPHERE, T.GANESHA_HOLD, timelinePos);
        const innerGlow = MATH_UTILS.smoothstep(T.MANDAP_AWAKENS, T.AARTI_ATMOSPHERE, timelinePos);

        // 3. Particles & Stars Background
        this.particles.updateAndRender(ctx, (pt, s, x, y) => this.toScreen(pt, s, x, y), scale, cx, cy, globalTime, timelinePos, mandapProg);

        // 4. Sacred Origin Bindu
        if (timelinePos < T.HEAD_START) {
            const pulse = 1 + Math.sin(globalTime * 0.005) * 0.15;
            const bAlpha = timelinePos < T.SACRED_CONSTRUCT ?
                MATH_UTILS.smoothstep(0, 0.02, timelinePos) :
                1 - MATH_UTILS.smoothstep(T.SACRED_CONSTRUCT, T.HEAD_START, timelinePos);

            ctx.save();
            const bGlow = ctx.createRadialGradient(cx, cy - 8 * scale, 0, cx, cy - 8 * scale, 30 * scale * pulse);
            bGlow.addColorStop(0, `rgba(255, 255, 255, ${bAlpha})`);
            bGlow.addColorStop(0.3, `rgba(255, 215, 100, ${0.85 * bAlpha})`);
            bGlow.addColorStop(1, 'rgba(255, 180, 50, 0)');
            ctx.fillStyle = bGlow;
            ctx.beginPath();
            ctx.arc(cx, cy - 8 * scale, 30 * scale * pulse, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(255, 255, 255, ${bAlpha})`;
            ctx.beginPath();
            ctx.arc(cx, cy - 8 * scale, 2.2 * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // 5. Sacred Geometry Guides
        if (sacredProg > 0 && dimensionalWeight < 0.6) {
            const sAlpha = Math.max(0, (1 - dimensionalWeight * 1.8) * (sacredProg < 0.8 ? sacredProg : 1 - (timelinePos - T.LEFT_EAR_START) * 1.5));
            if (sAlpha > 0.02) {
                ctx.save();
                ctx.strokeStyle = `rgba(212, 175, 55, ${0.25 * sAlpha})`;
                ctx.lineWidth = 1;
                ctx.shadowColor = 'rgba(255, 215, 120, 0.25)';
                ctx.shadowBlur = 6;

                this.geo.sacredGuides.forEach(g => {
                    if (g.type === 'circle') {
                        ctx.beginPath();
                        ctx.arc(cx + g.cx * scale, cy + g.cy * scale, g.r * scale * sacredProg, 0, Math.PI * 2);
                        ctx.stroke();
                    } else if (g.type === 'poly') {
                        ctx.beginPath();
                        g.pts.forEach((pt, idx) => {
                            const s = this.toScreen({ x: pt.x * sacredProg, y: pt.y * sacredProg }, scale, cx, cy);
                            if (idx === 0) ctx.moveTo(s.x, s.y);
                            else ctx.lineTo(s.x, s.y);
                        });
                        ctx.closePath();
                        ctx.stroke();
                    } else if (g.type === 'line') {
                        const s0 = this.toScreen(g.p0, scale, cx, cy);
                        const s1 = this.toScreen({ x: g.p1.x, y: MATH_UTILS.lerp(g.p0.y, g.p1.y, sacredProg) }, scale, cx, cy);
                        ctx.beginPath();
                        ctx.moveTo(s0.x, s0.y);
                        ctx.lineTo(s1.x, s1.y);
                        ctx.stroke();
                    }
                });
                ctx.restore();
            }
        }

        // 6. Ceremonial Mandap Arch & Drapery
        this.atmosphere.drawMandapArch(scale, cx, cy, mandapProg, globalTime);

        // 7. Divine Halo (Prabhavali)
        this.atmosphere.drawDivineHalo(scale, cx, cy, haloProg, globalTime);

        // 8. 3D Volumetric Sculpture (Terracotta & Gold)
        this.sculptor.drawVolumetricSculpture(scale, cx, cy, dimensionalWeight, innerGlow);

        // 9. Progressive Sacred Line Drawing (Construction lines guide emergence, then gracefully fade into 3D form)
        const lineAlpha = Math.max(0, 1 - dimensionalWeight * 0.95);
        const drawCurveGroup = (curves, prog, defaultW = 2.2) => {
            if (prog <= 0 || lineAlpha <= 0.01) return;
            const strokeCol = `rgba(255, 215, 120, ${lineAlpha * 0.85})`;
            const lineW = Math.max(0.8, defaultW * (1 - dimensionalWeight * 0.4));
            curves.forEach(c => {
                this.drawProgressiveBezier(c.p0, c.p1, c.p2, c.p3, prog, scale, cx, cy, strokeCol, lineW, dimensionalWeight < 0.3);
            });
        };

        drawCurveGroup(this.geo.headCurves, headProg, 2.5);
        drawCurveGroup(this.geo.leftEarCurves, leftEarProg, 2.2);
        drawCurveGroup(this.geo.rightEarCurves, rightEarProg, 2.2);
        drawCurveGroup(this.geo.torsoCurves, torsoProg, 2.4);
        drawCurveGroup(this.geo.trunkCurves, trunkProg, 2.6);
        drawCurveGroup(this.geo.tuskCurves, tusksProg, 2.0);
        drawCurveGroup(this.geo.handCurves, handsProg, 2.2);
        drawCurveGroup(this.geo.faceCurves, faceProg, 1.8);
        drawCurveGroup(this.geo.leftEyeCurves, leftEyeProg, 2.0);
        drawCurveGroup(this.geo.rightEyeCurves, rightEyeProg, 2.0);
        drawCurveGroup(this.geo.tilakCurves, tilakProg, 1.8);
        drawCurveGroup(this.geo.crownCurves, crownProg, 2.5);
        drawCurveGroup(this.geo.jewelryCurves, jewelryProg, 2.0);
        drawCurveGroup(this.geo.modakCurves, modakProg, 2.2);

        // 10. Festival Puja Offerings, Diyas & Rangoli
        this.atmosphere.drawProceduralRangoli(scale, cx, cy, rangoliProg, globalTime);
        this.atmosphere.drawPujaOfferings(scale, cx, cy, flowerProg, globalTime);
        this.atmosphere.drawDiyasAndFlames(scale, cx, cy, flowerProg, globalTime);
        this.atmosphere.drawAartiAtmosphere(scale, cx, cy, aartiProg, globalTime);
    }

    startLoop() {
        const step = (timestamp) => {
            if (!this.startTime) this.startTime = timestamp;
            const elapsed = timestamp - this.startTime;
            const timelinePos = Math.min(1.0, elapsed / TIMELINE_CONFIG.TOTAL_DURATION);

            // Milestone Event Notifications
            const T = TIMELINE_CONFIG.PHASES;

            if (timelinePos >= T.LEFT_EYE && !this.revealedLeftEyeBell) {
                this.revealedLeftEyeBell = true;
                this.audio.playTempleBell(440, 3.5, 0.25);
                this.audio.duckMusic(0.11, 1500);
            }

            if (timelinePos >= T.RIGHT_EYE && !this.revealedRightEyeBell) {
                this.revealedRightEyeBell = true;
                this.audio.playTempleBell(493.88, 3.5, 0.25);
            }

            if (timelinePos >= T.MANDAP_AWAKENS && !this.revealedFullBell) {
                this.revealedFullBell = true;
                this.audio.playTempleBell(554.37, 4.5, 0.30);
                this.audio.duckMusic(0.16, 2000);
                const flash = document.getElementById('divine-flash');
                if (flash) {
                    flash.style.opacity = '0.35';
                    setTimeout(() => flash.style.opacity = '0', 800);
                }
            }

            if (timelinePos >= T.AARTI_ATMOSPHERE && !this.revealedAartiBell) {
                this.revealedAartiBell = true;
                this.audio.playTempleBell(659.25, 5.0, 0.30);
            }

            if (timelinePos >= T.GANESHA_HOLD && !this.revealedHold) {
                this.revealedHold = true;
                this.audio.duckMusic(0.10, 2000);
            }

            if (timelinePos >= T.MESSAGE_REVEAL) {
                this.triggerMessageSequence();
            }

            this.render(timestamp, timelinePos);

            if (timelinePos < 1.0) {
                requestAnimationFrame(step);
            } else {
                // Permanent peaceful ambient loop
                const idleLoop = (now) => {
                    this.render(now, 1.0);
                    requestAnimationFrame(idleLoop);
                };
                requestAnimationFrame(idleLoop);
            }
        };

        requestAnimationFrame(step);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new CinematicExperience();
});
