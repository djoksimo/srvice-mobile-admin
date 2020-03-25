// @flow
import React, { PureComponent } from "react";
import { View, Image, StyleSheet, Share, Platform } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Text, Stars, Touchable, Card, CategoryIcon } from "components";
import { FormatUtils, AlertUtils } from "utils";
import type { Service } from "types/ServiceType";
import { Colors, Max } from "values";
import ServiceTimeStamps from "components/ServiceTimestamps";
import { TravelSettingOption } from "../../../enums";

type Props = {
  service: Service,
  navigation: NavigationScreenProp,
};

class ServiceCard extends PureComponent<Props> {
  onCardPressed = () => {
    this.navigateToServiceScreen();
  };

  navigateToServiceScreen = () => {
    const { navigation, service } = this.props;
    navigation.navigate({
      routeName: "ServiceScreen",
      params: { service },
    });
  };

  onSharedPressed = async () => {
    const { service } = this.props;
    const { title, description } = service;
    const messageTitle = `Check out my service "${title}" on srvice!`;
    const messageBody = `${messageTitle}\n${FormatUtils.truncateText(description, 80)}`;

    try {
      const sharedRes = await Share.share({
        subject: messageTitle,
        dialogTitle: "Share your service!",
        title: messageTitle,
        message: messageBody,
        url: "https://srvice.ca",
      });
      if (Platform.OS === "ios" && sharedRes.action === Share.sharedAction) {
        if (sharedRes.activityType) {
          const applicationName = sharedRes.activityType.split(".")[2];
          AlertUtils.showSnackBar(`Successfully shared with ${applicationName}!`, Colors.primary);
        } else {
          AlertUtils.showSnackBar("Successfully shared!", Colors.primary);
        }
      } else if (sharedRes.action === Share.dismissedAction) {
        AlertUtils.showSnackBar("Dismissed", Colors.secondary);
      }
    } catch (error) {
      AlertUtils.showSnackBar("Something went wrong.", Colors.error);
      console.log(error);
    }
  };

  render() {
    const { service } = this.props;

    const {
      title,
      inCall,
      outCall,
      remoteCall,
      category,
      pictureUrls,
      createdAt,
      updatedAt,
      averageServiceRating,
    } = service;

    const imageThumbnail = (
      <View style={styles.imageThumbnailContainer}>
        <Image style={styles.imageThumbnail} source={{ uri: pictureUrls[0] }} resizeMode="cover" />
      </View>
    );

    const travelSettingOptions = [];

    if (inCall) {
      travelSettingOptions.push(TravelSettingOption.TRAVEL_SETTING_INCALL);
    }
    if (outCall) {
      travelSettingOptions.push(TravelSettingOption.TRAVEL_SETTING_OUTCALL);
    }
    if (remoteCall) {
      travelSettingOptions.push(TravelSettingOption.TRAVEL_SETTING_REMOTE);
    }

    const serviceInfo = (
      <View style={styles.serviceInfoContainer}>
        <View style={styles.serviceTitleContainer}>
          <Text scale={Text.Scale.H6}>
            {FormatUtils.truncateText(title, Max.serviceTitle.truncated)}
          </Text>
        </View>
        <View style={styles.bottomServiceInfoContainer}>
          <View style={styles.leftServiceInfoContainer}>
            <View style={styles.ratingContainer}>
              <Stars size={16} starCount={averageServiceRating} />
            </View>
            <View style={styles.travelSettingsContainer}>
              <Text scale={Text.Scale.BODY}>
                {FormatUtils.commaSeparateArray(travelSettingOptions)}
              </Text>
            </View>
            <ServiceTimeStamps createdAt={new Date(createdAt)} updatedAt={new Date(updatedAt)} />
            <View style={styles.shareIconContainer}>
              <Touchable onPress={this.onSharedPressed}>
                <View>
                  <Icon name="share" size={24} color={Colors.primary} />
                </View>
              </Touchable>
            </View>
          </View>
          <View style={styles.rightServiceInfoContainer}>
            <View>
              <CategoryIcon iconUrl={category.iconUrl} scale={1.5} />
            </View>
          </View>
        </View>
      </View>
    );

    return (
      <Card style={styles.cardContainer}>
        <Touchable onPress={this.onCardPressed}>
          <View style={{ height: 344 }}>
            {imageThumbnail}
            {serviceInfo}
          </View>
        </Touchable>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: -16,
    elevation: 5,
    flexDirection: "column",
    height: 344,
  },
  imageThumbnailContainer: {
    flex: 3,
    backgroundColor: Colors.bland,
    justifyContent: "center",
    borderRadius: 16,
  },
  imageThumbnail: {
    flex: 1,
    borderRadius: 16,
  },
  serviceInfoContainer: {
    flex: 2.5,
    padding: 16,
    paddingBottom: 16,
  },
  serviceTitleContainer: {
    paddingTop: 8,
  },
  leftServiceInfoContainer: {
    flexDirection: "column",
  },
  rightServiceInfoContainer: {
    flexDirection: "column",
    alignSelf: "center",
  },
  bottomServiceInfoContainer: {
    flexDirection: "row",
    paddingBottom: 8,
    paddingTop: 8,
    justifyContent: "space-between",
  },
  travelSettingsContainer: {},
  ratingContainer: {
    paddingBottom: 8,
  },
  shareIconContainer: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ServiceCard;
