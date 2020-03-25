// @flow
import React, { Component } from "react";
import type { Element } from "react";
import LinearGradient from "react-native-linear-gradient";
import { StyleSheet, View } from "react-native";

import { Colors, Dimensions } from "values";

type Props = {
  absolute?: boolean,
  children: Element<any>,
};

class GradientHeader extends Component<Props> {
  static defaultProps = {
    absolute: false,
  };

  render() {
    const { absolute = false, children } = this.props;

    return (
      <View>
        <LinearGradient
          colors={[Colors.primaryDark, Colors.gradientLight]}
          style={[styles.rectangle, { position: absolute ? "absolute" : "relative" }]}
        />
        {children}
      </View>
    );
  }
}

const { screenWidth } = Dimensions;

const styles = StyleSheet.create({
  rectangle: {
    width: screenWidth,
    height: 168,
    borderRadius: 32,
    top: -64,
  },
});

export default GradientHeader;
