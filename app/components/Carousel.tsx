import React, {PureComponent} from 'react';
import SnapCarousel, {CarouselProperties} from 'react-native-snap-carousel';
import {View} from 'react-native';
import {Dimensions} from 'values';

interface Props extends CarouselProperties<any> {
  renderItem: (item: any) => JSX.Element;
  list: any[];
  width?: number;
  ref: any;
}

class Carousel extends PureComponent<Props & any> {
  carousel: any;
  static defaultProps = {
    width: Dimensions.screenWidth - 96,
  };

  render() {
    const {list, renderItem, width, ...rest} = this.props;
    const {screenWidth} = Dimensions;
    return (
      <View>
        <SnapCarousel
          removeClippedSubviews={false}
          ref={(c: any) => {
            this.carousel = c;
          }}
          data={list}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={width}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.8}
          {...rest}
        />
      </View>
    );
  }
}

export default Carousel;
