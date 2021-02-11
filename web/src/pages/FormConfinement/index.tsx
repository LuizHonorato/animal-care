import React, { useCallback, useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  makeStyles,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Snackbar,
  TextField,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { CloseIcon } from '@material-ui/data-grid';
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
  root: {
    marginTop: theme.spacing(8),
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
}));

const FormConfinement: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  const [idConfinement, setIdConfinement] = useState('');
  const [nome, setNome] = useState('');
  const [inicioConfinamento, setInicioConfinamento] = useState<Date | null>(
    new Date(),
  );
  const [fimConfinamento, setFimConfinamento] = useState<Date | null>(
    new Date(),
  );
  const [qtdBovinos, setQtdBovinos] = useState(0);
  const [qtdEquinos, setQtdEquinos] = useState(0);
  const [usrCriacao, setUsrCriacao] = useState('');
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const { id } = useParams<Params>();

  useEffect(() => {
    if (id) {
      setIdConfinement(id);

      const getConfinement = async () => {
        await api.get<Confinement>(`/confinements/${id}`).then(response => {
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
      };

      getConfinement();
    }
  }, [id, idConfinement]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleInicioConfinamentoDateChange = (date: Date | null) => {
    setInicioConfinamento(date);
  };

  const handleFimConfinamentoDateChange = (date: Date | null) => {
    setFimConfinamento(date);
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        if (
          nome !== '' &&
          inicioConfinamento !== null &&
          fimConfinamento !== null &&
          qtdBovinos > 0 &&
          qtdEquinos > 0 &&
          usrCriacao !== ''
        ) {
          if (idConfinement === '') {
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
        }
      } catch {
        setError(true);
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
    ],
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.root} onSubmit={handleSubmit} noValidate>
        <input type="hidden" value={idConfinement} />
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={error}
            value={nome}
            onChange={e => setNome(e.target.value)}
            id="nome"
            label="Nome do confinamento"
            name="username"
            autoComplete="username"
          />
        </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.paper}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              id="inicioConfinamento"
              label="Início"
              value={inicioConfinamento}
              onChange={handleInicioConfinamentoDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              id="fimConfinamento"
              label="Fim"
              value={fimConfinamento}
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
            error={error}
            value={qtdBovinos}
            onChange={e => setQtdBovinos(Number(e.target.value))}
            name="qtdBovinos"
            label="Bovinos"
            type="number"
            id="qtdBovinos"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={qtdEquinos}
            onChange={e => setQtdEquinos(Number(e.target.value))}
            error={error}
            name="qtdEquinos"
            label="Equinos"
            type="number"
            id="qtdEquinos"
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
            onChange={e => setUsrCriacao(e.target.value)}
            error={error}
            id="nome"
            label="Nome do usuário"
            name="username"
            autoComplete="username"
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
        message="Ocorreu um erro ao fazer login, cheque as credenciais."
      />
    </Container>
  );
};

export default FormConfinement;
