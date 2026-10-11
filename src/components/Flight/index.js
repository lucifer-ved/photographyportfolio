import React, { useEffect, useRef, useState } from 'react';
import { FlightContainer, Name, Stage, Tile, Corner, Hint, Credit, CursorRing, CursorDot, CursorLabel } from './FlightElements';
import FullScreenImage from '../FullScreenImage';
import { photos } from '../../ImageList';

const COUNT = photos.length;
const GAP = 430;            // distance between one photo and the next
const DEPTH = COUNT * GAP;  // the loop the camera flies around
const NEAR = 380;           // how far past the viewer a photo travels before it fades
const FOCAL = 700;
const CRUISE = 9;
const RUSH = 150;           // opening speed
const HOLD = 450;           // ms the opening stays at full speed

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const mod = (n, m) => ((n % m) + m) % m;
const pad = n => String(n).padStart(2, '0');

const Flight = () => {
    const containerRef = useRef(null);
    const stageRef = useRef(null);
    const countRef = useRef(null);
    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const labelRef = useRef(null);
    const draggedRef = useRef(false);
    const openRef = useRef(false);
    const [named, setNamed] = useState(false);
    const [travelled, setTravelled] = useState(false);
    const [open, setOpen] = useState(null);

    useEffect(() => {
        openRef.current = open !== null;
    }, [open]);

    useEffect(() => {
        const el = containerRef.current;
        const stage = stageRef.current;
        const ring = ringRef.current;
        const dot = dotRef.current;
        const label = labelRef.current;
        // The dot sits on the pointer; the ring trails it and opens up over a photo.
        const mouse = { x: 0, y: 0, rx: 0, ry: 0, scale: 1, seen: false };
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const items = photos.map((p, i) => ({
            el: stage.children[i],
            i,
            r: clamp(p.width / p.height, .66, 1.6),
            ang: i * 2.39996,
            k: .9 + .45 * ((i * .618034) % 1),
            bob: .9 + .7 * ((i * .7548) % 1),   // each photo drifts at its own pace
            phase: (i * 2.399) % 6.283,
            x: 0, y: 0, z: i * GAP, w: 0, h: 0, vis: null,
        }));

        let W = 0, H = 0, base = 0;
        let cam = 0, v = 0, camx = 0, camy = 0;
        let boost = 0, rush = false, t0 = 0, tau = 260, isNamed = false;
        let hover = false, shown = -1, raf = 0, prev = performance.now(), fallback = 0;
        const ptr = { nx: 0, ny: 0, inside: false };
        const drag = { on: false, x: 0, y: 0 };

        // The hint has done its job once the visitor has moved through the photos.
        let hasTravelled = false;
        const markTravelled = () => {
            if (hasTravelled) return;
            hasTravelled = true;
            setTravelled(true);
        };

        const showName = () => {
            if (isNamed) return;
            isNamed = true;
            setNamed(true);
        };

        const layout = () => {
            W = el.clientWidth;
            H = el.clientHeight;
            base = clamp(Math.min(W, H) * .36, 150, 360);
            items.forEach(t => {
                t.w = base * Math.sqrt(t.r);
                t.h = base / Math.sqrt(t.r);
                t.x = Math.cos(t.ang) * W * .42 * t.k;
                t.y = Math.sin(t.ang) * H * .44 * t.k;
                t.el.style.width = t.w.toFixed(1) + 'px';
                t.el.style.height = t.h.toFixed(1) + 'px';
            });
        };

        // Far photos sit in a ring around the name and curve outward as they approach,
        // so the centre stays clear.
        const place = () => {
            let best = 1e9, bi = 0;
            const time = reduced ? 0 : performance.now() / 1000;
            items.forEach(t => {
                const zr = mod(t.z - cam + NEAR, DEPTH) - NEAR;
                const s = FOCAL / (FOCAL + zr);
                const a = clamp((s - .12) / .16, 0, 1) * clamp((zr + NEAR) / 260, 0, 1);
                if (a <= 0) {
                    if (t.vis !== false) { t.vis = false; t.el.style.visibility = 'hidden'; }
                    return;
                }
                if (t.vis !== true) { t.vis = true; t.el.style.visibility = 'visible'; }
                const s2 = s * s, ca = Math.cos(t.ang), sa = Math.sin(t.ang);
                const sx = W / 2 + ca * W * .26 + (t.x - ca * W * .26) * s2 - camx * s - t.w / 2;
                const sy = H / 2 + sa * H * .27 + (t.y - sa * H * .27) * s2 - camy * s - t.h / 2;
                // A slow rise and fall with a slight tilt, larger for nearer photos.
                const wave = time * t.bob + t.phase;
                const lift = reduced ? 0 : Math.sin(wave) * 9 * s;
                const tilt = reduced ? 0 : Math.sin(wave * .7 + 1.3) * .9;
                t.el.style.transform = `translate3d(${sx.toFixed(1)}px,${(sy + lift).toFixed(1)}px,0) scale(${s.toFixed(3)}) rotate(${tilt.toFixed(2)}deg)`;
                t.el.style.opacity = a.toFixed(3);
                t.el.style.zIndex = Math.round(s * 1000);
                if (zr >= 0 && zr < best) { best = zr; bi = t.i; }
            });
            if (bi !== shown) {
                shown = bi;
                countRef.current.textContent = pad(bi + 1);
            }
        };

        const frame = now => {
            const dt = clamp((now - prev) / 16.67, .2, 3);
            prev = now;
            if (!drag.on) {
                const target = reduced ? 0 : hover ? 5 : CRUISE;
                v += (target - v) * .035 * dt;
                cam += v * dt;
            }
            // Opening rush: hold at full speed, bleed it off, then bring the name in.
            if (rush) {
                const t = now - t0;
                boost = t < HOLD ? RUSH : RUSH * Math.exp(-(t - HOLD) / tau);
                if (boost < 2) { boost = 0; rush = false; }
                cam += boost * dt;
                stage.style.transform = boost ? `scale(${(1 + .14 * boost / RUSH).toFixed(4)})` : '';
            }
            if (!isNamed && boost < 16) showName();
            const look = ptr.inside && !reduced && !openRef.current;
            camx += ((look ? ptr.nx * base * .25 : 0) - camx) * .06 * dt;
            camy += ((look ? ptr.ny * base * .1 : 0) - camy) * .06 * dt;
            place();
            const open = hover && !openRef.current ? 1.3 : 1;
            mouse.rx += (mouse.x - mouse.rx) * Math.min(1, .2 * dt);
            mouse.ry += (mouse.y - mouse.ry) * Math.min(1, .2 * dt);
            mouse.scale += (open - mouse.scale) * Math.min(1, .16 * dt);
            ring.style.transform = `translate3d(${mouse.rx.toFixed(1)}px,${mouse.ry.toFixed(1)}px,0) scale(${mouse.scale.toFixed(3)})`;
            raf = requestAnimationFrame(frame);
        };

        const skipRush = () => {
            if (!rush) return;
            const now = performance.now();
            if (now - t0 < HOLD) t0 = now - HOLD;
            tau = 110;
        };

        const onPointerMove = e => {
            if (e.pointerType !== 'touch') {
                if (!mouse.seen) { mouse.seen = true; mouse.rx = e.clientX; mouse.ry = e.clientY; }
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                dot.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`;
                const flip = mouse.x > W - label.offsetWidth - 40;
                label.style.transform = `translate3d(${flip ? mouse.x - label.offsetWidth - 16 : mouse.x + 16}px,${mouse.y + 14}px,0)`;
                ring.style.opacity = 1;
                dot.style.opacity = 1;
                ptr.inside = true;
                ptr.nx = clamp(e.clientX / W * 2 - 1, -1, 1);
                ptr.ny = clamp(e.clientY / H * 2 - 1, -1, 1);
            }
            if (!drag.on) return;
            const dy = e.clientY - drag.y;
            if (Math.abs(e.clientX - drag.x) + Math.abs(dy) > 5) { draggedRef.current = true; markTravelled(); }
            drag.x = e.clientX;
            drag.y = e.clientY;
            cam -= dy * 9;
            v = -dy * 9;
        };
        const onPointerDown = e => {
            if (openRef.current) return;
            skipRush();
            drag.on = true;
            drag.x = e.clientX;
            drag.y = e.clientY;
            draggedRef.current = false;
        };
        const onPointerUp = () => { drag.on = false; };
        const onPointerLeave = () => { ptr.inside = false; ring.style.opacity = 0; dot.style.opacity = 0; label.style.opacity = 0; };
        const onWheel = e => {
            e.preventDefault();
            if (openRef.current) return;
            skipRush();
            markTravelled();
            v += (e.deltaY + e.deltaX) * .45;
        };
        const onKeyDown = e => {
            if (openRef.current) return;
            skipRush();
            if (e.key === 'ArrowUp' || e.key === 'ArrowRight') v += 60;
            else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') v -= 60;
            else return;
            markTravelled();
            e.preventDefault();
        };
        const onOver = e => {
            const tile = e.target.closest('button');
            hover = !!tile;
            if (tile) label.textContent = tile.dataset.title;
            label.style.opacity = tile ? 1 : 0;
        };
        const onOut = () => {
            hover = false;
            label.style.opacity = 0;
        };
        const onResize = () => { layout(); place(); };

        // The rush plays once per visit; after that the page opens already cruising.
        let seen = false;
        try { seen = sessionStorage.getItem('flight-intro') === '1'; } catch (e) {}
        if (reduced || seen) {
            showName();
        } else {
            try { sessionStorage.setItem('flight-intro', '1'); } catch (e) {}
            rush = true;
            boost = RUSH;
            t0 = performance.now();
            fallback = setTimeout(showName, 2600);
        }

        layout();
        place();
        raf = requestAnimationFrame(frame);

        el.addEventListener('pointerdown', onPointerDown);
        el.addEventListener('wheel', onWheel, { passive: false });
        stage.addEventListener('pointerover', onOver);
        stage.addEventListener('pointerout', onOut);
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('resize', onResize);
        document.addEventListener('pointerleave', onPointerLeave);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(fallback);
            el.removeEventListener('pointerdown', onPointerDown);
            el.removeEventListener('wheel', onWheel);
            stage.removeEventListener('pointerover', onOver);
            stage.removeEventListener('pointerout', onOut);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('pointerleave', onPointerLeave);
        };
    }, []);

    const openPhoto = (index, e) => {
        if (draggedRef.current) return;
        labelRef.current.style.opacity = 0;
        setOpen({ index, from: e.currentTarget.getBoundingClientRect() });
    };

    return (
        <FlightContainer ref={containerRef}>
            <Name $named={named}>
                <div>
                    <h1 aria-label="Vedant Solanki">
                        <span>Vedant</span>
                        <span>Solanki</span>
                    </h1>
                    <p>Photographs of people, colour and long light</p>
                    <Hint $show={named && !travelled}><i aria-hidden="true" />Scroll</Hint>
                </div>
            </Name>
            <Stage ref={stageRef}>
                {
                    photos.map((photo, index) => (
                        <Tile type="button" key={index} data-title={photo.title} onClick={e => openPhoto(index, e)}>
                            <img src={photo.small} alt={photo.title} draggable="false" />
                        </Tile>
                    ))
                }
            </Stage>
            <Corner data-edge="top" $named={named}>
                <span>VS</span>
                <span>Frame <b ref={countRef}>01</b> / {COUNT}</span>
            </Corner>
            <Credit $named={named}>
                Site by{' '}
                <a href="https://theideaforgelabs.com/" target="_blank" rel="noopener noreferrer">IdeaForgeLabs ↗</a>
            </Credit>
            {
                open !== null &&
                <FullScreenImage
                    photos={photos}
                    index={open.index}
                    from={open.from}
                    onChange={index => setOpen({ index, from: null })}
                    onClose={() => setOpen(null)}
                />
            }
            <CursorRing ref={ringRef} aria-hidden="true" />
            <CursorDot ref={dotRef} aria-hidden="true" />
            <CursorLabel ref={labelRef} aria-hidden="true" />
        </FlightContainer>
    )
}

export default Flight;
