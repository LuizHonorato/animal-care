import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    marginTop: 20,
    '& .MuiTextField-root': {
      '& #nome': {
        marginTop: theme.spacing(1),
        width: 396,
      },
      '& #inicioConfinamento': {
        width: 110,
      },
      '& #fimConfinamento': {
        width: 110,
      },
      '& #qtdBovinos': {
        width: 165,
      },
      '& #qtdEquinos': {
        width: 165,
      },
    },
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#1E4A81',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#52AF50',
    '&:hover': {
      backgroundColor: '#52AF50',
    },
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#1E4A81',
    },
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
}));

export default useStyles;
