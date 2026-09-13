/**
 * =========================================================================
 * PROJECT GANESHA — SACRED ANATOMY & SCULPTURAL ENGINE (js/ganesha.js)
 * High-Precision Geometric Curves & 3D Volumetric Materialization
 * =========================================================================
 */

export const GANESHA_PALETTE = {
    GOLD_LINE: '#ffd778',
    GOLD_BRIGHT: '#fff2a8',
    GOLD_DEEP: '#b8860b',
    GOLD_SHADOW: '#4a3308',
    TERRACOTTA_BASE: '#a84c24',
    TERRACOTTA_SHADOW: '#3b1206',
    TERRACOTTA_LIGHT: '#d66835',
    SANDALWOOD: '#c28854',
    IVORY: '#fffae8',
    IVORY_SHADOW: '#c2b393',
    RUBY: '#d91e36',
    EMERALD: '#06d6a0',
    MARIGOLD_ORANGE: '#f77f00',
    MARIGOLD_YELLOW: '#fcbf49',
    HIBISCUS_RED: '#d62828',
    LEAF_GREEN: '#2d6a4f',
    RANGOLI_WHITE: '#ffffff',
    RANGOLI_CYAN: '#48cae4',
    DIYA_BRASS: '#d4af37',
    FLAME_CORE: '#fff8db',
    FLAME_GLOW: '#ff7b00'
};

export class GaneshaGeometry {
    constructor() {
        this.initAllComponents();
    }

