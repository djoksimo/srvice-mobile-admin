import {Agent} from './Agent';
import {User} from './User';

export interface UserRating {
  _id?: string;
  agent: Agent | string;
  user: User | string;
  rating: number;
  comment: string;
  date: Date;
}
