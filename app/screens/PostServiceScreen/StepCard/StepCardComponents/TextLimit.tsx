import React from 'react';
import {View} from 'react-native';
import {Text} from 'components';
import styles from '../styles';
type Props = {
  text: string;
  limit: number;
};

const TextLimit = ({text, limit}: Props) => (
  <View style={styles.textLimitContainer}>
    <Text>{`${text.length}/${limit}`}</Text>
  </View>
);

export default TextLimit;
