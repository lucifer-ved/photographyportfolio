import React, { useEffect, useRef, useState } from 'react';
import './ImageLoading.css';

const GRID_SIZE = 27;
const GRID_FADE_MS = 650;

// Read one pixel per cell from the already-loaded flight thumbnail. This gives
// the loading grid the photograph's actual colors before its larger copy arrives.
const colorsFromPreview = (img, width, height) => {
    const cols = Math.max(1, Math.ceil(width / GRID_SIZE));
    const rows = Math.max(1, Math.ceil(height / GRID_SIZE));
    try {
        const canvas = document.createElement('canvas');
        canvas.width = cols;
        canvas.height = rows;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.drawImage(img, 0, 0, cols, rows);
        const pixels = context.getImageData(0, 0, cols, rows).data;
        const colors = [];
        for (let i = 0; i < pixels.length; i += 4) {
            colors.push(`rgb(${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]})`);
        }
        return { cols, rows, colors };
    } catch (error) {
        // The thumbnail remains visible if canvas access is unavailable.
        return null;
    }
};

export default function ImageLoading({ previewSrc, src, alt, width, height, imageRef }) {
    const ownImageRef = useRef(null);
    const previewRef = imageRef || ownImageRef;
    const [grid, setGrid] = useState(null);
    const [showGrid, setShowGrid] = useState(false);
    const [fullReady, setFullReady] = useState(false);
    const [revealing, setRevealing] = useState(false);

    useEffect(() => {
        let active = true;
        let gridTimer = 0;
        let revealTimer = 0;
        let cleanupTimer = 0;
        const started = performance.now();
        const preview = previewRef.current;
        const sample = () => {
            if (active && preview.naturalWidth) {
                setGrid(colorsFromPreview(preview, width, height));
            }
        };
        if (preview.complete) sample();
        else preview.addEventListener('load', sample, { once: true });

        // Cached large images swap immediately. On slower connections, the grid
        // appears over the small image after a short grace period.
        gridTimer = setTimeout(() => { if (active) setShowGrid(true); }, 140);
        const large = new Image();
        const reveal = () => {
            if (!active) return;
            clearTimeout(gridTimer);
            setFullReady(true);
            setRevealing(true);
            cleanupTimer = setTimeout(() => { if (active) setShowGrid(false); }, GRID_FADE_MS);
        };
        const loaded = () => {
            const demoDelay = process.env.NODE_ENV === 'development' &&
                new URLSearchParams(window.location.search).has('slowImagePreview') ? 2500 : 0;
            const remaining = Math.max(0, demoDelay - (performance.now() - started));
            revealTimer = setTimeout(reveal, remaining);
        };
        large.onload = () => {
            if (large.decode) large.decode().then(loaded, loaded);
            else loaded();
        };
        large.onerror = () => {
            clearTimeout(gridTimer);
            if (active) setShowGrid(false);
        };
        large.src = src;

        return () => {
            active = false;
            clearTimeout(gridTimer);
            clearTimeout(revealTimer);
            clearTimeout(cleanupTimer);
            preview.removeEventListener('load', sample);
            large.onload = null;
            large.onerror = null;
        };
    }, [previewSrc, src, width, height, previewRef]);

    return (
        <div className="photo-loading" style={{ width, height }}>
            <img ref={previewRef} src={previewSrc} alt={alt} width={width} height={height} />
            {fullReady && <img className="photo-loading__full" src={src} alt="" aria-hidden="true" width={width} height={height} />}
            {showGrid && grid && (
                <div
                    className={`photo-loading__grid${revealing ? ' photo-loading__grid--reveal' : ''}`}
                    style={{ gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${grid.rows}, minmax(0, 1fr))` }}
                    aria-hidden="true"
                >
                    {grid.colors.map((color, i) => (
                        <span
                            key={i}
                            className="photo-loading__cell"
                            style={{ backgroundColor: color, animationDelay: `${(i * 73) % 900}ms`, transitionDelay: `${(i * 37) % 220}ms` }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
