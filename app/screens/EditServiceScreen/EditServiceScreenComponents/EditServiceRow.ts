// @flow
import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import _ from "lodash";

import { Colors } from "values";
import { Text, Touchable } from "components";
import { FormatUtils } from "utils";

type Props = {
  serviceFieldText: string,
  serviceFieldValue: string,
  fieldSwitchValue: boolean,
  serviceFieldId: string,
  toggleEditModal: (serviceFieldId: string) => void,
  onChangeSwitchValue: (serviceFieldId: string, newSwitchValue: boolean) => void,
};

// An EditServiceRow can cantain a text box with an edit button or a boolean field with a switch
const EditServiceRow = ({
  serviceFieldValue,
  serviceFieldText,
  serviceFieldId,
  toggleEditModal,
  onChangeSwitchValue,
  fieldSwitchValue,
}: Props) => {
  let editButton = null;
  if (_.isString(serviceFieldValue)) {
    editButton = (
      <View style={styles.editButtonContainer}>
        <Touchable onPress={() => toggleEditModal(serviceFieldId)}>
          <Text scale={Text.Scale.BUTTON}>Edit</Text>
        </Touchable>
      </View>
    );
  } else if (fieldSwitchValue !== undefined && _.isBoolean(fieldSwitchValue)) {
    editButton = (
      <Switch
        value={fieldSwitchValue}
        onValueChange={newSwitchValue => {
          onChangeSwitchValue(serviceFieldId, newSwitchValue);
        }}
        trackColor={{ true: Colors.secondaryLight, false: Colors.bland }}
        thumbColor={Colors.secondaryDark}
      />
    );
  }

  return (
    <View style={styles.rowContainer}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text scale={Text.Scale.BODY} color={Colors.primary}>
            {FormatUtils.truncateText(serviceFieldText, 200)}
          </Text>
        </View>
        {editButton}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  rowContainer: {
    paddingBottom: 16,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 8,
  },
  textContainer: {
    flex: 4,
    justifyContent: "center",
  },
  editButtonContainer: {
    marginLeft: 8,
    marginRight: 8,
    justifyContent: "center",
    alignContent: "flex-end",
    alignSelf: "flex-end",
  },
});

export default EditServiceRow;
