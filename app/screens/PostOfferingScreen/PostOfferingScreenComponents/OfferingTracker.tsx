import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Touchable} from 'components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'values';
type Props = {
  numOfferings: number;
  toggleOfferingModal: () => void;
};

const OfferingTracker = ({numOfferings, toggleOfferingModal}: Props) => (
  <>
    <View style={styles.offeringTrackerContainer}>
      <Text color={Colors.white} scale={Text.Scale.BUTTON}>
        Current Offerings ({numOfferings})
      </Text>
      <View style={styles.iconContainer}>
        <Touchable onPress={toggleOfferingModal}>
          <Icon
            name="arrow-down-drop-circle-outline"
            size={24}
            color={Colors.white}
          />
        </Touchable>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  offeringTrackerContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryLight,
  },
  iconContainer: {},
});
export default OfferingTracker;
