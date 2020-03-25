// @flow
import React from "react";
import { Image, View } from "react-native";

import { Touchable } from "components";
import styles from "../styles";
import plusIcon from "../../../../assets/plusIcon.png";

type Props = {
  onPressRespondButtonPressed: Function,
};

const ActionButtons = ({ onPressRespondButtonPressed }: Props) => (
  <View>
    <View style={styles.actionButtonContainer}>
      <Touchable onPress={onPressRespondButtonPressed}>
        <View style={styles.actionButton}>
          <Image style={styles.actionIcon} source={plusIcon} resizeMode="contain" />
        </View>
      </Touchable>
    </View>
  </View>
);

export default ActionButtons;
