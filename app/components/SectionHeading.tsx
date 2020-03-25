import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'values';
import {Text, Touchable} from '.';
type Props = {
  text: string;
  onAddPressed?: () => void;
};

class SectionHeading extends Component<Props> {
  static defaultProps = {
    onAddPressed: () => {},
  };

  render() {
    const {text, onAddPressed} = this.props;
    const addButton =
      onAddPressed !== null ? (
        <View style={styles.addBtnContainer}>
          <Touchable onPress={onAddPressed}>
            <Icon name="plus-circle" size={32} color={Colors.primary} />
          </Touchable>
        </View>
      ) : null;
    return (
      <View style={styles.headingContainer}>
        <Text scale={Text.Scale.H5}>{text}</Text>
        {addButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  addBtnContainer: {
    paddingLeft: 16,
    alignContent: 'center',
    paddingBottom: 0,
  },
});
export default SectionHeading;
