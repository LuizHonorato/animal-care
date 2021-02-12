import React, { useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import GlobalStyle from './styles/global';

import Routes from './routes';
import { useAuth } from './hooks/auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  const { user } = useAuth();

  const userExists = useMemo(() => {
    if (user) {
      return true;
    }

    return false;
  }, [user]);

  return (
    <Router>
      <>
        <div className={classes.root}>
          <CssBaseline />
          {userExists ? <Sidebar /> : ''}
          <main className={classes.content}>
            <Routes />
          </main>
        </div>

        <GlobalStyle />
      </>
    </Router>
  );
};

export default App;
