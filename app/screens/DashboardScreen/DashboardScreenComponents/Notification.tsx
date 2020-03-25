import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FormatUtils, DateUtils} from 'utils';
import {Text, Touchable} from 'components';
import {Colors} from 'values'; // import type { Category } from "types/CategoryType";

import {NotificationIcon, NotificationKind} from '../../../enums';
import {NotificationType} from '../../../enums';
type Props = {
  kind: NotificationType;
  text: string;
  timestamp: Date;
};

const Notification = ({
  kind = NotificationKind.Default,
  text,
  timestamp,
}: Props) => {
  const iconName = NotificationIcon[kind];
  return (
    <Touchable>
      <View style={styles.notificationContainer}>
        <View style={styles.notificationIcon}>
          <Icon name={iconName} size={24} color={Colors.primary} />
        </View>
        <View style={styles.notificationTextContainer}>
          <Text>{FormatUtils.truncateText(text, 200)}</Text>
          <Text>{`${DateUtils.getDifferenceInWords(
            timestamp,
            new Date(),
          )} ago`}</Text>
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    marginRight: 16,
  },
  notificationTextContainer: {},
});
export default Notification;
