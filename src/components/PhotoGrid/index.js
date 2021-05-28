import React , {useState }from 'react';
import { PhotoGridContainer, Pictures, CloseHeader, PhotoContainer} from './PhotoGridElements';
import one from  '../../Images/one.jpg';
import two from  '../../Images/two.jpeg';
import three from  '../../Images/three.jpg';
import four from  '../../Images/four.jpeg';
import five from  '../../Images/five.jpg';
import six from  '../../Images/six.jpg';
import seven from  '../../Images/seven.jpg';
import eight from  '../../Images/eight.jpg';
import nine from  '../../Images/nine.jpeg';
import { IoCloseOutline as Close } from  'react-icons/io5';


const PhotoGrid = () => {
    const [cancelclick, setCancelClick] = useState(0);
    return (
        <PhotoGridContainer cancelclick={cancelclick}>
            <CloseHeader to="/" onClick={() => setCancelClick(1)} onAnimationEnd={()=>setCancelClick(0)}>
                <Close />
            </CloseHeader>
            <PhotoContainer>
                <Pictures src={one}/>
                <Pictures src={two}/>
                <Pictures src={three}/>
                <Pictures src={four}/>
                <Pictures src={five}/>
                <Pictures src={six}/>
                <Pictures src={seven}/>
                <Pictures src={eight}/>
                <Pictures src={nine}/>
            </PhotoContainer>
        </PhotoGridContainer>
    )
}

export default PhotoGrid;
