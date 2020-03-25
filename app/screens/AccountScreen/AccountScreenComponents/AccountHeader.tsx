import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GradientHeader, ProfilePictureThumbnail, Text} from 'components';
import {Colors} from 'values';
import StatBox from './StatBox';
import {StatsType} from '../types';
type Props = {
  profilePictureUrl: string;
  stats: StatsType[];
  firstName: string;
  lastName: string;
  onProfilePicturePressed: Function;
};

const AccountHeader = (props: Props) => {
  const {
    profilePictureUrl,
    stats,
    firstName,
    lastName,
    onProfilePicturePressed,
  } = props;
  return (
    <GradientHeader>
      <View style={styles.header}>
        <View style={styles.profilePictureContainer}>
          <ProfilePictureThumbnail
            scale={1.8}
            profilePictureUrl={profilePictureUrl}
            onPress={onProfilePicturePressed}
          />
        </View>
        <View style={styles.headerInfoContainer}>
          <View style={styles.nameContainer}>
            <Text scale={Text.Scale.H5} color={Colors.white}>
              {`${firstName} ${lastName}`}
            </Text>
          </View>
          <View style={styles.headerStatsContainer}>
            {stats.map((stat, index) => (
              <StatBox
                key={index}
                first={index === 0}
                count={stat.count}
                title={stat.title}
              />
            ))}
          </View>
        </View>
      </View>
    </GradientHeader>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -152,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 0,
  },
  profilePictureContainer: {},
  nameContainer: {},
  headerInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerStatsContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.bland,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
    padding: 8,
    shadowRadius: 64,
    shadowOpacity: 0.7,
  },
});
export default AccountHeader;
