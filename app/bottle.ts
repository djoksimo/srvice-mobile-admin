import Bottle from 'bottlejs';

import {
  AuthenticationService,
  CacheService,
  AgentService,
  ServiceService,
  BookingService,
  FileService,
  OfferingService,
  ScheduleService,
} from './services';
import {
  AuthenticationManager,
  AgentManager,
  ServiceManager,
  ContentManager,
  BookingManager,
  OfferingManager,
  ScheduleManager,
} from './managers';

const bottle = new Bottle();

bottle.service('AuthenticationService', AuthenticationService);
bottle.service('CacheService', CacheService);
bottle.service('AgentService', AgentService);
bottle.service('ServiceService', ServiceService);
bottle.service('BookingService', BookingService);
bottle.service('FileService', FileService);
bottle.service('OfferingService', OfferingService);
bottle.service('ScheduleService', ScheduleService);
bottle.service(
  'AuthenticationManager',
  AuthenticationManager,
  'AgentManager',
  'AuthenticationService',
  'CacheService',
);
bottle.service('AgentManager', AgentManager, 'AgentService', 'CacheService');
bottle.service(
  'ContentManager',
  ContentManager,
  'ServiceService',
  'FileService',
  'CacheService',
);
bottle.service(
  'ServiceManager',
  ServiceManager,
  'ServiceService',
  'CacheService',
);
bottle.service(
  'BookingManager',
  BookingManager,
  'BookingService',
  'CacheService',
);
bottle.service(
  'OfferingManager',
  OfferingManager,
  'OfferingService',
  'CacheService',
);
bottle.service(
  'ScheduleManager',
  ScheduleManager,
  'ScheduleService',
  'CacheService',
);

export default bottle.container;
