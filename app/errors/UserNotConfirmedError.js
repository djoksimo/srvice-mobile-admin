import { AuthStatus } from "../enums";

class UserNotConfirmedError extends Error {
  constructor(...params) {
    super(...params);
    this.name = AuthStatus.COGNITO.USER_NOT_CONFIRMED_ERROR;
  }
}

export default UserNotConfirmedError;
