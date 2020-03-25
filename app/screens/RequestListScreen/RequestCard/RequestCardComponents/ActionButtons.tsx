import React from 'react';
import {Image, View} from 'react-native';
import {Touchable} from 'components';
import styles from '../styles';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PlusIcon = require('../../../../../assets/plusIcon.png');

type Props = {
  onPressRespondButtonPressed: () => void;
};

const ActionButtons = ({onPressRespondButtonPressed}: Props) => (
  <View>
    <View style={styles.actionButtonContainer}>
      <Touchable onPress={onPressRespondButtonPressed}>
        <View style={styles.actionButton}>
          <Image
            style={styles.actionIcon}
            source={PlusIcon}
            resizeMode="contain"
          />
        </View>
      </Touchable>
    </View>
  </View>
);

export default ActionButtons;
