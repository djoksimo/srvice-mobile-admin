import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Carousel} from 'components';

type Props = {
  width: number;
  renderServiceImage: Function;
  pictureUrls: Array<string>;
};

const ServiceImageCarousel = ({
  width,
  renderServiceImage,
  pictureUrls,
}: Props) => (
  <View style={styles.serviceImageCarouselContainer}>
    <Carousel
      loop
      renderItem={renderServiceImage}
      list={pictureUrls}
      width={width}
    />
  </View>
);

const styles = StyleSheet.create({
  serviceImageCarouselContainer: {
    alignSelf: 'center',
    flex: 1,
  },
});
export default ServiceImageCarousel;
