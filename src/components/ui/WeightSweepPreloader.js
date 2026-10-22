import React, { useEffect, useRef, useState } from 'react';
import './WeightSweepPreloader.css';

const TICKS = 40;
const LIFT_MS = 450;

// The percentage comes from decoded flight images, never a simulated timer.
export default function WeightSweepPreloader({ progress, onComplete }) {
    const [lifting, setLifting] = useState(false);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;
    const pct = Math.max(0, Math.min(100, Math.round(progress)));
    const weight = Math.round(100 + pct * 8);
    const lit = Math.round(pct / 100 * TICKS);

    useEffect(() => {
        if (pct < 100) return;
        // Paint the final count before removing the gate.
        const frame = requestAnimationFrame(() => setLifting(true));
        const timeout = setTimeout(() => onCompleteRef.current(), LIFT_MS);
        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(timeout);
        };
    }, [pct]);

    return (
        <div
            className={`wsp-gate${lifting ? ' wsp-gate--lifting' : ''}`}
            role="progressbar"
            aria-label="Loading photographs"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
        >
            <div className="wsp-hud" aria-hidden="true">
                <span>VS / Photographs</span>
                <span>wght {weight}</span>
            </div>
            <div className="wsp-rule" aria-hidden="true" />
            <div className="wsp-foot" aria-hidden="true">
                <span>Loading photographs</span>
                <div className="wsp-rail">
                    {Array.from({ length: TICKS + 1 }, (_, i) => (
                        <i key={i} className="wsp-tick" data-major={i % 10 === 0} data-on={i <= lit} />
                    ))}
                </div>
            </div>
            <p
                className="wsp-count"
                aria-hidden="true"
                style={{
                    fontWeight: weight,
                    fontVariationSettings: `'wght' ${weight}`,
                    letterSpacing: `${-.02 - .06 * pct / 100}em`,
                }}
            >
                {String(pct).padStart(3, '0')}
            </p>
        </div>
    );
}
