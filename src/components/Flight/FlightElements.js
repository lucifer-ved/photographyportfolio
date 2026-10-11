import styled from 'styled-components';

const ink = '#16131c';
const paper = '#f1f0f5';
const dim = '#6d6676';
const accent = '#d2206b';
const air = `'Jost', 'Avenir Next', 'Century Gothic', sans-serif`;
const mono = `'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace`;

export const FlightContainer = styled.main`
    position:fixed;
    inset:0;
    overflow:hidden;
    background:${paper};
    color:${ink};
    font-family:${mono};
    touch-action:none;
    user-select:none;
    -webkit-user-select:none;

    @media (hover:hover) and (pointer:fine){
        cursor:none;

        button{
            cursor:none;
        }
    }
`;

export const Name = styled.div`
    position:absolute;
    inset:0;
    display:grid;
    place-items:center;
    text-align:center;
    padding:0 16px;
    pointer-events:none;
    z-index:0;

    > div{
        position:relative;
    }

    h1{
        margin:0;
        font-family:${air};
        font-weight:200;
        text-transform:uppercase;
        font-size:clamp(18px,3.6vw,64px);
        line-height:1;
        white-space:nowrap;
        letter-spacing:.17em;
        padding-left:.17em;
    }

    /* The name comes into focus slowly while the photos rush past. */
    h1 span{
        display:inline-block;
        opacity:${({ $started }) => ($started ? 1 : 0)};
        transform:${({ $started }) => ($started ? 'none' : 'translateY(.18em) scale(1.1)')};
        filter:${({ $started }) => ($started ? 'none' : 'blur(18px)')};
        transition:opacity 2.4s linear, transform 2.7s cubic-bezier(.16,1,.3,1), filter 2.4s ease-out;
    }

    h1 span + span{
        transition-delay:.3s;
    }

    /* The line sits close under the name in small wide-spaced capitals,
       surfacing one word at a time through the rush. */
    p{
        margin:clamp(10px,1.2vw,20px) 0 0;
        white-space:nowrap;
        font-family:${air};
        font-weight:400;
        text-transform:uppercase;
        font-size:clamp(10px,.95vw,15px);
        line-height:1.4;
        letter-spacing:.46em;
        padding-left:.46em;
        color:${ink};
    }

    p span{
        display:inline-block;
        opacity:${({ $started }) => ($started ? 1 : 0)};
        transform:${({ $started }) => ($started ? 'none' : 'translateY(.45em)')};
        filter:${({ $started }) => ($started ? 'none' : 'blur(8px)')};
        transition:opacity 1.5s linear, transform 1.7s cubic-bezier(.16,1,.3,1), filter 1.5s ease-out;
    }

    @media (prefers-reduced-motion: reduce){
        h1 span, p span{
            transition:none;
        }
    }
`;

export const Stage = styled.div`
    position:absolute;
    inset:0;
    z-index:1;
`;

export const Tile = styled.button`
    position:absolute;
    left:0;
    top:0;
    padding:0;
    border:0;
    overflow:hidden;
    background:${paper};
    visibility:hidden;
    will-change:transform, opacity;
    /* a tight contact shadow, a soft mid shadow, and a wide one dropped well below
       the photo so it reads as hanging in the air */
    box-shadow:
        0 1px 2px rgba(22,19,28,.10),
        0 12px 20px -8px rgba(22,19,28,.22),
        0 52px 46px -28px rgba(22,19,28,.44);
    transition:box-shadow .45s ease;

    img{
        display:block;
        width:100%;
        height:100%;
        object-fit:cover;
        transition:transform .5s cubic-bezier(.2,.8,.2,1);
        -webkit-user-drag:none;
    }

    &:hover{
        outline:3px solid ${accent};
        box-shadow:
            0 2px 4px rgba(22,19,28,.10),
            0 20px 30px -10px rgba(22,19,28,.26),
            0 78px 56px -34px rgba(22,19,28,.46);
    }

    &:hover img, &:focus-visible img{
        transform:scale(1.06);
    }

    &:focus-visible{
        outline:2px solid ${ink};
        outline-offset:3px;
    }
`;

