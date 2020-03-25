// @flow
import React from "react";
import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Emoji from "react-native-emoji";

import {
  GradientHeader,
  Text,
  Touchable,
  Card,
  ProfilePictureThumbnail,
  Loading,
} from "components";
import Container from "components/Container";
import { Colors } from "values";
import { DateUtils, FormatUtils, AlertUtils } from "utils";
import type { Agent } from "types/AgentType";
import type { PusherUser } from "types/MessagingTypes/PusherUserType";
import type { PusherRoom } from "types/MessagingTypes/PusherRoomType";
import type { PusherMessage } from "types/MessagingTypes/PusherMessageType";
import Bottle from "../bottle";
import { MessagingManager, AgentManager } from "../managers";
import AgentScreen from "./AgentScreen";

type Props = {
  navigation: NavigationScreenProp,
};

type State = {
  agent: Agent | any, // account in our database
  currentPusherUser: PusherUser | any, // account registered in Pusher.com
  conversations: Array<PusherRoom | any>,
  isLoading: boolean,
};

class ConversationListScreen extends AgentScreen {
  state: State;
  messagingManager: MessagingManager;
  agentManager: AgentManager;
  messagingSubscription: any;
  agentSubscription: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      currentPusherUser: undefined,
      conversations: [],
      isLoading: true,
    };

    this.messagingManager = Bottle.MessagingManager;
    this.agentManager = Bottle.AgentManager;
  }

  async componentDidMount(): Promise<any> & any {
    super.componentDidMount();
    if (!this.state.agent) {
      await this.refreshAgent();
      if (this.state.agent) {
        this.loadConversations(this.state.agent);
      }
    }
  }

  componentWillUnmount() {
    if (this.messagingSubscription) {
      this.messagingSubscription.unsubscribe();
    }
    this.agentSubscription.unsubscribe();
  }

  loadConversations = async agent => {
    try {
      await this.messagingManager.connectToChatManager(agent, this.onReceiveMessage);
      this.setState({ currentPusherUser: this.messagingManager.currentPusherUser });
      this.messagingSubscription = this.messagingManager.rooms$.subscribe(conversations => {
        if (conversations) {
          this.setState({ conversations });
          this.setState({ isLoading: false });
        }
      });
    } catch (err) {
      console.log(err);
      AlertUtils.showSnackBar("Unable to load conversations at the moment");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onReceiveMessage = async (messageData: PusherMessage) => {
    const { id, sender, parts, createdAt } = messageData;

    try {
      const incomingMessage = {
        _id: id,
        text: this.messagingManager.getTextFromMessage(parts),
        createdAt: new Date(createdAt),
        user: {
          _id: sender.id,
          name: sender.name,
          avatar: !sender.avatarURL ? "" : sender.avatarURL,
        },
      };

      return incomingMessage;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  };

  renderConversation = ({ item: conversation, index }) => (
    <Touchable
      onPress={() => {
        this.props.navigation.navigate({
          routeName: "ConversationScreen",
          params: { conversation },
        });
      }}
    >
      <View style={styles.conversationContainer} key={index}>
        <View style={styles.avatarContainer}>
          <ProfilePictureThumbnail
            profilePictureUrl={conversation.recipient.avatarURL}
            scale={1.5}
          />
        </View>
        <View style={styles.messageWithLineContainer}>
          <View style={styles.messageContainer}>
            <View style={styles.messagePreviewContainer}>
              <View style={styles.recipientNameContainer}>
                <Text scale={Text.Scale.H5}>{conversation.recipient.name}</Text>
              </View>
              <View style={styles.latestMessageContainer}>
                <Text>{FormatUtils.truncateText("", 40)}</Text>
              </View>
            </View>
            <View style={styles.timestampContainer}>
              <Text scale={Text.Scale.CAPTION}>
                <Text>
                  {DateUtils.latestMessageTimestampFromString(conversation.lastMessageAt)}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
        </View>
      </View>
    </Touchable>
  );

  render() {
    const { conversations, isLoading } = this.state;

    let conversationList = <View />;

    if (conversations) {
      conversationList =
        isLoading || conversations.length ? (
          <Card style={styles.conversationListCard}>
            <FlatList
              style={styles.conversationList}
              keyExtractor={(item, index) => index.toString()}
              data={conversations}
              renderItem={this.renderConversation}
            />
          </Card>
        ) : (
          <Card style={styles.conversationListCard}>
            <View style={styles.nullConversationsMessageContainer}>
              <Text scale={Text.Scale.BUTTON}>
                {"No conversations found "}
                <Emoji name="slightly_frowning_face" />
              </Text>
            </View>
          </Card>
        );
    }

    return (
      <Container style={styles.container}>
        <GradientHeader>
          <View style={styles.conversationListContainer}>
            <View style={styles.titleContainer}>
              <Text scale={Text.Scale.H4} color={Colors.white}>
                Messages
              </Text>
              <Touchable
                onPress={() => {
                  this.props.navigation.navigate("RequestListScreen");
                }}
              >
                <View style={styles.requestsButtonContainer}>
                  <Text color={Colors.white} scale={Text.Scale.BUTTON}>
                    Requests
                  </Text>
                </View>
              </Touchable>
            </View>
            <Loading isLoading={isLoading} />
            {conversationList}
          </View>
        </GradientHeader>
      </Container>
    );
  }
}

const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  conversationListContainer: {
    marginTop: -152,
  },
  conversationList: {
    padding: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 8,
  },
  requestsButtonContainer: {
    borderWidth: 2,
    borderColor: Colors.secondaryLight,
    borderRadius: 32,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  conversationListCard: {
    flex: 1,
    padding: 16,
    width: screenWidth,
  },
  conversationContainer: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 16,
  },
  avatarContainer: {},
  messageWithLineContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
  messageContainer: {
    flexDirection: "row",
  },
  messagePreviewContainer: {
    flex: 3,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  recipientNameContainer: {},
  latestMessageContainer: {},
  timestampContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 8,
    flexWrap: "wrap",
  },
  lineContainer: {
    paddingLeft: 16,
    paddingTop: 8,
  },
  line: {
    flex: 1,
    borderBottomColor: Colors.bland,
    borderBottomWidth: 1,
  },
  nullConversationsMessageContainer: {
    paddingLeft: 16,
  },
});

export default ConversationListScreen;
