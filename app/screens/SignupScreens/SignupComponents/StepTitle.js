// @flow
import React from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "components";

type Props = {
  text: string
};

const StepTitle = ({ text }: Props) => (
  <View style={styles.stepTitleContainer}>
    <Text scale={Text.Scale.H4}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  stepTitleContainer: {
    paddingBottom: 16,
    alignSelf: "center",
    marginTop: 16,
  },
});


export default StepTitle;
