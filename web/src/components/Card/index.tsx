import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    marginTop: 5,
    marginRight: 5,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface Props {
  title: string;
  quantity: number;
}

const CardDashboard: React.FC<Props> = ({ title, quantity }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h3" component="h1">
          {quantity.toFixed(0)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardDashboard;
