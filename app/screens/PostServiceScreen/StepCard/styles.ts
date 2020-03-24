import { StyleSheet } from "react-native";

import { Colors } from "values";

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 32,
    backgroundColor: Colors.white,
    shadowColor: Colors.bland,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.15,
  },
  stepTitle: {
    paddingLeft: 16,
    paddingTop: 16,
  },
  dotsContainer: {
    alignSelf: "center",
    marginTop: 8,
  },
  dots: {
    flexDirection: "row",
  },
  completedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    marginRight: 4,
  },
  uncompletedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.bland,
    marginRight: 4,
  },
  textInput: {
    height: 50,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    textAlignVertical: "top",
  },
  descriptionInput: {
    height: undefined,
    maxHeight: 300,
  },
  addressInput: {
    height: 70,
  },
  imageUploadBtn: {
    width: 272,
    height: 80,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "#ededed",
    justifyContent: "center",
    alignItems: "center",
  },
  imageUploadBtnText: {
    color: Colors.primaryDark,
  },
  imageUploadContainer: {
    borderRadius: 8,
    width: 272,
    marginTop: 16,
    backgroundColor: "#ededed",
    alignSelf: "center",
    justifyContent: "center",
  },
  travelSettingContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    elevation: 4,
    borderRadius: 4,
    marginTop: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: Colors.white,
    shadowColor: Colors.bland,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.15,
  },
  travelSetting: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  travelSettingSwitch: {
    alignSelf: "flex-end",
  },
  radiusContainer: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    marginTop: 16,
  },
  radiusInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  radiusInput: {
    padding: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  contactHeading: {
    paddingLeft: 16,
    paddingTop: 16,
  },
  continueBtnContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  continueButtonContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  textLimitContainer: {
    paddingLeft: 16,
    paddingTop: 16,
  },
  radiusUnit: {},
});

export default styles;
