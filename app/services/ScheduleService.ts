import {HttpUtils} from 'utils';
import {AuthHeader} from 'types/AuthHeader';
import {AvailabilitySlot} from 'types/AvailabilitySlot';
import {EnvironmentConfig} from '../configs';

interface SchedulePayload {
  agentId: string;
  availability: AvailabilitySlot[];
}

class ScheduleService {
  createSchedule(payload: SchedulePayload, authData: AuthHeader) {
    return HttpUtils.postProtected(
      EnvironmentConfig.ENDPOINT_SCHEDULE,
      payload,
      authData,
    );
  }

  updateSchedule(payload: Record<string, any>, authData: AuthHeader) {
    return HttpUtils.patch(
      EnvironmentConfig.ENDPOINT_SCHEDULE,
      payload,
      authData,
    );
  }
}

export default ScheduleService;
