import * as React from 'react';
import { AppBar, Toolbar, IconButton, MenuItem, Menu, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ShopIcon from '@material-ui/icons/Shop';
import PagesIcon from '@material-ui/icons/LibraryBooks';
import ContactIcon from '@material-ui/icons/ContactMail';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuItem: {
      marginLeft: theme.spacing(2),
    },
    callNowText: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
      marginLeft: theme.spacing(2),
    },
    appBar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.text.primary,
      position: 'static',
    },
    toolBar: {
      width: '100%',
      margin: '0 auto',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }),
);

const HeaderDeck: React.FC = () => {
  const classes = useStyles();
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currencyAnchorEl, setCurrencyAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleCurrencyMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCurrencyAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleCurrencyMenuClose = () => {
    setCurrencyAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6">
            My Website
          </Typography>
          <div className={classes.grow}>
            <IconButton aria-label="home" color="inherit">
              <Typography variant="body2">Home</Typography>
            </IconButton>
            <IconButton aria-label="shop" color="inherit">
              <Typography variant="body2">Shop</Typography>
            </IconButton>
            <IconButton aria-label="pages" color="inherit">
              <Typography variant="body2">Pages</Typography>
            </IconButton>
            <IconButton aria-label="contact us" color="inherit">
              <Typography variant="body2">Contact Us</Typography>
            </IconButton>
            <IconButton aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton aria-label="profile" color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <IconButton aria-label="wishlist" color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton aria-label="cart" color="inherit">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="body2" className={classes.callNowText}>
          Call Now 087780976170
        </Typography>
        <div>
          <IconButton
            aria-label="language"
            aria-controls="language-menu"
            aria-haspopup="true"
            onClick={handleLanguageMenuOpen}
            className={classes.menuItem}
            color="inherit"
          >
            <Typography variant="body2">ENG</Typography>
          </IconButton>
          <Menu
            id="language-menu"
            anchorEl={languageAnchorEl}
            keepMounted
            open={Boolean(languageAnchorEl)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem onClick={handleLanguageMenuClose}>English</MenuItem>
            <MenuItem onClick={handleLanguageMenuClose}>Indonesian</MenuItem>
            <MenuItem onClick={handleLanguageMenuClose}>Japanese</MenuItem>
          </Menu>
          <IconButton
            aria-label="currency"
            aria-controls="currency-menu"
            aria-haspopup="true"
            onClick={handleCurrencyMenuOpen}
            className={classes.menuItem}
            color="inherit"
          >
            <Typography variant="body2">USD</Typography>
          </IconButton>
          <Menu
            id="currency-menu"
            anchorEl={currencyAnchorEl}
            keepMounted
            open={Boolean(currencyAnchorEl)}
            onClose={handleCurrencyMenuClose}
          >
            <MenuItem onClick={handleCurrencyMenuClose}>USD</MenuItem>
            <MenuItem onClick={handleCurrencyMenuClose}>IDR</MenuItem>
            <MenuItem onClick={handleCurrencyMenuClose}>YEN</MenuItem>
          </Menu>
        </div>
      </div>
    </Toolbar>
  </AppBar>
</React.Fragment>

);
};

export default HeaderDeck;