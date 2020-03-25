// @flow
import React from "react";
import { View, StyleSheet } from "react-native";

import { DateUtils } from "utils";
import Text from "./Text";

type Props = {
  createdAt: Date,
  updatedAt: Date,
};

const ServiceTimestamps = (props: Props) => {
  const { createdAt, updatedAt } = props;

  const formattedCreatedAt = DateUtils.getFormattedDate(createdAt);
  const formattedUpdatedAt = DateUtils.getFormattedDate(updatedAt);

  return (
    <View style={styles.serviceDateContainer}>
      <Text scale={Text.Scale.CAPTION}>{`Active since ${formattedCreatedAt}`}</Text>
      {formattedCreatedAt === formattedUpdatedAt ? null : (
        <Text scale={Text.Scale.CAPTION}>{`Last edited on ${formattedUpdatedAt}`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  serviceDateContainer: {},
});

export default ServiceTimestamps;
