import React from 'react';
import { LandingPageContainer, Pictures } from './LandingPageElements';
import Footer from '../Footer';
import Header from '../Header';
import './style.css';
import { images } from '../../ImageList'

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
                {
                    images.map((url,index)=>(
                        <FadeInSection>
                            <Pictures src={url} key={index} data-id={index}/>
                        </FadeInSection>
                    ))
                }
            </LandingPageContainer>
            <Footer />
        </div>
    )
}

export default LandingPage;
