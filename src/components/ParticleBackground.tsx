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
    angle: number;
    speed: number;
    length: number;
    color: string;
    opacity: number;
}

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to full window size
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: Particle[] = [];
        const particleCount = Math.floor((width * height) / 8000); // Responsive particle density

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            // Random position
            const x = Math.random() * width;
            const y = Math.random() * height;

            // Flow generally outwards or in a gentle diagonal
            // Let's make them flow radiating from the bottom-left roughly
            const dx = x - (-width * 0.2);
            const dy = y - (height * 1.2);
            const baseAngle = Math.atan2(dy, dx);

            // Add some noise to the angle
            const angle = baseAngle + (Math.random() - 0.5) * 0.5;

            particles.push({
                x,
                y,
                angle,
                speed: 0.2 + Math.random() * 0.5, // Slow, drifting speed
                length: 2 + Math.random() * 6, // Mix of dots and small dashes
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                opacity: 0.3 + Math.random() * 0.7,
            });
        }

        let animationFrameId: number;

        const render = () => {
            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Draw and update particles
            particles.forEach(p => {
                // Simple trail/dash drawing oriented exactly in the direction of movement
                ctx.beginPath();
                const startX = p.x;
                const startY = p.y;
                const endX = p.x + Math.cos(p.angle) * p.length;
                const endY = p.y + Math.sin(p.angle) * p.length;

                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);

                ctx.strokeStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.lineWidth = 1.5;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Update position
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed;

                // Wrap around screen bounds smoothly
                if (p.x < -10) {
                    p.x = width + 10;
                    p.y = Math.random() * height;
                } else if (p.x > width + 10) {
                    p.x = -10;
                    p.y = Math.random() * height;
                }

                if (p.y < -10) {
                    p.y = height + 10;
                    p.x = Math.random() * width;
                } else if (p.y > height + 10) {
                    p.y = -10;
                    p.x = Math.random() * width;
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
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
