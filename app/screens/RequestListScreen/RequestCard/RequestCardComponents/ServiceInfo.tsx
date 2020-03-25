import React from 'react';
import {View} from 'react-native';
import styles from '../styles';
import {Text} from 'components';
import {FormatUtils} from 'utils';
import {Max} from 'values';
type Props = {
  serviceTitle: string;
  requestDescription: string;
};

const ServiceInfo = ({serviceTitle, requestDescription}: Props) => (
  <View>
    <View style={styles.serviceTitleContainer}>
      <Text scale={Text.Scale.H6}>
        {FormatUtils.truncateText(serviceTitle, Max.serviceTitle.truncated)}
      </Text>
    </View>
    <View style={styles.requestDescriptionContainer}>
      <Text>
        {FormatUtils.truncateText(
          requestDescription,
          Max.requestDescription.truncated,
        )}
      </Text>
    </View>
  </View>
);

export default ServiceInfo;
