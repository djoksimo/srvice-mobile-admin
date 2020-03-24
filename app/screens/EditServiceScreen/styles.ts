import { StyleSheet } from "react-native";

import { Colors, Dimensions } from "values";

const { screenWidth, screenHeight } = Dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  sectionList: {
    paddingBottom: 160,
  },
  line: {
    flex: 1,
    borderBottomColor: Colors.bland,
    borderBottomWidth: 1,
  },
  screenTitleContainer: {
    marginTop: -160,
    bottom: 16,
    paddingBottom: 16,
    alignSelf: "center",
    paddingTop: 16,
  },
  listCard: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    width: screenWidth,
    marginTop: -8,
    padding: 16,
    height: screenHeight,
  },
});

export default styles;
