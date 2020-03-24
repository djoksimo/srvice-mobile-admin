// @flow
import { HttpUtils } from "utils";
import type { AuthHeader } from "types/AuthHeaderType";
import type { BookingResponse } from "types/BookingResponseType";
import { EnvironmentConfig } from "../configs";

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
