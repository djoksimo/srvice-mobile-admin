// @flow
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "values";
import Badge from "./Badge";

type Props = {
  inCall: boolean,
  outCall: boolean,
  remote: boolean,
};

const TravelSetting = ({ badgeText, badgeColor }) => (
  <View style={styles.travelSettingBadge}>
    <Badge badgeColor={badgeColor} badgeText={badgeText} />
  </View>
);

class TravelSettings extends Component<Props> {
  render() {
    const { inCall, outCall, remote } = this.props;

    const travelSettings = [];

    if (inCall) {
      travelSettings.push(
        <TravelSetting badgeText="Shop-Based" badgeColor={Colors.violet} key={0} />,
      );
    }
    if (outCall) {
      travelSettings.push(<TravelSetting badgeText="Mobile" badgeColor={Colors.pink} key={1} />);
    }
    if (remote) {
      travelSettings.push(<TravelSetting badgeText="Remote" badgeColor={Colors.teal} key={2} />);
    }
    return <View style={styles.travelSettingsContainer}>{travelSettings}</View>;
  }
}

const styles = StyleSheet.create({
  travelSettingsContainer: {
    flexDirection: "row",
  },
  travelSettingBadge: {
    marginLeft: 8,
  },
});

export default TravelSettings;
