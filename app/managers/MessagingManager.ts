/* eslint-disable no-param-reassign */
// @flow
import { BehaviorSubject } from "rxjs";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client/dist/react-native/chatkit";
import type { IMessage } from "react-native-gifted-chat";

import type { PusherUser } from "types/MessagingTypes/PusherUserType";
import type { PusherRoom } from "types/MessagingTypes/PusherRoomType";
import type { PusherMessagePart } from "types/MessagingTypes/PusherMessagePartType";
import type { Agent } from "types/AgentType";
import { EnvironmentConfig } from "../configs";
import { CacheService, MessagingService } from "../services";

// See https://pusher.com/docs/chatkit/reference/javascript for help

const PUSHER_USER_DOES_NOT_EXIST = "services/chatkit/not_found/user_not_found";

class MessagingManager {
  cacheService: CacheService;
  messagingService: MessagingService;

  currentPusherUser: PusherUser | any;
  incomingMessage$: BehaviorSubject;
  rooms$: BehaviorSubject;
  chatManager: ChatManager;
  currentRoom: PusherRoom | any;

  constructor(messagingService: MessagingService, cacheService: CacheService) {
    this.cacheService = cacheService;
    this.messagingService = messagingService;

    this.currentPusherUser = undefined;
    this.incomingMessage$ = new BehaviorSubject(undefined);
    this.rooms$ = new BehaviorSubject([]);
    this.currentRoom = undefined;
  }

  setCurrentConversation(currentConversation: PusherRoom, onReceiveMessage: Function) {
    this.currentRoom = currentConversation;
    this.joinConversation(currentConversation.id, onReceiveMessage);
  }

  get incomingMessage() {
    return this.incomingMessage$.value;
  }

  get rooms() {
    return this.rooms$.value;
  }

  _handleChatConnectionError(error: Error | any, srviceAgent: Agent) {
    if (error.info && error.info.error === PUSHER_USER_DOES_NOT_EXIST) {
      try {
        return this.createNewPusherUser({
          firstName: srviceAgent.firstName,
          lastName: srviceAgent.lastName,
          userId: srviceAgent._id,
          profilePictureUrl: srviceAgent.profilePictureUrl,
        });
      } catch (createPusherUserError) {
        throw new Error(createPusherUserError.toString());
      }
    } else {
      throw new Error(error.toString());
    }
  }

  async initChatManager(srviceAgent: Agent) {
    const tokenProvider = new TokenProvider({
      url: EnvironmentConfig.ENDPOINT_CHAT_AUTH,
      headers: await this.cacheService.getAuthHeader(),
    });

    this.chatManager = new ChatManager({
      instanceLocator: EnvironmentConfig.PUSHER_CHATKIT_INSTANCE_LOCATOR,
      userId: srviceAgent._id,
      tokenProvider,
      logger: {
        // need custom logger definition to avoid app crash on non-pusher user connection
        // eslint-disable-next-line no-unused-vars
        verbose: (...args) => {},
        debug: console.log,
        info: console.log,
        warn: console.log,
        error: console.log,
      },
    });
  }

  async connectToChatManager(srviceAgent: Agent, onReceiveMessage: Function): Promise<any> {
    try {
      await this.initChatManager(srviceAgent);

      return this.chatManager
        .connect()
        .then(pusherUser =>
          Promise.all(
            pusherUser.rooms.map(room =>
              pusherUser.subscribeToRoomMultipart({
                roomId: room.id,
                hooks: { onMessage: onReceiveMessage },
              }),
            ),
            // eslint-disable-next-line no-unused-vars
          ).then(async (rooms: Array<PusherRoom>) => {
            this.currentPusherUser = pusherUser;
            await Promise.all(
              rooms.map(async (room: PusherRoom & any) => {
                // room.latestMessageText = await this.getLatestMessageFromRoom(room);
                room.recipient = room.users.find(
                  (user: PusherUser & any) => user.id !== this.currentPusherUser.id,
                );
                return room;
              }),
            );
            this.rooms$.next(rooms);
          }),
        )
        .catch(error => this._handleChatConnectionError(error, srviceAgent));
    } catch (error) {
      return this._handleChatConnectionError(error, srviceAgent);
    }
  }

  async createNewPusherUser({ firstName, lastName, userId, profilePictureUrl }: any) {
    try {
      return this.messagingService.createNewPusherUser(
        {
          firstName,
          lastName,
          userId,
          profilePictureUrl,
        },
        await this.cacheService.getAuthHeader(),
      );
    } catch (error) {
      throw new Error("Unable to create new pusher user");
    }
  }

  async joinConversation(roomId: number, onReceiveMessage: Function): any {
    // const { roomSubscriptions } = this.currentPusherUser;
    //
    // const roomSubscriptionIds = Object.keys(roomSubscriptions);
    //
    // await Promise.all(roomSubscriptionIds.map(async roomId => {
    //   console.log(roomId);
    //   return roomSubscriptions[roomId].cancel();
    // }));
    //
    // console.log(roomSubscriptions);

    return this.currentPusherUser.subscribeToRoomMultipart({
      roomId,
      hooks: { onMessage: onReceiveMessage },
    });
  }

  onSendMessage = async (messages: Array<IMessage> = [], room: PusherRoom) => {
    // eslint-disable-next-line consistent-return
    messages.forEach(async message => {
      try {
        await this.currentPusherUser.sendMessage({
          text: message.text,
          roomId: room.id,
        });
        await this.refreshCustomRoomData();
      } catch (err) {
        console.log(err);
      }
    });
  };

  // eslint-disable-next-line consistent-return
  // async getLatestMessageFromRoom(room: PusherRoom): (string | Promise<any>) {
  //   try {
  //     const roomMessages: Array<PusherMessage> = await this.currentPusherUser.fetchMultipartMessages({
  //       roomId: room.id,
  //       direction: "older",
  //       limit: 20,
  //     });
  //     return roomMessages[0].parts[0].payload.content;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  getTextFromMessage(messageParts: Array<PusherMessagePart>) {
    // See https://pusher.com/docs/chatkit/reference/javascript for more info on message type
    const textPart: PusherMessagePart | any = messageParts.find(
      (part: PusherMessagePart) => part.payload.type === "text/plain",
    );
    return textPart.payload.content;
  }

  async refreshCustomRoomData() {
    const { rooms } = this.currentPusherUser;
    try {
      await Promise.all(
        rooms.map(async (room: PusherRoom & any) => {
          // room.latestMessageText = await this.getLatestMessageFromRoom(room);
          if (room.isSubscribedTo(room)) {
            room.recipient = room.users.find(
              (user: PusherUser & any) => user.id !== this.currentPusherUser.id,
            );
          }
          return room;
        }),
      );
      this.rooms$.next(rooms);
    } catch (error) {
      console.log(error);
    }
  }
}

export default MessagingManager;
