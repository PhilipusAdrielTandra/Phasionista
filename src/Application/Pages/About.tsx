import {MainLayout, SectionContainer } from '../Components/Navbar';
import { IntroSection} from '../Data/Sections';
import { TeamSection} from '../Data/Sections/Intro/Team.Section';
import { ContactSection } from '../Data/Sections/Intro/Contact.Section';
import { SectionIdEnum } from '../Data/Types';
import Header from "../Components/header"
import Footer from '../Components/footer';
import React from 'react';


import philip from '../Assets/images/philip.jpg'
import peter from '../Assets/images/peter.jpg'
import rachel from '../Assets/images/rachel.jpg'

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
    return (
      <MainLayout>
      {sections.map(({ component, sectionId }) => {
        return (
          <SectionContainer sectionId={sectionId} key={sectionId}>
            {component}
          </SectionContainer>
        );
      })}
      <Footer></Footer>
    </MainLayout>
    );
  }
  export default About;