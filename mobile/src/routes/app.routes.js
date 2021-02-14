import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Treatment from '../screens/Treatment';
import Dashboard from '../screens/Dashboard';

const App = createStackNavigator();

const AppRoutes = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#1E4A81',
        
      },
      headerTintColor: '#fff',
      cardStyle: { backgroundColor: '#fff' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />

    <App.Screen name="Trato" component={Treatment} />
  </App.Navigator>
);

export default AppRoutes;