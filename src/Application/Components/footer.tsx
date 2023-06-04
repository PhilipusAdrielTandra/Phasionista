import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Divider } from '@material-ui/core';
import { YouTube, LinkedIn, Twitter, Instagram } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { SectionIdEnum } from '../Data/Types';
import { Link as SmoothLink, animateScroll as scroll } from "react-scroll";

const navigationItems = [
  {
    text: "About Us",
    to: SectionIdEnum.intro,
  },
  {
    text: "Our Team",
    to: SectionIdEnum.team,
  },
  {
    text: "Contact Us",
    to: SectionIdEnum.contact,
  }
];


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'white',
      color: 'black',
      fontFamily:"Poppins",
      padding: theme.spacing(4, 2),
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      maxWidth: theme.breakpoints.values.lg,
      margin: 'auto',
    },
    section: {
      display: 'flex',
      fontFamily:"Poppins",
      fontSize: '1rem',
      flexDirection: 'column',
      alignItems: 'flex-start',
      margin: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(4),
        '&:last-child': {
          marginRight: 0,
        },
      },
    },
    sectionTitle: {
      fontFamily: "Poppins",
      fontWeight: 500,
      marginBottom: theme.spacing(2),
      fontSize: '1.4rem',
    },
    sectionButton: {
      margin: theme.spacing(0.5),
      fontWeight: 'normal',
      textTransform: 'none',
      display: 'block',
    },
    divider: {
      margin: theme.spacing(4, 0),
    },
    followUsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing(2),
    },
    followUsTitle: {
      fontFamily: "Poppins",
      fontWeight: 500,
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(1),
      fontSize: '1.4rem',
    },
    socialButton: {
      margin: theme.spacing(0.5),
      color: 'white',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginRight: theme.spacing(4),
      alignSelf: 'center',
    },
  }),
);

const Footer: React.FC = () => {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbywzUONQ0BsQzTEZ3efD8s4ISl5l0-TCz2c-_snhCIiiDoI4YsCv05V3dg9eBToZ3cwsg/exec';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('email', email);
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    fetch(scriptURL, {mode: 'no-cors', method: 'POST', body: formData, headers })
      .then(response => {
        console.log('Success!', response);
        setSubscribed(true);
        setEmail('');
      })
      .catch(error => console.error('Error!', error.message));
  };
  
  const handleChange = e => {
    setEmail(e.target.value);
  };

  const classes = useStyles();
  const mappedItems = (
    navigationItems.map(({ to, text }) => {
      return (
        <Link className='font-poppins' to={`/about#${to}`}>
            <Button className={classes.sectionButton}>{text}</Button>
        </Link>

      );
    })
  );

  return (
    <footer className={classes.root}>
      <div className={classes.container}>
        <div className={classes.section}>
          <div className={classes.sectionTitle} >About Us</div>
          {mappedItems}
          <Link to={"/orders"}>
            <Button className={classes.sectionButton}>Orders</Button>
          </Link>
        </div>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>Useful Links</div>
          <Link className="font-poppins" to={"/returns"}>
            <Button className={classes.sectionButton}>Returns</Button>
          </Link>
          <Link to={"/faqs"}>
            <Button className={classes.sectionButton}>Support Policy</Button>
          </Link>
          <Link to={"/sizes"}>
            <Button className={classes.sectionButton}>Size Guide</Button>
          </Link>
          <Link to={"/faqs"}>
            <Button className={classes.sectionButton}>FAQs</Button>
          </Link>
        </div>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>Subscribe</div>
          <div>
            <form onSubmit={handleSubmit}>
              <input type="email" onChange={handleChange} placeholder="Enter your email" />
              <Button type="submit" className={classes.sectionButton}>Subscribe</Button>
              {subscribed && <p className='font-light'>Thank you for subscribing!</p>}
            </form>
          </div>
        </div>
        <div className={classes.section}>
          <div className={classes.followUsTitle}>Follow Us</div>
          <Button href="https://www.youtube.com/@bagzmate"className={classes.socialButton} style={{ backgroundColor: '#c4302b'}}>
            <YouTube />
          </Button>
          <Button href="https://www.linkedin.com/in/peternelsonsubrata/" className={classes.socialButton} style={{ backgroundColor: '#0077b5'}}>
            <LinkedIn />
          </Button>
          <Button href="https://twitter.com/Onionhat2" className={classes.socialButton} style={{ backgroundColor: '#1da1f2' }}>
            <Twitter />
          </Button>
          <Button href="https://www.instagram.com/binusinter/" className={classes.socialButton} style={{ backgroundColor: '#3f729b' }}>
            <Instagram />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

