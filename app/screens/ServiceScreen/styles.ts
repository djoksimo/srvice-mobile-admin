import {StyleSheet} from 'react-native';
import {Colors} from 'values';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  serviceInfoContainer: {
    marginTop: -156,
  },
  starsContainer: {},
  descriptionContainer: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  serviceRatingCarouselContainer: {},
  ratingHeadingContainer: {
    paddingLeft: 32,
  },
  nullMessageContainer: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  locationCard: {
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  locationButtonContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  offeringsContainer: {
    paddingBottom: 32,
  },
  offeringsHeadingContainer: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  addOfferingsBtnContainer: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  viewOfferingCaptionContainer: {
    paddingBottom: 16,
  },
  offeringsPromptContainer: {},
});
export default styles;
