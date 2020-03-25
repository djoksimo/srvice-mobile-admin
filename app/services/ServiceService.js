// @flow
import { HttpUtils } from "utils";
import type { Service } from "types/ServiceType";
import type { AuthHeader } from "types/AuthHeaderType";
import { EnvironmentConfig } from "../configs";

class ServiceService {
  postService(payload: Service, authHeader: AuthHeader) {
    return HttpUtils.postProtected(EnvironmentConfig.ENDPOINT_SERVICE, payload, authHeader);
  }

  getAllCategories() {
    return HttpUtils.get(EnvironmentConfig.ENDPOINT_CATEGORY, "", {});
  }

  deleteService(serviceId: string, authHeader: AuthHeader) {
    return HttpUtils.delete(
      `${EnvironmentConfig.ENDPOINT_SERVICE}/${serviceId}`,
      undefined,
      authHeader,
    );
  }

  patchService(payload: $Shape<Service>, authHeader: AuthHeader) {
    return HttpUtils.patch(EnvironmentConfig.ENDPOINT_SERVICE, payload, authHeader);
  }
}

export default ServiceService;
