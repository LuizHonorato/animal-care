import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

const Header = (props) => (
  <Text style={styles.header}>{props.children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: '#1E4A81',
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(Header);
