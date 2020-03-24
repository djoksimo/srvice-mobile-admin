// @flow
import type { Offering } from "./OfferingType";
import type { User } from "./UserType";
import type { Agent } from "./AgentType";

export type Schedule = {
  _id?: string,
  availability: Array<{
    weekday: string,
    start: number,
    end: number,
  }>,
  bookings: Array<{
    start: Date,
    end: Date,
    offering: string | Offering, // id or populated with offering
    user: string | User, // id or populated with User
  }>,
  agent: string | Agent, // id or populated with Agent
};
