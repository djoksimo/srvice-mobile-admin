import {Availability} from 'types/schedule/Availability';
import {Agent} from 'types/Agent';
import {Booking} from 'types/schedule/Booking';

export interface Schedule {
  _id?: string;
  availability: Availability[];
  bookings: Booking[];
  agent: Agent;
}

export type ScheduleWithoutBookings = Omit<Schedule, 'availability'>;
