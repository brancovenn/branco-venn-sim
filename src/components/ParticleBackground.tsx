import React, { useEffect, useRef } from 'react';

const COLORS = [
    '#3B82F6', // Blue
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#F97316', // Orange
    '#EF4444', // Red
    '#F59E0B', // Amber
];

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseAngle: number;
    driftSpeed: number;
    color: string;
    size: number;
    baseOpacity: number;
    phase: number; // for soft sine wave pulsing
}

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: Particle[] = [];
        const particleCount = Math.floor((width * height) / 4000);

        // Mouse tracking for fluid wake
        let mouseX = -1000;
        let mouseY = -1000;
        let prevMouseX = -1000;
        let prevMouseY = -1000;

        const handleMouseMove = (e: MouseEvent) => {
            if (prevMouseX === -1000) {
                prevMouseX = e.clientX;
                prevMouseY = e.clientY;
            } else {
                prevMouseX = mouseX;
                prevMouseY = mouseY;
            }
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
            prevMouseX = -1000;
            prevMouseY = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;

            // Base flow direction (gentle diagonal)
            const dx = x - (-width * 0.2);
            const dy = y - (height * 1.2);
            const baseAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5;

            particles.push({
                x,
                y,
                vx: 0,
                vy: 0,
                baseAngle,
                driftSpeed: 0.8 + Math.random() * 1.0, // Increased base speed
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: 1 + Math.random() * 2.5,
                baseOpacity: 0.15 + Math.random() * 0.6,
                phase: Math.random() * Math.PI * 2,
            });
        }

        let animationFrameId: number;
        let time = 0;
        let lastTime: number | null = null;

        const render = (timestamp: number) => {
            if (!lastTime) lastTime = timestamp;
            let dt = timestamp - lastTime;
            // Prevent massive jumps if tab was hidden (limit max equivalent dropped frames)
            if (dt > 200) dt = 6.944;
            const dtMod = dt / 6.944; // Multiplier: 1.0 at 144Hz, ~2.4 at 60Hz
            lastTime = timestamp;

            // Keep a tiny bit of trailing for extra fluid smoothness, mostly clear
            ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Solid clear to prevent smearing too much
            ctx.clearRect(0, 0, width, height);

            time += 0.05 * dtMod;

            // Calculate exact mouse velocity (wake speed)
            const mouseVx = (mouseX - prevMouseX) / dtMod;
            const mouseVy = (mouseY - prevMouseY) / dtMod;
            const mouseSpeed = Math.sqrt(mouseVx * mouseVx + mouseVy * mouseVy);

            // Constantly decay prevMouse to mouse so velocity hits 0 when stopped
            const decay = Math.min(1, 0.3 * dtMod);
            prevMouseX += (mouseX - prevMouseX) * decay;
            prevMouseY += (mouseY - prevMouseY) * decay;

            particles.forEach((p) => {
                // Determine base gentle drifting direction
                const currentAngle = p.baseAngle + Math.sin(time * 0.5 + p.phase) * 0.3;

                // Slowly pull velocity back to the base drift
                const targetVx = Math.cos(currentAngle) * p.driftSpeed;
                const targetVy = Math.sin(currentAngle) * p.driftSpeed;

                // Add soft fluid friction to return to normal
                const friction = Math.min(1, 0.04 * dtMod);
                p.vx += (targetVx - p.vx) * friction;
                p.vy += (targetVy - p.vy) * friction;

                // Mouse interaction - Fluid Wave / Wake
                if (mouseX > 0) {
                    const dx = p.x - mouseX;
                    const dy = p.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const interactionRadius = 250;

                    if (dist < interactionRadius) {
                        // The closer, the stronger the force
                        const force = Math.pow((interactionRadius - dist) / interactionRadius, 1.5);

                        // 1. Radial push (gently push away from cursor like a bubble)
                        const repelPower = 1.5;
                        p.vx += (dx / dist) * force * repelPower * dtMod;
                        p.vy += (dy / dist) * force * repelPower * dtMod;

                        // 2. Wake drag (pull particles along with the swiping motion)
                        if (mouseSpeed > 0) {
                            const clampSpeed = Math.min(mouseSpeed, 50); // prevent crazy jumps
                            p.vx += (mouseVx / clampSpeed) * force * 1.0 * dtMod;
                            p.vy += (mouseVy / clampSpeed) * force * 1.0 * dtMod;
                        }
                    }
                }

                // Apply velocity to position
                p.x += p.vx * dtMod;
                p.y += p.vy * dtMod;

                // Screen wrapping
                if (p.x < -50) p.x = width + 50;
                else if (p.x > width + 50) p.x = -50;
                if (p.y < -50) p.y = height + 50;
                else if (p.y > height + 50) p.y = -50;

                // Render particle as a streak reflecting its true velocity
                // This creates natural looking "dashes" that stretch when excited and shrink when calm
                ctx.beginPath();

                // Minimum trail size so they are visible even when resting
                let lookBackX = p.vx * 3.5;
                let lookBackY = p.vy * 3.5;
                const currentSpd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

                if (currentSpd < 0.5) {
                    lookBackX = Math.cos(currentAngle) * 2;
                    lookBackY = Math.sin(currentAngle) * 2;
                }

                ctx.moveTo(p.x - lookBackX, p.y - lookBackY);
                ctx.lineTo(p.x, p.y);

                ctx.strokeStyle = p.color;

                // Briefly glow brighter when moving very fast in the wave
                const intensity = Math.min(1, currentSpd / 5);
                ctx.globalAlpha = p.baseOpacity + intensity * 0.4;

                ctx.lineWidth = p.size;
                ctx.lineCap = 'round';
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default ParticleBackground;
