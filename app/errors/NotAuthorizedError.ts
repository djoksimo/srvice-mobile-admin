import {AuthStatus} from '../enums';

class NotAuthorizedError extends Error {
  constructor(...params: string | any) {
    super(...params);
    this.name = AuthStatus.COGNITO.NOT_AUTHORIZED_ERROR;
  }
}

export default NotAuthorizedError;
