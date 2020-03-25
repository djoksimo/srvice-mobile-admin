// @flow
import React from "react";
import type { Element } from "react";
import { Platform, TouchableOpacity, TouchableNativeFeedback } from "react-native";

type Props = {
  children: Element<any>,
};

const Touchable = ({ children, ...props }: Props) =>
  Platform.OS === "ios" ? (
    <TouchableOpacity {...props}>{children}</TouchableOpacity>
  ) : (
    <TouchableNativeFeedback {...props}>{children}</TouchableNativeFeedback>
  );

export default Touchable;
