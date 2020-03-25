import {HttpUtils} from 'utils';
import {AuthHeader} from 'types/AuthHeader';
import {BookingResponse} from 'types/BookingResponse';
import {EnvironmentConfig} from '../configs';

class BookingService {
  postRequestResponse(payload: BookingResponse, authHeader: AuthHeader) {
    return HttpUtils.postProtected(
      EnvironmentConfig.ENDPOINT_BOOKING_AGENT_ACCEPT,
      payload,
      authHeader,
    );
  }
}

export default BookingService;
