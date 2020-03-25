import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Touchable} from 'components';
import {Colors} from 'values';
type Props = {
  title: string;
  info: string;
  inputChangeHandler: () => void;
  index: number;
  lastSectionIndex: number;
};

const PublicInfoSection = (props: Props) => {
  const {title, info, inputChangeHandler, index, lastSectionIndex} = props;
  return (
    <View
      style={[
        styles.publicInfoSection,
        {
          borderBottomWidth: index === lastSectionIndex ? 0 : 1,
        },
      ]}>
      <View style={styles.headingContainer}>
        <Text scale={Text.Scale.H6}>{title}</Text>
        <View>
          <Touchable onPress={inputChangeHandler}>
            <Text color={Colors.primaryDark} scale={Text.Scale.BUTTON}>
              Edit
            </Text>
          </Touchable>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text scale={Text.Scale.SUBTITLE}>{info}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  publicInfoSection: {
    paddingBottom: 8,
    paddingTop: 8,
    borderBottomColor: Colors.blandLight,
  },
  descriptionContainer: {
    paddingTop: 8,
  },
  headingContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default PublicInfoSection;
