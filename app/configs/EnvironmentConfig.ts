import {Platform} from 'react-native';
import {Environment} from 'values/Environments';
import {
  AUTH_SIGNUP,
  AUTH_VERIFY_CODE,
  AUTH_RESEND_CODE,
  AUTH_LOGIN,
  AUTH_VERIFY_TOKEN,
  AGENT_ENDPOINT,
  SERVICE_ENDPOINT,
  CATEGORY_ENDPOINT,
  PICTURES_UPLOAD_ENDPOINT,
  CHAT_AUTH_ENDPOINT,
  BOOKING_AGENT_ACCEPT_ENDPOINT,
  SCHEDULE_ENDPOINT,
  OFFERING_ENDPOINT,
  CHAT_NEW_USER_ENDPOINT,
} from 'values/Endpoints';
import {
  CHATKIT_INSTANCE_LOCATOR,
  CHATKIT_TOKEN_PROVIDER_ENDPOINT,
} from 'values/Pusher';

const makeUrl = (domain: string, endpoint: string) => `${domain}${endpoint}`;

const currentEnv: Environment | string = Environment.Production;
let domain = '';

interface EnvironmentConfig {
  [key: string]: string;
}

let EnvironmentConfig: EnvironmentConfig = {};

switch (currentEnv) {
  case Environment.Production:
    domain = 'https://api.srvice.ca';
    EnvironmentConfig = {
      ENDPOINT_AUTH_SIGNUP: makeUrl(domain, AUTH_SIGNUP),
      ENDPOINT_AUTH_VERIFY_CODE: makeUrl(domain, AUTH_VERIFY_CODE),
      ENDPOINT_AUTH_RESEND_CODE: makeUrl(domain, AUTH_RESEND_CODE),
      ENDPOINT_AUTH_LOGIN: makeUrl(domain, AUTH_LOGIN),
      ENDPOINT_VERIFY_TOKEN: makeUrl(domain, AUTH_VERIFY_TOKEN),
      ENDPOINT_AGENT: makeUrl(domain, AGENT_ENDPOINT),
      ENDPOINT_SERVICE: makeUrl(domain, SERVICE_ENDPOINT),
      ENDPOINT_PICTURES_UPLOAD: makeUrl(domain, PICTURES_UPLOAD_ENDPOINT),
      ENDPOINT_CATEGORY: makeUrl(domain, CATEGORY_ENDPOINT),
      ENDPOINT_OFFERING: makeUrl(domain, OFFERING_ENDPOINT),
      PUSHER_CHATKIT_TOKEN_PROVIDER: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
      PUSHER_CHATKIT_INSTANCE_LOCATOR: CHATKIT_INSTANCE_LOCATOR,
      ENDPOINT_CHAT_AUTH: makeUrl(domain, CHAT_AUTH_ENDPOINT),
      ENDPOINT_CHAT_NEW_USER: makeUrl(domain, CHAT_NEW_USER_ENDPOINT),
      ENDPOINT_BOOKING_AGENT_ACCEPT: makeUrl(
        domain,
        BOOKING_AGENT_ACCEPT_ENDPOINT,
      ),
      ENDPOINT_SCHEDULE: makeUrl(domain, SCHEDULE_ENDPOINT),
    };
    break;
  case Environment.Development:
    domain = `http://${Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'}:5000`;
    EnvironmentConfig = {
      ENDPOINT_AUTH_SIGNUP: makeUrl(domain, AUTH_SIGNUP),
      ENDPOINT_AUTH_VERIFY_CODE: makeUrl(domain, AUTH_VERIFY_CODE),
      ENDPOINT_AUTH_RESEND_CODE: makeUrl(domain, AUTH_RESEND_CODE),
      ENDPOINT_AUTH_LOGIN: makeUrl(domain, AUTH_LOGIN),
      ENDPOINT_VERIFY_TOKEN: makeUrl(domain, AUTH_VERIFY_TOKEN),
      ENDPOINT_AGENT: makeUrl(domain, AGENT_ENDPOINT),
      ENDPOINT_SERVICE: makeUrl(domain, SERVICE_ENDPOINT),
      ENDPOINT_PICTURES_UPLOAD: makeUrl(domain, PICTURES_UPLOAD_ENDPOINT),
      ENDPOINT_CATEGORY: makeUrl(domain, CATEGORY_ENDPOINT),
      ENDPOINT_OFFERING: makeUrl(domain, OFFERING_ENDPOINT),
      PUSHER_CHATKIT_TOKEN_PROVIDER: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
      PUSHER_CHATKIT_INSTANCE_LOCATOR: CHATKIT_INSTANCE_LOCATOR,
      ENDPOINT_CHAT_AUTH: makeUrl(domain, CHAT_AUTH_ENDPOINT),
      ENDPOINT_CHAT_NEW_USER: makeUrl(domain, CHAT_NEW_USER_ENDPOINT),
      ENDPOINT_BOOKING_AGENT_ACCEPT: makeUrl(
        domain,
        BOOKING_AGENT_ACCEPT_ENDPOINT,
      ),
      ENDPOINT_SCHEDULE: makeUrl(domain, SCHEDULE_ENDPOINT),
    };
    break;
  default:
    console.error('Invalid environment specified');
    break;
}

export default EnvironmentConfig;
