import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Confinement from '../Confinement';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  }),
);

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <Confinement />
    </div>
  );
};

export default Dashboard;
