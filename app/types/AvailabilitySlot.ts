// @flow

export type AvailabilitySlot = {
  weekDay: string,
  startTime: number, // start hour and minutes in 24 hour time standard
  endTime: number, // end hour and minutes in 24 hour time standard
  isSelected: boolean,
};
