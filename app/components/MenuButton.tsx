import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'values';
import {Touchable} from '.';

interface Props {
  onPress: () => void;
}

class MenuButton extends PureComponent<Props> {
  render() {
    const {onPress} = this.props;
    return (
      <View style={styles.menuContainer}>
        <Touchable onPress={onPress}>
          <Icon name="menu" size={24} color={Colors.primary} />
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    alignSelf: 'center',
    padding: 8,
    borderBottomLeftRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: Colors.white,
  },
});
export default MenuButton;
