import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

const Button = (props) => (
  <PaperButton
    style={[
      styles.button,
      props.mode === 'outlined' && { backgroundColor: '#fff' },
    ]}
    labelStyle={styles.text}
    mode={props.mode}
    {...props}
  >
    {props.children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#F04F26'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default Button;
