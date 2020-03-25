import {PusherRoom} from './PusherRoom';
import {PusherUser} from './PusherUser';
import {PusherMessagePart} from './PusherMessagePart';

export interface PusherMessage {
  id: number;
  sender: PusherUser;
  rooms: Array<PusherRoom>;
  parts: Array<PusherMessagePart>;
  createdAt: string;
  updatedAt: string;
  senderId: string;
}
