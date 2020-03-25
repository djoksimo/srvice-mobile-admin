// @flow
import { BehaviorSubject } from "rxjs";
import { CacheService, FileService, ServiceService } from "../services";

class ContentManager {
  serviceService: ServiceService;
  cacheService: CacheService;
  fileService: FileService;

  allCategories$: BehaviorSubject;
  publicPictureUrls$: BehaviorSubject;

  constructor(
    serviceService: ServiceService,
    fileService: FileService,
    cacheService: CacheService,
  ) {
    this.serviceService = serviceService;
    this.fileService = fileService;
    this.cacheService = cacheService;

    this.allCategories$ = new BehaviorSubject([]);
    this.publicPictureUrls$ = new BehaviorSubject([]);
  }

  get publicPictureUrls() {
    return this.publicPictureUrls$.value;
  }

  get allCategories() {
    return this.allCategories$.value;
  }

  async getAllCategories() {
    const response = await this.serviceService.getAllCategories();
    this.allCategories$.next(response);
  }

  async uploadPictures(pictures: Array<any>) {
    try {
      const response = await this.fileService.uploadPictures(
        pictures,
        await this.cacheService.getAuthHeader(),
      );
      this.publicPictureUrls$.next(response.publicPictureUrls);
    } catch (error) {
      console.log(error);
      throw new Error(error.toString());
    }
  }
}

export default ContentManager;
