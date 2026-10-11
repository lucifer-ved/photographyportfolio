import styled from 'styled-components';

const ink = '#16131c';
const paper = '#f1f0f5';
const dim = '#6d6676';
const edge = 'clamp(16px,2.4vw,32px)';

// The photo sits dead centre on a light veil. Count, close and arrows hold fixed
// places on the edges of the screen; the title sits on the centre line below.
export const FullScreenContainer = styled.div`
    position:fixed;
    inset:0;
    z-index:50;
    display:grid;
    place-items:center;
    color:${ink};
    font-family:'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;
    font-size:11px;
    letter-spacing:.1em;
    text-transform:uppercase;
    animation:fadeIn .3s ease-out;

    @keyframes fadeIn {
        from{
            opacity:0;
        }
    }

    /* On a phone the photo and its title form one centred group. */
    @media screen and (max-width: 769px){
        align-content:center;
        row-gap:14px;
    }

    @media (prefers-reduced-motion: reduce){
        animation:none;
    }
`;

// The veil is its own layer, so the glass frame above it can still see through
// to the photos moving behind.
export const Veil = styled.div`
    position:absolute;
    inset:0;
    background:rgba(241,240,245,.55);
    -webkit-backdrop-filter:blur(14px);
    backdrop-filter:blur(14px);
    pointer-events:none;
`;

// A frosted glass mount: the photos drifting behind it tint the frame.
export const Frame = styled.div`
    position:relative;
    background:rgba(255,255,255,.3);
    border:1px solid rgba(255,255,255,.85);
    border-radius:3px;
    -webkit-backdrop-filter:blur(26px) saturate(1.9);
    backdrop-filter:blur(26px) saturate(1.9);
    box-shadow:0 30px 70px -34px rgba(22,19,28,.5);

    img{
        display:block;
        outline:1px solid rgba(22,19,28,.14);
    }
`;

export const Count = styled.span`
    position:absolute;
    left:${edge};
    top:0;
    height:84px;
    display:flex;
    align-items:center;
    color:${dim};
    font-variant-numeric:tabular-nums;
    pointer-events:none;
`;

export const IconButton = styled.button`
    position:absolute;
    width:40px;
    height:40px;
    display:grid;
    place-items:center;
    padding:0;
    border:1px solid ${dim};
    border-radius:50%;
    background:none;
    color:inherit;

    &[data-pos='close']{
        right:${edge};
        top:22px;
    }

    &[data-pos='prev']{
        left:${edge};
        top:50%;
        margin-top:-20px;
    }

    &[data-pos='next']{
        right:${edge};
        top:50%;
        margin-top:-20px;
    }

    svg{
        width:16px;
        height:16px;
        fill:none;
        stroke:currentColor;
        stroke-width:1.5;
        stroke-linecap:round;
        stroke-linejoin:round;
    }

    @media (hover:hover){
        &:hover{
            background:${ink};
            border-color:${ink};
            color:${paper};
        }
    }

    &:active{
        background:${ink};
        border-color:${ink};
        color:${paper};
    }

    &:focus-visible{
        outline:2px solid ${ink};
        outline-offset:3px;
    }

    @media screen and (max-width: 769px){
        &[data-pos='prev'], &[data-pos='next']{
            top:auto;
            bottom:22px;
            margin-top:0;
        }
    }
`;

export const Caption = styled.div`
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    height:84px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:6px;
    padding:0 16px;
    text-align:center;
    pointer-events:none;

    @media screen and (max-width: 769px){
        position:relative;
        height:auto;
        padding:0 16px;
    }
`;

export const Title = styled.span`
    font-family:'Instrument Serif', Georgia, 'Times New Roman', serif;
    font-style:italic;
    font-size:30px;
    line-height:1.05;
    letter-spacing:0;
    text-transform:none;

    @media screen and (max-width: 769px){
        font-size:24px;
    }
`;

export const Meaning = styled.span`
    color:${dim};

    @media screen and (max-width: 769px){
        font-size:9px;
    }
`;
