import React, { useCallback, useState, FormEvent, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  makeStyles,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { CloseIcon } from '@material-ui/data-grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import api from '../../services/api';

interface Params {
  id?: string;
}

interface Confinement {
  id: string;
  nome: string;
  qtdBovinos: number;
  qtdEquinos: number;
  inicioConfinamento: Date;
  fimConfinamento: Date;
  usrCriacao: string;
}

const useStyles = makeStyles(theme => ({
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

const FormConfinement: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  const { id } = useParams<Params>();

  const [idConfinement, setIdConfinement] = useState(id);
  const [nome, setNome] = useState('');
  const [inicioConfinamento, setInicioConfinamento] = useState<Date | null>(
    new Date(2021, 3, 1),
  );
  const [fimConfinamento, setFimConfinamento] = useState<Date | null>(
    new Date(2021, 3, 31),
  );
  const [qtdBovinos, setQtdBovinos] = useState(0);
  const [qtdEquinos, setQtdEquinos] = useState(0);
  const [usrCriacao, setUsrCriacao] = useState('');
  const [errors, setErrors] = useState({
    nome: false,
    inicioConfinamento: false,
    fimConfinamento: false,
    qtdBovinos: false,
    qtdEquinos: false,
    usrCriacao: false,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (idConfinement) {
      api.get<Confinement>(`/confinements/${idConfinement}`).then(response => {
        setNome(response.data.nome);
        const parsedInicioConfinamento = new Date(
          response.data.inicioConfinamento,
        );
        setInicioConfinamento(parsedInicioConfinamento);

        const parsedFimConfinamento = new Date(response.data.fimConfinamento);

        setFimConfinamento(parsedFimConfinamento);
        setQtdBovinos(response.data.qtdBovinos);
        setQtdEquinos(response.data.qtdEquinos);
        setUsrCriacao(response.data.usrCriacao);
      });
    }
  }, [idConfinement]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleInicioConfinamentoDateChange = (date: Date | null) => {
    setErrors({ ...errors, inicioConfinamento: false });
    setInicioConfinamento(date);
  };

  const handleFimConfinamentoDateChange = (date: Date | null) => {
    setErrors({ ...errors, fimConfinamento: false });
    setFimConfinamento(date);
  };

  const handleChangeText = useCallback(
    e => {
      if (e.target.name === 'username') {
        setErrors({ ...errors, nome: false });
        setNome(e.target.value);
      } else if (e.target.name === 'qtdBovinos') {
        setErrors({ ...errors, qtdBovinos: false });
        setQtdBovinos(Number(e.target.value));
      } else if (e.target.name === 'qtdEquinos') {
        setErrors({ ...errors, qtdEquinos: false });
        setQtdEquinos(Number(e.target.value));
      } else if (e.target.name === 'usrCriacao') {
        setErrors({ ...errors, usrCriacao: false });
        setUsrCriacao(e.target.value);
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (nome === '') {
        setErrors({ ...errors, nome: true });
        return;
      }

      if (inicioConfinamento === null) {
        setErrors({ ...errors, inicioConfinamento: true });
        return;
      }

      if (fimConfinamento === null) {
        setErrors({ ...errors, fimConfinamento: true });
        return;
      }

      if (qtdBovinos <= 0) {
        setErrors({ ...errors, qtdBovinos: true });
        return;
      }

      if (qtdEquinos <= 0) {
        setErrors({ ...errors, qtdEquinos: true });
        return;
      }

      if (usrCriacao === '') {
        setErrors({ ...errors, usrCriacao: true });
        return;
      }

      try {
        if (!idConfinement) {
          await api
            .post('/confinements', {
              nome,
              inicioConfinamento,
              fimConfinamento,
              qtdBovinos,
              qtdEquinos,
              usrCriacao,
            })
            .then(() => {
              history.push('/dashboard');
            });
        } else {
          await api
            .put(`/confinements/${idConfinement}`, {
              id: idConfinement,
              nome,
              inicioConfinamento,
              fimConfinamento,
              qtdBovinos,
              qtdEquinos,
              usrCriacao,
            })
            .then(() => {
              history.push('/dashboard');
            });
        }
      } catch (err) {
        setOpen(true);
      }
    },
    [
      idConfinement,
      nome,
      inicioConfinamento,
      fimConfinamento,
      qtdBovinos,
      qtdEquinos,
      usrCriacao,
      history,
      errors,
    ],
  );

  const handleBackButton = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.toolbar} />
      <div className={classes.titleArea}>
        <IconButton
          onClick={handleBackButton}
          className={classes.buttonBack}
          aria-label="logout"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography className={classes.titleText} variant="h5" noWrap>
          {idConfinement ? 'Atualização' : 'Cadastro'}
        </Typography>
      </div>
      <form className={classes.root} onSubmit={handleSubmit} noValidate>
        <input type="hidden" value={idConfinement} />
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={errors.nome}
            value={nome}
            onChange={e => handleChangeText(e)}
            id="nome"
            helperText={
              errors.nome
                ? 'Informe o nome de identificação desse confinamento'
                : ''
            }
            label="Nome do confinamento"
            name="username"
          />
        </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.paper}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              disablePast
              error={errors.inicioConfinamento}
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              id="inicioConfinamento"
              label="Início"
              value={inicioConfinamento}
              onChange={handleInicioConfinamentoDateChange}
              helperText={
                errors.inicioConfinamento
                  ? 'Informe a data início do confinamento'
                  : ''
              }
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              disablePast
              error={errors.fimConfinamento}
              format="dd/MM/yyyy"
              margin="normal"
              id="fimConfinamento"
              label="Fim"
              value={fimConfinamento}
              helperText={
                errors.fimConfinamento
                  ? 'Informe a data fim do confinamento'
                  : ''
              }
              onChange={handleFimConfinamentoDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </div>
        </MuiPickersUtilsProvider>
        <div className={classes.paper}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={errors.qtdBovinos}
            value={qtdBovinos}
            onChange={e => handleChangeText(e)}
            name="qtdBovinos"
            label="Bovinos"
            type="number"
            id="qtdBovinos"
            helperText={errors.qtdBovinos ? 'Quantidade mínima de 1' : ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={qtdEquinos}
            onChange={e => handleChangeText(e)}
            error={errors.qtdEquinos}
            name="qtdEquinos"
            label="Equinos"
            type="number"
            id="qtdEquinos"
            helperText={errors.qtdEquinos ? 'Quantidade mínima de 1' : ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={usrCriacao}
            onChange={e => handleChangeText(e)}
            error={errors.usrCriacao}
            id="nome"
            label="Nome do usuário"
            name="usrCriacao"
            helperText={
              errors.usrCriacao ? 'Nome do usuário não pode estar vazio' : ''
            }
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Salvar
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
        message="Ocorreu um erro ao salvar o confinamento. Cheque seus dados e tente novamente."
      />
    </Container>
  );
};

export default FormConfinement;
