import React, {PureComponent} from 'react';
import {View, Image} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'values';
import Touchable from './Touchable';
type Props = {
  profilePictureUrl: string | any;
  scale?: number;
  onPress?: Function;
};

class ProfilePictureThumbnail extends PureComponent<Props> {
  static defaultProps = {
    scale: 1,
    onPress: null,
  };

  render() {
    const {scale = 1, profilePictureUrl, onPress} = this.props;
    const imageWidth = 48 * scale;
    const imageHeight = 48 * scale;
    const picture =
      _.isEqual('', profilePictureUrl) || _.isUndefined(profilePictureUrl) ? (
        <Icon
          name="face"
          color={Colors.primaryDark}
          size={imageWidth}
          iconStyle={{
            alignSelf: 'center',
          }}
        />
      ) : (
        <View>
          <Image
            style={{
              borderRadius: imageWidth / 2,
              width: imageWidth,
              height: imageHeight,
            }}
            source={{
              uri: profilePictureUrl,
            }}
            resizeMode="cover"
          />
        </View>
      );
    const pictureView = !onPress ? (
      picture
    ) : (
      <Touchable onPress={onPress}>{picture}</Touchable>
    );
    return (
      <View
        style={{
          backgroundColor: Colors.blandLight,
          width: imageWidth,
          height: imageHeight,
          borderRadius: imageWidth / 2,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          shadowColor: Colors.bland,
          shadowOffset: {
            width: 0,
            height: 8,
          },
          // shadowRadius: 4,
          shadowOpacity: 0.7,
          elevation: 4,
        }}>
        {pictureView}
      </View>
    );
  }
}

export default ProfilePictureThumbnail;
