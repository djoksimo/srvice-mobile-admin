// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import type { IMessage } from "react-native-gifted-chat";
import { NavigationScreenProp } from "react-navigation";

import Container from "components/Container";
import { Colors } from "values";
import type { PusherUser } from "types/MessagingTypes/PusherUserType";
import type { Agent } from "types/AgentType";
import type { PusherRoom } from "types/MessagingTypes/PusherRoomType";
import type { PusherMessage } from "types/MessagingTypes/PusherMessageType";
import { MessagingManager } from "../managers";
import Bottle from "../bottle";
import AgentScreen from "./AgentScreen";

type State = {
  messages: Array<IMessage>,
  currentPusherUser: PusherUser | any,
  conversation: PusherRoom | any,
  agent: Agent | any,
};

type Props = {
  navigation: NavigationScreenProp,
};

class ConversationScreen extends AgentScreen {
  messagingManager: MessagingManager;
  messagingSubscription: any;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      messages: [],
      currentPusherUser: undefined,
      conversation: undefined,
    };
    this.messagingManager = Bottle.MessagingManager;
  }

  renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: Colors.primary,
        },
        left: {
          backgroundColor: "#e9e9e9",
        },
      }}
    />
  );

  componentDidMount() {
    super.componentDidMount();
    try {
      const { navigation } = this.props;
      const currentConversation = navigation.getParam("conversation");
      this.setState({
        conversation: currentConversation,
        currentPusherUser: this.messagingManager.currentPusherUser,
        messages: [],
      });

      this.messagingManager.setCurrentConversation(currentConversation, this.onReceiveMessage);
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  onSend = async (messages: Array<IMessage> = []) => {
    try {
      const { conversation } = this.state;
      await this.messagingManager.onSendMessage(messages, conversation);
    } catch (error) {
      console.log(error);
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

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, incomingMessage),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { messages, currentPusherUser } = this.state;

    let giftedChat = <View />;

    // TODO override avatar with ProfilePictureThumbnail component once it's fixed
    if (currentPusherUser) {
      giftedChat = (
        <GiftedChat
          renderBubble={this.renderBubble}
          // renderAvatarOnTop
          // alignTop={false}
          messages={messages}
          onSend={newMessages => this.onSend(newMessages)}
          user={{ _id: currentPusherUser.id }}
          extraData={this.state}
        />
      );
    }

    return <Container style={styles.container}>{giftedChat}</Container>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ConversationScreen;
