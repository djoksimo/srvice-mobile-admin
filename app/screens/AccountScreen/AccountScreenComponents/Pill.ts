// @flow
import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "components";
import { Colors } from "values";

type Props = {
  title: string,
};

const Pill = (props: Props) => {
  const { title } = props;

  return (
    <View style={styles.pill}>
      <View>
        <Text scale={Text.Scale.BUTTON} color={Colors.black}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: Colors.blandLight,
  },
});

export default Pill;
