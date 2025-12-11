'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface ConnectionLineProps {
    startX: MotionValue<number>;
    startY: MotionValue<number>;
    endX: MotionValue<number>;
    endY: MotionValue<number>;
}

export default function ConnectionLine({ startX, startY, endX, endY }: ConnectionLineProps) {
    // Create a path string that updates whenever the motion values change
    const pathD = useTransform(
        [startX, startY, endX, endY],
        ([sx, sy, ex, ey]: number[]) => {
            // Adjust start and end points to be relative to the card centers/edges
            // Assuming cards are roughly 300-400px wide. 
            // We'll connect from the right side of start to left side of end for now, 
            // or center to center if easier. Let's try center-ish.

            // Adjusting for card offset (assuming card width ~320px, height ~300px)
            // We want the line to go from the center of the cards.
            const sX = sx + 160; // Center X
            const sY = sy + 150; // Center Y
            const eX = ex + 160;
            const eY = ey + 150;

            const dist = Math.abs(eX - sX);
            const controlPoint1X = sX + dist * 0.5;
            const controlPoint1Y = sY;
            const controlPoint2X = eX - dist * 0.5;
            const controlPoint2Y = eY;

            return `M ${sX} ${sY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${eX} ${eY}`;
        }
    );

    return (
        <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible w-full h-full">
            <motion.path
                d={pathD}
                stroke="url(#gradient-line)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
                </linearGradient>
            </defs>
        </svg>
    );
}
