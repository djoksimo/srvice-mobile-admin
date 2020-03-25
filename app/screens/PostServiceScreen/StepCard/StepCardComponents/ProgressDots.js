// @flow
import React from "react";
import { View } from "react-native";
import type { Element } from "react";

import styles from "../styles";
import type { ProgressDotsProps } from "../StepCardTypes";

const ProgressDots = ({ stepNumber, stepCount = 4 }: ProgressDotsProps) => {
  const dots: Array<Element<any>> = [];
  for (let i = 0; i < stepCount; i++) {
    if (i > stepNumber) {
      dots.push(<View key={i} style={styles.uncompletedDot} />);
    } else {
      dots.push(<View key={i} style={styles.completedDot} />);
    }
  }

  return <View style={styles.dots}>{dots}</View>;
};

export default ProgressDots;
