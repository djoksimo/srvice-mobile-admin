class AuthStatus {
  static NOT_LOGGED_IN = 'not-logged-in';
  static LOGGED_IN = 'logged-in';
  static COGNITO: Readonly<any> = {
    EXPIRED_CODE_ERROR: 'ExpiredCodeError',
    INVALID_PARAMETER_ERROR: 'InvalidParameterError',
    NOT_AUTHORIZED_ERROR: 'NotAuthorizedError',
    USER_NOT_CONFIRMED_ERROR: 'UserNotConfirmedError',
    CODE_MISMATCH_ERROR: 'CodeMismatchError',
    USER_NOT_FOUND_ERROR: 'UserNotFoundError',
  };
}

export default AuthStatus;
