import {StyleSheet} from 'react-native';
import {Colors, Dimensions} from 'values';
const {screenWidth} = Dimensions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    flexDirection: 'column',
  },
  publicInfoContainer: {
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: -16,
  },
  publicInfoCard: {
    padding: 16,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalCard: {
    padding: 16,
    width: screenWidth,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowOffset: {
      height: -8,
    },
  },
  pillsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  skillsContainer: {
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
  },
  pillContainer: {
    margin: 8,
  },
  saveBtnContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  servicesContainer: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  servicesHeadingContainer: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  serviceCarouselContainer: {},
  nullServiceContainer: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  nullServiceMessage: {
    paddingBottom: 16,
  },
  dismissButton: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  companyInput: {
    marginBottom: 16,
  },
  srollViewContainer: {
    paddingBottom: 32,
  },
});
export default styles;
