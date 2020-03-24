// @flow
export type PusherAttachmentType = {
  type: string,
  name: string,
  size: number,
  customData: any,
  url: Function,
  urlExpiry: Function,
};
