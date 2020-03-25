import {BehaviorSubject} from 'rxjs';

import {Schedule} from 'types/ScheduleType';
import {CacheService, ScheduleService} from '../services';

class ScheduleManager {
  cacheService: CacheService;
  scheduleService: ScheduleService;
  schedule$: BehaviorSubject<any>;

  constructor(scheduleService: ScheduleService, cacheService: CacheService) {
    this.scheduleService = scheduleService;
    this.cacheService = cacheService;
    this.schedule$ = new BehaviorSubject(undefined);
  }

  async initSchedule() {
    try {
      const authHeaders = await this.cacheService.getAuthHeader();
      return this.scheduleService.createSchedule(
        {
          agentId: authHeaders?.agentId ?? '',
          availability: [],
        },
        authHeaders,
      );
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  static createScheduleCopy(currentSchedule: Schedule): Schedule & Object {
    return Object.assign({}, currentSchedule);
  }

  async updateSchedule(
    currentSchedule: Schedule,
    field: string,
    newData: any,
  ): Promise<any> {
    try {
      const scheduleCopy = ScheduleManager.createScheduleCopy(currentSchedule);
      scheduleCopy[field] = newData;
      return this.scheduleService.updateSchedule(
        scheduleCopy,
        await this.cacheService.getAuthHeader(),
      );
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default ScheduleManager;
