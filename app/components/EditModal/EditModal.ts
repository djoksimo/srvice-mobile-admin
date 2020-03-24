// @flow
import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors, Dimensions } from "values";
import { TextInput, Card, Touchable } from "components";
import Button from "components/Button";

type Props = {
  isModalVisible: boolean,
  inputValue: string,
  placeholderText: String,
  onChangeText: (inputValue: string) => void,
  onSavePressed: () => void,
  onDismissPressed: () => void,
};

const EditModal = (props: Props) => {
  const {
    isModalVisible,
    inputValue,
    onChangeText,
    placeholderText,
    onSavePressed,
    onDismissPressed,
  } = props;

  const numLines = Math.floor(inputValue.length / 25) + 1;
  const conditionalTextInputStyle = numLines > 1 ? { height: numLines * 16 } : {};

  return (
    <Modal
      swipeDirection="down"
      style={styles.bottomModal}
      backdropColor={Colors.screenBackground}
      isVisible={isModalVisible}
      onSwipeComplete={onDismissPressed}
      onBackdropPress={onDismissPressed}
    >
      <KeyboardAvoidingView behavior="position">
        <Card style={styles.modalCard}>
          <View style={styles.dismissButton}>
            <Touchable onPress={onDismissPressed}>
              <Icon name="minus-circle" size={22} color={Colors.primary} />
            </Touchable>
          </View>
          <TextInput
            style={conditionalTextInputStyle}
            value={inputValue}
            autoCapitalize="sentences"
            onChangeText={onChangeText}
            blurOnSubmit={false}
            placeholder={placeholderText}
            placeholderTextColor={Colors.bland}
            multiline
            numberOfLines={numLines}
          />
          <View style={styles.saveBtnContainer}>
            <Button title="Save" onPress={onSavePressed} />
          </View>
        </Card>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const { screenWidth } = Dimensions;
const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  dismissButton: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  modalCard: {
    padding: 16,
    width: screenWidth,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowOffset: {
      height: -8,
    },
  },
  saveBtnContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
});

export default EditModal;
