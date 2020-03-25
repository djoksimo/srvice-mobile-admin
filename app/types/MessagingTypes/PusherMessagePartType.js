// @flow
import type { PusherInlinePayload } from "./PusherInlinePayloadType";

export type PusherMessagePart = {
  partType: string,
  payload: PusherInlinePayload,
};
