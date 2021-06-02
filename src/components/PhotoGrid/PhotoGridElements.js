import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const PhotoGridContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin:5%;

    animation:translateDown .8s;

    @keyframes translateDown {
        from{
            opacity:0;
            transform: translate(0,-15em);
        }
        to{
            opacity:1
        }
    }

    &[cancelclick='1']{
        animation:translateUp 0.8s;

        @keyframes translateUp {
            from{
                opacity:1;
                transform: translate(0,15em);
            }
            to{
                opacity:0
            }
        }
    }

    
`;


export const Pictures = styled.img`
    height: 200px;
    flex-basis: 30%;
    padding:10px;
    object-fit:contain;
    display:flex;
    flex-direction:column;
    
`;

export const PhotoContainer = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    height:100vh;
    margin:5%;
    justify-content:center;
    text-align:center;
`;

export const CloseHeader = styled(Link)`
    display:flex;
    flex-direction:row;
    justify-content:center;
    text-align:center;
    font-size:2rem;
    font-weight:10;
`;

export const CloseHeaderDown = styled(Link)`
    display:flex;
    flex-direction:row;
    justify-content:center;
    text-align:center;
    font-size:2rem;
    font-weight:10;
    margin-top:-3rem;
    
    @media screen and (max-width: 769px){
        margin-top:68rem;
    }
`;