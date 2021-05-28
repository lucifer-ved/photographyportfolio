import React from 'react';
import { LandingPageContainer, Pictures } from './LandingPageElements';
import one from  '../../Images/one.jpg';
import two from  '../../Images/two.jpeg';
import three from  '../../Images/three.jpg';
import four from  '../../Images/four.jpeg';
import five from  '../../Images/five.jpg';
import six from  '../../Images/six.jpg';
import seven from  '../../Images/seven.jpg';
import eight from  '../../Images/eight.jpg';
import nine from  '../../Images/nine.jpeg';
import Footer from '../Footer';
import Header from '../Header';
import './style.css';


const LandingPage = () => {

    function FadeInSection(props){
        const [isVisible, setVisible] = React.useState(false);
        const domRef = React.useRef();
        React.useEffect(() => {
          const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
          });
          observer.observe(domRef.current);
        }, []);
        return (
          <div
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
          >
            {props.children}
          </div>
        );
      }

    return (
        <div>
            <Header />
            <LandingPageContainer>
                {/* <Pictures src="https://thomasprior.com/wp-content/uploads/2020/02/CF040834_2-1-1280x1600.jpg"/> */}
                <FadeInSection>
                    <Pictures src={one}/>
                </FadeInSection>
                <FadeInSection>
                    <Pictures src={two}/>
                </FadeInSection>
                <FadeInSection>
                    <Pictures src={three}/>
                </FadeInSection>
                <FadeInSection>
                    <Pictures src={four}/>
                </FadeInSection>
                <FadeInSection>
                    <Pictures src={five}/>
                </FadeInSection>
                <FadeInSection>
                    <Pictures src={six}/>
                </FadeInSection>
                <FadeInSection>
                    <Pictures src={seven}/>
                </FadeInSection>
                <FadeInSection>
                    <Pictures src={eight}/>
                </FadeInSection>
                <FadeInSection>
                    <Pictures src={nine}/>
                </FadeInSection>
            </LandingPageContainer>
            <Footer />
        </div>
    )
}

export default LandingPage;
