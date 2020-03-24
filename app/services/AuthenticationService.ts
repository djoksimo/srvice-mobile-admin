import { HttpUtils } from "utils";
import { EnvironmentConfig } from "../configs";

// TODO: replace this stuff with AWS Amplify -Danilo
class AuthenticationService {
  signup(payload) {
    return HttpUtils.post(EnvironmentConfig.ENDPOINT_AUTH_SIGNUP, payload);
  }

  verifyCode(payload) {
    return HttpUtils.post(EnvironmentConfig.ENDPOINT_AUTH_VERIFY_CODE, payload);
  }

  resendCode(payload) {
    return HttpUtils.post(EnvironmentConfig.ENDPOINT_AUTH_RESEND_CODE, payload);
  }

  login(payload) {
    return HttpUtils.post(EnvironmentConfig.ENDPOINT_AUTH_LOGIN, payload);
  }

  verifyToken(payload) {
    return HttpUtils.post(EnvironmentConfig.ENDPOINT_VERIFY_TOKEN, payload);
  }
}

export default AuthenticationService;
