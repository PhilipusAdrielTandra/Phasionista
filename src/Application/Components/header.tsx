import * as React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Menu, MenuItem, Popper, Paper, PopperPlacementType, Fade, MenuList } from '@material-ui/core';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import { HomeOutlined, StoreOutlined, PagesOutlined, MailOutline, Search, AccountCircle, Favorite, ShoppingCart, ExpandMore } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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
      fontSize: "1rem",
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
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuPlacement, setMenuPlacement] = React.useState<PopperPlacementType>('bottom-start');

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

  const handleCloseMenu = () => {
    setMenuAnchorEl((prev) => (prev ? null : prev));
    setMenuPlacement('bottom');
  };
  
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={`${classes.appBar} ${isHidden ? classes.hideOnScroll + ' hidden' : ''}`}>
        <Toolbar>
    <Typography variant="h6" className={classes.title}>
    Phasionista
    </Typography>
    <div className={classes.menuItem}>
    <Link to={"/home"}>
      <IconButton className={classes.menuButton} color="inherit" aria-label="home">
          <HomeOutlined />
      <span className={classes.menuItemText}>Home</span>
      </IconButton>
    </Link>
    <IconButton className={classes.menuButton} color="inherit" aria-label="shop">
        <StoreOutlined />
    <span className={classes.menuItemText}>Shop</span>
    </IconButton>
        <Popper
      open={Boolean(menuAnchorEl)}
      anchorEl={menuAnchorEl}
      placement={menuPlacement}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <MenuList>
              <Link to="/">
                <MenuItem onClick={handleCloseMenu} >Home</MenuItem>
              </Link>
              <Link to="/library">
                <MenuItem onClick={handleCloseMenu} >Library</MenuItem>
              </Link>
              <Link to="/product/sample-product">
                <MenuItem onClick={handleCloseMenu} >Product</MenuItem>
              </Link>
              <Link to="/cart">
                <MenuItem onClick={handleCloseMenu} >Cart</MenuItem>
              </Link>
              <Link to="/chat">
                <MenuItem onClick={handleCloseMenu} >Chat</MenuItem>
              </Link>
              <Link to="/wishlist">
                <MenuItem onClick={handleCloseMenu} >Wishlist</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem onClick={handleCloseMenu} >Login</MenuItem>
              </Link>
              <Link to="/register">
                <MenuItem onClick={handleCloseMenu} >Register</MenuItem>
              </Link>
            </MenuList>
          </Paper>
        </Fade>
      )}
    </Popper>

    <IconButton
      className={classes.menuButton}
      color="inherit"
      aria-label="pages"
      onClick={(e) => {
        if (menuAnchorEl === e.currentTarget) {
          handleCloseMenu();
        } else {
          setMenuAnchorEl(e.currentTarget);
          setMenuPlacement('bottom');
        }
      }}
    >
      <PagesOutlined />
      <span className={classes.menuItemText}>Pages</span>
      <ExpandMore />
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
      <Link to="/profile">
        <AccountCircle />
      </Link>
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
