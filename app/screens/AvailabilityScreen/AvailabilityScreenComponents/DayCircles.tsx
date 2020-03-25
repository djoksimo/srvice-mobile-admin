import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'values';
import {Text, Touchable} from 'components';
import {DayCircleType} from '../AvailabilityScreenTypes';
type Props = {
  days: Array<DayCircleType>;
  onPressCircle: Function;
};

const DayCircles = (props: Props) => {
  const {days, onPressCircle} = props;

  const DayCircle = ({day}) => {
    const {name, isSelected} = day;
    const letter = name[0];
    const circleStyle = {
      backgroundColor: isSelected ? Colors.primary : Colors.white,
      borderColor: isSelected ? null : Colors.primary,
      borderWidth: isSelected ? 0 : 2,
    };
    const textColor = isSelected ? Colors.white : Colors.primaryDark;
    return (
      <Touchable onPress={() => onPressCircle(name)}>
        <View style={[styles.circleContainer, circleStyle]}>
          <View>
            <Text scale={Text.Scale.BUTTON} color={textColor}>
              {letter}
            </Text>
          </View>
        </View>
      </Touchable>
    );
  };

  const circles = days.map((day, index) => {
    return <DayCircle day={day} key={index} />;
  });
  return <View style={styles.circlesContainer}>{circles}</View>;
};

const styles = StyleSheet.create({
  circlesContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignContent: 'space-between',
    flexWrap: 'wrap',
  },
  circleContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DayCircles;
