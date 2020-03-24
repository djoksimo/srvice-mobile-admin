// @flow
import React from "react";
import { View, StyleSheet } from "react-native";

import { ProfilePictureThumbnail, Stars, Text } from "components";
import { FormatUtils, DateUtils } from "utils";
import { Colors, Dimensions, Max } from "values";

type Props = {
  profilePictureUrl: string,
  firstName: string,
  lastName: string,
  overallRating: number,
  comment: string,
  date: string | Date,
};

const ServiceRating = (props: Props) => {
  const { profilePictureUrl, firstName, lastName, overallRating, comment, date } = props;

  return (
    <View style={styles.serviceRatingContainer}>
      <View style={styles.userInfoContainer}>
        <ProfilePictureThumbnail profilePictureUrl={profilePictureUrl} />
        <View style={styles.userNameContainer}>
          <Text scale={Text.Scale.H5}>{`${firstName} ${lastName}`}</Text>
          <View>
            <Stars starCount={overallRating} />
          </View>
        </View>
      </View>
      <View style={styles.ratingCommentContainer}>
        <Text scale={Text.Scale.BODY}>{`"${FormatUtils.truncateText(
          comment,
          Max.reviewComment.truncated,
        )}"`}</Text>
      </View>
      <View style={styles.timestampContainer}>
        <Text scale={Text.Scale.CAPTION}>{DateUtils.getFormattedDate(new Date(date))}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  serviceRatingContainer: {
    width: Dimensions.screenWidth - 64,
    padding: 16,
    marginBottom: 8,
    elevation: 4,
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
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userNameContainer: {
    paddingLeft: 16,
  },
  ratingCommentContainer: {
    marginTop: 16,
  },
  timestampContainer: {
    marginTop: 16,
  },
});

export default ServiceRating;
