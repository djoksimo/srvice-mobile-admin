import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from 'components/Button';
type Props = {
  onContinuePressed: () => void;
};

const ContinueButton = ({onContinuePressed}: Props) => (
  <View style={styles.continueBtnContainer}>
    <Button onPress={onContinuePressed} title="Continue" />
  </View>
);

const styles = StyleSheet.create({
  continueBtnContainer: {
    marginTop: 32,
  },
});
export default ContinueButton;
