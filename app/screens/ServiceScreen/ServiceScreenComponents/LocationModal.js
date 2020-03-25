// @flow
import React from "react";
import Modal from "react-native-modal";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Circle, Marker } from "react-native-maps";

import { Colors, Dimensions } from "values";
import { Card, Touchable } from "components";
import Heading from "./Heading";

type Props = {
  onDismissModal: Function,
  isLocationModalVisible: Function,
  latitude: number,
  longitude: number,
  radius: number,
};

const { screenWidth, screenHeight } = Dimensions;

const LocationModal = (props: Props) => {
  const { onDismissModal, isLocationModalVisible, latitude, longitude, radius } = props;

  const circle =
    radius === 0 ? (
      <Marker coordinate={{ latitude, longitude }} pinColor={Colors.primaryDark} />
    ) : (
      <Circle
        center={{ latitude: latitude + 0.01, longitude: longitude + 0.01 }}
        radius={radius * 1000}
        fillColor={Colors.translucentPrimaryLight}
        strokeColor={Colors.blandLight}
        zIndex={2}
        strokeWidth={2}
      />
    );

  const LATITUDE_DELTA = 0.0922;

  const aspectRatio = screenWidth / screenHeight;

  // TODO fix for large radii
  const map = (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LATITUDE_DELTA * aspectRatio,
        }}
      >
        {circle}
      </MapView>
    </View>
  );

  return (
    <Modal
      backdropColor={Colors.screenBackground}
      isVisible={isLocationModalVisible}
      onBackdropPress={onDismissModal}
    >
      <Card style={styles.mapCard}>
        <View style={styles.mapCardHeader}>
          <Heading text="Service Location" />
          <View style={styles.closeButtonContainer}>
            <Touchable onPress={onDismissModal}>
              <Icon name="close" size={24} color={Colors.secondaryDark} />
            </Touchable>
          </View>
        </View>
        {map}
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    alignSelf: "center",
    marginBottom: 32,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.bland,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  map: {
    width: screenWidth - 64,
    height: screenHeight / 2,
    alignSelf: "center",
  },
  mapCard: {
    padding: 16,
  },
  mapCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButtonContainer: {},
});

export default LocationModal;
