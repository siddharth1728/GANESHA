/**
 * =========================================================================
 * PROJECT GANESHA — SACRED ATMOSPHERE & MANDAP (js/atmosphere.js)
 * Ceremonial Mandap, Diyas, Incense, Offerings, Rangoli & Particles
 * =========================================================================
 */

export class FestivalAtmosphereRenderer {
    constructor(ctx, toScreenFn) {
        this.ctx = ctx;
        this.toScreen = toScreenFn;
    }

    drawMandapArch(scale, cx, cy, mandapProg, globalTime) {
        if (mandapProg <= 0.01) return;
        const ctx = this.ctx;
        ctx.save();
        const toSc = (pt) => this.toScreen(pt, scale, cx, cy);

        // 1. Rich Crimson & Saffron Ceremonial Backdrop Drapery
        ctx.save();
        const bgW = 190 * scale;
        const bgH = 200 * scale;
        const dGrad = ctx.createRadialGradient(cx, cy - 30 * scale, 20 * scale, cx, cy, bgW);
        dGrad.addColorStop(0, `rgba(138, 20, 20, ${0.55 * mandapProg})`);
        dGrad.addColorStop(0.5, `rgba(74, 10, 10, ${0.45 * mandapProg})`);
        dGrad.addColorStop(1, `rgba(15, 3, 3, 0)`);
        ctx.fillStyle = dGrad;
        ctx.beginPath();
        ctx.ellipse(cx, cy - 10 * scale, bgW * 0.9, bgH * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 2. Carved Golden Temple Mandap Pillars & Arch
        ctx.save();
        ctx.strokeStyle = `rgba(218, 165, 32, ${0.75 * mandapProg})`;
        ctx.lineWidth = 3.5 * scale;
        ctx.shadowColor = 'rgba(255, 215, 100, 0.4)';
        ctx.shadowBlur = 10 * mandapProg;

        // Left Pillar
        const pL0 = toSc({x: -82, y: 105}), pL1 = toSc({x: -82, y: -45});
        ctx.beginPath();
        ctx.moveTo(pL0.x, pL0.y);
        ctx.lineTo(pL1.x, pL1.y);
        ctx.stroke();

        // Right Pillar
        const pR0 = toSc({x: 82, y: 105}), pR1 = toSc({x: 82, y: -45});
        ctx.beginPath();
        ctx.moveTo(pR0.x, pR0.y);
        ctx.lineTo(pR1.x, pR1.y);
        ctx.stroke();

        // Ornate Mandap Toran Arch Top
        const aTop = toSc({x: 0, y: -98});
        ctx.beginPath();
        ctx.moveTo(pL1.x, pL1.y);
        ctx.bezierCurveTo(cx - 50 * scale, cy - 85 * scale, cx - 25 * scale, cy - 98 * scale, aTop.x, aTop.y);
        ctx.bezierCurveTo(cx + 25 * scale, cy - 98 * scale, cx + 50 * scale, cy - 85 * scale, pR1.x, pR1.y);
        ctx.stroke();

        // 3. Mango-Leaf & Marigold Toran (Subtle swaying)
        const sway = Math.sin(globalTime * 0.0015) * 1.5 * scale;
        const toranCount = 9;
        for (let i = 0; i <= toranCount; i++) {
            const u = i / toranCount;
            const tx = -78 + (156 * u);
            const ty = -60 - Math.sin(u * Math.PI) * 26;
            const tPt = toSc({x: tx, y: ty});

            // Mango Leaf
            ctx.save();
            ctx.translate(tPt.x, tPt.y + sway);
            ctx.fillStyle = `rgba(45, 106, 79, ${0.9 * mandapProg})`;
            ctx.beginPath();
            ctx.ellipse(0, 7 * scale, 3 * scale, 8 * scale, (u - 0.5) * 0.4, 0, Math.PI * 2);
            ctx.fill();

            // Marigold Flower Blossom Knot
            ctx.fillStyle = i % 2 === 0 ? `rgba(247, 127, 0, ${0.95 * mandapProg})` : `rgba(252, 191, 73, ${0.95 * mandapProg})`;
            ctx.beginPath();
            ctx.arc(0, 0, 3.5 * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        ctx.restore();
        ctx.restore();
    }

    drawPujaOfferings(scale, cx, cy, flowerProg, globalTime) {
        if (flowerProg <= 0.01) return;
        const ctx = this.ctx;
        ctx.save();
        const toSc = (pt) => this.toScreen(pt, scale, cx, cy);

        // 1. Fresh Sacred Red Hibiscus Flowers beside Ganesha
        const drawHibiscus = (pt, scaleFactor = 1.0) => {
            const hPt = toSc(pt);
            ctx.save();
            ctx.translate(hPt.x, hPt.y);
            for (let p = 0; p < 5; p++) {
                ctx.save();
                ctx.rotate((p * Math.PI * 2) / 5);
                const pGrad = ctx.createRadialGradient(0, 0, 1, 0, 7 * scale, 12 * scale * scaleFactor);
                pGrad.addColorStop(0, `rgba(255, 60, 80, ${0.95 * flowerProg})`);
                pGrad.addColorStop(0.6, `rgba(214, 40, 40, ${0.95 * flowerProg})`);
                pGrad.addColorStop(1, `rgba(120, 10, 20, ${0.9 * flowerProg})`);
                ctx.fillStyle = pGrad;
                ctx.beginPath();
                ctx.ellipse(0, 6 * scale * scaleFactor, 4.5 * scale * scaleFactor, 7 * scale * scaleFactor, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            // Golden Pollen Stamen Column
            ctx.fillStyle = `rgba(255, 215, 0, ${0.95 * flowerProg})`;
            ctx.beginPath();
            ctx.arc(0, 0, 2.5 * scale * scaleFactor, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        };

        drawHibiscus({x: -46, y: 88}, 0.9);
        drawHibiscus({x: 46, y: 88}, 0.9);
        drawHibiscus({x: 62, y: 94}, 0.75);

        // 2. Marigold Garlands Framing Pedestal
        const garlandPts = [
            {x:-68, y:92}, {x:-58, y:98}, {x:-46, y:102}, {x:-30, y:106}, 
            {x:-12, y:108}, {x:0, y:108}, {x:12, y:108}, {x:30, y:106}, 
            {x:46, y:102}, {x:58, y:98}, {x:68, y:92}
        ];
        garlandPts.forEach((pt, idx) => {
            const mPt = toSc(pt);
            ctx.save();
            ctx.fillStyle = idx % 2 === 0 ? `rgba(247, 127, 0, ${0.92 * flowerProg})` : `rgba(252, 191, 73, ${0.92 * flowerProg})`;
            ctx.shadowColor = 'rgba(247, 127, 0, 0.4)';
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.arc(mPt.x, mPt.y, 4.2 * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // 3. Sacred Durva Grass Blades (21 Grass Clusters)
        ctx.save();
        const dPt = toSc({x: -32, y: 85});
        ctx.strokeStyle = `rgba(45, 106, 79, ${0.9 * flowerProg})`;
        ctx.lineWidth = 1.4 * scale;
        for (let b = -3; b <= 3; b++) {
            ctx.beginPath();
            ctx.moveTo(dPt.x, dPt.y);
            ctx.quadraticCurveTo(dPt.x + b * 3 * scale, dPt.y - 10 * scale, dPt.x + b * 5 * scale, dPt.y - 14 * scale);
            ctx.stroke();
        }
        ctx.restore();

        // 4. Traditional Brass / Copper Kalash with Mango Leaves & Sacred Coconut
        const kPt = toSc({x: 74, y: 92});
        ctx.save();
        const kGrad = ctx.createLinearGradient(kPt.x - 8 * scale, kPt.y, kPt.x + 8 * scale, kPt.y);
        kGrad.addColorStop(0, `rgba(212, 175, 55, ${0.95 * flowerProg})`);
        kGrad.addColorStop(0.5, `rgba(255, 230, 150, ${0.98 * flowerProg})`);
        kGrad.addColorStop(1, `rgba(184, 134, 11, ${0.95 * flowerProg})`);
        ctx.fillStyle = kGrad;
        ctx.beginPath();
        ctx.arc(kPt.x, kPt.y + 4 * scale, 8 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Mango Leaves Crown
        ctx.fillStyle = `rgba(45, 106, 79, ${0.9 * flowerProg})`;
        for (let l = -2; l <= 2; l++) {
            ctx.beginPath();
            ctx.ellipse(kPt.x + l * 3.5 * scale, kPt.y - 4 * scale, 2.5 * scale, 6 * scale, l * 0.3, 0, Math.PI * 2);
            ctx.fill();
        }

        // Sacred Coconut (Sriphal with Mauli thread)
        ctx.fillStyle = `rgba(107, 68, 35, ${0.95 * flowerProg})`;
        ctx.beginPath();
        ctx.arc(kPt.x, kPt.y - 7 * scale, 5 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(217, 30, 54, ${0.9 * flowerProg})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        ctx.restore();
    }

    drawDiyasAndFlames(scale, cx, cy, diyaProg, globalTime) {
        if (diyaProg <= 0.01) return;
        const ctx = this.ctx;
        ctx.save();
        const toSc = (pt) => this.toScreen(pt, scale, cx, cy);

        const diyaPositions = [
            {x: -82, y: 98}, {x: -54, y: 104}, {x: 54, y: 104}, {x: 82, y: 98}
        ];

        diyaPositions.forEach((pos, idx) => {
            const dPt = toSc(pos);
            ctx.save();
            // Brass Diya Lamp Base
            const bGrad = ctx.createLinearGradient(dPt.x - 7 * scale, dPt.y, dPt.x + 7 * scale, dPt.y);
            bGrad.addColorStop(0, `rgba(184, 134, 11, ${0.95 * diyaProg})`);
            bGrad.addColorStop(0.5, `rgba(255, 235, 140, ${0.98 * diyaProg})`);
            bGrad.addColorStop(1, `rgba(138, 90, 5, ${0.95 * diyaProg})`);
            ctx.fillStyle = bGrad;
            ctx.beginPath();
            ctx.ellipse(dPt.x, dPt.y, 7.5 * scale, 3.5 * scale, 0, 0, Math.PI);
            ctx.fill();

            // Flickering Diya Flame
            const flicker = Math.sin(globalTime * 0.008 + idx * 2.1) * 0.15;
            const flameH = (11 + flicker * 3) * scale;
            const flameW = 4.2 * scale;

            // Warm Outer Glow
            const fGlow = ctx.createRadialGradient(dPt.x, dPt.y - 6 * scale, 1, dPt.x, dPt.y - 6 * scale, 24 * scale);
            fGlow.addColorStop(0, `rgba(255, 200, 80, ${0.65 * diyaProg})`);
            fGlow.addColorStop(0.4, `rgba(255, 120, 20, ${0.35 * diyaProg})`);
            fGlow.addColorStop(1, 'rgba(255, 100, 0, 0)');
            ctx.fillStyle = fGlow;
            ctx.beginPath();
            ctx.arc(dPt.x, dPt.y - 6 * scale, 24 * scale, 0, Math.PI * 2);
            ctx.fill();

            // Teardrop Flame Core
            ctx.beginPath();
            ctx.moveTo(dPt.x - flameW, dPt.y - 1 * scale);
            ctx.quadraticCurveTo(dPt.x - flameW, dPt.y - flameH * 0.6, dPt.x + flicker * 1.5 * scale, dPt.y - flameH);
            ctx.quadraticCurveTo(dPt.x + flameW, dPt.y - flameH * 0.6, dPt.x + flameW, dPt.y - 1 * scale);
            ctx.closePath();

            const flmGrad = ctx.createLinearGradient(dPt.x, dPt.y, dPt.x, dPt.y - flameH);
            flmGrad.addColorStop(0, `rgba(255, 90, 0, ${0.95 * diyaProg})`);
            flmGrad.addColorStop(0.6, `rgba(255, 215, 60, ${0.98 * diyaProg})`);
            flmGrad.addColorStop(1, `rgba(255, 255, 230, ${0.98 * diyaProg})`);
            ctx.fillStyle = flmGrad;
            ctx.shadowColor = 'rgba(255, 180, 50, 0.9)';
            ctx.shadowBlur = 12;
            ctx.fill();

            // Delicate Translucent Incense Smoke Wisp
            const sTime = globalTime * 0.002 + idx;
            ctx.strokeStyle = `rgba(255, 235, 200, ${0.18 * diyaProg})`;
            ctx.lineWidth = 1.0 * scale;
            ctx.beginPath();
            ctx.moveTo(dPt.x, dPt.y - flameH);
            ctx.bezierCurveTo(
                dPt.x + Math.sin(sTime) * 6 * scale, dPt.y - flameH - 12 * scale,
                dPt.x - Math.sin(sTime * 1.2) * 8 * scale, dPt.y - flameH - 24 * scale,
                dPt.x + Math.cos(sTime) * 10 * scale, dPt.y - flameH - 38 * scale
            );
            ctx.stroke();

            ctx.restore();
        });

        ctx.restore();
    }

    drawProceduralRangoli(scale, cx, cy, rangoliProg, globalTime) {
        if (rangoliProg <= 0.01) return;
        const ctx = this.ctx;
        ctx.save();
        const toSc = (pt) => this.toScreen(pt, scale, cx, cy);
        const rCenter = toSc({x: 0, y: 110});

        ctx.save();
        ctx.translate(rCenter.x, rCenter.y);

        const petals = 12;
        const rRadius = 46 * scale * rangoliProg;

        // Base Powder Radiance
        const rBg = ctx.createRadialGradient(0, 0, 5, 0, 0, rRadius * 1.15);
        rBg.addColorStop(0, `rgba(255, 190, 60, ${0.25 * rangoliProg})`);
        rBg.addColorStop(0.7, `rgba(214, 40, 40, ${0.20 * rangoliProg})`);
        rBg.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = rBg;
        ctx.beginPath();
        ctx.ellipse(0, 0, rRadius * 1.2, rRadius * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();

        // Symmetrical Lotus Rangoli Petals
        for (let i = 0; i < petals; i++) {
            const angle = (i * Math.PI * 2) / petals;
            ctx.save();
            ctx.rotate(angle);
            ctx.scale(1.0, 0.42);

            ctx.fillStyle = i % 2 === 0 ? `rgba(252, 191, 73, ${0.85 * rangoliProg})` : `rgba(217, 30, 54, ${0.85 * rangoliProg})`;
            ctx.beginPath();
            ctx.ellipse(0, rRadius * 0.55, 5 * scale, 12 * scale, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * rangoliProg})`;
            ctx.lineWidth = 1.2 * scale;
            ctx.stroke();

            ctx.fillStyle = `rgba(72, 202, 228, ${0.95 * rangoliProg})`;
            ctx.beginPath();
            ctx.arc(0, rRadius * 0.9, 1.8 * scale, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        // Central Sacred Lotus Mandala
        ctx.scale(1.0, 0.42);
        ctx.fillStyle = `rgba(255, 240, 200, ${0.95 * rangoliProg})`;
        ctx.beginPath();
        ctx.arc(0, 0, 6 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(212, 175, 55, ${0.9 * rangoliProg})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
        ctx.restore();
    }

    drawAartiAtmosphere(scale, cx, cy, aartiProg, globalTime) {
        if (aartiProg <= 0.01) return;
        const ctx = this.ctx;
        ctx.save();

        const aAngle = globalTime * 0.0018;
        const aRadius = 75 * scale;
        const ax = cx + Math.cos(aAngle) * aRadius * 0.85;
        const ay = (cy + 10 * scale) + Math.sin(aAngle) * aRadius * 0.55;

        const aartiGrad = ctx.createRadialGradient(ax, ay, 2 * scale, ax, ay, 65 * scale);
        aartiGrad.addColorStop(0, `rgba(255, 215, 100, ${0.28 * aartiProg})`);
        aartiGrad.addColorStop(0.5, `rgba(255, 140, 30, ${0.12 * aartiProg})`);
        aartiGrad.addColorStop(1, 'rgba(255, 100, 0, 0)');
        ctx.fillStyle = aartiGrad;
        ctx.beginPath();
        ctx.arc(ax, ay, 65 * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawDivineHalo(scale, cx, cy, haloProg, globalTime) {
        if (haloProg <= 0.01) return;
        const ctx = this.ctx;
        ctx.save();
        const breathe = 1 + Math.sin(globalTime * 0.0018) * 0.025;
        const hRadius = 96 * scale * breathe;

        const haloGrad = ctx.createRadialGradient(cx, cy - 6 * scale, 25 * scale, cx, cy - 6 * scale, hRadius * 1.35);
        haloGrad.addColorStop(0, `rgba(255, 225, 130, ${0.48 * haloProg})`);
        haloGrad.addColorStop(0.5, `rgba(218, 140, 30, ${0.26 * haloProg})`);
        haloGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(cx, cy - 6 * scale, hRadius * 1.35, 0, Math.PI * 2);
        ctx.fill();

        // 16 Sunburst Rays
        ctx.strokeStyle = `rgba(255, 235, 170, ${0.35 * haloProg})`;
        ctx.lineWidth = 1.3;
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
            const r1 = 65 * scale;
            const r2 = (88 + (Math.sin(a * 4 + globalTime * 0.001) * 6)) * scale;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a) * r1, (cy - 6 * scale) + Math.sin(a) * r1);
            ctx.lineTo(cx + Math.cos(a) * r2, (cy - 6 * scale) + Math.sin(a) * r2);
            ctx.stroke();
        }

        // Halo Ring
        ctx.strokeStyle = `rgba(255, 240, 180, ${0.65 * haloProg})`;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = 'rgba(255, 215, 100, 0.8)';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(cx, cy - 6 * scale, 84 * scale * breathe, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}
