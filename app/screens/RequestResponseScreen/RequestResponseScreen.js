// @flow
import React, { Component } from "react";
// eslint-disable-next-line react-native/split-platform-components
import { View, Picker } from "react-native";
// $FlowFixMe
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationScreenProp } from "react-navigation";
import Modal from "react-native-modal";

import { GradientHeader, Text, Card, Loading } from "components";
import Button from "components/Button";
import { FormatUtils, AlertUtils, DateUtils } from "utils";
import Container from "components/Container";
import type { BookingResponse } from "types/BookingResponseType";
import { Colors } from "values";

import Bottle from "../../bottle";
import { UserInfo, ServiceInfo } from "../RequestListScreen/RequestCard/RequestCardComponents";
import styles from "./styles";
import { TimeEstimate, PriceEstimate, ResponseButtons } from "./RequestResponseComponents";

type State = {
  currentPrice: string,
  currentHours: number,
  currentMinutes: number,
  currentDays: number,
  isLoading: boolean,
  isDeclinePressed: boolean,
  isRespondPressed: boolean,
  isTimeModalOpen: boolean,
};

type Props = {
  navigation: NavigationScreenProp<any, any>,
};

class RequestResponseScreen extends Component<Props, State> {
  authenticationManager: any;
  bookingManager: any;
  contentManager: any;
  allCategoriesSubscription: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPrice: "",
      currentHours: 0,
      currentMinutes: 0,
      currentDays: 0,
      isLoading: false,
      isDeclinePressed: false,
      isRespondPressed: false,
      isTimeModalOpen: false,
    };
    this.bookingManager = Bottle.BookingManager;
    this.authenticationManager = Bottle.AuthenticationManager;
    this.contentManager = Bottle.ContentManager;
  }

  onPriceChanged = currentPrice => {
    this.setState({ currentPrice });
  };

  onHoursChanged = (currentHours: number) => {
    this.setState({ currentHours });
  };

  onMinutesChanged = (currentMinutes: number) => {
    this.setState({ currentMinutes });
  };

  onDaysChanged = (currentDays: string) => {
    const daysNum = +FormatUtils.enforceNums(currentDays);
    this.setState({ currentDays: daysNum });
  };

  onDeclinePressed = async () => {
    this.setState({ isDeclinePressed: true });
    const { navigation } = this.props;
    const { bookingId } = navigation.state.params;
    const bookingResponse: BookingResponse = {
      bookingId,
      timeEstimate: -1,
      priceEstimate: -1,
      agentAccepted: false,
    };
    try {
      const res = await this.bookingManager.respondToRequest(bookingResponse);
      if (!res) {
        AlertUtils.showSnackBar("Something went wrong", Colors.error);
      } else {
        navigation.navigate({ routeName: "RequestListScreen" });
        AlertUtils.showSnackBar("Request declined!", Colors.primary);
      }
    } catch (err) {
      AlertUtils.showSnackBar("Something went wrong", Colors.error);
    }
    this.setState({ isDeclinePressed: false });
  };

  isValidInput = (): boolean => {
    const { currentPrice } = this.state;
    if (currentPrice === "") {
      AlertUtils.showSnackBar("Please enter a price estimate");
      return false;
    }
    return true;
  };

  onRespondPressed = async (): void => {
    this.setState({ isRespondPressed: true });
    const { navigation } = this.props;
    const { bookingId } = navigation.state.params;
    const { currentPrice, currentHours, currentMinutes } = this.state;
    if (!this.isValidInput()) {
      this.setState({ isRespondPressed: false });
      return;
    }
    const priceEstimate = +FormatUtils.enforceNums(currentPrice);
    const timeEstimate = currentHours * 60 + currentMinutes;
    const bookingResponse: BookingResponse = {
      bookingId,
      timeEstimate,
      priceEstimate,
      agentAccepted: true,
    };
    try {
      const res = await this.bookingManager.respondToRequest(bookingResponse);
      if (!res) {
        AlertUtils.showSnackBar("Something went wrong", Colors.error);
      } else {
        navigation.navigate({ routeName: "RequestListScreen" });
        AlertUtils.showSnackBar("Request accepted!", Colors.primary);
      }
    } catch (err) {
      AlertUtils.showSnackBar("Something went wrong", Colors.error);
    }
    this.setState({ isDeclinePressed: false });
  };

  renderMinutePickerItems = () => {
    const minutes = [];
    for (let i = 0; i < 60; i++) {
      if (i % 5 === 0) {
        minutes.push(<Picker.Item key={i} label={`${i} minutes`} value={i} />);
      }
    }
    return minutes;
  };

  renderHourPickerItems = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(<Picker.Item key={i} label={`${i} hours`} value={i} />);
    }
    return hours;
  };

  toggleTimeModal = () => {
    this.setState(prevState => ({
      isTimeModalOpen: !prevState.isTimeModalOpen,
    }));
  };

  isTimeEstimateSpecified = (): boolean => {
    const { currentHours, currentMinutes, currentDays } = this.state;
    return currentHours !== 0 || currentMinutes !== 0 || currentDays !== 0;
  };

  render() {
    const { navigation } = this.props;
    const {
      isLoading,
      currentHours,
      currentMinutes,
      currentPrice,
      isRespondPressed,
      isDeclinePressed,
      currentDays,
      isTimeModalOpen,
    } = this.state;
    const {
      userFirstName,
      userLastName,
      userProfilePictureUrl,
      requestDescription,
      serviceTitle,
    } = navigation.state.params;

    const timeEstimatePrompt = this.isTimeEstimateSpecified()
      ? "Edit Time Estimate"
      : "Add Time Estimate";

    return (
      <Container navigation={navigation} style={styles.container}>
        <View style={styles.timeEstimateModalContainer}>
          <Modal isVisible={isTimeModalOpen} onBackdropPress={this.toggleTimeModal}>
            <Card>
              <KeyboardAwareScrollView enableOnAndroid>
                <View style={styles.timeEstimateContainer}>
                  <TimeEstimate
                    currentHours={currentHours}
                    renderHourPickerItems={this.renderHourPickerItems}
                    renderMinutePickerItems={this.renderMinutePickerItems}
                    onMinutesChanged={this.onMinutesChanged}
                    onHoursChanged={this.onHoursChanged}
                    currentMinutes={currentMinutes}
                    currentDays={currentDays}
                    onDaysChanged={this.onDaysChanged}
                    toggleTimeModal={this.toggleTimeModal}
                  />
                </View>
              </KeyboardAwareScrollView>
            </Card>
          </Modal>
        </View>
        <GradientHeader>
          <Loading isLoading={isLoading} />
          <View style={styles.screenTitleContainer}>
            <Text scale={Text.Scale.H4} color={Colors.white}>
              {`Respond to ${userFirstName}`}
            </Text>
          </View>
          <Card style={styles.offeringCard}>
            <KeyboardAwareScrollView contentContainerStyle={styles.cardContainer}>
              <UserInfo
                userFirstName={userFirstName}
                userLastName={userLastName}
                userProfilePictureUrl={userProfilePictureUrl}
              />
              <ServiceInfo serviceTitle={serviceTitle} requestDescription={requestDescription} />
              <View style={styles.stepContainer}>
                <Text scale={Text.Scale.H5} withOptionalTag>
                  Time Estimate
                </Text>
                {!this.isTimeEstimateSpecified() && (
                  <Text scale={Text.Scale.CAPTION}>
                    {`How long will it take you to fulfill ${userFirstName}'s request?`}
                  </Text>
                )}
                <View style={styles.addTimeEstimateButtonContainer}>
                  <Button onPress={this.toggleTimeModal} title={timeEstimatePrompt} />
                </View>
                <Text scale={Text.Scale.H6} color={Colors.primary}>
                  {this.isTimeEstimateSpecified() &&
                    `Selected: ${DateUtils.getFormattedTimeEstimate(
                      currentDays,
                      currentHours,
                      currentMinutes,
                    )}`}
                </Text>
              </View>
              <PriceEstimate currentPrice={currentPrice} onPriceChanged={this.onPriceChanged} />
              <ResponseButtons
                isDeclinePressed={isDeclinePressed}
                isRespondPressed={isRespondPressed}
                onRespondPressed={this.onRespondPressed}
                onDeclinePressed={this.onDeclinePressed}
              />
            </KeyboardAwareScrollView>
          </Card>
        </GradientHeader>
      </Container>
    );
  }
}

export default RequestResponseScreen;
