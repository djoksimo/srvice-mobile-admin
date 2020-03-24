// @flow
import React from "react";
import { View, ScrollView, FlatList } from "react-native";
import Emoji from "react-native-emoji";
import type { NavigationScreenProp } from "react-navigation";

import { Text, Card, Line, Loading } from "components";
import Container from "components/Container";
import type { Agent } from "types/AgentType";
import { NotificationKind } from "../../enums";

import styles from "./styles";
import AgentScreen from "../AgentScreen";
import { Notification, CardHeading, PromptCard } from "./DashboardScreenComponents";
import { getAccountPrompts } from "./DashboardUtils";

type Props = {
  navigation: NavigationScreenProp,
};

type State = {
  agent: Agent | any,
  isLoading: boolean,
};

class DashboardScreen extends AgentScreen {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      isLoading: false,
      visiblePrompts: [],
    };
  }

  componentDidMount() {
    super.componentDidMount();
    if (!this.state.agent) {
      this.refreshAgent();
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  renderPromptCard = ({ item: srvicePrompt }) => {
    const { warningText, promptText, onPrimaryActionPressed, onDiscardPressed } = srvicePrompt;
    return (
      <PromptCard
        warningText={warningText}
        promptText={promptText}
        onPrimaryActionPressed={onPrimaryActionPressed}
        onDiscardPressed={onDiscardPressed}
      />
    );
  };

  renderNotificationItem = ({ item: notification }) => {
    const { text, timestamp, kind } = notification;
    return <Notification kind={kind} text={text} timestamp={timestamp} />;
  };

  render() {
    const { agent, isLoading } = this.state;
    const { navigation } = this.props;
    let welcomeText = null;
    let promptCardList = null;

    if (agent) {
      const { firstName } = agent;

      welcomeText = (
        <>
          <Text>
            {`Welcome back ${firstName} `}
            <Emoji name="wave" />
          </Text>
        </>
      );

      promptCardList = (
        <FlatList
          scrollEnabled
          data={getAccountPrompts(agent, navigation)}
          renderItem={this.renderPromptCard}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }

    return (
      <Container style={styles.container} blueLogo>
        <View style={styles.scrollViewContainer}>
          <ScrollView contentContainerStyle={styles.innerScrollViewContainer}>
            <View style={styles.welcomeCardContainer}>
              <Card style={styles.welcomeCard}>
                <Text scale={Text.Scale.H3}>Srvice Admin</Text>
                {welcomeText}
              </Card>
            </View>
            <View style={styles.notificationsCardContainer}>
              <Card style={styles.notificationsCard}>
                <CardHeading
                  title="Notifications"
                  primaryActionText="Mark all as read"
                  primaryAction={() => {}}
                />
                <View style={styles.notificationsListContainer}>
                  <FlatList
                    scrollEnabled
                    data={notifications}
                    renderItem={this.renderNotificationItem}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <Line />}
                  />
                </View>
              </Card>
            </View>
            <Loading isLoading={isLoading} />
            {promptCardList}
          </ScrollView>
        </View>
      </Container>
    );
  }
}

// TODO: unhardcode once notifications/push-notifications are enabled in API
const notifications = [
  {
    kind: NotificationKind.Message,
    text: "New Message from Jane Doe",
    timestamp: new Date(),
  },
  {
    kind: NotificationKind.BadReview,
    text: "You messed up my haircut",
    timestamp: new Date(),
  },
  {
    kind: NotificationKind.GoodReview,
    text: "Amazing Service, thank you!",
    timestamp: new Date(),
  },
  {
    kind: NotificationKind.MoneyTransaction,
    text: "Received $100 from Bob",
    timestamp: new Date(),
  },
];

export default DashboardScreen;
