// @flow
import { HttpUtils } from "utils";
import type { AuthHeader } from "types/AuthHeaderType";
import type { AvailabilitySlot } from "types/AvailabilitySlot";
import { EnvironmentConfig } from "../configs";

type SchedulePayload = {
  agentId: string,
  availability: AvailabilitySlot[],
};

class ScheduleService {
  createSchedule(payload: SchedulePayload, authData: AuthHeader) {
    return HttpUtils.postProtected(EnvironmentConfig.ENDPOINT_SCHEDULE, payload, authData);
  }

  updateSchedule(payload: Object, authData: AuthHeader) {
    return HttpUtils.patch(EnvironmentConfig.ENDPOINT_SCHEDULE, payload, authData);
  }
}

export default ScheduleService;
