import {AuthStatus} from '../enums';

class CodeMismatchError extends Error {
  constructor(...params: string | any) {
    super(...params);
    this.name = AuthStatus.COGNITO.CODE_MISMATCH_ERROR;
  }
}

export default CodeMismatchError;
