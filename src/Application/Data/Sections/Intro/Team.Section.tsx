import { Box, Typography } from '@mui/material';
import Carousel from '../../../Components/Carousel';
import profile from '../../../Assets/images/future.jpg';
import philip from '../../../Assets/images/philip.jpg'
import rachel from '../../../Assets/images/rachel.jpg'
import peter from '../../../Assets/images/peter.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../../../Styles/About.css'

export const TeamSection: React.FC = () => {
  return (
    <div className="wrapper min-h-screen ">
      <div className="our_team">
        <div className="team_member">
          <div className="member_img">
            <img src={philip} alt="our_team" className='rounded-[50%]'/>
            <div className="social_media">
              <div className="item text-white text-2xl"><a href=""><FontAwesomeIcon icon={ faLinkedin } /></a></div>
              <div className="item text-white text-2xl"><a href=""><FontAwesomeIcon icon={faGithub}/></a></div>
              <div className="item text-white text-2xl"><a href=""><FontAwesomeIcon icon={faInstagram}/></a></div>
            </div>
          </div>
          <h3>Philipus Adriel Tandra</h3>
          <span>Developer</span>
        </div>
        <div className="team_member">
          <div className="member_img">
            <img src={peter} alt="our_team" className='rounded-[50%]'/> 
            <div className="social_media">
              <div className="item text-white text-2xl"><a href=""><FontAwesomeIcon icon={ faLinkedin } /></a></div>
              <div className="item text-white text-2xl"><a href=""><FontAwesomeIcon icon={faGithub}/></a></div>
              <div className="item text-white text-2xl"><a href=""><FontAwesomeIcon icon={faInstagram}/></a></div>
            </div>
          </div>
          <h3>Peter Nelson Subrata</h3>
          <span>Developer</span>
        </div>
        <div className="team_member">
          <div className="member_img">
            <img src={rachel} alt="our_team" className='rounded-[50%]'/>
            <div className="social_media">
              <div className="item text-white text-2xl"><a href=""><FontAwesomeIcon icon={ faLinkedin } /></a></div>
              <div className="item text-white text-2xl"><a href=""><FontAwesomeIcon icon={faGithub}/></a></div>
              <div className="item text-white text-2xl"><a href=""><FontAwesomeIcon icon={faInstagram}/></a></div>
            </div>
          </div>
          <h3>Rachel Anastasia Wijaya</h3>
          <span>Developer</span>
        </div>
      </div>
    </div>
  );
};
