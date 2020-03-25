import {Service} from './Service';
import {User} from './User';

export interface ServiceRating {
  _id: string;
  user: User;
  service: Service;
  overallRating: number;
  priceRating: number;
  punctualityRating: number;
  friendlinessRating: number;
  comment: string;
  date: Date;
}
