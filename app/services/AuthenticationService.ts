import {HttpUtils} from 'utils';
import {EnvironmentConfig} from '../configs';

class AuthenticationService {
  signup(payload: any) {
    return HttpUtils.post(EnvironmentConfig.ENDPOINT_AUTH_SIGNUP, payload);
  }

  verifyCode(payload: any) {
    return HttpUtils.post(EnvironmentConfig.ENDPOINT_AUTH_VERIFY_CODE, payload);
  }

  resendCode(payload: any) {
    return HttpUtils.post(EnvironmentConfig.ENDPOINT_AUTH_RESEND_CODE, payload);
  }

  login(payload: any) {
    return HttpUtils.post(EnvironmentConfig.ENDPOINT_AUTH_LOGIN, payload);
  }

  verifyToken(payload: any) {
    return HttpUtils.post(EnvironmentConfig.ENDPOINT_VERIFY_TOKEN, payload);
  }
}

export default AuthenticationService;
