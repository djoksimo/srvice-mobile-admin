import React, {Component} from 'react';
import {
  TextInput as ReactNativeTextInput,
  StyleSheet,
  TextStyle,
  TextInputProps,
} from 'react-native';
import {Colors} from 'values';

interface Props extends TextInputProps {
  style?: TextStyle;
  setRef?: () => void;
  onSubmitEditing?: (e?: any) => void;
  onChangeText: (text: string) => void;
}

class TextInput extends Component<Props & any> {
  inputRef: React.LegacyRef<TextInput> | undefined;

  static defaultProps = {
    style: null,
    setRef: () => {},
    onSubmitEditing: () => {},
  };
  setRef = (ref: React.LegacyRef<TextInput>) => {
    this.inputRef = ref;

    if (this.props.setRef) {
      this.props.setRef(this.inputRef);
    }
  };

  render() {
    const {style, onSubmitEditing, onChangeText, ...props} = this.props;
    const inputTextStyle = [styles.base];

    if (style) {
      inputTextStyle.push(style);
    }

    return (
      <ReactNativeTextInput
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        style={inputTextStyle}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  base: {
    height: 40,
    borderRadius: 4,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    paddingLeft: 16,
    marginTop: 8,
  },
});
export default TextInput;
