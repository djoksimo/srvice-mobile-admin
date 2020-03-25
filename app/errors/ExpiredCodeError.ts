import {AuthStatus} from '../enums';

class ExpiredCodeError extends Error {
  constructor(...params: string | any) {
    super(...params);
    this.name = AuthStatus.COGNITO.EXPIRED_CODE_ERROR;
  }
}

export default ExpiredCodeError;
