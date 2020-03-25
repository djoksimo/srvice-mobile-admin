// @flow

import type { Category } from "./CategoryType";
import type { ServiceRating } from "./ServiceRatingType";
import type { Agent } from "./AgentType";
import type { Offering } from "./OfferingType";

export type Service = {
  _id?: string,
  agent: Agent,
  category: Category,
  title: string,
  description: string,
  pictureUrls: Array<string>,
  phone: string,
  email: string,
  inCall: boolean,
  outCall: boolean,
  remoteCall: boolean,
  address: string,
  latitude: number,
  longitude: number,
  radius: number,
  averageServiceRating: number,
  serviceRatings: Array<ServiceRating>,
  offerings: Offering[],
  createdAt: Date | string,
  updatedAt: Date | string,
};
