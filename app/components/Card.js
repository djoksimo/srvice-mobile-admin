// @flow
import React from "react";
import type { Element } from "react";

import { View, StyleSheet } from "react-native";
import { Colors, Dimensions } from "values";

type Props = {
  children: Element<any>,
  style: any,
};

const Card = ({ children, style }: Props) => <View style={[styles.card, style]}>{children}</View>;

const { screenWidth } = Dimensions;

const styles = StyleSheet.create({
  card: {
    width: screenWidth - 64,
    elevation: 5,
    alignSelf: "center",
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.bland,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 8,
    shadowOpacity: 0.4,
  },
});

export default Card;
