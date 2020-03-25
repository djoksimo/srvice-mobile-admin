import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'values';

const Line = () => <View style={styles.line} />;

const styles = StyleSheet.create({
  line: {
    flex: 1,
    borderBottomColor: Colors.bland,
    borderBottomWidth: 1,
    marginTop: 8,
    marginBottom: 8,
  },
});

export default Line;
