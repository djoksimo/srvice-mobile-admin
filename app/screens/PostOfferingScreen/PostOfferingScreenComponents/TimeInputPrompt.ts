// @flow
import React from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "components";
import { Colors } from "values";
import { DateUtils } from "utils";

import Button from "components/Button";

type Props = {
  currentHours: number,
  currentMinutes: number,
  toggleTimeModal: () => void,
};

const TimeInputPrompt = ({ currentHours, currentMinutes, toggleTimeModal }: Props) => {
  const isDurationSpecified = currentHours !== 0 || currentMinutes !== 0;

  const durationPrompt = isDurationSpecified ? "Edit Duration" : "Add Duration";

  return (
    <View style={styles.stepContainer}>
      <Text scale={Text.Scale.H5}>Duration</Text>
      <Text scale={Text.Scale.CAPTION}>How long does this offering take?</Text>
      <View style={styles.addTimeEstimateButtonContainer}>
        <Button onPress={toggleTimeModal} title={durationPrompt} />
      </View>
      <View style={isDurationSpecified && styles.selectedTimeTextContainer}>
        <Text scale={Text.Scale.H6} color={Colors.primary}>
          {isDurationSpecified &&
            `Selected: ${DateUtils.getFormattedMinutesAndHours(currentHours, currentMinutes)}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 16,
    marginTop: 16,
  },
  addTimeEstimateButtonContainer: {
    paddingTop: 24,
  },
  selectedTimeTextContainer: {
    marginTop: 16,
  },
});

export default TimeInputPrompt;
