// @flow
import {Agent} from './Agent';
import {Service} from './Service';

export interface Booking {
  _id?: string;
  request: string;
  agent: Agent | string;
  service: Service | string;
  priceEstimate: number;
  agentAccepted: boolean;
  userAccepted: boolean;
}
