import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import {
  Typography,
  makeStyles,
  createStyles,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Theme,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface Confinement {
  id: string;
  nome: string;
  qtdBovinos: number;
  qtdEquinos: number;
  inicioConfinamento: Date;
  fimConfinamento: Date;
  usrCriacao: string;
}

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

const Confinement: React.FC = () => {
  const classes = useStyles();
  const { user } = useAuth();

  const [confinements, setConfinements] = useState<Confinement[]>([]);
  const [idToExclude, setIdToExclude] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const columns: ColDef[] = [
    {
      field: 'provisions',
      headerName: 'Trato',
      width: 130,
      renderCell: (params: ValueFormatterParams) => {
        const { id } = params.row;
        return (
          <div style={{ marginTop: 10, cursor: 'pointer' }}>
            <span>
              <Link style={{ color: '#000' }} to={`/trato/${id}`}>
                <VisibilityIcon />
              </Link>
            </span>
          </div>
        );
      },
    },
    { field: 'nome', headerName: 'Nome', width: 130 },
    { field: 'qtdBovinos', headerName: 'Bovinos', width: 130 },
    { field: 'qtdEquinos', headerName: 'Equinos', width: 130 },
    {
      field: 'inicioConfinamento',
      headerName: 'Início',
      width: 110,
      valueFormatter: (params: ValueFormatterParams) => {
        const date = params.getValue('inicioConfinamento');
        const parsedDate = new Date(String(date));
        const year = parsedDate.getFullYear();
        const month =
          parsedDate.getMonth() + 1 > 9 ? '' : `0${parsedDate.getMonth() + 1}`;
        const day =
          parsedDate.getDate() > 9
            ? parsedDate.getDate()
            : `0${parsedDate.getDate()}`;
        return `${day}/${month}/${year}`;
      },
    },
    {
      field: 'fimConfinamento',
      headerName: 'Fim',
      width: 110,
      valueFormatter: (params: ValueFormatterParams) => {
        const date = params.getValue('fimConfinamento');
        const parsedDate = new Date(String(date));
        const year = parsedDate.getFullYear();
        const month =
          parsedDate.getMonth() + 1 > 9 ? '' : `0${parsedDate.getMonth() + 1}`;
        const day =
          parsedDate.getDate() > 9
            ? parsedDate.getDate()
            : `0${parsedDate.getDate()}`;
        return `${day}/${month}/${year}`;
      },
    },
    { field: 'usrCriacao', headerName: 'Usuário', width: 110 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 130,
      hide: !user.admin,
      renderCell: (params: ValueFormatterParams) => {
        const { id } = params.row;
        return (
          <div style={{ marginTop: 10 }}>
            <span style={{ cursor: 'pointer' }}>
              <Link style={{ color: '#000' }} to={`/form/${id}`}>
                <CreateIcon />
              </Link>
            </span>
            <span style={{ marginLeft: 10, cursor: 'pointer' }}>
              <DeleteOutlineIcon onClick={() => handleOpenDialog(String(id))} />
            </span>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getConfinements = async () => {
      await api.get('/confinements').then(response => {
        setConfinements(response.data);
      });
    };

    getConfinements();
  }, [confinements]);

  const handleRemoveConfinement = useCallback(async () => {
    try {
      await api
        .delete(`/confinements/${idToExclude}`)
        .then(() => {
          setOpenDialog(!openDialog);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [idToExclude, openDialog]);

  const handleOpenDialog = useCallback(
    (id: string) => {
      setIdToExclude(id);
      setOpenDialog(!openDialog);
    },
    [openDialog],
  );

  const handleCloseDialog = useCallback(() => {
    setIdToExclude('');
    setOpenDialog(!openDialog);
  }, [openDialog]);

  return (
    <>
      <div className={classes.titleArea}>
        <Typography className={classes.titleText} variant="h5" noWrap>
          Confinamentos
        </Typography>
        {user.admin ? (
          <Link className={classes.linkToForm} to="/form">
            <Typography className={classes.newButton} variant="h6" noWrap>
              Novo
            </Typography>
          </Link>
        ) : (
          ''
        )}
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={confinements} columns={columns} pageSize={5} />
      </div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={openDialog}
      >
        <DialogTitle id="confirmation-dialog-title">Atenção</DialogTitle>
        <DialogContentText style={{ padding: '0 20px' }}>
          Você realmente deseja excluir este confinamento?
        </DialogContentText>
        <DialogActions>
          <Button
            style={{ fontWeight: 'bold', color: '#000' }}
            autoFocus
            onClick={handleCloseDialog}
            color="primary"
          >
            <strong>Cancelar</strong>
          </Button>
          <Button
            style={{ background: 'red', color: '#fff', fontWeight: 'bold' }}
            onClick={handleRemoveConfinement}
            color="secondary"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Confinement;
