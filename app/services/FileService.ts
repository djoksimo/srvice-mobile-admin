import {HttpUtils} from 'utils';
import {AuthHeader} from 'types/AuthHeader';
import {EnvironmentConfig} from '../configs';

class FileService {
  uploadPictures(pictures: Array<any>, authHeader: AuthHeader) {
    // eslint-disable-next-line no-undef
    const formData: any = new FormData();
    pictures.forEach((picture) => {
      const pictureData = {
        uri: picture.path,
        type: picture.mime,
        // eslint-disable-next-line no-useless-escape
        name: picture.path.replace(/^.*[\\\/]/, ''),
      };
      formData.append('pictures', pictureData);
    });
    return HttpUtils.postProtected(
      EnvironmentConfig.ENDPOINT_PICTURES_UPLOAD,
      formData,
      authHeader,
    );
  }
}

export default FileService;
