// jshint esversion:9
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { ListItemIcon, ListItemText, List, ListItem, Avatar } from '@mui/material';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles'; // 1 - to access defaultTheme values

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { format } from 'date-fns';

const drawerWidth = 240;

export const Layout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const theme = useTheme(); // 2 - to access defaultTheme values

  const myStyleClasses = {
    page: {
      backgroundColor: '#F9F9F9',
      width: '100%',
      padding: `${theme.spacing(3)}`, // 3 - to get the default spacing '8px' from muiTheme  and multiply by 3
    },
    drawer: {
      width: drawerWidth,

      '.MuiDrawer-paper': {
        width: drawerWidth, //to also change the width value of paper
      },
    },
    root: {
      display: 'flex',
    },
    active: {
      backgroundColor: '#F4F4F4',
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar, // gets all collections of styles used by mui on the toolbar component
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };

  const menuItems = [
    { text: 'My Notes', icon: <SubjectOutlined color='secondary' />, path: '/' },
    { text: 'Create Note', icon: <AddCircleOutlineOutlined color='secondary' />, path: '/create' },
  ];

  return (
    <Box sx={myStyleClasses.root}>
      {/* APP BAR */}

      <AppBar sx={myStyleClasses.appBar} elevation={0}>
        <Toolbar>
          <Typography sx={myStyleClasses.date}>Today is the {format(new Date(), 'do MMMM Y')}</Typography>
          <Typography>Casemiro</Typography>
          <Avatar src='/mario-av.png' sx={myStyleClasses.avatar} />
        </Toolbar>
      </AppBar>

      {/* DRAWER */}

      <Drawer sx={myStyleClasses.drawer} variant='permanent' anchor='left'>
        <div>
          <Typography variant='h5' sx={myStyleClasses.title}>
            Vitto Notes
          </Typography>
        </div>

        {/* LIST & LIST TEMS */}

        {/* <List>
          <ListItem>
            <ListItemText primary='Hello' />
          </ListItem>
          <ListItem>
            <ListItemText primary='Hello' />
          </ListItem>
          <ListItem>
            <ListItemText primary='Hello' />
          </ListItem>
        </List> */}

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} button onClick={() => history.push(item.path)} sx={location.pathname === item.path && myStyleClasses.active}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={`${item.text}`} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={myStyleClasses.page}>
        <Box sx={myStyleClasses.toolbar}></Box>
        {children}
      </Box>
    </Box>
  );
};
