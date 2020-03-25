import {StyleSheet} from 'react-native';
import {Colors} from 'values';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: Colors.screenBackground,
  },
  calendar: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  section: {
    backgroundColor: Colors.screenBackground,
  },
  item: {
    padding: 24,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bland,
    flexDirection: 'row',
  },
  itemHourText: {},
  itemDurationText: {
    color: 'grey',
    marginTop: 4,
  },
  itemTextContainer: {
    // flexWrap: "wrap",
    padding: 16,
    flex: 4,
  },
  itemTitleText: {
    marginLeft: 16,
    flexWrap: 'wrap',
  },
  timeContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.blandLight,
  },
  emptyItemText: {
    color: Colors.secondaryDark,
  },
});
export default styles;
