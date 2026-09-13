/**
 * =========================================================================
 * PROJECT GANESHA — CINEMATIC TIMELINE & ANIMATION (js/animation.js)
 * Precision Timeline Scheduling, Milestone Bus & Particle Physics
 * =========================================================================
 */

export const TIMELINE_CONFIG = {
    TOTAL_DURATION: 42000, // 42s full sacred cinematic journey
    PHASES: {
        ORIGIN_POINT: 0.00,        // 0-3%: Pure darkness -> golden Bindu
        SACRED_CONSTRUCT: 0.03,    // 3-7%: Sacred geometry guides
        HEAD_START: 0.07,          // 7-13%: Head structure
        LEFT_EAR_START: 0.13,      // 13-17%: Left Ear
        RIGHT_EAR_START: 0.17,     // 17-21%: Right Ear
        TORSO_SHOULDERS: 0.21,     // 21-25%: Shoulders & Lambodara belly
        TRUNK_START: 0.25,         // 25-31%: Trunk Hero Moment
        TUSKS_START: 0.31,         // 31-35%: Tusks (Ivory & Ekadanta)
        ARMS_HANDS: 0.35,          // 35-39%: Abhaya Mudra & Modak bowl
        FACE_START: 0.39,          // 39-43%: Brow ridge & face frame
        LEFT_EYE: 0.43,            // 43-46%: Left almond eye reveal
        RIGHT_EYE: 0.46,           // 46-49%: Right eye reveal
        TILAK_START: 0.49,         // 49-52%: Chandan crescent & vermilion flame
        CROWN_START: 0.52,         // 52-57%: Kireeta Mukut crown
        JEWELRY_START: 0.57,       // 57-61%: Kundala necklaces & jewels
        MODAK_REVEAL: 0.61,        // 61-64%: Modak sweet
        MATERIALIZE_START: 0.64,   // 64-70%: Volumetric 3D Terracotta/Gold transformation
        MANDAP_AWAKENS: 0.70,      // 70-75%: Ceremonial mandap arch & toran
        FLOWERS_DIYAS: 0.75,       // 75-80%: Marigolds, red hibiscus, durva, brass diyas
        RANGOLI_KALASH: 0.80,      // 80-84%: Procedural Rangoli, brass Kalash
        AARTI_ATMOSPHERE: 0.84,    // 84-88%: Aarti light sweep, incense, halo
        GANESHA_HOLD: 0.88,        // 88-94%: Dedicated 2.5-3s peaceful darshan hold
        MESSAGE_REVEAL: 0.94       // 94-100%: Bangaram Devotional Message Reveal
    }
};

export const MATH_UTILS = {
    lerp: (a, b, t) => a + (b - a) * t,
    clamp: (v, min, max) => Math.max(min, Math.min(max, v)),
    smoothstep: (min, max, value) => {
        const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
        return x * x * (3 - 2 * x);
    },
    bezierPoint: (p0, p1, p2, p3, t) => {
        const cx = 3 * (p1.x - p0.x), bx = 3 * (p2.x - p1.x) - cx, ax = p3.x - p0.x - cx - bx;
        const cy = 3 * (p1.y - p0.y), by = 3 * (p2.y - p1.y) - cy, ay = p3.y - p0.y - cy - by;
        return {
            x: (ax * t * t * t) + (bx * t * t) + (cx * t) + p0.x,
            y: (ay * t * t * t) + (by * t * t) + (cy * t) + p0.y
        };
    }
};

export class ParticleSystem {
    constructor() {
        this.stars = [];
        this.particles = [];
        this.petals = [];
        this.initStars();
        this.initParticles();
        this.initPetals();
    }

    initStars() {
        this.stars = [];
        for (let i = 0; i < 90; i++) {
            this.stars.push({
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                size: Math.random() * 1.5 + 0.5,
                baseAlpha: Math.random() * 0.4 + 0.1,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    initParticles() {
        this.particles = [];
        for (let i = 0; i < 35; i++) {
            this.particles.push({
                x: (Math.random() - 0.5) * 140,
                y: Math.random() * 120 - 40,
                vx: (Math.random() - 0.5) * 0.03,
                vy: -Math.random() * 0.06 - 0.02,
                size: Math.random() * 2.0 + 0.8,
                alpha: Math.random() * 0.5 + 0.2,
                life: Math.random() * 200,
                maxLife: 200 + Math.random() * 100
            });
        }
    }

    initPetals() {
        this.petals = [];
        for (let i = 0; i < 14; i++) {
            this.petals.push({
                x: (Math.random() - 0.5) * 160,
                y: Math.random() * 180 - 90,
                vx: (Math.random() - 0.5) * 0.04,
                vy: Math.random() * 0.05 + 0.03,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.015,
                size: Math.random() * 3.5 + 2.5,
                alpha: Math.random() * 0.45 + 0.2,
                isMarigold: i % 2 === 0
            });
        }
    }

    updateAndRender(ctx, toScreenFn, scale, cx, cy, globalTime, timelinePos, mandapProg) {
        // 1. Celestial Stars
        this.stars.forEach(st => {
            const stPos = toScreenFn(st, scale * 1.5, cx, cy);
            const alpha = st.baseAlpha + Math.sin(globalTime * 0.003 + st.phase) * 0.15;
            ctx.fillStyle = `rgba(255, 235, 180, ${Math.max(0, alpha)})`;
            ctx.beginPath();
            ctx.arc(stPos.x, stPos.y, st.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // 2. Rising Sacred Dust Motes
        if (timelinePos > TIMELINE_CONFIG.PHASES.HEAD_START) {
            ctx.save();
            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life++;
                if (p.life > p.maxLife || p.y < -100) {
                    p.x = (Math.random() - 0.5) * 140;
                    p.y = 80;
                    p.life = 0;
                }

                const pScreen = toScreenFn(p, scale, cx, cy);
                const pAlpha = (1 - (p.life / p.maxLife)) * p.alpha * Math.min(1, timelinePos * 1.5);

                ctx.fillStyle = `rgba(255, 225, 140, ${pAlpha})`;
                ctx.shadowColor = 'rgba(255, 215, 100, 0.8)';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(pScreen.x, pScreen.y, p.size * (scale / 2), 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();
        }

        // 3. Floating Jasmine & Marigold Petals
        if (timelinePos > TIMELINE_CONFIG.PHASES.MANDAP_AWAKENS) {
            ctx.save();
            this.petals.forEach(pt => {
                pt.x += pt.vx;
                pt.y += pt.vy;
                pt.rotation += pt.rotSpeed;
                if (pt.y > 100) {
                    pt.y = -100;
                    pt.x = (Math.random() - 0.5) * 160;
                }

                const ptScreen = toScreenFn(pt, scale, cx, cy);
                ctx.save();
                ctx.translate(ptScreen.x, ptScreen.y);
                ctx.rotate(pt.rotation);

                ctx.fillStyle = pt.isMarigold ? `rgba(247, 127, 0, ${pt.alpha * mandapProg})` : `rgba(255, 250, 240, ${pt.alpha * mandapProg})`;
                ctx.beginPath();
                ctx.ellipse(0, 0, pt.size * (scale / 2), pt.size * 0.5 * (scale / 2), 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            ctx.restore();
        }
    }
}
