import React, {useCallback, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {format} from 'date-fns';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import api from '../../services/api';

import {useAuth} from '../../hooks/auth';

const Dashboard = () => {
    const { user, signOut } = useAuth();
    const { navigate } = useNavigation();

    const [confinements, setConfinements] = useState([]);

    useEffect(() => {
        const loadConfinements = async () => {
            await api.get('/confinements').then(response => {
                setConfinements(response.data);
              }).catch(err => console.log(err));
        }

        loadConfinements();
    }, [confinements]);

    const handleToTreatmentPage = useCallback((id) => {
        navigate('Trato', {id});
    }, [navigate]);

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>Olá {user.username}</Text>
                <TouchableOpacity  onPress={signOut}>
                    <Icon name="log-in" size={20} color="#1E4A81" />
                </TouchableOpacity>
            </View>
            <FlatList 
                style={styles.confinementsList}
                data={confinements}
                keyExtractor={confinement => confinement.id}
                ListHeaderComponent={
                    <View style={{marginLeft: 15}}><Header>Confinamentos</Header></View>
                }
                renderItem={({item: confinement}) => (
                    <TouchableOpacity onPress={() => handleToTreatmentPage(confinement.id)}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Nome do confinamento</Text>
                            <Text style={styles.cardText}>{confinement.nome}</Text>
                            <Text style={styles.cardTitle}>Início do confinamento</Text>
                            <Text style={styles.cardText}>{format(new Date(confinement.inicioConfinamento), 'dd/MM/yyyy')}</Text>
                            <Text style={styles.cardTitle}>Fim do confinamento</Text>
                            <Text style={styles.cardText}>{format(new Date(confinement.fimConfinamento), 'dd/MM/yyyy')}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        margin: 16,
        justifyContent: 'space-between'
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#312E38'
    },

    confinementsList: {
        marginTop: 25,
        flex: 1
    }, 

    card: {
        height:220,
        backgroundColor:"white",
        borderRadius:8,
        elevation:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        margin: 10
    },

    cardTitle: {
        color: '#312E38',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 5,
    },

    cardText: {
        marginLeft: 15,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#312E38'
    }
  });

export default Dashboard;