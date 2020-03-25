// @flow
// import { BehaviorSubject } from "rxjs";
// import type { Location } from "../StepCardTypes/LocationType";
import type { BookingResponse } from "types/BookingResponseType";
import { CacheService, BookingService } from "../services";

class BookingManager {
  bookingService: BookingService;
  cacheService: CacheService;

  constructor(bookingService: BookingService, cacheService: CacheService) {
    this.bookingService = bookingService;
    this.cacheService = cacheService;
  }

  async respondToRequest(bookingRespone: BookingResponse): Promise<any> | string {
    try {
      const res = await this.bookingService.postRequestResponse(
        bookingRespone,
        await this.cacheService.getAuthHeader(),
      );
      if (!res) {
        return new Error("Failed to respond to service request");
      }
      return res;
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default BookingManager;
