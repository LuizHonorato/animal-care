import React, {useState, useCallback} from 'react';
import {Text, Alert} from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

const SignIn = () => {
    const { signIn } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = useCallback(async () => {
        try {
            if (username === '') {
                Alert.alert('Erro', 'Nome do usuário não pode estar vazio');
                return;
            }
    
            if (password === '') {
                Alert.alert('Erro', 'Senha não pode estar vazia');
                return;
            }
    
            await signIn({username, password});
        } catch (err) {
            Alert.alert('Erro', 'Erro ao fazer login. Verifique suas credenciais');
        }
    }, [username, password, signIn]);


    return (
        <Background>
            <Header>Animal Care</Header>
            <Input
                label="Nome de usuário"
                returnKeyType="next"
                value={username}
                onChangeText={text => setUsername(text)}
                autoCapitalize="none"
                textContentType="username"
            />
            <Input
                label="Senha"
                returnKeyType="next"
                value={password}
                onChangeText={text => setPassword(text)}
                autoCapitalize="none"
                secureTextEntry
            />
            <Button mode="contained" onPress={handleSignIn}>
                <Text>Entrar</Text>
            </Button>
        </Background>
    )
}

export default SignIn;