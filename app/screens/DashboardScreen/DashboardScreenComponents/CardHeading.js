// @flow
import React from "react";
import { StyleSheet, View } from "react-native";

import { Text, Touchable } from "components";

type Props = {
  title: string,
  primaryAction?: () => void,
  primaryActionText?: string,
};

const CardHeading = ({ title, primaryAction = () => {}, primaryActionText = "" }: Props) => (
  <View style={styles.cardHeadingContainer}>
    <View>
      <Text scale={Text.Scale.H4}>{title}</Text>
    </View>
    <View>
      <Touchable onPress={primaryAction}>
        <Text scale={Text.Scale.CAPTION}>{primaryActionText}</Text>
      </Touchable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardHeadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CardHeading;
