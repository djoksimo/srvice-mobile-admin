// @flow
import { HttpUtils } from "utils";
import type { AuthHeader } from "types/AuthHeaderType";
import type { Offering } from "types/OfferingType";
import { EnvironmentConfig } from "../configs";

type DeleteOfferingPayload = {
  offeringId: string,
  serviceId: string,
};

class OfferingService {
  postOffering(payload: Offering, authHeader: AuthHeader) {
    return HttpUtils.postProtected(EnvironmentConfig.ENDPOINT_OFFERING, payload, authHeader);
  }

  updateOffering(payload: Offering, authData: AuthHeader) {
    return HttpUtils.patch(EnvironmentConfig.ENDPOINT_OFFERING, payload, authData);
  }

  deleteOffering(payload: DeleteOfferingPayload, authData: AuthHeader) {
    return HttpUtils.delete(EnvironmentConfig.ENDPOINT_OFFERING, payload, authData);
  }
}

export default OfferingService;
