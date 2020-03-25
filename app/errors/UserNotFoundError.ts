import {AuthStatus} from '../enums';

class UserNotFoundError extends Error {
  constructor(...params: string | any) {
    super(...params);
    this.name = AuthStatus.COGNITO.USER_NOT_FOUND_ERROR;
  }
}

export default UserNotFoundError;
