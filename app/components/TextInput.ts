// @flow
import React, { Component } from "react";
import { TextInput as ReactNativeTextInput, StyleSheet } from "react-native";
import type { TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

import { Colors } from "values";

type Props = {
  style?: TextStyleProp,
  setRef?: () => TextInput,
  onSubmitEditing?: (e?: any) => void,
  onChangeText: (text: string) => void,
};

class TextInput extends Component<Props & any> {
  inputRef: TextInput;

  static defaultProps = {
    style: null,
    setRef: () => {},
    onSubmitEditing: () => {},
  };

  setRef = (ref: TextInput) => {
    this.inputRef = ref;
    if (this.props.setRef) {
      this.props.setRef(this.inputRef);
    }
  };

  render() {
    const { style, onSubmitEditing, onChangeText, ...props } = this.props;
    const inputTextStyle = [styles.base];
    if (style) {
      inputTextStyle.push(style);
    }
    return (
      <ReactNativeTextInput
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        ref={this.setRef}
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
