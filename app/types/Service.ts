import {Category} from './Category';
import {ServiceRating} from './ServiceRating';
import {Agent} from './Agent';
import {Offering} from './Offering';

export interface Service {
  _id?: string;
  agent: Agent;
  category: Category;
  title: string;
  description: string;
  pictureUrls: string[];
  phone: string;
  email: string;
  inCall: boolean;
  outCall: boolean;
  remoteCall: boolean;
  address: string;
  latitude: number;
  longitude: number;
  radius: number;
  averageServiceRating: number;
  serviceRatings: ServiceRating[];
  offerings: Offering[];
  createdAt: string;
  updatedAt: string;
}
