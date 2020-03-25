// @flow

const NotificationKind = {
  Default: "Default",
  Message: "Message",
  MoneyTransaction: "MoneyTransaction",
  Request: "Request",
  GoodReview: "GoodReview",
  BadReview: "BadReview",
};

const NotificationIcon = {
  Default: "alert-box",
  Message: "message-alert-outline",
  MoneyTransaction: "cash",
  Request: "application-import",
  GoodReview: "thumb-up-outline",
  BadReview: "thumb-down-outline",
};

export type NotificationType = $Keys<typeof NotificationKind>;

export { NotificationIcon, NotificationKind };
