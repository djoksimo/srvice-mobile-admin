// @flow
import {PusherUser} from './PusherUser';
import {User} from '../User';

export interface PusherRoom {
  id: number;
  isPrivate: boolean;
  name: string;
  users: Array<PusherUser>;
  unreadCount: number;
  lastMessageAt: string;
  customData: Record<string, any>;
  recipient: User;
}
