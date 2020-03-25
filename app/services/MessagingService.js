// @flow
import { HttpUtils } from "utils";
import type { AuthHeader } from "types/AuthHeaderType";
import { EnvironmentConfig } from "../configs";

type NewPusherUserPayload = {
  userId: string,
  firstName: string,
  lastName: string,
  profilePictureUrl: string,
};

class MessagingService {
  createNewPusherUser(payload: NewPusherUserPayload, authData: AuthHeader) {
    return HttpUtils.postProtected(EnvironmentConfig.ENDPOINT_CHAT_NEW_USER, payload, authData);
  }
}

export default MessagingService;
