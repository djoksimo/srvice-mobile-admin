// @flow
import type { PusherUser } from "./PusherUserType";
import type { User } from "../UserType";

export type PusherRoom = {
  id: number,
  isPrivate: boolean,
  name: string,
  users: Array<PusherUser>,
  unreadCount: number,
  lastMessageAt: string,
  customData: Object,
  recipient: User,
};
