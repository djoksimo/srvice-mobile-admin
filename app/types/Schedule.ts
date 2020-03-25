import {Availability} from 'types/schedule/Availability';
import {Agent} from 'types/Agent';
import {ScheduleBooking} from 'types/schedule/ScheduleBooking';

export interface Schedule {
  _id?: string;
  availability: Availability[];
  bookings: ScheduleBooking[];
  agent: Agent;
}

export type ScheduleWithoutBookings = Omit<Schedule, 'availability'>;
