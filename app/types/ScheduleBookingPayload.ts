export interface ScheduleBookingPayload {
  scheduleId: string;
  booking: {
    start: string;
    end: string;
    offering: string;
  };
}
