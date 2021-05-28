import styled from 'styled-components';

export const LandingPageContainer = styled.div`
    display:flex;
    width:100vw;
    flex-direction:column;

    @media screen and (max-width: 769px){
        margin-top:5%;
    }
`;

export const Pictures = styled.img`
    display:flex;
    justify-content:center;
    // padding:2rem;
    height:35rem;
    margin:4% auto;

    @media screen and (max-width: 769px){
        margin-top:5%;
        width:30rem;
        object-fit:contain;
    }
`;