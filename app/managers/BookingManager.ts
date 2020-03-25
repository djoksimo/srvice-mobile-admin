import {BookingResponse} from 'types/BookingResponse';
import {CacheService, BookingService} from '../services';

class BookingManager {
  bookingService: BookingService;
  cacheService: CacheService;

  constructor(bookingService: BookingService, cacheService: CacheService) {
    this.bookingService = bookingService;
    this.cacheService = cacheService;
  }

  async respondToRequest(bookingRespone: BookingResponse): Promise<any> {
    try {
      const res = await this.bookingService.postRequestResponse(
        bookingRespone,
        await this.cacheService.getAuthHeader(),
      );

      if (!res) {
        return new Error('Failed to respond to service request');
      }

      return res;
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default BookingManager;
