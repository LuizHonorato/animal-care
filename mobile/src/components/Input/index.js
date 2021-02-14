import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const Input = (props) => (
  <View style={styles.container}>
    <TextInput
      theme={{ colors: { primary: "#1E4A81" }}}
      style={styles.input}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {props.errorText ? <Text style={styles.error}>{props.errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#fff',
  },
  error: {
    fontSize: 14,
    color: '#ff0000',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default Input;
