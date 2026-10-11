import styled from 'styled-components';

const paper = '#f3ede4';
const dim = '#a79f93';
const line = '#3a352e';
const dark = '#0b0a09';

export const FullScreenContainer = styled.div`
    position:fixed;
    inset:0;
    z-index:50;
    display:grid;
    grid-template-rows:auto minmax(0,1fr) auto;
    gap:10px;
    padding:12px 16px 14px;
    background:rgba(11,10,9,.64);
    -webkit-backdrop-filter:blur(9px);
    backdrop-filter:blur(9px);
    color:${paper};
    font-family:'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;
    font-size:12px;
    letter-spacing:.06em;
    text-transform:uppercase;
    animation:fadeIn .3s ease-out;

    @keyframes fadeIn {
        from{
            opacity:0;
        }
    }

    button{
        padding:8px 12px;
        border:1px solid ${line};
        border-radius:999px;
        background:none;
        color:inherit;
        font:inherit;
        letter-spacing:inherit;
        text-transform:inherit;
    }

    button:hover{
        background:${paper};
        color:${dark};
    }

    button:focus-visible{
        outline:2px solid ${paper};
        outline-offset:3px;
    }
`;

export const Bar = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:16px;
`;

export const Count = styled.span`
    color:${dim};
    font-variant-numeric:tabular-nums;
`;

export const ImageStage = styled.div`
    min-height:0;
    position:relative;

    img{
        position:absolute;
        inset:0;
        margin:auto;
        max-width:100%;
        max-height:100%;
        width:auto;
        height:auto;
        box-shadow:0 30px 80px -30px rgba(0,0,0,.8);
    }
`;

export const Title = styled.span`
    font-family:'Instrument Serif', Georgia, 'Times New Roman', serif;
    font-style:italic;
    font-size:22px;
    letter-spacing:0;
    text-transform:none;
    min-width:0;
`;

export const Meaning = styled.span`
    color:${dim};
    min-width:0;
    text-align:center;
`;

export const Nav = styled.div`
    display:flex;
    gap:6px;
`;
