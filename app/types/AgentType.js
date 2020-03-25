// @flow
import type { Service } from "./ServiceType";
import type { UserRating } from "./UserRatingType";
import type { Booking } from "./BookingType";
import type { Schedule } from "./ScheduleType";

export type Agent = {
  _id?: string,
  email: string,
  firstName: string,
  lastName: string,
  dateJoined: Date,
  profilePictureUrl: string,
  services: Array<Service>,
  location: string,
  languages: Array<string>,
  company: string,
  education: Array<string>,
  certifications: Array<string>,
  phone: string,
  governmentIdUrl: string,
  secondaryIdUrl: string,
  skills: Array<string>,
  selfieUrl: string,
  givenRatings: Array<UserRating> | Array<string>,
  bookings: Array<Booking> | Array<string>,
  schedule?: Schedule,
};
