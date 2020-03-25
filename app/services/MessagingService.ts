// @flow
import {HttpUtils} from 'utils';
import {AuthHeader} from 'types/AuthHeader';
import {EnvironmentConfig} from '../configs';

interface NewPusherUserPayload {
  userId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
}

class MessagingService {
  createNewPusherUser(payload: NewPusherUserPayload, authData: AuthHeader) {
    return HttpUtils.postProtected(
      EnvironmentConfig.ENDPOINT_CHAT_NEW_USER,
      payload,
      authData,
    );
  }
}

export default MessagingService;
