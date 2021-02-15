import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleArea: {
      display: 'flex',
      margin: '16px 0',
    },
    titleText: {
      flexGrow: 1,
      fontWeight: 'bold',
    },
    linkToForm: {
      textDecoration: 'none',
    },
    newButton: {
      textDecoration: 'none',
      fontWeight: 'bold',
      height: 38,
      width: 100,
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#1E4A81',
      background: '#1E4A81',
      color: '#fff',
      textAlign: 'center',
      justifyContent: 'center',
    },
    loading: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export default useStyles;
