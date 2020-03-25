// @flow
import React from "react";
import { ActivityIndicator } from "react-native";
import { Colors } from "values";

type Props = {
  isLoading: boolean,
};

const Loading = (props: Props) => {
  const { isLoading } = props;

  return isLoading ? (
    <ActivityIndicator animating={isLoading} size="large" color={Colors.primaryLight} />
  ) : null;
};

export default Loading;
