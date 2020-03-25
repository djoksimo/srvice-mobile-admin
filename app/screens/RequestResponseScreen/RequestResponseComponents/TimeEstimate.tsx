import React from 'react';
import {View, Picker, StyleSheet} from 'react-native';
import {Text, TextInput} from 'components';
import Button from 'components/Button';
import {Colors, Fonts} from 'values';
type Props = {
  currentHours: number;
  currentMinutes: number;
  currentDays: number;
  renderHourPickerItems: () => any;
  renderMinutePickerItems: () => any;
  onHoursChanged: (hours: string) => void;
  onMinutesChanged: (minutes: string) => void;
  onDaysChanged: (days: string) => void;
  toggleTimeModal: () => void;
};

const TimeEstimate = ({
  currentHours,
  currentMinutes,
  currentDays,
  renderHourPickerItems,
  renderMinutePickerItems,
  onMinutesChanged,
  onHoursChanged,
  onDaysChanged,
  toggleTimeModal,
}: Props) => (
  <View style={styles.timeEstimateContainer}>
    <View style={styles.stepContainer}>
      <Text scale={Text.Scale.H5} withOptionalTag>
        Time
      </Text>
      <View style={styles.durationInputContainer}>
        <Picker
          itemStyle={styles.pickerTextStyle}
          selectedValue={currentHours}
          style={styles.picker}
          onValueChange={onHoursChanged}>
          {renderHourPickerItems()}
        </Picker>
        <Picker
          itemStyle={styles.pickerTextStyle}
          selectedValue={currentMinutes}
          style={styles.picker}
          onValueChange={onMinutesChanged}>
          {renderMinutePickerItems()}
        </Picker>
      </View>
    </View>
    <View style={styles.stepContainer}>
      <Text scale={Text.Scale.H5} withOptionalTag>
        Day Estimate
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={`${currentDays}`}
          keyboardType="decimal-pad"
          onChangeText={onDaysChanged}
          style={styles.textInput}
          returnKeyType="next"
          placeholderTextColor={Colors.bland}
        />
      </View>
    </View>
    <View style={styles.confirmTimeButtonContainer}>
      <Button title="CONFIRM" onPress={toggleTimeModal} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    flex: 1,
    padding: 16,
    marginBottom: 16,
    marginTop: 16,
    shadowRadius: 8,
  },
  timeEstimateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  durationInputContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  picker: {
    flex: 1,
    alignContent: 'space-between',
  },
  pickerTextStyle: {
    fontFamily: Fonts.RegularLato,
    fontSize: 16,
    letterSpacing: 0.4,
  },
  stepContainer: {
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 16,
    marginTop: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmTimeButtonContainer: {
    paddingBottom: 24,
  },
});
export default TimeEstimate;
