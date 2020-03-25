export interface AvailabilityRequestPayload {
  scheduleId: string;
  offeringDurationInMin: number;
  startDateString: string; // in UTC
  endDateString: string; // in UTC
}
