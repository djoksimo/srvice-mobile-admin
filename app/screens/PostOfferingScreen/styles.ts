// @flow
import { StyleSheet } from "react-native";

import { Dimensions, Fonts } from "values";

const { screenWidth } = Dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  offeringCard: {
    flex: 1,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    width: screenWidth,
    marginTop: -8,
  },
  screenTitleContainer: {
    marginTop: -160,
    bottom: 16,
    paddingBottom: 16,
    alignSelf: "center",
    paddingTop: 16,
  },
  textInput: {
    flex: 1,
    height: 45,
    padding: 16,
    marginBottom: 16,
    marginTop: 16,
    shadowRadius: 8,
  },
  picker: {
    flex: 1,
    alignContent: "space-between",
  },
  descriptionInput: {
    flex: 1,
    paddingTop: 16,
    textAlignVertical: "top",
    height: 100,
  },
  pickerTextStyle: {
    fontFamily: Fonts.regularLato,
    fontSize: 16,
    letterSpacing: 0.4,
  },
  stepContainer: {
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 16,
    marginTop: 16,
  },
  priceInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dollarSignContainer: {
    paddingRight: 16,
  },
  confirmationButtonContainer: {
    paddingBottom: 64,
  },
});

export default styles;
