import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    grid: {
      margin: '15px 5px !important',
      width: 'unset',
    },
    item: {
      margin: '0 5px 5px 0',
    },
    titleArea: {
      display: 'flex',
      alignContent: 'center',
    },
    buttonBack: {
      padding: 0,
      marginRight: 10,
    },
    titleText: {
      fontWeight: 'bold',
    },
  }),
);

export default useStyles;
