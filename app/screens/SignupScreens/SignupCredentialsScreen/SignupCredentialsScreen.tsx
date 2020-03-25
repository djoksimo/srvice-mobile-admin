import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationScreenProp} from 'react-navigation'; // $FlowFixMe

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CategoryBackground, Loading} from 'components';
import Container from 'components/Container';
import {Colors, Dimensions} from 'values';
import {FormatUtils, AlertUtils} from 'utils';
import {Category} from 'types/CategoryType';
import {AuthenticationManager} from '../../../managers';
import {CredentialsForm} from './SignupCredentialsScreenComponents';
import Bottle from '../../../bottle';
import AuthStatus from '../../../enums/AuthStatus';
type Props = {
  navigation: NavigationScreenProp<
    any,
    {
      firstName: string;
      lastName: string;
    }
  >;
};
type State = {
  email: string;
  password: string;
  confirmPassword: string;
  categories: Array<Category>;
  shuffle: boolean;
  isLoading: boolean;
  isSignupPressed: boolean;
};

class SignupCredentialsScreen extends Component<Props, State> {
  authenticationManager: AuthenticationManager;
  contentManager: any;
  allCategoriesSubscription: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      categories: [],
      shuffle: false,
      isLoading: false,
      isSignupPressed: false,
    };
    this.authenticationManager = Bottle.AuthenticationManager;
    this.contentManager = Bottle.ContentManager;
  }

  componentDidMount() {
    if (this.contentManager.allCategories.length === 0) {
      this.contentManager.getAllCategories();
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
    this.allCategoriesSubscription.unsubscribe();
  }

  onEmailInputChanged = (email) => {
    this.setState({
      email,
    });
  };
  onPasswordInputChanged = (password) => {
    this.setState({
      password,
    });
  };
  onConfirmPasswordInputChanged = (confirmPassword) => {
    this.setState({
      confirmPassword,
    });
  };
  toggleShuffle = () => {
    this.setState((prevState) => ({
      shuffle: !prevState.shuffle,
    }));
  };
  getInputValidity = () => {
    const {email, password, confirmPassword} = this.state;

    if (!FormatUtils.isValidEmailFormat(email)) {
      return {
        isValid: false,
        reason: "That email doesn't look right",
      };
    }

    if (password.length < 8) {
      return {
        isValid: false,
        reason: 'That password is too easy to guess',
      };
    }

    if (confirmPassword.length < 1) {
      return {
        isValid: false,
        reason: 'Please enter all fields',
      };
    }

    if (!(confirmPassword === password)) {
      return {
        isValid: false,
        reason: 'Enter the same password',
      };
    }

    return {
      isValid: true,
    };
  };
  onCredentialsEntered = async () => {
    const {navigation} = this.props;
    const {email, password} = this.state;
    const firstName = navigation.getParam('firstName');
    const lastName = navigation.getParam('lastName');

    try {
      const {isValid, reason} = this.getInputValidity();

      if (!isValid) {
        AlertUtils.showSnackBar(reason);
        return;
      }

      this.setState({
        isLoading: true,
        isSignupPressed: true,
      });
      await this.authenticationManager.signup(
        firstName,
        lastName,
        email,
        password,
      );
      this.toggleShuffle();
      navigation.navigate({
        routeName: 'VerificationCodeScreen',
        params: {
          email,
        },
      });
    } catch (error) {
      console.log(error);

      if (error.name === AuthStatus.COGNITO.INVALID_PARAMETER_ERROR) {
        AlertUtils.showSnackBar('Invalid credentials provided');
      } else if (error) {
        console.log('ERROR: ', error);
        AlertUtils.showSnackBar('Something went wrong');
      }

      return;
    } finally {
      this.setState({
        isLoading: false,
        isSignupPressed: false,
      });
    }
  };

  render() {
    const {
      categories,
      shuffle,
      isLoading,
      email,
      password,
      confirmPassword,
    } = this.state;
    return (
      <KeyboardAwareScrollView enableOnAndroid>
        <Container style={styles.container}>
          <View style={styles.categoryBackgroundContainer}>
            <CategoryBackground shuffle={shuffle} categories={categories} />
          </View>
          <Loading isLoading={isLoading} />
          <View style={styles.signupContainer}>
            <CredentialsForm
              onCredentialsEntered={this.onCredentialsEntered}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              onEmailInputChanged={this.onEmailInputChanged}
              onConfirmPasswordInputChanged={this.onConfirmPasswordInputChanged}
              onPasswordInputChanged={this.onPasswordInputChanged}
            />
          </View>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}

const {screenHeight} = Dimensions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    flexDirection: 'column',
    alignContent: 'stretch',
    paddingBottom: 64,
  },
  categoryBackgroundContainer: {
    height: screenHeight / 4,
  },
  signupContainer: {
    marginTop: 32,
    paddingTop: 80,
  },
});
export default SignupCredentialsScreen;
