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
    paddingTop: 16,
  },
  screenTitleContainer: {
    marginTop: -160,
    bottom: 16,
    paddingBottom: 16,
    alignSelf: "center",
    paddingTop: 16,
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 16,
    marginBottom: 16,
    marginTop: 16,
    shadowRadius: 8,
  },
  durationInputContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
  },
  picker: {
    flex: 1,
    alignContent: "space-between",
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
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dollarSignContainer: {
    paddingRight: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    marginBottom: 24,
  },
  declineRespondContainer: {},
  timeEstimateContainer: {},
  timeEstimateModalContainer: {
    alignSelf: "center",
  },
  addTimeEstimateButtonContainer: {
    paddingBottom: 24,
    paddingTop: 24,
  },
  cardContainer: {
    // paddingBottom: 48,
  },
});

export default styles;
