import {
  ExpiredCodeError,
  UserNotConfirmedError,
  NotAuthorizedError,
  InvalidParameterError,
  CodeMismatchError,
  UserNotFoundError,
} from "../errors";
import { AuthStatus } from "../enums";

// TODO: replace this stuff with AWS Amplify -Danilo
// TODO: implement flow typing -Danilo

class AuthenticationManager {
  constructor(agentManager, authenticationService, cacheService) {
    this.agentManager = agentManager;
    this.authenticationService = authenticationService;
    this.cacheService = cacheService;
  }

  // TODO: this will need to change once we set up agent verification
  async signup(firstName, lastName, email, password) {
    const payload = {
      email,
      firstName,
      lastName,
      password,
      dateJoined: new Date().toISOString(),
      profilePictureUrl: "",
      services: [],
      location: "",
      languages: [],
      company: "",
      education: [],
      certifications: [],
      phone: "123456789", // phone required at the moment based on Mongo schema
      governmentIdUrl: "",
      secondaryIdUrl: "",
      selfieUrl: "",
      givenRatings: [],
      bookings: [],
    };
    const response = await this.authenticationService.signup(payload);
    if (response.code) {
      switch (response.code) {
        case "InvalidParameterException":
          throw new InvalidParameterError();
        default:
          throw new Error(response.message);
      }
    }
    return response;
  }

  async verifyCode(email, code) {
    const payload = { email, code };
    const response = await this.authenticationService.verifyCode(payload);
    if (response.code) {
      switch (response.code) {
        case "ExpiredCodeException":
          throw new ExpiredCodeError();
        case "CodeMismatchException":
          throw new CodeMismatchError();
        default:
          throw new Error(response.message);
      }
    }
    await this.rememberAndSetAgent(response.agent, response.token);
  }

  async resendCode(email) {
    const payload = { email };
    const response = await this.authenticationService.resendCode(payload);
    if (response.code) {
      throw new Error(response.message);
    }
  }

  async login(email, password) {
    const payload = { email, password };
    const response = await this.authenticationService.login(payload);
    if (response.code) {
      switch (response.code) {
        case "UserNotConfirmedException":
          throw new UserNotConfirmedError();
        case "NotAuthorizedException":
          throw new NotAuthorizedError();
        case "UserNotFoundException":
          throw new UserNotFoundError();
        default:
          throw new Error(response.message);
      }
    }
    await this.rememberAndSetAgent(response.agent, response.token);
  }

  async rememberAndSetAgent(agent, token) {
    await this.cacheService.set("email", agent.email);
    await this.cacheService.set("agentId", agent._id);
    await this.cacheService.set("token", token);
    this.agentManager.agent$.next(agent);
  }

  async logout() {
    await this.cacheService.remove("token");
    this.agentManager.agent$.next(undefined);
  }

  async verifyTokenIfExists() {
    const token = await this.cacheService.get("token");
    if (!token) {
      return AuthStatus.NOT_LOGGED_IN;
    }
    const payload = { token };
    const response = await this.authenticationService.verifyToken(payload);
    if (response.message) {
      await this.cacheService.remove("token");
      return AuthStatus.NOT_LOGGED_IN;
    }

    this.agentManager.agent$.next(response);
    return AuthStatus.LOGGED_IN;
  }
}

export default AuthenticationManager;
