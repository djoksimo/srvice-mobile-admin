// @flow

import type { Service } from "./ServiceType";
import type { User } from "./UserType";

export type ServiceRating = {
  _id: string,
  user: User,
  service: Service,
  overallRating: number,
  priceRating: number,
  punctualityRating: number,
  friendlinessRating: number,
  comment: string,
  date: Date,
};
