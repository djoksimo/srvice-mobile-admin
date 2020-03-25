import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'values';
import {Text} from '.';

const OrDivider = () => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.line} />
      <Text
        style={{
          paddingLeft: 16,
          paddingRight: 16,
        }}>
        OR
      </Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    borderBottomColor: Colors.bland,
    borderBottomWidth: 1,
  },
});
export default OrDivider;