    initAllComponents() {
        // SACRED MATHEMATICAL GEOMETRY GUIDES
        this.sacredGuides = [
            { type: 'circle', cx: 0, cy: -5, r: 85 },
            { type: 'circle', cx: 0, cy: -5, r: 65 },
            { type: 'circle', cx: 0, cy: 12, r: 42 },
            { type: 'poly', pts: [{x:0, y:-78}, {x:58, y:24}, {x:-58, y:24}] },
            { type: 'poly', pts: [{x:0, y:65}, {x:58, y:-36}, {x:-58, y:-36}] },
            { type: 'line', p0:{x:0, y:-90}, p1:{x:0, y:100} }
        ];

        // 1. HEAD (Forehead & Cranial Volume)
        this.headCurves = [
            { p0:{x:-32, y:-26}, p1:{x:-40, y:-18}, p2:{x:-34, y:-4}, p3:{x:-22, y:-2} },
            { p0:{x:32, y:-26}, p1:{x:40, y:-18}, p2:{x:34, y:-4}, p3:{x:22, y:-2} },
            { p0:{x:-22, y:-2}, p1:{x:-8, y:0}, p2:{x:8, y:0}, p3:{x:22, y:-2} },
            { p0:{x:-26, y:-2}, p1:{x:-34, y:8}, p2:{x:-28, y:20}, p3:{x:-16, y:20} },
            { p0:{x:26, y:-2}, p1:{x:34, y:8}, p2:{x:28, y:20}, p3:{x:16, y:20} }
        ];

        // 2. LEFT EAR (Supakarna Left)
        this.leftEarCurves = [
            { p0:{x:-32, y:-24}, p1:{x:-65, y:-30}, p2:{x:-84, y:-6}, p3:{x:-78, y:18} },
            { p0:{x:-78, y:18}, p1:{x:-72, y:32}, p2:{x:-48, y:36}, p3:{x:-28, y:22} },
            { p0:{x:-38, y:-16}, p1:{x:-60, y:-16}, p2:{x:-70, y:0}, p3:{x:-62, y:16} },
            { p0:{x:-62, y:16}, p1:{x:-54, y:24}, p2:{x:-44, y:24}, p3:{x:-36, y:16} }
        ];

        // 3. RIGHT EAR (Supakarna Right)
        this.rightEarCurves = [
            { p0:{x:32, y:-24}, p1:{x:65, y:-30}, p2:{x:84, y:-6}, p3:{x:82, y:18} },
            { p0:{x:82, y:18}, p1:{x:72, y:32}, p2:{x:48, y:36}, p3:{x:28, y:22} },
            { p0:{x:38, y:-16}, p1:{x:60, y:-16}, p2:{x:70, y:0}, p3:{x:62, y:16} },
            { p0:{x:62, y:16}, p1:{x:54, y:24}, p2:{x:44, y:24}, p3:{x:36, y:16} }
        ];

        // 4 & 5. TORSO, SHOULDERS & BELLY (Lambodara)
        this.torsoCurves = [
            { p0:{x:-36, y:28}, p1:{x:-52, y:36}, p2:{x:-58, y:54}, p3:{x:-48, y:68} },
            { p0:{x:36, y:28}, p1:{x:52, y:36}, p2:{x:58, y:54}, p3:{x:48, y:68} },
            { p0:{x:-32, y:48}, p1:{x:-42, y:64}, p2:{x:-34, y:86}, p3:{x:0, y:90} },
            { p0:{x:32, y:48}, p1:{x:42, y:64}, p2:{x:34, y:86}, p3:{x:0, y:90} },
            { p0:{x:-56, y:72}, p1:{x:-64, y:86}, p2:{x:-32, y:94}, p3:{x:0, y:90} },
            { p0:{x:56, y:72}, p1:{x:64, y:86}, p2:{x:32, y:94}, p3:{x:0, y:90} },
            { p0:{x:-64, y:90}, p1:{x:-32, y:100}, p2:{x:32, y:100}, p3:{x:64, y:90} }
        ];

        // 6. TRUNK (Hero Moment - Vakratunda)
        this.trunkCurves = [
            { p0:{x:-12, y:2}, p1:{x:-16, y:16}, p2:{x:-16, y:30}, p3:{x:-14, y:42} },
            { p0:{x:12, y:2}, p1:{x:16, y:16}, p2:{x:14, y:30}, p3:{x:8, y:42} },
            { p0:{x:-14, y:42}, p1:{x:-12, y:54}, p2:{x:-24, y:60}, p3:{x:-38, y:54} },
            { p0:{x:8, y:42}, p1:{x:2, y:56}, p2:{x:-14, y:70}, p3:{x:-36, y:68} },
            { p0:{x:-38, y:54}, p1:{x:-46, y:52}, p2:{x:-50, y:62}, p3:{x:-42, y:68} },
            { p0:{x:-42, y:68}, p1:{x:-34, y:72}, p2:{x:-26, y:66}, p3:{x:-30, y:58} },

            // Natural Wrinkles
            { p0:{x:-14, y:16}, p1:{x:0, y:18}, p2:{x:0, y:18}, p3:{x:14, y:16} },
            { p0:{x:-15, y:24}, p1:{x:0, y:27}, p2:{x:0, y:27}, p3:{x:13, y:24} },
            { p0:{x:-14, y:34}, p1:{x:0, y:37}, p2:{x:0, y:37}, p3:{x:10, y:34} },
            { p0:{x:-16, y:46}, p1:{x:-6, y:49}, p2:{x:-4, y:52}, p3:{x:4, y:47} },
            { p0:{x:-26, y:56}, p1:{x:-20, y:60}, p2:{x:-18, y:63}, p3:{x:-10, y:58} }
        ];

        // 7. TUSKS
        this.tuskCurves = [
            { p0:{x:-16, y:16}, p1:{x:-24, y:18}, p2:{x:-32, y:26}, p3:{x:-34, y:32} },
            { p0:{x:-34, y:32}, p1:{x:-30, y:30}, p2:{x:-22, y:22}, p3:{x:-14, y:20} },
            { p0:{x:16, y:16}, p1:{x:22, y:18}, p2:{x:26, y:21}, p3:{x:26, y:24} },
            { p0:{x:26, y:24}, p1:{x:24, y:25}, p2:{x:18, y:22}, p3:{x:14, y:20} }
        ];

        // 8 & 9. ARMS & HANDS
        this.handCurves = [
            // Abhaya Mudra
            { p0:{x:48, y:42}, p1:{x:60, y:40}, p2:{x:66, y:46}, p3:{x:62, y:58} },
            { p0:{x:62, y:50}, p1:{x:68, y:36}, p2:{x:72, y:38}, p3:{x:66, y:50} },
            { p0:{x:66, y:50}, p1:{x:72, y:34}, p2:{x:76, y:36}, p3:{x:70, y:51} },
            { p0:{x:70, y:51}, p1:{x:74, y:38}, p2:{x:77, y:41}, p3:{x:72, y:54} },

            // Modak Hand & Bowl
            { p0:{x:-48, y:44}, p1:{x:-60, y:48}, p2:{x:-58, y:64}, p3:{x:-46, y:66} },
            { p0:{x:-54, y:56}, p1:{x:-62, y:66}, p2:{x:-36, y:66}, p3:{x:-44, y:56} }
        ];

        // 10 & 11. FACE & EYES
        this.faceCurves = [
            { p0:{x:-24, y:0}, p1:{x:-18, y:-6}, p2:{x:-10, y:-6}, p3:{x:-6, y:0} },
            { p0:{x:6, y:0}, p1:{x:10, y:-6}, p2:{x:18, y:-6}, p3:{x:24, y:0} }
        ];

        this.leftEyeCurves = [
            { p0:{x:-22, y:2}, p1:{x:-18, y:-3}, p2:{x:-11, y:-3}, p3:{x:-7, y:3} },
            { p0:{x:-22, y:2}, p1:{x:-18, y:6}, p2:{x:-11, y:6}, p3:{x:-7, y:3} }
        ];

        this.rightEyeCurves = [
            { p0:{x:7, y:3}, p1:{x:11, y:-3}, p2:{x:18, y:-3}, p3:{x:22, y:2} },
            { p0:{x:7, y:3}, p1:{x:11, y:6}, p2:{x:18, y:6}, p3:{x:22, y:2} }
        ];

        // 12. TILAK
        this.tilakCurves = [
            { p0:{x:0, y:-24}, p1:{x:0, y:-8}, p2:{x:0, y:-8}, p3:{x:0, y:-2} },
            { p0:{x:-8, y:-18}, p1:{x:-6, y:-12}, p2:{x:-2, y:-6}, p3:{x:0, y:-2} },
            { p0:{x:8, y:-18}, p1:{x:6, y:-12}, p2:{x:2, y:-6}, p3:{x:0, y:-2} },
            { p0:{x:-10, y:-22}, p1:{x:0, y:-18}, p2:{x:0, y:-18}, p3:{x:10, y:-22} }
        ];

        // 13. CROWN (Kireeta Mukut)
        this.crownCurves = [
            { p0:{x:-32, y:-26}, p1:{x:0, y:-30}, p2:{x:0, y:-30}, p3:{x:32, y:-26} },
            { p0:{x:-32, y:-26}, p1:{x:-27, y:-40}, p2:{x:27, y:-40}, p3:{x:32, y:-26} },
            { p0:{x:-25, y:-40}, p1:{x:0, y:-43}, p2:{x:0, y:-43}, p3:{x:25, y:-40} },
            { p0:{x:-25, y:-40}, p1:{x:-22, y:-52}, p2:{x:22, y:-52}, p3:{x:25, y:-40} },
            { p0:{x:-18, y:-52}, p1:{x:0, y:-55}, p2:{x:0, y:-55}, p3:{x:18, y:-52} },
            { p0:{x:0, y:-72}, p1:{x:14, y:-66}, p2:{x:12, y:-56}, p3:{x:0, y:-52} },
            { p0:{x:0, y:-72}, p1:{x:-14, y:-66}, p2:{x:-12, y:-56}, p3:{x:0, y:-52} },
            { p0:{x:0, y:-88}, p1:{x:4, y:-82}, p2:{x:4, y:-76}, p3:{x:0, y:-72} },
            { p0:{x:0, y:-88}, p1:{x:-4, y:-82}, p2:{x:-4, y:-76}, p3:{x:0, y:-72} }
        ];

        // 14. JEWELRY
        this.jewelryCurves = [
            { p0:{x:-50, y:32}, p1:{x:-56, y:42}, p2:{x:-44, y:42}, p3:{x:-50, y:32} },
            { p0:{x:50, y:32}, p1:{x:56, y:42}, p2:{x:44, y:42}, p3:{x:50, y:32} },
            { p0:{x:-22, y:26}, p1:{x:0, y:34}, p2:{x:0, y:34}, p3:{x:22, y:26} },
            { p0:{x:-26, y:32}, p1:{x:0, y:44}, p2:{x:0, y:44}, p3:{x:26, y:32} },
            { p0:{x:-30, y:38}, p1:{x:0, y:54}, p2:{x:0, y:54}, p3:{x:30, y:38} },
            { p0:{x:-24, y:30}, p1:{x:-16, y:50}, p2:{x:6, y:70}, p3:{x:26, y:82} },
            { p0:{x:-15, y:28}, p1:{x:0, y:31}, p2:{x:0, y:31}, p3:{x:12, y:28} }
        ];

        // 15. MODAK SWEET
        this.modakCurves = [
            { p0:{x:-50, y:56}, p1:{x:-48, y:48}, p2:{x:-46, y:48}, p3:{x:-44, y:56} }
        ];
    }
}

