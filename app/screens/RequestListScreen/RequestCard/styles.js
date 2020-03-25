import { StyleSheet } from "react-native";

import { Colors } from "values";

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 48,
  },
  userInfoContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  badgeContainer: {
    marginLeft: 16,
    alignSelf: "flex-start",
  },
  userName: {
    marginLeft: 16,
  },
  stars: {
    marginLeft: 16,
  },
  serviceTitleContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  requestDescriptionContainer: {
    padding: 16,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  actionButtonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginBottom: -16,
    marginRight: 16,
  },
  actionButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.secondaryDark,
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 8,
    shadowColor: Colors.bland,
    shadowOpacity: 0.4,
    borderRadius: 20,
    marginLeft: 12,
    justifyContent: "center",
  },
  actionIcon: {
    alignSelf: "center",
  },
});

export default styles;
