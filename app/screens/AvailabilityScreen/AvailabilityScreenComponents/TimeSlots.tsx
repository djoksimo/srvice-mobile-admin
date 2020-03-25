import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'values';
import {Text, Touchable} from 'components';
import {AvailabilitySlot} from 'types/AvailabilitySlot';
import {DateUtils} from 'utils';
type Props = {
  slots: Array<AvailabilitySlot>;
  onSelectStart: Function;
  onSelectEnd: Function;
};

const TimeSlots = (props: Props) => {
  const {slots, onSelectStart, onSelectEnd} = props;

  const Slot = ({slot}) => {
    return (
      <View style={styles.slotContainer}>
        <View style={styles.weekDayContainer}>
          <Text scale={Text.Scale.H6}>{slot.weekDay}</Text>
        </View>
        <View style={styles.modifyBtnContainer}>
          <View style={styles.slotDataContainer}>
            <Touchable onPress={() => onSelectStart(slot.weekDay)}>
              <View style={styles.timeContainer}>
                <Text>{DateUtils.getHourMinutesFromHour(slot.startTime)}</Text>
              </View>
            </Touchable>
            <View>
              <Text>To</Text>
            </View>
            <Touchable onPress={() => onSelectEnd(slot.weekDay)}>
              <View style={styles.timeContainer}>
                <Text>{DateUtils.getHourMinutesFromHour(slot.endTime)}</Text>
              </View>
            </Touchable>
          </View>
        </View>
      </View>
    );
  };

  const timeSlots = slots.map((slot, index) => {
    if (slot.isSelected) {
      return <Slot slot={slot} key={index} />;
    }

    return null;
  });
  return <View style={styles.slotsContainer}>{timeSlots}</View>;
};

const styles = StyleSheet.create({
  slotsContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  weekDayContainer: {},
  slotContainer: {
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modifyBtnContainer: {
    flexDirection: 'column',
  },
  slotDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    backgroundColor: Colors.blandLight,
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    margin: 8,
  },
});
export default TimeSlots;
