// @flow
import React from "react";
import { View } from "react-native";

import { Max } from "values";
import { TextInput } from "components";
import styles from "../styles";
import type { DescriptionInputProps } from "../StepCardTypes";
import TextLimit from "./TextLimit";

// TODO replace placeholder with category specific placeholder
const DescriptionInput = ({ onDescriptionChanged, descriptionText }: DescriptionInputProps) => (
  <View>
    <TextInput
      style={[styles.textInput, styles.descriptionInput]}
      editable
      multiline
      placeholder="I've been replacing tires for the past 25 years, my son and I ..."
      autoCapitalize="sentences"
      numberOfLines={4}
      onChangeText={onDescriptionChanged}
      maxLength={Max.serviceDescription.full}
      value={descriptionText}
    />
    <TextLimit text={descriptionText} limit={Max.serviceDescription.full} />
  </View>
);

export default DescriptionInput;
