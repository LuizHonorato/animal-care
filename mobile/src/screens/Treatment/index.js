import React, {useEffect, useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Header from '../../components/Header';
import api from '../../services/api';


// interface RationProvisionProjection {
//     id: string;
//     day: number;
//     qtdRationTotalPerDay: number;
//     qtdRationToCattlePerDay: number;
//     qtdRationToHorsePerDay: number;
//   }
  
//   interface IResponse {
//     id: string;
//     cattleTotal: number;
//     horseTotal: number;
//     weightTotal: number;
//     weightByCattle: number;
//     weightByHorse: number;
//     rationProvisionTotal: number;
//     rationProvisionByCattle: number;
//     rationProvisionByHorse: number;
//     rationProvisionProjectionPerDay: RationProvisionProjection[];
//   }

const Treatment = () => {
    const route = useRoute();
    const routeParams = route.params;

    const [selectedTreatment, setSelectedTreatment] = useState(routeParams.id);
    const [cattleTotal, setCattleTotal] = useState(0);
    const [horseTotal, setHorseTotal] = useState(0);
    const [weightTotal, setWeightTotal] = useState(0);
    const [weightByCattle, setWeightByCattle] = useState(0);
    const [weightByHorse, setWeightByHorse] = useState(0);
    const [rationProvisionTotal, setRationProvisionTotal] = useState(0);
    const [rationProvisionByCattle, setRationProvisionByCattle] = useState(0);
    const [rationProvisionByHorse, setRationProvisionByHorse] = useState(0);
    const [treatment, setTreatment] = useState([]);

    useEffect(() => {
        const getTreatment = async () => {
            await api
              .get(`/confinements/provisions/${selectedTreatment}`)
              .then(response => {
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
    }, []);

    return (
        <>
            <View style={{marginLeft: 10}}>
                <Header><Text>Trato (KG)</Text></Header>
            </View>
            
            <View style={styles.card}>
                <View style={{marginBottom: 15}}>
                    <Text style={styles.cardText}>Total de bovinos: {cattleTotal}</Text>
                    <Text style={styles.cardText}>Total de equinos: {horseTotal}</Text>
                    <Text style={styles.cardText}>Peso final: {weightTotal.toFixed()}</Text>
                    <Text style={styles.cardText}>Peso bovinos: {weightByCattle.toFixed()}</Text>
                </View>
                <View style={{marginBottom: 15}}>
                    <Text style={styles.cardText}>Peso equinos: {weightByHorse.toFixed()}</Text>
                    <Text style={styles.cardText}>Trato final: {rationProvisionTotal.toFixed()}</Text>
                    <Text style={styles.cardText}>Trato final bovinos: {rationProvisionByCattle.toFixed()}</Text>
                    <Text style={styles.cardText}>Trato final equinos: {rationProvisionByHorse.toFixed()}</Text>
                </View>
            </View>
            <FlatList 
                style={styles.treatment}
                data={treatment}
                keyExtractor={treatment => treatment.id}
                ListHeaderComponent={
                    <View style={{marginLeft: 15}}><Header>Detalhes do trato diário (KG)</Header></View>
                }
                renderItem={({item: treatment}) => (
                    <View style={styles.cardTreatment}>
                        <View>
                            <View style={styles.viewDay}>
                                <Text style={styles.cardDetailsText}>Dia</Text>
                                <Text style={styles.cardTextDay}>{treatment.day}</Text>
                            </View>
                        </View>
                        <View style={{marginBottom: 10}}>
                            <Text style={styles.cardDetailsText}>Ração total por dia: {treatment.qtdRationTotalPerDay.toFixed()}</Text>
                            <Text style={styles.cardDetailsText}>Ração bovina por dia: {treatment.qtdRationToCattlePerDay.toFixed()}</Text>
                            <Text style={styles.cardDetailsText}>Ração equina por dia: {treatment.qtdRationToHorsePerDay.toFixed()}</Text>
                        </View>
                    </View>
                )}
            />
        </>
    )
        
}

const styles = StyleSheet.create({
    card: {
        height:200,
        backgroundColor:"white",
        borderRadius:8,
        elevation:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    
    cardTreatment: {
        height:120,
        backgroundColor:"white",
        borderRadius:8,
        elevation:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    viewDay: {
        flexDirection: 'column'
    },

    cardTextDay: {
        fontSize: 40
    },

    cardText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#312E38'
    },

    cardDetailsText: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#312E38'
    },

    treatment: {
        marginTop: 25,
        flex: 1
    }, 
  });

export default Treatment;