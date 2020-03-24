// @flow
import React, { PureComponent } from "react";
import SnapCarousel from "react-native-snap-carousel";
import { View } from "react-native";

import { Dimensions } from "values";

type Props = {
  renderItem: Function,
  list: Array<any>,
  width?: number,
};

class Carousel extends PureComponent<Props> {
  carousel: any;

  static defaultProps = {
    width: Dimensions.screenWidth - 96,
  };

  render() {
    const { list, renderItem, width } = this.props;
    const { screenWidth } = Dimensions;
    return (
      <View>
        <SnapCarousel
          {...this.props}
          removeClippedSubviews={false}
          ref={c => {
            this.carousel = c;
          }}
          data={list}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={width}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.8}
        />
      </View>
    );
  }
}

export default Carousel;
