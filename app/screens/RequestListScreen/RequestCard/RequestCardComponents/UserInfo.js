// @flow
import React from "react";
import { View } from "react-native";

import styles from "../styles";
import { ProfilePictureThumbnail, Stars, Text } from "components";
import { Colors } from "values";

type Props = {
  userFirstName: string,
  userLastName: string,
  userProfilePictureUrl: string,
};

const UserInfo = ({ userFirstName, userLastName, userProfilePictureUrl }: Props) => (
  <View style={styles.userInfoContainer}>
    <ProfilePictureThumbnail profilePictureUrl={userProfilePictureUrl} />
    <View>
      <Text scale={Text.Scale.H5} color={Colors.black} style={styles.userName}>
        {`${userFirstName} ${userLastName}`}
      </Text>
      <View style={styles.stars}>
        <Stars starCount={4} />
      </View>
    </View>
  </View>
);

export default UserInfo;
