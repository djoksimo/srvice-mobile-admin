// @flow
import React from "react";
import { View } from "react-native";

import { Colors } from "values";
import { Text, TextInput } from "components";
import styles from "../styles";
import type { ContactInputProps } from "../StepCardTypes";

const ContactInput = (props: ContactInputProps) => {
  const { email, phone, onEmailChanged, onPhoneChanged } = props;

  return (
    <View>
      <Text style={styles.contactHeading} scale={Text.Scale.H6}>
        Email
      </Text>
      <TextInput
        style={styles.textInput}
        value={email}
        autoCompleteType="email"
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor={Colors.bland}
        onChangeText={onEmailChanged}
      />
      <Text style={styles.contactHeading} scale={Text.Scale.H6}>
        Phone Number
      </Text>
      <TextInput
        style={styles.textInput}
        value={phone}
        autoCompleteType="tel"
        keyboardType="phone-pad"
        placeholder="Enter your phone number"
        placeholderTextColor={Colors.bland}
        onChangeText={onPhoneChanged}
      />
    </View>
  );
};

export default ContactInput;
