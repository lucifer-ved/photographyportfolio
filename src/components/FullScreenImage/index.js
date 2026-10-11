import React, { useEffect, useRef, useState } from 'react';
import { FullScreenContainer, Veil, Frame, Count, IconButton, Caption, Title, Meaning } from './FullScreenElements';

const pad = n => String(n).padStart(2, '0');

// Largest size at which the photo and its mat fit between the top and bottom
// bands and the two arrow gutters.
const fit = photo => {
    const W = window.innerWidth, H = window.innerHeight;
    const narrow = W <= 769;
    const mat = narrow ? 13 : 22;
    const ratio = photo.width / photo.height;
    const width = Math.max(120, Math.min((narrow ? W - 32 : W - 208) - 2 * mat, (H - 168 - 2 * mat) * ratio));
    return { width: Math.round(width), height: Math.round(width / ratio), mat };
};

const Icon = ({ d }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>;

const FullScreenImage = ({ photos, index, from, onChange, onClose }) => {
    const photo = photos[index];
    const frameRef = useRef(null);
    const imageRef = useRef(null);
    const closeRef = useRef(null);
    const [src, setSrc] = useState(photo.small);
    const [, setResized] = useState(0);
    const size = fit(photo);

    const step = dir => onChange((index + dir + photos.length) % photos.length);

    // Show the light copy straight away, then swap in the full file once it has loaded.
    useEffect(() => {
        let current = true;
        setSrc(photo.small);
        const full = new Image();
        full.onload = () => { if (current) setSrc(photo.src); };
        full.src = photo.src;
        return () => { current = false; };
    }, [photo]);

    useEffect(() => {
        const previous = document.activeElement;
        closeRef.current.focus();
        const onResize = () => setResized(n => n + 1);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            if (previous && previous.focus) previous.focus();
        };
    }, []);

    useEffect(() => {
        const onKeyDown = e => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowRight') step(1);
            else if (e.key === 'ArrowLeft') step(-1);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    });

    // The framed photo grows out of the tile that was clicked.
    useEffect(() => {
        const frame = frameRef.current;
        const img = imageRef.current;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!from || reduced || !frame.animate) return;
        frame.style.visibility = 'hidden';
        const grow = () => {
            frame.style.visibility = '';
            const to = frame.getBoundingClientRect();
            if (!to.width) return;
            const scale = from.width / to.width;
            const dx = from.left + from.width / 2 - (to.left + to.width / 2);
            const dy = from.top + from.height / 2 - (to.top + to.height / 2);
            frame.animate(
                [{ transform: `translate(${dx}px,${dy}px) scale(${scale})` }, { transform: 'none' }],
                { duration: 620, easing: 'cubic-bezier(.16,1,.3,1)' }
            );
        };
        if (img.decode) img.decode().then(grow, grow);
        else grow();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <FullScreenContainer
            role="dialog"
            aria-modal="true"
            aria-label="Photograph"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <Veil />
            <Frame ref={frameRef} style={{ padding: size.mat }}>
                <img ref={imageRef} src={src} alt={photo.title} width={size.width} height={size.height} />
            </Frame>
            <Count>{pad(index + 1)} / {photos.length}</Count>
            <IconButton type="button" data-pos="close" ref={closeRef} aria-label="Close" onClick={onClose}>
                <Icon d="M6 6l12 12M18 6L6 18" />
            </IconButton>
            <IconButton type="button" data-pos="prev" aria-label="Previous photograph" onClick={() => step(-1)}>
                <Icon d="M19 12H5M11 6l-6 6 6 6" />
            </IconButton>
            <IconButton type="button" data-pos="next" aria-label="Next photograph" onClick={() => step(1)}>
                <Icon d="M5 12h14M13 6l6 6-6 6" />
            </IconButton>
            <Caption>
                <Title>{photo.title}</Title>
                <Meaning>{photo.meaning ? `${photo.meaning} · ` : ''}{photo.category}</Meaning>
            </Caption>
        </FullScreenContainer>
    )
}

export default FullScreenImage;
