import React, { useEffect, useRef, useState } from 'react';
import { FullScreenContainer, Bar, Count, ImageStage, Title, Meaning, Nav } from './FullScreenElements';

const pad = n => String(n).padStart(2, '0');

const FullScreenImage = ({ photos, index, from, onChange, onClose }) => {
    const photo = photos[index];
    const imageRef = useRef(null);
    const closeRef = useRef(null);
    const [src, setSrc] = useState(photo.small);

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
        return () => { if (previous && previous.focus) previous.focus(); };
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

    // The photo grows out of the tile that was clicked.
    useEffect(() => {
        const img = imageRef.current;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!from || reduced || !img.animate) return;
        img.style.visibility = 'hidden';
        const grow = () => {
            img.style.visibility = '';
            const to = img.getBoundingClientRect();
            if (!to.width) return;
            const scale = from.width / to.width;
            const dx = from.left + from.width / 2 - (to.left + to.width / 2);
            const dy = from.top + from.height / 2 - (to.top + to.height / 2);
            img.animate(
                [{ transform: `translate(${dx}px,${dy}px) scale(${scale})` }, { transform: 'none' }],
                { duration: 620, easing: 'cubic-bezier(.16,1,.3,1)' }
            );
        };
        if (img.decode) img.decode().then(grow, grow);
        else grow();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <FullScreenContainer role="dialog" aria-modal="true" aria-label="Photograph">
            <Bar>
                <Count>{pad(index + 1)} / {photos.length}</Count>
                <button type="button" ref={closeRef} onClick={onClose}>Close</button>
            </Bar>
            <ImageStage onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
                <img ref={imageRef} src={src} alt={photo.title} />
            </ImageStage>
            <Bar>
                <Title>{photo.title}</Title>
                <Meaning>{photo.meaning ? `${photo.meaning} · ` : ''}{photo.category}</Meaning>
                <Nav>
                    <button type="button" aria-label="Previous photograph" onClick={() => step(-1)}>Prev</button>
                    <button type="button" aria-label="Next photograph" onClick={() => step(1)}>Next</button>
                </Nav>
            </Bar>
        </FullScreenContainer>
    )
}

export default FullScreenImage;
