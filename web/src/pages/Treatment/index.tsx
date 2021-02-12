import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import CardDashboard from '../../components/Card';
import api from '../../services/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    grid: {
      margin: '0 -15px !important',
      width: 'unset',
    },
    item: {
      margin: '0 5px 5px 0',
    },
  }),
);

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

  useEffect(() => {
    api
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
  }, [id]);

  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <Grid container className={classes.grid}>
        <Grid xs={12} sm={6} md={3}>
          <CardDashboard title="Total de bovinos" quantity={cattleTotal} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <CardDashboard title="Total de equinos" quantity={horseTotal} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <CardDashboard title="Peso final projetado" quantity={weightTotal} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <CardDashboard
            title="Peso final de bovinos"
            quantity={weightByCattle}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <CardDashboard
            title="Peso final de equinos"
            quantity={weightByHorse}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <CardDashboard
            title="Trato final projetado"
            quantity={rationProvisionTotal}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <CardDashboard
            title="Trato final de bovinos"
            quantity={rationProvisionByCattle}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <CardDashboard
            title="Trato final de equinos"
            quantity={rationProvisionByHorse}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Treatment;