export class SculpturalEngine {
    constructor(ctx, toScreenFn) {
        this.ctx = ctx;
        this.toScreen = toScreenFn;
    }

    drawVolumetricSculpture(scale, cx, cy, weight, innerGlow = 0) {
        if (weight <= 0.01) return;
        const ctx = this.ctx;
        ctx.save();

        const toSc = (pt) => this.toScreen(pt, scale, cx, cy);

        // 1. LOTUS PEDESTAL THRONE
        ctx.beginPath();
        const lb0 = toSc({x:-68, y:90}), lb1 = toSc({x:-32, y:106}), lb2 = toSc({x:32, y:106}), lb3 = toSc({x:68, y:90});
        ctx.moveTo(lb0.x, lb0.y);
        ctx.bezierCurveTo(lb1.x, lb1.y, lb2.x, lb2.y, lb3.x, lb3.y);
        ctx.lineTo(toSc({x:68, y:98}).x, toSc({x:68, y:98}).y);
        ctx.lineTo(toSc({x:-68, y:98}).x, toSc({x:-68, y:98}).y);
        ctx.closePath();
        const lotusGrad = ctx.createLinearGradient(lb0.x, lb0.y, lb3.x, lb3.y);
        lotusGrad.addColorStop(0, `rgba(184, 134, 11, ${0.92 * weight})`);
        lotusGrad.addColorStop(0.5, `rgba(255, 230, 150, ${0.96 * weight})`);
        lotusGrad.addColorStop(1, `rgba(138, 90, 5, ${0.92 * weight})`);
        ctx.fillStyle = lotusGrad;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
        ctx.shadowBlur = 16 * weight;
        ctx.fill();

        // 2. BROAD EARS
        const drawEarLobe = (isLeft) => {
            const sign = isLeft ? -1 : 1;
            ctx.beginPath();
            const e0 = toSc({x: sign * 32, y: -24});
            const e1 = toSc({x: sign * 65, y: -30});
            const e2 = toSc({x: sign * 84, y: -6});
            const e3 = toSc({x: sign * 78, y: 18});
            const e4 = toSc({x: sign * 72, y: 32});
            const e5 = toSc({x: sign * 48, y: 36});
            const e6 = toSc({x: sign * 28, y: 22});
            ctx.moveTo(e0.x, e0.y);
            ctx.bezierCurveTo(e1.x, e1.y, e2.x, e2.y, e3.x, e3.y);
            ctx.bezierCurveTo(e4.x, e4.y, e5.x, e5.y, e6.x, e6.y);
            ctx.closePath();

            const earGrad = ctx.createRadialGradient(
                cx + sign * 52 * scale, cy + 5 * scale, 5 * scale,
                cx + sign * 52 * scale, cy + 5 * scale, 48 * scale
            );
            earGrad.addColorStop(0, `rgba(214, 104, 53, ${0.95 * weight})`);
            earGrad.addColorStop(0.6, `rgba(168, 76, 36, ${0.95 * weight})`);
            earGrad.addColorStop(1, `rgba(59, 18, 6, ${0.98 * weight})`);
            ctx.fillStyle = earGrad;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 12 * weight;
            ctx.fill();
        };
        drawEarLobe(true);
        drawEarLobe(false);

        // 3. TORSO & BELLY
        ctx.beginPath();
        const b0 = toSc({x:-36, y:28}), b1 = toSc({x:-58, y:54}), b2 = toSc({x:-48, y:86}), b3 = toSc({x:0, y:90});
        const b4 = toSc({x:48, y:86}), b5 = toSc({x:58, y:54}), b6 = toSc({x:36, y:28});
        ctx.moveTo(b0.x, b0.y);
        ctx.bezierCurveTo(b1.x, b1.y, b2.x, b2.y, b3.x, b3.y);
        ctx.bezierCurveTo(b4.x, b4.y, b5.x, b5.y, b6.x, b6.y);
        ctx.closePath();

        const bellyGrad = ctx.createRadialGradient(cx, cy + 56 * scale, 10 * scale, cx, cy + 56 * scale, 62 * scale);
        bellyGrad.addColorStop(0, `rgba(224, 115, 60, ${0.95 * weight})`);
        bellyGrad.addColorStop(0.5, `rgba(168, 76, 36, ${0.95 * weight})`);
        bellyGrad.addColorStop(1, `rgba(45, 14, 5, ${0.98 * weight})`);
        ctx.fillStyle = bellyGrad;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 18 * weight;
        ctx.fill();

        // 4. HEAD DOME
        ctx.beginPath();
        const h0 = toSc({x:-32, y:-26}), h1 = toSc({x:-40, y:-10}), h2 = toSc({x:-28, y:20}), h3 = toSc({x:0, y:20});
        const h4 = toSc({x:28, y:20}), h5 = toSc({x:40, y:-10}), h6 = toSc({x:32, y:-26});
        ctx.moveTo(h0.x, h0.y);
        ctx.bezierCurveTo(h1.x, h1.y, h2.x, h2.y, h3.x, h3.y);
        ctx.bezierCurveTo(h4.x, h4.y, h5.x, h5.y, h6.x, h6.y);
        ctx.closePath();

        const headGrad = ctx.createRadialGradient(cx, cy - 6 * scale, 8 * scale, cx, cy - 6 * scale, 42 * scale);
        headGrad.addColorStop(0, `rgba(228, 120, 65, ${0.96 * weight})`);
        headGrad.addColorStop(0.5, `rgba(168, 76, 36, ${0.96 * weight})`);
        headGrad.addColorStop(1, `rgba(50, 16, 6, ${0.98 * weight})`);
        ctx.fillStyle = headGrad;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 14 * weight;
        ctx.fill();

        // 5. VOLUMETRIC TRUNK
        ctx.beginPath();
        const t0 = toSc({x:-12, y:2}), t1 = toSc({x:-16, y:30}), t2 = toSc({x:-14, y:42}), t3 = toSc({x:-38, y:54});
        const t4 = toSc({x:-48, y:62}), t5 = toSc({x:-38, y:68}), t6 = toSc({x:-32, y:58});
        const t7 = toSc({x:2, y:56}), t8 = toSc({x:14, y:30}), t9 = toSc({x:12, y:2});
        ctx.moveTo(t0.x, t0.y);
        ctx.bezierCurveTo(t1.x, t1.y, t2.x, t2.y, t3.x, t3.y);
        ctx.bezierCurveTo(t4.x, t4.y, t5.x, t5.y, t6.x, t6.y);
        ctx.bezierCurveTo(t7.x, t7.y, t8.x, t8.y, t9.x, t9.y);
        ctx.closePath();

        const trunkGrad = ctx.createRadialGradient(cx - 8 * scale, cy + 34 * scale, 5 * scale, cx - 8 * scale, cy + 34 * scale, 38 * scale);
        trunkGrad.addColorStop(0, `rgba(230, 122, 68, ${0.98 * weight})`);
        trunkGrad.addColorStop(0.6, `rgba(168, 76, 36, ${0.98 * weight})`);
        trunkGrad.addColorStop(1, `rgba(45, 14, 5, ${0.99 * weight})`);
        ctx.fillStyle = trunkGrad;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 12 * weight;
        ctx.fill();

        // 6. IVORY TUSKS
        // Left Intact
        ctx.beginPath();
        const tu0 = toSc({x:-16, y:16}), tu1 = toSc({x:-32, y:26}), tu2 = toSc({x:-34, y:32}), tu3 = toSc({x:-14, y:20});
        ctx.moveTo(tu0.x, tu0.y);
        ctx.bezierCurveTo(tu1.x, tu1.y, tu2.x, tu2.y, tu3.x, tu3.y);
        ctx.closePath();
        const ivoryGrad = ctx.createLinearGradient(tu0.x, tu0.y, tu2.x, tu2.y);
        ivoryGrad.addColorStop(0, `rgba(255, 252, 238, ${0.98 * weight})`);
        ivoryGrad.addColorStop(1, `rgba(194, 179, 147, ${0.98 * weight})`);
        ctx.fillStyle = ivoryGrad;
        ctx.shadowColor = 'rgba(255, 245, 220, 0.4)';
        ctx.shadowBlur = 6 * weight;
        ctx.fill();

        // Right Broken (Ekadanta)
        ctx.beginPath();
        const tb0 = toSc({x:16, y:16}), tb1 = toSc({x:26, y:21}), tb2 = toSc({x:26, y:24}), tb3 = toSc({x:14, y:20});
        ctx.moveTo(tb0.x, tb0.y);
        ctx.bezierCurveTo(tb1.x, tb1.y, tb2.x, tb2.y, tb3.x, tb3.y);
        ctx.closePath();
        ctx.fillStyle = ivoryGrad;
        ctx.fill();

        // 7. GOLDEN CROWN (24K Temple Gold)
        ctx.beginPath();
        const c0 = toSc({x:-32, y:-26}), c1 = toSc({x:-25, y:-52}), c2 = toSc({x:0, y:-88}), c3 = toSc({x:25, y:-52}), c4 = toSc({x:32, y:-26});
        ctx.moveTo(c0.x, c0.y);
        ctx.lineTo(c1.x, c1.y);
        ctx.lineTo(c2.x, c2.y);
        ctx.lineTo(c3.x, c3.y);
        ctx.lineTo(c4.x, c4.y);
        ctx.closePath();

        const goldCrownGrad = ctx.createLinearGradient(c0.x, c0.y, c3.x, c2.y);
        goldCrownGrad.addColorStop(0, `rgba(255, 242, 168, ${0.98 * weight})`);
        goldCrownGrad.addColorStop(0.3, `rgba(243, 203, 105, ${0.98 * weight})`);
        goldCrownGrad.addColorStop(0.7, `rgba(184, 134, 11, ${0.98 * weight})`);
        goldCrownGrad.addColorStop(1, `rgba(255, 235, 140, ${0.98 * weight})`);
        ctx.fillStyle = goldCrownGrad;
        ctx.shadowColor = 'rgba(243, 203, 105, 0.6)';
        ctx.shadowBlur = 15 * weight;
        ctx.fill();

        // Center Ruby Crown Gem
        ctx.beginPath();
        const rCenter = toSc({x:0, y:-44});
        ctx.arc(rCenter.x, rCenter.y, 5.5 * scale, 0, Math.PI * 2);
        const rubyGrad = ctx.createRadialGradient(rCenter.x, rCenter.y, 1, rCenter.x, rCenter.y, 5.5 * scale);
        rubyGrad.addColorStop(0, `rgba(255, 75, 95, ${0.98 * weight})`);
        rubyGrad.addColorStop(1, `rgba(175, 15, 35, ${0.98 * weight})`);
        ctx.fillStyle = rubyGrad;
        ctx.shadowColor = 'rgba(255, 50, 70, 0.7)';
        ctx.shadowBlur = 10 * weight;
        ctx.fill();

        // 8. SACRED LOTUS-ALMOND EYES (Classical Serene Downward Gaze)
        const drawSacredEye = (cxEye, cyEye, isLeft) => {
            const eCenter = toSc({x: cxEye, y: cyEye});
            const wE = 7.2 * scale;
            const hE = 3.6 * scale;
            const sign = isLeft ? -1 : 1;

            ctx.save();

            // Sclera with soft sacred lotus shape
            ctx.beginPath();
            ctx.moveTo(eCenter.x - wE, eCenter.y + 0.5 * scale);
            ctx.bezierCurveTo(
                eCenter.x - wE * 0.4, eCenter.y - hE * 1.05,
                eCenter.x + wE * 0.4, eCenter.y - hE * 1.05,
                eCenter.x + wE, eCenter.y + 0.3 * scale
            );
            ctx.bezierCurveTo(
                eCenter.x + wE * 0.4, eCenter.y + hE * 0.75,
                eCenter.x - wE * 0.4, eCenter.y + hE * 0.75,
                eCenter.x - wE, eCenter.y + 0.5 * scale
            );
            ctx.closePath();

            const eyeBg = ctx.createLinearGradient(eCenter.x, eCenter.y - hE, eCenter.x, eCenter.y + hE);
            eyeBg.addColorStop(0, `rgba(255, 246, 235, ${0.98 * weight})`);
            eyeBg.addColorStop(1, `rgba(240, 224, 205, ${0.98 * weight})`);
            ctx.fillStyle = eyeBg;
            ctx.fill();

            // Iris: Warm devotional amber-brown with depth
            ctx.save();
            ctx.clip(); // clip to eye boundary
            ctx.beginPath();
            const irisX = eCenter.x + sign * 0.3 * scale;
            const irisY = eCenter.y - 0.2 * scale;
            const irisR = 2.8 * scale;
            ctx.arc(irisX, irisY, irisR, 0, Math.PI * 2);
            const irisGrad = ctx.createRadialGradient(irisX, irisY - 0.5 * scale, 0.4 * scale, irisX, irisY, irisR);
            irisGrad.addColorStop(0, `rgba(60, 28, 12, ${0.99 * weight})`);
            irisGrad.addColorStop(0.7, `rgba(32, 14, 6, ${0.99 * weight})`);
            irisGrad.addColorStop(1, `rgba(14, 5, 2, ${0.99 * weight})`);
            ctx.fillStyle = irisGrad;
            ctx.fill();

            // Pupil
            ctx.beginPath();
            ctx.arc(irisX, irisY, 1.4 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(5, 2, 1, ${0.99 * weight})`;
            ctx.fill();

            // Divine Catchlight Specular
            ctx.beginPath();
            ctx.arc(irisX - 0.7 * scale, irisY - 0.8 * scale, 0.75 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.98 * weight})`;
            ctx.shadowColor = '#fffbe8';
            ctx.shadowBlur = 4 * weight;
            ctx.fill();

            // Subtle warm golden reflection at lower iris
            ctx.beginPath();
            ctx.arc(irisX + 0.5 * scale, irisY + 0.9 * scale, 0.6 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 120, ${0.75 * weight})`;
            ctx.fill();
            ctx.restore();

            // Kohl Upper Eyelid Stroke (Graceful curved eyeliner)
            ctx.beginPath();
            ctx.moveTo(eCenter.x - wE * 1.08, eCenter.y + 0.6 * scale);
            ctx.bezierCurveTo(
                eCenter.x - wE * 0.4, eCenter.y - hE * 1.15,
                eCenter.x + wE * 0.4, eCenter.y - hE * 1.15,
                eCenter.x + wE * 1.08, eCenter.y + 0.4 * scale
            );
            ctx.strokeStyle = `rgba(45, 16, 8, ${0.95 * weight})`;
            ctx.lineWidth = 1.6 * scale;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Delicate Arched Brow Ridge
            ctx.beginPath();
            ctx.moveTo(eCenter.x - wE * 0.9, eCenter.y - hE * 1.7);
            ctx.bezierCurveTo(
                eCenter.x - wE * 0.1, eCenter.y - hE * 2.3,
                eCenter.x + wE * 0.5, eCenter.y - hE * 2.0,
                eCenter.x + wE * 1.0, eCenter.y - hE * 1.3
            );
            ctx.strokeStyle = `rgba(180, 85, 40, ${0.55 * weight})`;
            ctx.lineWidth = 1.2 * scale;
            ctx.stroke();

            ctx.restore();
        };
        drawSacredEye(-15, 2.5, true);
        drawSacredEye(15, 2.5, false);

        // 9. SACRED CHANDAN CRESCENT & VERMILION TILAK
        ctx.save();
        const tlk = toSc({x:0, y:-10});

        // Golden Sandalwood Crescent (Chandan)
        ctx.beginPath();
        ctx.arc(tlk.x, tlk.y + 3 * scale, 7.5 * scale, 0.2 * Math.PI, 0.8 * Math.PI, false);
        ctx.strokeStyle = `rgba(255, 228, 140, ${0.95 * weight})`;
        ctx.lineWidth = 2.2 * scale;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Sacred Vermilion Flame (Kumkum)
        ctx.beginPath();
        ctx.moveTo(tlk.x, tlk.y - 9 * scale);
        ctx.bezierCurveTo(tlk.x + 3.2 * scale, tlk.y - 2 * scale, tlk.x + 3.2 * scale, tlk.y + 5 * scale, tlk.x, tlk.y + 6 * scale);
        ctx.bezierCurveTo(tlk.x - 3.2 * scale, tlk.y + 5 * scale, tlk.x - 3.2 * scale, tlk.y - 2 * scale, tlk.x, tlk.y - 9 * scale);
        ctx.closePath();
        const kumkumGrad = ctx.createLinearGradient(tlk.x, tlk.y - 9 * scale, tlk.x, tlk.y + 6 * scale);
        kumkumGrad.addColorStop(0, `rgba(255, 60, 75, ${0.98 * weight})`);
        kumkumGrad.addColorStop(0.7, `rgba(200, 20, 35, ${0.98 * weight})`);
        kumkumGrad.addColorStop(1, `rgba(120, 8, 18, ${0.98 * weight})`);
        ctx.fillStyle = kumkumGrad;
        ctx.shadowColor = 'rgba(230, 30, 50, 0.8)';
        ctx.shadowBlur = 10 * weight;
        ctx.fill();

        // Inner Golden Bindu Point
        ctx.beginPath();
        ctx.arc(tlk.x, tlk.y + 1 * scale, 1.2 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 180, ${0.98 * weight})`;
        ctx.shadowColor = '#fff3a8';
        ctx.shadowBlur = 6 * weight;
        ctx.fill();
        ctx.restore();

        // 10. LEFT ARM & WRIST (Cupping Modak Bowl)
        ctx.save();
        ctx.beginPath();
        const la0 = toSc({x: -36, y: 34});
        const la1 = toSc({x: -48, y: 40});
        const la2 = toSc({x: -56, y: 50});
        const la3 = toSc({x: -50, y: 64});
        const la4 = toSc({x: -38, y: 58});
        const la5 = toSc({x: -32, y: 42});
        ctx.moveTo(la0.x, la0.y);
        ctx.bezierCurveTo(la1.x, la1.y, la2.x, la2.y, la3.x, la3.y);
        ctx.bezierCurveTo(la4.x, la4.y, la5.x, la5.y, la0.x, la0.y);
        ctx.closePath();
        const lArmGrad = ctx.createRadialGradient(cx - 46 * scale, cy + 46 * scale, 3 * scale, cx - 46 * scale, cy + 46 * scale, 24 * scale);
        lArmGrad.addColorStop(0, `rgba(224, 115, 60, ${0.98 * weight})`);
        lArmGrad.addColorStop(0.7, `rgba(168, 76, 36, ${0.98 * weight})`);
        lArmGrad.addColorStop(1, `rgba(50, 16, 6, ${0.98 * weight})`);
        ctx.fillStyle = lArmGrad;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10 * weight;
        ctx.fill();

        // Golden Wrist Bracelet (Kankana) on left wrist
        ctx.beginPath();
        const lw = toSc({x: -48, y: 56});
        ctx.ellipse(lw.x, lw.y, 4.5 * scale, 3 * scale, -0.4, 0, Math.PI * 2);
        ctx.fillStyle = goldCrownGrad;
        ctx.shadowColor = 'rgba(255, 215, 100, 0.6)';
        ctx.shadowBlur = 8 * weight;
        ctx.fill();

        // Golden Offering Bowl
        const bowlPt = toSc({x:-48, y:58});
        ctx.beginPath();
        ctx.arc(bowlPt.x, bowlPt.y, 9.5 * scale, 0, Math.PI);
        ctx.fillStyle = goldCrownGrad;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 8 * weight;
        ctx.fill();

        // Sculpted Modak Body (Teardrop conical fluted shape)
        const mX = bowlPt.x;
        const mY = bowlPt.y - 3 * scale;
        ctx.beginPath();
        ctx.moveTo(mX, mY - 8.5 * scale); // Top conical tip
        ctx.bezierCurveTo(mX + 5.5 * scale, mY - 3 * scale, mX + 6.5 * scale, mY + 1.5 * scale, mX + 4.5 * scale, mY + 3.2 * scale);
        ctx.bezierCurveTo(mX + 2.5 * scale, mY + 4.2 * scale, mX - 2.5 * scale, mY + 4.2 * scale, mX - 4.5 * scale, mY + 3.2 * scale);
        ctx.bezierCurveTo(mX - 6.5 * scale, mY + 1.5 * scale, mX - 5.5 * scale, mY - 3 * scale, mX, mY - 8.5 * scale);
        ctx.closePath();

        const modakGrad = ctx.createRadialGradient(mX - 1.5 * scale, mY - 2 * scale, 1 * scale, mX, mY, 7 * scale);
        modakGrad.addColorStop(0, `rgba(255, 248, 200, ${0.99 * weight})`);
        modakGrad.addColorStop(0.5, `rgba(255, 215, 110, ${0.98 * weight})`);
        modakGrad.addColorStop(1, `rgba(212, 140, 20, ${0.98 * weight})`);
        ctx.fillStyle = modakGrad;
        ctx.shadowColor = 'rgba(255, 215, 100, 0.7)';
        ctx.shadowBlur = 12 * weight;
        ctx.fill();

        // Modak Fluted Sacred Ridges
        ctx.strokeStyle = `rgba(195, 120, 15, ${0.65 * weight})`;
        ctx.lineWidth = 1 * scale;
        [-2.8, -1.0, 1.0, 2.8].forEach(offset => {
            ctx.beginPath();
            ctx.moveTo(mX, mY - 8.2 * scale);
            ctx.quadraticCurveTo(mX + offset * 1.3 * scale, mY, mX + offset * scale, mY + 3.5 * scale);
            ctx.stroke();
        });
        ctx.restore();

        // 11. RIGHT ARM & BLESSING HAND (Abhaya Mudra — Divine Blessing Gesture)
        ctx.save();
        // Forearm descending gracefully from right shoulder
        ctx.beginPath();
        const ra0 = toSc({x: 36, y: 34});
        const ra1 = toSc({x: 50, y: 38});
        const ra2 = toSc({x: 58, y: 50});
        const ra3 = toSc({x: 52, y: 58});
        const ra4 = toSc({x: 42, y: 52});
        const ra5 = toSc({x: 32, y: 40});
        ctx.moveTo(ra0.x, ra0.y);
        ctx.bezierCurveTo(ra1.x, ra1.y, ra2.x, ra2.y, ra3.x, ra3.y);
        ctx.bezierCurveTo(ra4.x, ra4.y, ra5.x, ra5.y, ra0.x, ra0.y);
        ctx.closePath();
        const rArmGrad = ctx.createRadialGradient(cx + 46 * scale, cy + 44 * scale, 3 * scale, cx + 46 * scale, cy + 44 * scale, 24 * scale);
        rArmGrad.addColorStop(0, `rgba(224, 115, 60, ${0.98 * weight})`);
        rArmGrad.addColorStop(0.7, `rgba(168, 76, 36, ${0.98 * weight})`);
        rArmGrad.addColorStop(1, `rgba(50, 16, 6, ${0.98 * weight})`);
        ctx.fillStyle = rArmGrad;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10 * weight;
        ctx.fill();

        // Golden Wrist Bracelet (Kankana / Kada)
        ctx.beginPath();
        const rw = toSc({x: 50, y: 50});
        ctx.ellipse(rw.x, rw.y, 4.8 * scale, 3.2 * scale, 0.4, 0, Math.PI * 2);
        ctx.fillStyle = goldCrownGrad;
        ctx.shadowColor = 'rgba(255, 215, 100, 0.7)';
        ctx.shadowBlur = 8 * weight;
        ctx.fill();

        // Upright Open Blessing Palm (Abhaya Mudra)
        const pCenter = toSc({x: 52, y: 39});
        ctx.beginPath();
        ctx.ellipse(pCenter.x, pCenter.y, 6.2 * scale, 7.5 * scale, 0.08, 0, Math.PI * 2);
        const palmGrad = ctx.createRadialGradient(pCenter.x, pCenter.y, 1 * scale, pCenter.x, pCenter.y, 7 * scale);
        palmGrad.addColorStop(0, `rgba(240, 135, 75, ${0.99 * weight})`);
        palmGrad.addColorStop(0.6, `rgba(195, 90, 42, ${0.98 * weight})`);
        palmGrad.addColorStop(1, `rgba(135, 50, 20, ${0.98 * weight})`);
        ctx.fillStyle = palmGrad;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 12 * weight;
        ctx.fill();

        // 4 Upright Blessing Fingers (Natural Serene Mudra)
        const blessingFingers = [
            { x: 47.5, y: 30.5, h: 8.5, w: 2.2 },
            { x: 50.8, y: 28.8, h: 10.2, w: 2.3 },
            { x: 54.2, y: 29.8, h: 9.4, w: 2.2 },
            { x: 57.2, y: 32.5, h: 7.5, w: 2.0 }
        ];
        blessingFingers.forEach(f => {
            const fPt = toSc({x: f.x, y: f.y});
            ctx.beginPath();
            ctx.ellipse(fPt.x, fPt.y, f.w * 0.9 * scale, f.h * 0.5 * scale, 0.05, 0, Math.PI * 2);
            ctx.fillStyle = palmGrad;
            ctx.fill();

            // Delicate gold ring on ring finger
            if (f.x > 53 && f.x < 55) {
                ctx.beginPath();
                ctx.arc(fPt.x, fPt.y + 1 * scale, 1.6 * scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 235, 140, ${0.9 * weight})`;
                ctx.fill();
            }
        });

        // Gentle Thumb folded softly
        const thPt = toSc({x: 44.5, y: 41});
        ctx.beginPath();
        ctx.ellipse(thPt.x, thPt.y, 2.2 * scale, 4.5 * scale, -0.6, 0, Math.PI * 2);
        ctx.fillStyle = palmGrad;
        ctx.fill();

        // Sacred Red Padma/Chakra in center of Palm (Auspicious Blessing Symbol)
        ctx.beginPath();
        ctx.arc(pCenter.x, pCenter.y, 2.8 * scale, 0, Math.PI * 2);
        const padmaGrad = ctx.createRadialGradient(pCenter.x, pCenter.y, 0.2 * scale, pCenter.x, pCenter.y, 2.8 * scale);
        padmaGrad.addColorStop(0, `rgba(255, 65, 80, ${0.98 * weight})`);
        padmaGrad.addColorStop(0.7, `rgba(190, 20, 35, ${0.95 * weight})`);
        padmaGrad.addColorStop(1, `rgba(120, 10, 20, ${0.85 * weight})`);
        ctx.fillStyle = padmaGrad;
        ctx.shadowColor = 'rgba(255, 60, 80, 0.8)';
        ctx.shadowBlur = 8 * weight;
        ctx.fill();

        // Inner golden divine bindu in palm
        ctx.beginPath();
        ctx.arc(pCenter.x, pCenter.y, 1.0 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 180, ${0.99 * weight})`;
        ctx.shadowColor = '#fff2a8';
        ctx.shadowBlur = 5 * weight;
        ctx.fill();

        // Soft Divine Radiant Blessing Halo Rays from Palm
        ctx.strokeStyle = `rgba(255, 225, 130, ${0.45 * weight})`;
        ctx.lineWidth = 1 * scale;
        [-0.4, -0.2, 0, 0.2, 0.4].forEach(ang => {
            const r1 = 9 * scale;
            const r2 = 14 * scale;
            ctx.beginPath();
            ctx.moveTo(pCenter.x + Math.sin(ang) * r1, pCenter.y - Math.cos(ang) * r1);
            ctx.lineTo(pCenter.x + Math.sin(ang) * r2, pCenter.y - Math.cos(ang) * r2);
            ctx.stroke();
        });
        ctx.restore();

        // 11. DIVINE CORE GLOW
        if (innerGlow > 0.01) {
            const coreCenter = toSc({x:0, y:20});
            const coreGrad = ctx.createRadialGradient(coreCenter.x, coreCenter.y, 2 * scale, coreCenter.x, coreCenter.y, 45 * scale);
            coreGrad.addColorStop(0, `rgba(255, 230, 140, ${0.35 * innerGlow})`);
            coreGrad.addColorStop(0.5, `rgba(218, 140, 30, ${0.15 * innerGlow})`);
            coreGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(coreCenter.x, coreCenter.y, 45 * scale, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}
