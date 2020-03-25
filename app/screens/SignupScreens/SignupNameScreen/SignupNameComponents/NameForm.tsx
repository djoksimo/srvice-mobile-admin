import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'components';
import {Colors, Dimensions} from 'values';
import {ContinueButton, StepTitle} from '../../SignupComponents';
type Props = {
  firstName: string;
  lastName: string;
  onNameEntered: () => void;
  onFirstNameChanged: (firstName: string) => void;
  onLastNameChanged: (lastName: string) => void;
};

function CredentialsForm({
  firstName,
  lastName,
  onFirstNameChanged,
  onNameEntered,
  onLastNameChanged,
}: Props) {
  const lastNameInputRef = useRef<any>();

  return (
    <>
      <StepTitle text="Introduce yourself" />
      <TextInput
        autoFocus
        value={firstName}
        autoCapitalize="words"
        onChangeText={onFirstNameChanged}
        style={styles.textInput}
        returnKeyType="next"
        blurOnSubmit={false}
        placeholder="First Name"
        placeholderTextColor={Colors.bland}
        onSubmitEditing={() => {
          lastNameInputRef.current.focus();
        }}
      />
      <TextInput
        ref={lastNameInputRef}
        value={lastName}
        style={styles.textInput}
        onChangeText={onLastNameChanged}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={onNameEntered}
        placeholder="Last Name"
        placeholderTextColor={Colors.bland}
      />
      <ContinueButton onContinuePressed={onNameEntered} />
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
