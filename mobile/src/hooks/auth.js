import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
  } from 'react';
  import AsyncStorage from '@react-native-community/async-storage';
  import api from '../services/api';

  
  const AuthContext = createContext();
  
  export const AuthProvider = (props) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadStorageData = async () => {
        const [token, user] = await AsyncStorage.multiGet([
          '@AnimalCare:token',
          '@AnimalCare:user',
        ]);
  
        if (token[1] && user[1]) {
          api.defaults.headers.authorization = `Bearer ${token[1]}`;
  
          setData({ token: token[1], user: JSON.parse(user[1]) });
        }
  
        setLoading(false);
      }
  
      loadStorageData();
    }, []);
  
    const signIn = useCallback(async ({ username, password }) => {
      const response = await api.post('sessions', {
        username,
        password,
      });
  
      const { token, user } = response.data;
  
      await AsyncStorage.multiSet([
        ['@AnimalCare:token', token],
        ['@AnimalCare:user', JSON.stringify(user)],
      ]);
  
      api.defaults.headers.authorization = `Bearer ${token}`;
  
      setData({ token, user });
    }, []);
  
    const signOut = useCallback(async () => {
      await AsyncStorage.multiRemove(['@AnimalCare:user', '@AnimalCare:token']);
  
      setData({});
    }, []);
  
    return (
      <AuthContext.Provider
        value={{ user: data.user, loading, signIn, signOut }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  };
  
  export function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  }