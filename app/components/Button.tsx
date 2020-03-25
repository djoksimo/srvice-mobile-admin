import React, {Component} from 'react';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {Colors} from 'values';
import {Text} from 'components';
type Props = {
  title: string;
  color?: string;
  titleColor?: string;
  borderColor?: any;
  isDisabled?: boolean;
  onPress: () => void;
};

class Button extends Component<Props> {
  static defaultProps = {
    color: Colors.primary,
    borderColor: Colors.primary,
    titleColor: Colors.white,
    isDisabled: false,
  };

  render() {
    const {
      color = Colors.primary,
      title,
      borderColor,
      titleColor,
      isDisabled,
      ...props
    } = this.props;
    return Platform.OS === 'ios' ? (
      <TouchableHighlight
        disabled={isDisabled}
        style={[
          styles.button,
          {
            backgroundColor: !isDisabled ? color : Colors.primaryLight,
            borderColor,
          },
        ]}
        activeOpacity={0.6}
        underlayColor={color}
        {...props}>
        <Text
          scale={Text.Scale.BUTTON}
          style={[
            styles.buttonText,
            {
              color: titleColor,
            },
          ]}>
          {title.toUpperCase()}
        </Text>
      </TouchableHighlight>
    ) : (
      <TouchableNativeFeedback
        disabled={isDisabled}
        background={TouchableNativeFeedback.Ripple(Colors.bland)}
        {...props}
        useForeground>
        <View
          style={[
            styles.button,
            {
              backgroundColor: !isDisabled ? color : Colors.primaryLight,
              borderColor,
            },
          ]}>
          <Text
            scale={Text.Scale.BUTTON}
            style={[
              styles.buttonText,
              {
                color: titleColor,
              },
            ]}>
            {title.toUpperCase()}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 24,
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'center',
    elevation: 5,
    backgroundColor: Colors.primary,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.4,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    alignSelf: 'center',
  },
});
export default Button;
