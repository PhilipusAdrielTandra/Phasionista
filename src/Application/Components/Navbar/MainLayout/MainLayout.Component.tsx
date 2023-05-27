import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    useMediaQuery,
    useTheme,
  } from '@mui/material';
  import logoImg  from "../../../Assets/branding/logo.png";
  import React from 'react';
  import AnchorLink from 'react-anchor-link-smooth-scroll';
  import { SectionIdEnum } from '../../../Data/Types';
  import { Navigation } from './Navigation/Navigation.Component';
  
  export type MainLayoutProps = {
    children: React.ReactNode;
  };
  
  export const 
  MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
    return (
      <Box height="100vh">
        <AppBar position="fixed" sx={{ background: 'black' }}>
          <Toolbar>
            <Box flexGrow={1}>
              <AnchorLink href={`#${SectionIdEnum.intro}`} offset={isSmall ? '56px' : '64px'} className="all_unset">
                <Box display="flex" alignItems="center" gap={0.5} sx={{ cursor: 'pointer' }}>
                  <img width="54px" height="54px" src={logoImg} alt="logo" />
                  <Typography variant="h5" sx={{ width: 'fit-content' }}>Phasionista</Typography>
                </Box>
              </AnchorLink>
            </Box>
            <Navigation isSmall={isSmall} />
          </Toolbar>
        </AppBar>
        <Box>
          <Toolbar />
          {children}
        </Box>
      </Box>
    );
  };
