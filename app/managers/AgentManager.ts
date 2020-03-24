// @flow
import { BehaviorSubject } from "rxjs";

import { AgentService, CacheService } from "../services";

class AgentManager {
  agent$: BehaviorSubject;
  agentService: AgentService;
  cacheService: CacheService;

  constructor(agentService: AgentService, cacheService: CacheService) {
    this.agentService = agentService;
    this.cacheService = cacheService;
    this.agent$ = new BehaviorSubject(undefined);
  }

  get agent() {
    return this.agent$.value;
  }

  createAgentCopy() {
    return Object.assign({}, this.agent);
  }

  async updateAgent(field: string, newData: any) {
    try {
      const agentCopy = this.createAgentCopy();
      agentCopy[field] = newData;

      const payload = {
        _id: this.agent._id,
        [field]: newData,
      };

      await this.agentService.updateAgent(payload, await this.cacheService.getAuthHeader());
      this.agent$.next(agentCopy);
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default AgentManager;
