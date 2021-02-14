import React from 'react';
import { Appbar } from 'react-native-paper';

const AppbarComponent = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="Confinamentos" />
      <Appbar.Action icon="log-out" />
    </Appbar.Header>
  );
};

export default AppbarComponent;