import React, {useRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'components';
import {Colors, Dimensions} from 'values';
import {ContinueButton, StepTitle} from '../../SignupComponents';

interface Props {
  email: string;
  password: string;
  confirmPassword: string;
  onCredentialsEntered: () => void;
  onEmailInputChanged: (email: string) => void;
  onPasswordInputChanged: (password: string) => void;
  onConfirmPasswordInputChanged: (confirmPassword: string) => void;
}

function CredentialsForm({
  email,
  password,
  confirmPassword,
  onCredentialsEntered,
  onEmailInputChanged,
  onPasswordInputChanged,
  onConfirmPasswordInputChanged,
}: Props) {
  const emailInputRef = useRef<any>();
  const passwordInputRef = useRef<any>();
  const confirmPasswordInputRef = useRef<any>();

  useEffect(() => {
    emailInputRef?.current?.focus();
  }, []);

  return (
    <>
      <StepTitle text="Create your account" />
      <TextInput
        autoFocus
        ref={emailInputRef}
        value={email}
        autoCapitalize="none"
        onChangeText={onEmailInputChanged}
        style={styles.textInput}
        returnKeyType="next"
        blurOnSubmit={false}
        placeholder="Enter your email"
        placeholderTextColor={Colors.bland}
        onSubmitEditing={() => {
          passwordInputRef?.current?.focus();
        }}
      />
      <TextInput
        value={password}
        ref={passwordInputRef}
        secureTextEntry
        autoCapitalize="none"
        returnKeyType="next"
        blurOnSubmit={false}
        onChangeText={onPasswordInputChanged}
        onSubmitEditing={() => {
          confirmPasswordInputRef?.current?.focus();
        }}
        style={styles.textInput}
        placeholder="Enter your password"
        placeholderTextColor={Colors.bland}
      />
      <TextInput
        value={confirmPassword}
        ref={confirmPasswordInputRef}
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

const {screenWidth} = Dimensions;

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    width: screenWidth - 104,
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 16,
    paddingLeft: 0,
  },
});
export default CredentialsForm;
