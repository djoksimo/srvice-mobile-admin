import {BehaviorSubject} from 'rxjs';
import {Offering} from 'types/OfferingType';
import {CacheService, OfferingService} from '../services';

class OfferingManager {
  offeringService: OfferingService;
  cacheService: CacheService;
  publicPictureUrls$: BehaviorSubject;

  constructor(offeringService: OfferingService, cacheService: CacheService) {
    this.offeringService = offeringService;
    this.cacheService = cacheService;
    this.publicPictureUrls$ = new BehaviorSubject([]);
  }

  async createOffering(offering: Offering): Promise<any> {
    try {
      return this.offeringService.postOffering(
        offering,
        await this.cacheService.getAuthHeader(),
      );
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  async deleteOffering(
    offeringId: string,
    serviceId: string,
  ): Promise<any> | any {
    try {
      const payload = {
        offeringId,
        serviceId,
      };
      const result = this.offeringService.deleteOffering(
        payload,
        await this.cacheService.getAuthHeader(),
      );

      if (!result) {
        throw new Error('Failed to delete offering');
      }

      return result;
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default OfferingManager;
