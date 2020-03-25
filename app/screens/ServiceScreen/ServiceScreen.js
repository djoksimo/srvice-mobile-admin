// @flow
import React from "react";
import { View, ScrollView, Alert } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import _ from "lodash";

import { Card, GradientHeader, Text, Carousel } from "components";
import Container from "components/Container";
import SectionHeading from "components/SectionHeading";
import ModalMenu from "components/ModalMenu";
import type { Agent } from "types/AgentType";
import Button from "components/Button";

import { Dimensions, Colors } from "values";

import type { MenuButton } from "types/MenuButton";
import type { Service } from "types/ServiceType";

import { AlertUtils } from "utils";

import LocationModal from "./ServiceScreenComponents/LocationModal";
import { ServiceInfoCard, ServiceRating } from "./ServiceScreenComponents";
import AgentScreen from "../AgentScreen";
import styles from "./styles";
import Bottle from "../../bottle";
import { ServiceManager } from "../../managers";

type State = {
  agent: Agent | any,
  scrollPosition: number,
  locationModalVisible: boolean,
  isModalMenuOpen: boolean,
};

type Props = {
  navigation: NavigationScreenProp<any, {
    service: Service
  }>,
};

class ServiceScreen extends AgentScreen {
  state: State;
  serviceManager: ServiceManager;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      scrollPosition: 0,
      locationModalVisible: false,
      isModalMenuOpen: false,
    };
    this.serviceManager = Bottle.ServiceManager;
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  renderServiceRating = ({ item: serviceRating }) => {
    const { comment, overallRating, user, date } = serviceRating;
    const { firstName, lastName, profilePictureUrl } = user;
    return (
      <ServiceRating
        firstName={firstName}
        lastName={lastName}
        profilePictureUrl={profilePictureUrl}
        comment={comment}
        overallRating={overallRating}
        date={date}
      />
    );
  };

  onScroll = e => {
    this.setState({ scrollPosition: e.nativeEvent.contentOffset.y });
  };

  dismissLocationModal = () => {
    this.setState({ locationModalVisible: false });
  };

  onLocationButtonPressed = () => {
    this.setState({ locationModalVisible: true });
  };

  onBackButtonPressed = () => {
    const { navigation } = this.props;
    navigation.navigate("AccountScreen");
  };

  addOfferings = () => {
    const { navigation } = this.props;
    const service = navigation.getParam("service");

    navigation.navigate({
      routeName: "PostOfferingScreen",
      params: { service },
    });
  };

  navigateToOfferingListScreen = () => {
    const { navigation } = this.props;
    const service = navigation.getParam("service");

    navigation.navigate({
      routeName: "OfferingListScreen",
      params: { service, shouldUpdateAgent: true },
    });
  };

  toggleModalMenu = () => {
    this.setState(previousState => ({
      isModalMenuOpen: !previousState.isModalMenuOpen,
    }));
  };

  deleteService = async () => {
    try {
      const { navigation } = this.props;
      const service = navigation.getParam("service");
      const { _id: serviceId } = service;

      // eslint-disable-next-line no-unused-vars
      const res = await this.serviceManager.deleteService(serviceId);

      AlertUtils.showSnackBar("Successfully removed service", Colors.primaryDark);
      await this.refreshAgent();
      navigation.navigate("AccountScreen");
    } catch (err) {
      return new Error(err.toString());
    }
    return null;
  };

  promptDeleteAction = () => {
    Alert.alert(
      "Delete Service",
      "Please confirm that you want to delete this service",
      [
        {
          text: "Delete",
          onPress: async () => {
            try {
              await this.deleteService();
            } catch (err) {
              console.log(err);
              AlertUtils.showSnackBar("Something went wrong");
            }
          },
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true },
    );
  };

  navigateToEditScreen = () => {
    const { navigation } = this.props;
    const service = navigation.getParam("service");

    navigation.navigate({
      routeName: "EditServiceScreen",
      params: { service },
    });
  };

  render() {
    const { navigation } = this.props;
    const { scrollPosition, locationModalVisible, isModalMenuOpen } = this.state;
    const service = navigation.getParam("service");
    const {
      title,
      pictureUrls,
      averageServiceRating,
      serviceRatings,
      description,
      inCall,
      outCall,
      remoteCall,
      category,
      createdAt,
      updatedAt,
      address,
      longitude,
      latitude,
      radius,
      offerings,
    } = service;

    const { screenWidth } = Dimensions;

    const modalMenuButtons: Array<MenuButton> = [
      {
        icon: "square-edit-outline",
        action: () => {
          this.navigateToEditScreen();
          this.toggleModalMenu();
        },
        text: "Edit Service",
      },
      {
        icon: "delete-forever",
        action: () => {
          this.promptDeleteAction();
        },
        text: "Delete Service",
      },
    ];

    const serviceRatingsCarousel =
      serviceRatings.length > 0 ? (
        <View style={styles.serviceRatingCarouselContainer}>
          <View style={styles.ratingHeadingContainer}>
            <SectionHeading text="Reviews" />
          </View>
          <Carousel
            autoplay
            renderItem={this.renderServiceRating}
            list={serviceRatings}
            width={screenWidth - 64}
          />
        </View>
      ) : (
        <View style={styles.nullMessageContainer}>
          <SectionHeading text="Reviews" />
          <Text scale={Text.Scale.BODY}>Looks like this service does not have any reviews yet</Text>
        </View>
      );

    const offeringsPrompt = _.isEmpty(offerings) ? (
      <View>
        <Text scale={Text.Scale.SUBTITLE}>Have fixed prices and durations for this service?</Text>
        <View style={styles.addOfferingsBtnContainer}>
          <Button title="Add Offerings" onPress={this.addOfferings} />
        </View>
      </View>
    ) : (
      <View>
        <View style={styles.viewOfferingCaptionContainer}>
          <Text scale={Text.Scale.CAPTION}>Offerings have fixed prices and durations</Text>
        </View>
        <Button title="View Offerings" onPress={this.navigateToOfferingListScreen} />
      </View>
    );

    return (
      <Container
        navigation={navigation}
        glow={scrollPosition > 2}
        style={styles.container}
        backButtonHandler={this.onBackButtonPressed}
        menu
        onMenuButtonPressed={this.toggleModalMenu}
      >
        <ModalMenu
          menuButtons={modalMenuButtons}
          isOpen={isModalMenuOpen}
          onBackdropPress={this.toggleModalMenu}
        />
        <ScrollView onScroll={this.onScroll}>
          <GradientHeader>
            <View style={styles.serviceInfoContainer}>
              <ServiceInfoCard
                title={title}
                category={category}
                averageServiceRating={averageServiceRating}
                inCall={inCall}
                outCall={outCall}
                remoteCall={remoteCall}
                pictureUrls={pictureUrls}
                createdAt={createdAt}
                updatedAt={updatedAt}
              />
              <View style={styles.descriptionContainer}>
                <SectionHeading text="Description" />
                <Text>{description}</Text>
              </View>
              {serviceRatingsCarousel}
              <Card style={styles.locationCard}>
                <SectionHeading text="Location" />
                <Text scale={Text.Scale.SUBTITLE}>{address}</Text>
                <View style={styles.locationButtonContainer}>
                  <Button onPress={this.onLocationButtonPressed} title="View map" />
                </View>
              </Card>
            </View>
            <LocationModal
              onDismissModal={this.dismissLocationModal}
              isLocationModalVisible={locationModalVisible}
              latitude={latitude}
              longitude={longitude}
              radius={radius}
            />
            <View style={styles.offeringsContainer}>
              <View style={styles.offeringsHeadingContainer}>
                <SectionHeading text="Offerings" onAddPressed={this.addOfferings} />
                <View style={styles.offeringsPromptContainer}>{offeringsPrompt}</View>
              </View>
            </View>
          </GradientHeader>
        </ScrollView>
      </Container>
    );
  }
}

export default ServiceScreen;
