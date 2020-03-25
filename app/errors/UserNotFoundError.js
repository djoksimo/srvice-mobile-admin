import { AuthStatus } from "../enums";

class UserNotFoundError extends Error {
  constructor(...params) {
    super(...params);
    this.name = AuthStatus.COGNITO.USER_NOT_FOUND_ERROR;
  }
}

export default UserNotFoundError;
