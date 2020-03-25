import {PusherInlinePayload} from './PusherInlinePayload';

export interface PusherMessagePart {
  partType: string;
  payload: PusherInlinePayload;
}
