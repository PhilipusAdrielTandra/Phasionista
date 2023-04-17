import * as React from 'react';
import { AppBar, Toolbar, IconButton, InputBase } from '@material-ui/core';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import { HomeOutlined, StoreOutlined, PagesOutlined, MailOutline, Search, AccountCircle, Favorite, ShoppingCart } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
      },
    },
    menuItemText: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
      marginLeft: theme.spacing(1),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    appBar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.text.primary,
    },
    hideOnScroll: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      transition: theme.transitions.create(['transform', 'visibility'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.short,
      }),
      '&.hidden': {
        visibility: 'hidden',
        transform: 'translateY(-100%)',
      },
    },
  }),
);

const TopHeader: React.FC = () => {
  const classes = useStyles();
  const [isHidden, setIsHidden] = React.useState(false);
  const handleScroll = React.useCallback(() => {
    if (window.pageYOffset > 0) {
      setIsHidden(true);
      setTimeout(() => setIsHidden(false), 200);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={`${classes.appBar} ${isHidden ? classes.hideOnScroll + ' hidden' : ''}`}>
        <Toolbar>
    <Typography variant="h6" className={classes.title}>
    Phasionista
    </Typography>
    <div className={classes.menuItem}>
    <IconButton className={classes.menuButton} color="inherit" aria-label="home">
        <HomeOutlined />
    <span className={classes.menuItemText}>Home</span>
    </IconButton>
    <IconButton className={classes.menuButton} color="inherit" aria-label="shop">
        <StoreOutlined />
    <span className={classes.menuItemText}>Shop</span>
    </IconButton>
    <IconButton className={classes.menuButton} color="inherit" aria-label="pages">
        <PagesOutlined />
    <span className={classes.menuItemText}>Pages</span>
    </IconButton>
    <IconButton className={classes.menuButton} color="inherit" aria-label="contact us">
        <MailOutline />
    <span className={classes.menuItemText}>Contact Us</span>
    </IconButton>
    </div>
    <div className={classes.grow} />
    <div className={classes.search}>
    <div className={classes.searchIcon}>
        <Search />
    </div>
    <InputBase
    placeholder="Search…"
    classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
    />
    </div>
    <IconButton edge="end" color="inherit" aria-label="profile">
        <AccountCircle />
    </IconButton>
    <IconButton edge="end" color="inherit" aria-label="wishlist">
        <Favorite />
    </IconButton>
    <IconButton edge="end" color="inherit" aria-label="cart">
        <ShoppingCart />
    </IconButton>
  </Toolbar>
 </AppBar>
</div>
);
};

export default TopHeader;
