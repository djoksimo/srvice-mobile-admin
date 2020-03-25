import {PusherRoom} from './PusherRoom';

export interface PusherUser {
  id: string;
  rooms: Array<PusherRoom>; // The rooms that the connected user is a member of
  users: Array<PusherUser>; // The union of all the members of all the rooms that the current user is subscribed to.
  roomSubscriptions: Record<string, any>; // The rooms a user is joined and subscribed to
  subscribeToRoomMultipart: Function;
  fetchMultipartMessages: Function;
}
