// @flow
import React from "react";
import { FlatList, Switch, View } from "react-native";

import { Text, TextInput } from "components";
import { Colors } from "values";
import styles from "../styles";
import type { RadiusInputProps, TravelSetting, TravelSettingInputProps } from "../StepCardTypes";

const TravelSettingSwitch = ({ item: travelSetting }: TravelSetting) => (
  <View style={styles.travelSetting}>
    <Text scale={Text.Scale.BUTTON}>{travelSetting.title}</Text>
    <View style={styles.travelSettingSwitch}>
      <Switch
        value={travelSetting.value}
        onValueChange={() => {
          travelSetting.onTravelSettingSelected(travelSetting);
        }}
        trackColor={{ true: Colors.secondaryLight, false: Colors.bland }}
        thumbColor={Colors.secondaryDark}
      />
    </View>
  </View>
);

const RadiusInput = ({ radius, onRadiusChanged }: RadiusInputProps) => (
  <View style={styles.radiusContainer}>
    <Text scale={Text.Scale.SUBTITLE} color={Colors.black}>
      How far would you travel for your clients?
    </Text>
    <View style={styles.radiusInputContainer}>
      <TextInput
        style={styles.radiusInput}
        placeholder="Enter distance in kilometres"
        keyboardType="numeric"
        onChangeText={onRadiusChanged}
        value={`${radius}`}
      />
      <Text scale={Text.Scale.BUTTON} style={styles.radiusUnit}>
        km
      </Text>
    </View>
  </View>
);

const TravelSettingInput = (props: TravelSettingInputProps) => {
  const { inCall, outCall, remoteCall, radius, onTravelSettingSelected, onRadiusChanged } = props;

  const radiusInput = outCall ? (
    <RadiusInput radius={radius} onRadiusChanged={onRadiusChanged} />
  ) : null;

  const travelSettingList: Array<TravelSetting> = [
    {
      value: outCall,
      title: "Mobile",
      onTravelSettingSelected,
    },
    {
      value: inCall,
      title: "Shop-Based",
      onTravelSettingSelected,
    },
    {
      value: remoteCall,
      title: "Remote",
      onTravelSettingSelected,
    },
  ];

  return (
    <View>
      <View style={styles.travelSettingContainer}>
        <FlatList
          data={travelSettingList}
          renderItem={item => TravelSettingSwitch(item)}
          keyExtractor={(item, index) => index.toString()}
          extraData={{ outCall, inCall, remoteCall }}
        />
      </View>
      {radiusInput}
    </View>
  );
};

export default TravelSettingInput;
