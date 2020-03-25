// @flow
import React from "react";
import { View, StyleSheet } from "react-native";

import { Colors, Dimensions } from "values";
import { Text } from ".";
import Button from "./Button";

type Props = {
  message: string,
  onPromptPressed: Function,
};

const WarningBannerPrompt = (props: Props) => {
  const { message, onPromptPressed } = props;
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.textContainer}>
        <Text color={Colors.white} scale={Text.Scale.BUTTON}>
          {message}
        </Text>
      </View>
      <Button
        title="Enter Work Hours"
        color={Colors.white}
        titleColor={Colors.primary}
        borderColor={Colors.secondaryLight}
        onPress={onPromptPressed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: Dimensions.screenWidth,
    // height: 48,
    backgroundColor: Colors.primaryDark,
    padding: 32,
    // flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  textContainer: {
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    alignContent: "center",
    paddingBottom: 16,
  },
});

export default WarningBannerPrompt;
