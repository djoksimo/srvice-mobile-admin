// @flow
import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "components";
import { Colors } from "values";

type Props = {
  first: boolean,
  count: number,
  title: string,
};

const StatBox = (props: Props) => {
  const { first, count, title } = props;

  return (
    <View style={[styles.statBox, { borderLeftWidth: first ? 0 : 1 }]}>
      <Text scale={Text.Scale.BUTTON}>{count}</Text>
      <Text scale={Text.Scale.CAPTION}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statBox: {
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    borderLeftColor: Colors.bland,
  },
});

export default StatBox;
