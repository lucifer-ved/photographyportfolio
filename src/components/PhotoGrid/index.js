import React , {useState }from 'react';
import { PhotoGridContainer, Pictures, CloseHeader,CloseHeaderDown, PhotoContainer} from './PhotoGridElements';
import { images } from '../../ImageList';
import { IoCloseOutline as Close } from  'react-icons/io5';


const PhotoGrid = () => {
    const [cancelclick, setCancelClick] = useState(0);
    return (
        <PhotoGridContainer cancelclick={cancelclick}>
            <CloseHeader to="/" onClick={() => setCancelClick(1)} onAnimationEnd={()=>setCancelClick(0)}>
                <Close />
            </CloseHeader>
            <PhotoContainer>
                {
                    images.map((url,index)=>(
                        <Pictures src={url} key={index}/>        
                    ))
                }
            </PhotoContainer>
            {/* <CloseHeaderDown to="/">
                <Close />
            </CloseHeaderDown> */}
        </PhotoGridContainer>
    )
}

export default PhotoGrid;
