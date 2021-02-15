import React, { useState, useCallback, FormEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useAuth } from '../../hooks/auth';
import useStyles, { CustomTextField } from './styles';

const SignIn: React.FC = () => {
  const classes = useStyles();

  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        if (username.value === '') {
          setUsername({
            ...username,
            value: '',
            error: 'Nome de usuário não pode estar vazio',
          });
          return;
        }

        if (password.value === '') {
          setPassword({
            ...username,
            value: '',
            error: 'Senha não pode estar vazia',
          });
          return;
        }

        await signIn({ username: username.value, password: password.value });

        history.push('/dashboard');
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
            error={!!username.error}
            id="username"
            label="Nome de usuário"
            name="username"
            onChange={e =>
              setUsername({ ...username, value: e.target.value, error: '' })
            }
            helperText={username.error ? username.error : ''}
          />
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={!!password.error}
            name="password"
            label="Senha"
            type="password"
            id="password"
            onChange={e =>
              setPassword({ ...password, value: e.target.value, error: '' })
            }
            helperText={password.error ? password.error : ''}
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
          message="Ocorreu um erro ao fazer login, cheque suas credenciais."
        />
      </div>
    </Container>
  );
};

export default SignIn;
