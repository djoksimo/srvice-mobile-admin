import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'values';

interface Props {
  starCount: number;
  size?: number;
}

class Stars extends PureComponent<Props> {
  static defaultProps = {
    size: 12,
  };

  render() {
    const {starCount, size = 12} = this.props;
    const stars: React.ReactNodeArray = [];

    for (let i = 0; i < 5; i++) {
      if (i >= starCount) {
        stars.push(
          <Icon
            name="star-outline"
            key={i}
            size={size}
            color={Colors.secondary}
          />,
        );
      } else {
        stars.push(
          <Icon name="star" key={i} size={size} color={Colors.secondary} />,
        );
      }
    }

    return <View style={styles.starsContainer}>{stars}</View>;
  }
}

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
});
export default Stars;
