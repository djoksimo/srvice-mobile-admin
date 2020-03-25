// @flow
import { HttpUtils } from "utils";
import type { Agent } from "types/AgentType";
import type { AuthHeader } from "types/AuthHeaderType";
import { EnvironmentConfig } from "../configs";

class AgentService {
  updateAgent(payload: Agent, authData: AuthHeader) {
    return HttpUtils.patch(EnvironmentConfig.ENDPOINT_AGENT, payload, authData);
  }
}

export default AgentService;
