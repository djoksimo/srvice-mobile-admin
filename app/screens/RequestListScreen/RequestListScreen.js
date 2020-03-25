// @flow
import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import type { Agent } from "types/AgentType";
import { GradientHeader, Loading } from "components";
import Container from "components/Container";
import { Colors } from "values";
import AgentScreen from "../AgentScreen";
import { RequestCard } from "./RequestCard";
import { AuthenticationManager } from "../../managers";
import Bottle from "../../bottle";

type State = {
  agent: Agent | any,
  isLoading: boolean,
};

type Props = {
  navigation: NavigationScreenProp<any, any>,
};

class RequestListScreen extends AgentScreen {
  authenticationManager: AuthenticationManager;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      isLoading: false,
    };
    this.authenticationManager = Bottle.AuthenticationManager;
  }

  async componentDidMount(): any {
    super.componentDidMount();
    if (!this.state.agent) {
      this.setState({ isLoading: true });
      await this.refreshAgent();
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  renderBookingCard = ({ item: booking }) => {
    const { firstName, lastName, profilePictureUrl } = booking.request.user;
    const { description, _id } = booking.request;
    const { _id: bookingId, userAccepted, agentAccepted } = booking;
    const { title } = booking.service;
    const { navigation } = this.props;

    return (
      <RequestCard
        navigation={navigation}
        userFirstName={firstName}
        userLastName={lastName}
        requestDescription={description}
        userProfilePictureUrl={profilePictureUrl}
        serviceTitle={title}
        requestId={_id}
        bookingId={bookingId}
        userAccepted={userAccepted}
        agentAccepted={agentAccepted}
      />
    );
  };

  render() {
    const { agent, isLoading } = this.state;
    let bookingCardList = <View />;

    if (agent) {
      bookingCardList = (
        <FlatList
          data={agent.bookings}
          renderItem={this.renderBookingCard}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }

    return (
      <Container whiteLogo style={styles.container}>
        <GradientHeader>
          <View style={styles.bookingCardListContainer}>
            <Loading isLoading={isLoading} />
            {bookingCardList}
          </View>
        </GradientHeader>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  bookingCardListContainer: {
    marginTop: -80,
  },
});

export default RequestListScreen;
