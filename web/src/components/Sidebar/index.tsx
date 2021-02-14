import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  createStyles,
  makeStyles,
  Theme,
  Drawer,
  Hidden,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from '../../hooks/auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    appBar: {
      backgroundColor: '#1E4A81',
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    helloUser: {
      flexGrow: 1,
    },
    logoutButton: {
      color: '#fff',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    link: {
      textDecoration: 'none',
      color: '#212121',
    },
  }),
);

const Sidebar: React.FC = () => {
  const classes = useStyles();

  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, signOut } = useAuth();

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.helloUser} variant="h6" noWrap>
            {`Olá ${user.username}`}
          </Typography>
          <IconButton
            onClick={signOut}
            className={classes.logoutButton}
            aria-label="logout"
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <div>
              <div className={classes.toolbar} />
              <Divider />
              <List>
                <Link className={classes.link} to="/dashboard">
                  <ListItem button>
                    <ListItemIcon>
                      <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Confinamentos" />
                  </ListItem>
                </Link>
              </List>
              <Divider />
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div>
              <div className={classes.toolbar} />
              <Divider />
              <List>
                <Link className={classes.link} to="/dashboard">
                  <ListItem button>
                    <ListItemIcon>
                      <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Confinamentos" />
                  </ListItem>
                </Link>
              </List>
              <Divider />
            </div>
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default Sidebar;
