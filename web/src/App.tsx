import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <>
        <AppProvider>
          <div className={classes.root}>
            <CssBaseline />
            <Sidebar />
            <main className={classes.content}>
              <Routes />
            </main>
          </div>
        </AppProvider>

        <GlobalStyle />
      </>
    </Router>
  );
};

export default App;
