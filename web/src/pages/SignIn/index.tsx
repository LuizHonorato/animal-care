import React, { useState, useCallback, FormEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useAuth } from '../../hooks/auth';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    backgroundColor: '#F04F26',
    '&:hover': {
      backgroundColor: '#973015',
    },
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#973015',
    },
  },
}));

const CustomTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#1E4A81',
      },
      '&:hover fieldset': {
        borderColor: '#1E4A81',
      },
    },
  },
})(TextField);

const SignIn: React.FC = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(false);
      try {
        if (username !== '' && password !== '') {
          await signIn({ username, password });

          history.push('/dashboard');
        } else {
          setError(true);
        }
      } catch (err) {
        setOpen(true);
      }
    },
    [signIn, history, password, username],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Seja bem-vindo ao Animal Care
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={error}
            id="username"
            label="Nome de usuário"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={e => setUsername(e.target.value)}
            helperText={error ? 'Nome de usuário não pode estar vazio' : ''}
          />
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={error}
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            helperText={error ? 'Senha não pode estar vazia' : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          onClose={handleClose}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
          message="Ocorreu um erro ao fazer login, cheque as credenciais."
        />
      </div>
    </Container>
  );
};

export default SignIn;
