import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'values';
import {BadgeStatus} from 'types/BadgeStatus';
import {Text} from '.';

interface Props {
  status?: string;
  badgeText: string;
  badgeColor?: string;
}

class Badge extends PureComponent<Props> {
  static defaultProps = {
    badgeColor: Colors.bland,
    status: '',
  };
  static Status: BadgeStatus = {
    GOOD: 'good',
    WARN: 'warn',
    BAD: 'bad',
  };

  render() {
    const {status, badgeText, badgeColor} = this.props;
    let bgColor = '';

    if (badgeColor) {
      bgColor = badgeColor;
    } else {
      switch (status) {
        case Badge.Status.GOOD:
          bgColor = Colors.success;
          break;

        case Badge.Status.WARN:
          bgColor = Colors.secondary;
          break;

        case Badge.Status.BAD:
          bgColor = Colors.error;
          break;

        default:
          bgColor = Colors.bland;
      }
    }

    return (
      <View
        style={[
          styles.badge,
          {
            backgroundColor: bgColor,
          },
        ]}>
        <Text color={Colors.white}>{badgeText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default Badge;
