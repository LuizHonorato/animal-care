import React, { useState, useCallback } from 'react';
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
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
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
  }),
);

const Sidebar: React.FC = () => {
  const classes = useStyles();

  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useAuth();

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
            {/* {`Olá ${user.username}`} */}
          </Typography>
          <IconButton className={classes.logoutButton} aria-label="logout">
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
              <Typography variant="h6" noWrap>
                Animal Care
              </Typography>
              <div className={classes.toolbar} />
              <Divider />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <HomeOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Confinamentos" />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Perfil do usuário" />
                </ListItem>
              </List>
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
                <ListItem button>
                  <ListItemIcon>
                    <HomeOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Confinamentos" />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Perfil do usuário" />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default Sidebar;
