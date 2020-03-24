// @flow
import type { Service } from "types/ServiceType";
import { ServiceService, CacheService } from "../services";

class ServiceManager {
  serviceService: ServiceService;
  cacheService: CacheService;

  constructor(serviceService: ServiceService, cacheService: CacheService) {
    this.serviceService = serviceService;
    this.cacheService = cacheService;
  }

  async postService(service: Service): Promise<any> | Service {
    try {
      const response = await this.serviceService.postService(
        service,
        await this.cacheService.getAuthHeader(),
      );
      if (!response) {
        return new Error("Something went wrong");
      }
      return response;
    } catch (error) {
      return new Error(error.toString());
    }
  }

  async deleteService(serviceId: string): Promise<any> {
    try {
      const response = await this.serviceService.deleteService(
        serviceId,
        await this.cacheService.getAuthHeader(),
      );
      if (!response) {
        return new Error("Something went wrong");
      }
      return response;
    } catch (error) {
      return new Error(error.toString());
    }
  }

  async updateService(field: string, newData: any, serviceId: string) {
    try {
      const payload = {
        _id: serviceId,
      };
      payload[field] = newData;
      const updateServiceResult = await this.serviceService.patchService(
        payload,
        await this.cacheService.getAuthHeader(),
      );
      if (updateServiceResult.error) {
        throw new Error(updateServiceResult.error);
      }
      return updateServiceResult;
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default ServiceManager;
