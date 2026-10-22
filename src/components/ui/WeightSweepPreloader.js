import React, { useEffect, useRef, useState } from 'react';
import './WeightSweepPreloader.css';

const TICKS = 40;
const COUNT_HOLD_MS = 180;
const COUNT_EXIT_MS = 420;
const MESSAGE_MS = 900;
const REVEAL_MS = 1500;
const LAND_MS = 280;

// The percentage comes from decoded flight images, never a simulated timer.
export default function WeightSweepPreloader({ progress, targetRef, onPrepare, onStart, onLand, onComplete }) {
    const [phase, setPhase] = useState('loading');
    const [handoff, setHandoff] = useState({ top: 0, scale: 1.8 });
    const onPrepareRef = useRef(onPrepare);
    const onStartRef = useRef(onStart);
    const onLandRef = useRef(onLand);
    const onCompleteRef = useRef(onComplete);
    onPrepareRef.current = onPrepare;
    onStartRef.current = onStart;
    onLandRef.current = onLand;
    onCompleteRef.current = onComplete;
    const pct = Math.max(0, Math.min(100, Math.round(progress)));
    const weight = Math.round(100 + pct * 8);
    const lit = Math.round(pct / 100 * TICKS);

    useEffect(() => {
        if (pct < 100) return;
        const measure = () => {
            const target = targetRef.current;
            if (!target) return;
            const rect = target.getBoundingClientRect();
            const text = document.createRange();
            text.selectNodeContents(target);
            const textWidth = text.getBoundingClientRect().width;
            setHandoff({
                top: rect.top + rect.height / 2,
                scale: Math.min(2.2, Math.max(1, (window.innerWidth - 32) / Math.max(1, textWidth))),
            });
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [pct, targetRef]);

    useEffect(() => {
        if (pct < 100) return;
        const preview = process.env.NODE_ENV === 'development' &&
            new URLSearchParams(window.location.search).has('previewReadyMessage');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const countHold = reduced ? 0 : COUNT_HOLD_MS;
        const countExit = reduced ? 0 : COUNT_EXIT_MS;
        const messageHold = preview ? 3000 : reduced ? 450 : MESSAGE_MS;
        const revealDuration = reduced ? 0 : REVEAL_MS;
        const landDuration = reduced ? 0 : LAND_MS;
        const messageAt = countHold + countExit;
        const revealAt = messageAt + messageHold;
        // The count clears first. The flight starts beneath the slowly fading gate.
        const exit = setTimeout(() => setPhase('count-exit'), countHold);
        const message = setTimeout(() => {
            setPhase('message');
            onPrepareRef.current?.();
        }, messageAt);
        const reveal = setTimeout(() => {
            setPhase('reveal');
            onStartRef.current?.();
        }, revealAt);
        const landAt = revealAt + revealDuration + (reduced ? 0 : 40);
        const land = setTimeout(() => {
            setPhase('settled');
            onLandRef.current?.();
        }, landAt);
        const complete = setTimeout(() => onCompleteRef.current?.(), landAt + landDuration);
        return () => {
            clearTimeout(exit);
            clearTimeout(message);
            clearTimeout(reveal);
            clearTimeout(land);
            clearTimeout(complete);
        };
    }, [pct]);

    return <>
        <div
            className={`wsp-gate wsp-gate--${phase}`}
            role="progressbar"
            aria-label={pct === 100 ? 'Photographs ready' : 'Loading photographs'}
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
                <span>{pct === 100 ? 'Photographs ready' : 'Loading photographs'}</span>
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
        <p
            className={`wsp-handoff wsp-handoff--${phase}`}
            style={{ '--wsp-target-y': `${handoff.top}px`, '--wsp-start-scale': handoff.scale }}
            aria-live="polite"
        >
            {phase === 'message' || phase === 'reveal' ? 'The world, as I found it' : ''}
        </p>
    </>;
}
