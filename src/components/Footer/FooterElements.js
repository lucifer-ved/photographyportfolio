import styled from 'styled-components';

export const FooterContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    font-size:1rem;
    margin : 20px;
    padding:2rem;

    @media screen and (max-width: 769px){
        width:90%;
        text-align:center;
        flex-direction:column;
    }
`;

export const FooterText = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`;