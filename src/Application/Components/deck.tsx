import * as React from 'react';
import { AppBar, Toolbar, IconButton, MenuItem, Menu, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
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

const TopHeader: React.FC = () => {
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
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
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
      </Toolbar>
    </AppBar>
  );
};

export default TopHeader;
