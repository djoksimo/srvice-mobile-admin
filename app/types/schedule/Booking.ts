import {Service} from 'types/Service';
import {Agent} from 'types/Agent';

export interface Booking {
  _id?: string;
  request: string;
  agent: Agent;
  service: Service;
  priceEstimate: number;
  agentAccepted: boolean;
  userAccepted: boolean;
}
