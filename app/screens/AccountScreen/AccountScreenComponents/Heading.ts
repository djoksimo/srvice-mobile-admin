// @flow
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Text, Touchable } from "components";
import { Colors } from "values";

type Props = {
  title: string,
  onEditPressed?: Function,
  onAddPressed?: Function,
};

class Heading extends PureComponent<Props> {
  static defaultProps = {
    onEditPressed: null,
    onAddPressed: null,
  };

  render() {
    const { title, onEditPressed, onAddPressed } = this.props;

    const editButton =
      onEditPressed !== null ? (
        <View style={styles.editBtn}>
          <Touchable onPress={onEditPressed}>
            <Text color={Colors.primaryDark} scale={Text.Scale.BUTTON}>
              Edit
            </Text>
          </Touchable>
        </View>
      ) : null;

    const addButton =
      onAddPressed !== null ? (
        <View style={styles.addBtnContainer}>
          <Touchable onPress={onAddPressed}>
            <Icon name="plus-circle" size={32} color={Colors.primary} />
          </Touchable>
        </View>
      ) : null;

    return (
      <View style={styles.headingContainer}>
        <View>
          <Text scale={Text.Scale.H5}>{title}</Text>
        </View>
        {addButton}
        {editButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 16,
  },
  editBtn: {},
  addBtnContainer: {
    paddingLeft: 16,
    alignContent: "center",
    paddingBottom: 0,
  },
});

export default Heading;
