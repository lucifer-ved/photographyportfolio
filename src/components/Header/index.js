import React from 'react';
import { HeaderContainer,Name,GridIcon} from './HeaderElements.js';
import { CgMenuGridO as Grid } from 'react-icons/cg';
import { IoLogoInstagram as Instagram } from  'react-icons/io';
const Header = () => {
    return (
        <HeaderContainer>
                <a href="https://www.instagram.com/theadvenexplorer/" target="_blank" rel="noopener noreferrer"><Instagram /></a>
                <Name>
                    VS
                </Name>
                <GridIcon to="/photogrid"><Grid /></GridIcon>
        </HeaderContainer>
    )
}

export default Header;
