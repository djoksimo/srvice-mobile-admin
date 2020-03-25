import {AuthStatus} from '../enums';

class InvalidParameterError extends Error {
  constructor(...params: string | any) {
    super(...params);
    this.name = AuthStatus.COGNITO.INVALID_PARAMETER_ERROR;
  }
}

export default InvalidParameterError;
