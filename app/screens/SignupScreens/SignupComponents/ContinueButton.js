// @flow
import React from "react";
import { View, StyleSheet } from "react-native";

import Button from "components/Button";

type Props = {
  isSignupPressed: boolean,
  onContinuePressed: () => void,
}

const ContinueButton = ({ onContinuePressed, isSignupPressed }: Props) => (
  <View style={styles.continueBtnContainer}>
    <Button isDisabled={isSignupPressed} onPress={onContinuePressed} title="Continue" />
  </View>
);

const styles = StyleSheet.create({
  continueBtnContainer: {
    marginTop: 32,
  },
});


export default ContinueButton;
