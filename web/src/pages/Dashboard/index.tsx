import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from '../../components/Sidebar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
  }),
);

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar />
    </div>
  );
};

export default Dashboard;
