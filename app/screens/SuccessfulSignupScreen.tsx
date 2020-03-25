import React, {Component} from 'react'; // eslint-disable-next-line react-native/split-platform-components

import {View, StyleSheet, BackHandler, ToastAndroid} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {CategoryBackground, Text} from 'components';
import Container from 'components/Container';
import Button from 'components/Button';
import {Colors, Dimensions} from 'values';
import {Category} from 'types/CategoryType';
import Bottle from '../bottle';
type State = {
  isContinuePressed: boolean;
  shuffle: boolean;
  categories: Array<Category>;
};
type Props = {
  navigation: NavigationScreenProp<any, any>;
};

class SuccessfulSignupScreen extends Component<Props, State> {
  authenticationManager: any;
  contentManager: any;
  allCategoriesSubscription: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      categories: [],
      shuffle: true,
      isContinuePressed: false,
    };
    this.authenticationManager = Bottle.AuthenticationManager;
    this.contentManager = Bottle.ContentManager;
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    if (this.contentManager.allCategories.length === 0) {
      await this.contentManager.getAllCategories();
    }

    this.allCategoriesSubscription = this.contentManager.allCategories$.subscribe(
      (categories) => {
        this.setState({
          categories,
        });
      },
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.allCategoriesSubscription.unsubscribe();
  }

  onContinuePressed = () => {
    const {navigation} = this.props;
    this.setState({
      isContinuePressed: true,
    });
    navigation.navigate({
      routeName: 'PostServiceScreen',
      params: {
        previousScreen: 'SuccessfulSignupScreen',
      },
    });
    this.setState({
      isContinuePressed: false,
    });
  };
  handleBackButton = () => {
    ToastAndroid.show('Cannot go back', ToastAndroid.SHORT);
    return true;
  };

  render() {
    const {shuffle, categories, isContinuePressed} = this.state;
    return (
      <Container style={styles.container}>
        <CategoryBackground shuffle={shuffle} categories={categories} />
        <View style={styles.congratulationContainer}>
          <Text style={styles.congratulationText} scale={Text.Scale.H3}>
            Congratulations!
          </Text>
          <Text style={styles.instructionsText} scale={Text.Scale.H2}>
            You are now officially a Srvice Agent! Press
            <Text style={styles.instructionsTextBold} scale={Text.Scale.H2}>
              {' CONTINUE '}
            </Text>
            to post your first listing and to polish your Agent profile.
          </Text>
        </View>
        <View style={styles.continueBtnContainer}>
          <Button
            title="Continue"
            onPress={this.onContinuePressed}
            isDisabled={isContinuePressed}
          />
        </View>
      </Container>
    );
  }
}

const {screenWidth} = Dimensions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'column',
  },
  congratulationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 8,
    alignSelf: 'center',
  },
  continueBtnContainer: {
    marginTop: 32,
  },
  congratulationText: {
    color: Colors.primary,
  },
  instructionsText: {
    flexDirection: 'row',
    color: Colors.primary,
    marginTop: 12,
    width: screenWidth - 120,
    textAlign: 'center',
  },
  instructionsTextBold: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
export default SuccessfulSignupScreen;
