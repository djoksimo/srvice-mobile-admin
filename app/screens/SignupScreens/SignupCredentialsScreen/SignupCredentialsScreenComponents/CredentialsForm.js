// @flow
import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { TextInput } from "components";
import { Colors, Dimensions } from "values";

import { ContinueButton, StepTitle } from "../../SignupComponents";

type Props = {
  email: string,
  password: string,
  confirmPassword: string,
  onCredentialsEntered: () => void,
  onEmailInputChanged: (email: string) => void,
  onPasswordInputChanged: (password: string) => void,
  onConfirmPasswordInputChanged: (confirmPassword: string) => void,
};

class CredentialsForm extends Component<Props> {
  emailInputRef: TextInput;
  passwordInputRef: TextInput;
  confirmPasswordInputRef: TextInput;

  componentDidMount() {
    this.emailInputRef.focus();
  }

  render() {
    const {
      email,
      password,
      confirmPassword,
      onCredentialsEntered,
      onEmailInputChanged,
      onPasswordInputChanged,
      onConfirmPasswordInputChanged,
    } = this.props;

    return (
      <>
        <StepTitle text="Create your account" />
        <TextInput
          autoFocus
          setRef={(ref) => { this.emailInputRef = ref; }}
          value={email}
          autoCapitalize="none"
          onChangeText={onEmailInputChanged}
          style={styles.textInput}
          returnKeyType="next"
          blurOnSubmit={false}
          placeholder="Enter your email"
          placeholderTextColor={Colors.bland}
          onSubmitEditing={() => { this.passwordInputRef.focus(); }}
        />
        <TextInput
          value={password}
          setRef={(ref) => { this.passwordInputRef = ref; }}
          secureTextEntry
          autoCapitalize="none"
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={onPasswordInputChanged}
          onSubmitEditing={() => { this.confirmPasswordInputRef.focus(); }}
          style={styles.textInput}
          placeholder="Enter your password"
          placeholderTextColor={Colors.bland}
        />
        <TextInput
          value={confirmPassword}
          setRef={(ref) => { this.confirmPasswordInputRef = ref; }}
          secureTextEntry
          autoCapitalize="none"
          returnKeyType="done"
          onChangeText={onConfirmPasswordInputChanged}
          style={styles.textInput}
          placeholder="Confirm your password"
          placeholderTextColor={Colors.bland}
        />
        <ContinueButton onContinuePressed={onCredentialsEntered} />
      </>
    );
  }
}

const { screenWidth } = Dimensions;

const styles = StyleSheet.create({
  textInput: {
    alignSelf: "center",
    width: screenWidth - 104,
    textAlign: "center",
    marginBottom: 16,
    marginTop: 16,
    paddingLeft: 0,
  },
});


export default CredentialsForm;
