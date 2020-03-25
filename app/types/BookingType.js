// @flow
import type { Agent } from "./AgentType";
import type { Service } from "./ServiceType";

export type Booking = {
  _id?: string,
  request: string,
  agent: Agent | string,
  service: Service | string,
  priceEstimate: number,
  agentAccepted: boolean,
  userAccepted: boolean,
};
