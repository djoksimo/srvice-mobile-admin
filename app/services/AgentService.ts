import {HttpUtils} from 'utils';
import {Agent} from 'types/Agent';
import {AuthHeader} from 'types/AuthHeader';
import {EnvironmentConfig} from '../configs';

class AgentService {
  updateAgent(payload: Agent, authData: AuthHeader) {
    return HttpUtils.patch(EnvironmentConfig.ENDPOINT_AGENT, payload, authData);
  }
}

export default AgentService;
