import React from 'react';
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

function TextInput(
  {style, onSubmitEditing = () => {}, onChangeText, ...rest}: Props,
  ref: any,
) {
  const inputTextStyle: TextStyle[] = [styles.base];

  if (style) {
    inputTextStyle.push(style);
  }

  return (
    <ReactNativeTextInput
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      style={inputTextStyle}
      ref={ref}
      {...rest}
    />
  );
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
export default React.forwardRef(TextInput);
