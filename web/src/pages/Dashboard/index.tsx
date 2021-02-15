import React from 'react';
import Confinement from '../Confinement';
import useStyles from './styles';

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
