// @flow
import type { PusherRoom } from "./PusherRoomType";
import type { PusherUser } from "./PusherUserType";
import type { PusherMessagePart } from "./PusherMessagePartType";

export type PusherMessage = {
  id: number,
  sender: PusherUser,
  rooms: Array<PusherRoom>,
  parts: Array<PusherMessagePart>,
  createdAt: string,
  updatedAt: string,
  senderId: string,
};