export const Corner = styled.div`
    position:absolute;
    left:0;
    right:0;
    display:flex;
    justify-content:space-between;
    padding:0 clamp(16px,3vw,36px);
    font-size:12px;
    letter-spacing:.06em;
    text-transform:uppercase;
    font-variant-numeric:tabular-nums;
    pointer-events:none;
    z-index:0;
    opacity:${({ $named }) => ($named ? 1 : 0)};
    transition:opacity 2.2s linear .3s;

    &[data-edge='top']{
        top:clamp(14px,2.5vh,26px);
    }

    b{
        font-weight:500;
        color:${accent};
    }

    @media (prefers-reduced-motion: reduce){
        transition:none;
    }
`;

export const Hint = styled.div`
    /* hangs below the name without counting toward its centring */
    position:absolute;
    top:100%;
    left:50%;
    transform:translateX(-50%);
    margin-top:2.6em;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:8px;
    font-family:${mono};
    font-size:9px;
    letter-spacing:.2em;
    text-indent:.2em;
    text-transform:uppercase;
    color:${dim};
    pointer-events:none;
    z-index:0;
    opacity:${({ $show }) => ($show ? 1 : 0)};
    transition:opacity .9s ${({ $show }) => ($show ? '.6s' : '0s')};

    i{
        position:relative;
        width:15px;
        height:24px;
        border:1px solid ${dim};
        border-radius:9px;
    }

    i::after{
        content:'';
        position:absolute;
        left:50%;
        top:5px;
        width:2px;
        height:5px;
        margin-left:-1px;
        border-radius:2px;
        background:${ink};
        animation:hintWheel 1.8s cubic-bezier(.6,0,.2,1) infinite;
    }

    @keyframes hintWheel {
        0%{
            transform:translateY(0);
            opacity:0;
        }
        25%{
            opacity:1;
        }
        100%{
            transform:translateY(9px);
            opacity:0;
        }
    }

    @media (prefers-reduced-motion: reduce){
        transition:none;

        i::after{
            animation:none;
        }
    }
`;

export const Credit = styled.p`
    position:absolute;
    left:50%;
    bottom:clamp(16px,3vh,30px);
    margin:0;
    transform:translateX(-50%);
    font-size:11px;
    letter-spacing:.06em;
    text-transform:uppercase;
    white-space:nowrap;
    color:${dim};
    z-index:2;
    opacity:${({ $named }) => ($named ? 1 : 0)};
    transition:opacity 2.2s linear .3s;

    a{
        color:${ink};
        text-decoration:none;
        border-bottom:1px solid ${accent};
        padding-bottom:1px;
    }

    a:hover{
        color:${accent};
    }

    a:focus-visible{
        outline:2px solid ${ink};
        outline-offset:3px;
    }

    @media (prefers-reduced-motion: reduce){
        transition:none;
    }
`;

const cursorLayer = `
    position:fixed;
    left:0;
    top:0;
    z-index:60;
    pointer-events:none;
    opacity:0;
    will-change:transform;

    @media (hover:none), (pointer:coarse){
        display:none;
    }
`;

export const CursorRing = styled.div`
    ${cursorLayer}
    width:22px;
    height:22px;
    margin:-11px 0 0 -11px;
    border:1.5px solid #fff;
    border-radius:50%;
    mix-blend-mode:difference;
    color:#fff;
    transition:border-color .2s;

    /* over a photo the ring gives way to an eye; the dot becomes its pupil */
    svg{
        position:absolute;
        left:50%;
        top:50%;
        width:28px;
        height:28px;
        margin:-14px 0 0 -14px;
        overflow:visible;
        opacity:0;
        transition:opacity .2s;
    }

    &[data-eye='1']{
        border-color:transparent !important;
    }

    &[data-eye='1'] svg{
        opacity:1;
    }
`;

export const CursorDot = styled.div`
    ${cursorLayer}
    width:4px;
    height:4px;
    margin:-2px 0 0 -2px;
    border-radius:50%;
    background:#fff;
    mix-blend-mode:difference;
`;

export const CursorLabel = styled.div`
    ${cursorLayer}
    padding:3px 8px;
    border-radius:999px;
    background:${ink};
    color:${paper};
    font-family:${mono};
    font-size:8px;
    letter-spacing:.1em;
    text-transform:uppercase;
    white-space:nowrap;
    transition:opacity .2s;
`;
