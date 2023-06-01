import {MainLayout, SectionContainer } from '../Components/Navbar';
import { IntroSection} from '../Data/Sections';
import { TeamSection} from '../Data/Sections/Intro/Team.Section';
import { ContactSection } from '../Data/Sections/Intro/Contact.Section';
import { SectionIdEnum } from '../Data/Types';
import Header from "../Components/header/layout";
import Footer from '../Components/footer';
import React, {useEffect} from 'react';


import philip from '../Assets/images/philip.jpg'
import peter from '../Assets/images/peter.jpg'
import rachel from '../Assets/images/rachel.jpg'
import { useLocation } from 'react-router';




const sections = [
    {
      sectionId: SectionIdEnum.intro,
      component: <IntroSection />,
    },
    {
      sectionId: SectionIdEnum.team,
      component: <TeamSection />,
    },
    {
      sectionId: SectionIdEnum.contact,
      component: <ContactSection />,
    },
  ];

  const About: React.FC = () => {
    const location = useLocation()

    useEffect(()=> {
      if (location.hash) {
          let elem = document.getElementById(location.hash.slice(1))
          if (elem) {
              elem.scrollIntoView({behavior: "smooth"})
          }
      } else {
      window.scrollTo({top:0,left:0, behavior: "smooth"})
      }
    }, [location,])

    return (
      <Header>
      {sections.map(({ component, sectionId }) => {
        return (
          <SectionContainer sectionId={sectionId} key={sectionId}>
            {component}
          </SectionContainer>
        );
      })}
      <Footer></Footer>
    </Header>
    );
  }
  export default About;