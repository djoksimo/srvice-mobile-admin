// @flow
import React from "react";
import { View, Keyboard } from "react-native";

import { Colors, Max } from "values";
import styles from "../styles";
import type { TitleInputProps } from "../StepCardTypes";
import TextLimit from "./TextLimit";
import { TextInput } from "../../../../components";

const TitleInput = ({ onTitleChanged, titleText }: TitleInputProps) => (
  <View>
    <TextInput
      style={styles.textInput}
      value={titleText}
      autoCapitalize="words"
      placeholder="Seasonal Tire Replacement..."
      numberOfLines={1}
      blurOnSubmit
      placeholderTextColor={Colors.bland}
      maxLength={Max.serviceTitle.full}
      autoFocus
      onSubmitEditing={() => Keyboard.dismiss()}
      returnKeyType="next"
      onChangeText={onTitleChanged}
      enablesReturnKeyAutomatically
    />
    <TextLimit text={titleText} limit={Max.serviceTitle.full} />
  </View>
);

export default TitleInput;
