// @flow
import type { Agent } from "./AgentType";
import type { User } from "./UserType";

export type UserRating = {
  _id?: string,
  agent: Agent | string,
  user: User | string,
  rating: number,
  comment: string,
  date: Date,
};
