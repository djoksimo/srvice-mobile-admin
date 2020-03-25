import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'values';
import {MenuButton} from 'types/MenuButton';
import {Text, Touchable, Card} from 'components';

interface Props extends Partial<ModalProps> {
  isOpen: boolean;
  menuButtons: Array<MenuButton>;
}

class ModalMenu extends Component<Props> {
  render() {
    const {isOpen, menuButtons, ...modalProps} = this.props;
    const formattedMenuButtons = menuButtons.map((btn: MenuButton, index) => {
      const {icon, text, action} = btn;
      return (
        <View key={index}>
          <Touchable
            onPress={() => {
              action();
            }}>
            <View style={styles.menuButton}>
              <View style={styles.actionIconContainer}>
                <Icon
                  name={icon}
                  size={24}
                  color={Colors.primary}
                  style={styles.actionIcon}
                />
              </View>
              <View>
                <Text scale={Text.Scale.BUTTON} color={Colors.primary}>
                  {text}
                </Text>
              </View>
            </View>
          </Touchable>
        </View>
      );
    });
    const menu = (
      <Card>
        <View style={styles.menuButtonsContainer}>{formattedMenuButtons}</View>
      </Card>
    );
    return (
      <Modal isVisible={isOpen} {...modalProps}>
        {menu}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  menuButtonsContainer: {
    justifyContent: 'center',
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionIconContainer: {
    paddingRight: 8,
  },
  actionIcon: {
    padding: 0,
  },
});
export default ModalMenu;
