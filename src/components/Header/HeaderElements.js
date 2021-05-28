import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const HeaderContainer = styled.div`
    display:flex;
    height:4em;
    flex-direction:row;
    background:#fff;
    color:#000;
    justify-content:space-between;
`;

export const Name = styled(Link)`
    font-size:2rem;
    vertical-align:center;
    text-decoration:none;
    color:#000;
    display:flex;
    margin:2rem;

    &:hover{
        font-weight:700;
        text-shadow: 0px 10px 2px #C0C0C0;
    }
`;

export const OtherOptions = styled.div`
    display:flex;
    flex-direction:flex-end;
    font-size:1.5rem;

    a{
        text-decoration:none;
        color:#000;
        cursor:pointer;
    }

    >*{
        margin:2rem;
    }
`;

export const GridIcon = styled(Link)`
    color:#000;
    cursor:pointer;
`;