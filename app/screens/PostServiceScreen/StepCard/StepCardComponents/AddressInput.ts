// @flow
import React from "react";
import { View, StyleSheet } from "react-native";

import { Colors } from "values";
import { Text } from "components";
import Button from "components/Button";

import type { AddressInputProps } from "../StepCardTypes";

const AddressInput = (props: AddressInputProps) => {
  const { address, onLocationInputSelected } = props;

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button
          borderColor={Colors.primaryLight}
          title="Specify Location"
          color={Colors.primaryLight}
          onPress={onLocationInputSelected}
        />
      </View>
      {address !== "" && (
        <View style={styles.selectedAddressContainer}>
          <Text scale={Text.Scale.BUTTON}>{`Selected: ${address}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedAddressContainer: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttonContainer: {
    paddingTop: 16,
  },
});

export default AddressInput;
