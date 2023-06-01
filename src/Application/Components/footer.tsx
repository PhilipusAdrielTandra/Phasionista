import * as React from 'react';
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
      fontWeight: 300,
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
      fontWeight: 300,
      marginRight: theme.spacing(2),
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


  const classes = useStyles();
  const mappedItems = (
    navigationItems.map(({ to, text }) => {
      return (
        <Link to={`/about#${to}`}>
            <Button className={classes.sectionButton}>{text}</Button>
        </Link>

      );
    })
  );

  return (
    <footer className={classes.root}>
      <div className={classes.container}>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>About Us</div>
          {mappedItems}
          <Button className={classes.sectionButton}>Orders</Button>
        </div>
        <div className={classes.section}>
          <div className={classes.sectionTitle}>Useful Links</div>
          <Link to={"/returns"}>
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
            <input type="email" placeholder="Enter your email" />
            <Button className={classes.sectionButton}>Subscribe</Button>
          </div>
        </div>
        <div className={classes.section}>
          <div className={classes.followUsTitle}>Follow Us</div>
          <Button className={classes.socialButton} style={{ backgroundColor: '#c4302b'          }}>
            <YouTube />
          </Button>
          <Button className={classes.socialButton} style={{ backgroundColor: '#0077b5' }}>
            <LinkedIn />
          </Button>
          <Button className={classes.socialButton} style={{ backgroundColor: '#1da1f2' }}>
            <Twitter />
          </Button>
          <Button className={classes.socialButton} style={{ backgroundColor: '#3f729b' }}>
            <Instagram />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

