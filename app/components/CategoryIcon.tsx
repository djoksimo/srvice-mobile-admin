import React, {PureComponent} from 'react';
import {Image} from 'react-native';
type Props = {
  iconUrl: string;
  scale?: number;
};

class CategoryIcon extends PureComponent<Props> {
  static defaultProps = {
    scale: 1,
  };

  render() {
    const {iconUrl, scale} = this.props;
    return (
      <Image
        style={{
          width: scale === undefined ? 36 : 36 * scale,
          height: scale === undefined ? 36 : 36 * scale,
        }}
        source={{
          uri: iconUrl,
        }}
        resizeMode="contain"
      />
    );
  }
}

export default CategoryIcon;
