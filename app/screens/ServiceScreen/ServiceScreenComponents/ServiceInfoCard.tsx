import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Card, CategoryIcon, Stars, Text} from 'components';
import TravelSettings from 'components/TravelSettings';
import {Category} from 'types/Category';
import ServiceImageCarousel from './ServiceImageCarousel';
import {Colors, Dimensions} from 'values';
import ServiceTimestamps from 'components/ServiceTimestamps';
type Props = {
  title: string;
  averageServiceRating: number;
  category: Category;
  inCall: boolean;
  outCall: boolean;
  remoteCall: boolean;
  pictureUrls: Array<string>;
  createdAt: string | Date;
  updatedAt: string | Date;
};

const ServiceInfoCard = (props: Props) => {
  const {
    title,
    averageServiceRating,
    category,
    inCall,
    outCall,
    remoteCall,
    pictureUrls,
    createdAt,
    updatedAt,
  } = props;

  const renderServiceImage = ({item: pictureUrl}: any) => (
    <View style={styles.serviceImageContainer}>
      <Image
        style={styles.serviceImage}
        source={{
          uri: pictureUrl,
        }}
        resizeMode="cover"
      />
    </View>
  ); // TODO: unhardcode view count once that feature is ready in the API

  return (
    <Card style={styles.serviceInfoCardContainer}>
      <ServiceImageCarousel
        pictureUrls={pictureUrls}
        renderServiceImage={renderServiceImage}
        width={Dimensions.screenWidth - 64}
      />
      <View style={styles.serviceTitleContainer}>
        <Text scale={Text.Scale.H5}>{title}</Text>
      </View>
      <View style={styles.categoryNameContainer}>
        <Text scale={Text.Scale.SUBTITLE}>{category.name}</Text>
      </View>
      <Stars starCount={averageServiceRating} />
      <View style={styles.bottomInfoContainer}>
        <View style={styles.bottomLeftInfoContainer}>
          <View style={styles.serviceStatsContainer}>
            <Text>100 Views</Text>
            <ServiceTimestamps
              createdAt={new Date(createdAt)}
              updatedAt={new Date(updatedAt)}
            />
          </View>
          <View style={styles.travelSettingsContainer}>
            <TravelSettings
              inCall={inCall}
              outCall={outCall}
              remote={remoteCall}
            />
          </View>
        </View>
        <View style={styles.bottomRightInfoContainer}>
          <View style={styles.categoryContainer}>
            <CategoryIcon iconUrl={category.iconUrl} scale={1.5} />
          </View>
        </View>
      </View>
    </Card>
  );
};

const {screenWidth} = Dimensions;
const styles = StyleSheet.create({
  serviceImageContainer: {
    width: screenWidth - 64,
    height: 200,
    elevation: 4,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.bland,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  serviceImage: {
    width: screenWidth - 64,
    height: 200,
    borderRadius: 16,
  },
  serviceInfoCardContainer: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 64,
    width: screenWidth - 64,
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.bland,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 8,
    shadowOpacity: 0.4,
  },
  serviceTitleContainer: {
    flexWrap: 'wrap',
  },
  categoryNameContainer: {},
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceStatsContainer: {},
  travelSettingsContainer: {
    marginLeft: -8,
    marginTop: 8,
  },
  bottomInfoContainer: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomLeftInfoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  bottomRightInfoContainer: {},
});
export default ServiceInfoCard;
