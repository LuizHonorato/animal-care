import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardDashboard from '../../components/Card';
import api from '../../services/api';
import useStyles from './styles';

interface Params {
  id?: string;
}

interface RationProvisionProjection {
  day: number;
  qtdRationTotalPerDay: number;
  qtdRationToCattlePerDay: number;
  qtdRationToHorsePerDay: number;
}

interface Treatment {
  id: string;
  cattleTotal: number;
  horseTotal: number;
  weightTotal: number;
  weightByCattle: number;
  weightByHorse: number;
  rationProvisionTotal: number;
  rationProvisionByCattle: number;
  rationProvisionByHorse: number;
  rationProvisionProjectionPerDay: RationProvisionProjection[];
}

const Treatment: React.FC = () => {
  const [idConfinement, setIdConfinement] = useState('');
  const [cattleTotal, setCattleTotal] = useState(0);
  const [horseTotal, setHorseTotal] = useState(0);
  const [weightTotal, setWeightTotal] = useState(0);
  const [weightByCattle, setWeightByCattle] = useState(0);
  const [weightByHorse, setWeightByHorse] = useState(0);
  const [rationProvisionTotal, setRationProvisionTotal] = useState(0);
  const [rationProvisionByCattle, setRationProvisionByCattle] = useState(0);
  const [rationProvisionByHorse, setRationProvisionByHorse] = useState(0);
  const [treatment, setTreatment] = useState<RationProvisionProjection[]>([]);

  const { id } = useParams<Params>();
  const history = useHistory();

  useEffect(() => {
    const getTreatment = async () => {
      await api
        .get<Treatment>(`/confinements/provisions/${id}`)
        .then(response => {
          setIdConfinement(response.data.id);
          setCattleTotal(response.data.cattleTotal);
          setHorseTotal(response.data.horseTotal);
          setWeightTotal(response.data.weightTotal);
          setWeightByCattle(response.data.weightByCattle);
          setWeightByHorse(response.data.weightByHorse);
          setRationProvisionTotal(response.data.rationProvisionTotal);
          setRationProvisionByCattle(response.data.rationProvisionByCattle);
          setRationProvisionByHorse(response.data.rationProvisionByHorse);
          setTreatment(response.data.rationProvisionProjectionPerDay);
        })
        .catch(err => {
          console.log(err);
        });
    };

    getTreatment();
  }, [id]);

  const handleBackButton = useCallback(() => {
    history.goBack();
  }, [history]);

  const classes = useStyles();

  const columns: ColDef[] = [
    { field: 'day', headerName: 'Dia', width: 130 },
    {
      field: 'qtdRationTotalPerDay',
      headerName: 'Ração total por dia (KG)',
      width: 210,
      valueFormatter: (params: ValueFormatterParams) => {
        const { qtdRationTotalPerDay } = params.row;

        return qtdRationTotalPerDay.toFixed(2);
      },
    },
    {
      field: 'qtdRationToCattlePerDay',
      headerName: 'Ração bovina por dia (KG)',
      width: 240,
      valueFormatter: (params: ValueFormatterParams) => {
        const { qtdRationToCattlePerDay } = params.row;

        return qtdRationToCattlePerDay.toFixed(2);
      },
    },
    {
      field: 'qtdRationToHorsePerDay',
      headerName: 'Ração equina por dia (KG)',
      width: 240,
      valueFormatter: (params: ValueFormatterParams) => {
        const { qtdRationToHorsePerDay } = params.row;

        return qtdRationToHorsePerDay.toFixed(2);
      },
    },
  ];

  return (
    <div>
      <div className={classes.toolbar} />
      <input type="hidden" value={idConfinement} />
      <div className={classes.titleArea}>
        <IconButton
          onClick={handleBackButton}
          className={classes.buttonBack}
          aria-label="logout"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography className={classes.titleText} variant="h5" noWrap>
          Trato
        </Typography>
      </div>
      <Grid container className={classes.grid}>
        <Grid item xs={12} sm={6} md={3}>
          <CardDashboard title="Total de bovinos" quantity={cattleTotal} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardDashboard title="Total de equinos" quantity={horseTotal} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardDashboard
            title="Peso final projetado (KG)"
            quantity={weightTotal}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardDashboard
            title="Peso final de bovinos (KG)"
            quantity={weightByCattle}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardDashboard
            title="Peso final de equinos (KG)"
            quantity={weightByHorse}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardDashboard
            title="Trato final projetado (KG)"
            quantity={rationProvisionTotal}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardDashboard
            title="Trato final de bovinos (KG)"
            quantity={rationProvisionByCattle}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardDashboard
            title="Trato final de equinos (KG)"
            quantity={rationProvisionByHorse}
          />
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%', marginTop: 15 }}>
        <DataGrid rows={treatment} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default Treatment;
