// @flow
import { distanceInWordsStrict, format, isToday, distanceInWords } from "date-fns";

class DateUtils {
  static getDifferenceInWords(startTime: Date, endTime: Date): string {
    return distanceInWordsStrict(startTime, endTime);
  }

  static getFormattedDate(date: Date): string {
    return format(date, "MMMM Do YYYY");
  }

  static formatHourAMPM(date: Date): string {
    return format(date, "h aa");
  }

  // dd days, hh hours, mm minutes
  static getFormattedTimeEstimate(numDays: number, numHours: number, numMinutes: number): string {
    return `${numDays}d ${numHours}h ${numMinutes}m`;
  }

  static getFormattedMinutesAndHours(numHours: number, numMinutes: number): string {
    let timeString = "";
    if (numHours > 0) {
      timeString += `${numHours} hours, `;
    }

    timeString += `${numMinutes} minutes`;
    return timeString;
  }

  static getHourMinutesFromHour(hour: number): string {
    const roundedHour = Math.floor(hour);
    const minutes = Math.floor((hour - roundedHour) * 60);
    let placeHolderZero = "";
    if (minutes < 10) {
      placeHolderZero = "0";
    }
    return `${roundedHour} : ${placeHolderZero}${minutes}`;
  }

  static getDateWithWeekday(date: Date): string {
    let dateStr = "";
    if (isToday(date)) {
      dateStr = `Today, ${format(date, "dddd, MMM Do")}`;
    } else {
      dateStr = format(date, "dddd, MMM Do");
    }
    return dateStr;
  }

  static getDates(numDays: number): Array<string> {
    const today = new Date().toISOString().split("T")[0];
    const futureDates = DateUtils._getFutureDates(numDays);
    return [today].concat(futureDates);
  }

  static _getFutureDates(days: number): Array<string> {
    const array = [];
    for (let index = 1; index <= days; index++) {
      const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
      const dateString = date.toISOString().split("T")[0];
      array.push(dateString);
    }
    return array;
  }

  static minutesToHoursAndMinutes(minutes: number): string {
    if (minutes < 60) {
      return `${minutes.toString()} minutes`;
    }
    const offsetMinutes = minutes % 60;
    const numHours = Math.floor(minutes / 60);
    return `${numHours.toString()} hours \u2022 ${offsetMinutes.toString()} minutes`;
  }

  static latestMessageTimestampFromString(dateStr: string): string {
    const date = new Date(dateStr);
    return distanceInWords(new Date(), date, { addSuffix: true });
  }
}

export default DateUtils;
