// @flow
import React from "react";
import { View, Picker, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Text, Touchable } from "components";
import Button from "components/Button";
import { Fonts, Colors } from "values";

type Props = {
  currentHours: number,
  currentMinutes: number,
  onHoursChanged: (hours: number) => void,
  onMinutesChanged: (minutes: number) => void,
  toggleTimeModal: () => void,
};

const TimeEstimate = ({
  currentHours,
  currentMinutes,
  onMinutesChanged,
  onHoursChanged,
  toggleTimeModal,
}: Props) => (
  <View style={styles.timeInputContainer}>
    <View style={styles.stepContainer}>
      <View style={styles.header}>
        <View>
          <Text scale={Text.Scale.H5}>Duration</Text>
        </View>
        <View>
          <Touchable onPress={toggleTimeModal}>
            <Icon name="close" size={24} color={Colors.secondaryDark} />
          </Touchable>
        </View>
      </View>
      <View style={styles.durationInputContainer}>
        <Picker
          itemStyle={styles.pickerTextStyle}
          selectedValue={currentHours}
          style={styles.picker}
          onValueChange={val => {
            onHoursChanged(+val);
          }}
        >
          {renderHourPickerItems()}
        </Picker>
        <Picker
          itemStyle={styles.pickerTextStyle}
          selectedValue={currentMinutes}
          style={styles.picker}
          onValueChange={val => {
            onMinutesChanged(+val);
          }}
        >
          {renderMinutePickerItems()}
        </Picker>
      </View>
    </View>
    <View style={styles.confirmTimeButtonContainer}>
      <Button title="CONFIRM" onPress={toggleTimeModal} />
    </View>
  </View>
);

const renderHourPickerItems = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(<Picker.Item key={i} label={`${i} hours`} value={i} />);
  }
  return hours;
};

const renderMinutePickerItems = () => {
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) {
      minutes.push(<Picker.Item key={i} label={`${i} minutes`} value={i} />);
    }
  }
  return minutes;
};

const styles = StyleSheet.create({
  timeInputContainer: {
    // flex: 1,
    justifyContent: "center",
  },
  durationInputContainer: {
    flexDirection: "row",
    // flex: 1,
    justifyContent: "space-around",
  },
  picker: {
    flex: 1,
    alignContent: "space-between",
  },
  pickerTextStyle: {
    fontFamily: Fonts.regularLato,
    fontSize: 16,
    letterSpacing: 0.4,
  },
  stepContainer: {
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 16,
    marginTop: 16,
  },
  confirmTimeButtonContainer: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default TimeEstimate;
