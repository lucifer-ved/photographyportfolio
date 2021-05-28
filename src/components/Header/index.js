import React from 'react';
import { HeaderContainer,Name,OtherOptions,GridIcon} from './HeaderElements.js';
import { CgMenuGridO as Grid } from 'react-icons/cg';
import { IoLogoInstagram as Instagram } from  'react-icons/io';
const Header = () => {
    return (
        <HeaderContainer>
            <Name>
                VS <br/>
            </Name>
            <OtherOptions>
                <a href="https://www.instagram.com/theadvenexplorer/" target="_blank" rel="noopener noreferrer"><Instagram /></a>
                <GridIcon to="/photogrid"><Grid /></GridIcon>
            </OtherOptions>
        </HeaderContainer>
    )
}

export default Header;
