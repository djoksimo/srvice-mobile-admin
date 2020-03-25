// @flow
import {Service} from './Service';
import {ServiceRating} from './ServiceRating';

export interface Agent {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  dateJoined: Date;
  profilePictureUrl: string;
  services: Service;
  location: string;
  languages: Array<string>;
  company: string;
  education: Array<string>;
  certifications: Array<string>;
  phone: string;
  governmentIdUrl: string;
  secondaryIdUrl: string;
  skills: Array<string>;
  selfieUrl: string;
  givenRatings: ServiceRating[];
  schedule: string;
}
