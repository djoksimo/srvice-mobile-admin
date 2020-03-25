import React, {Component} from 'react';

import {View, StyleSheet, BackHandler, ToastAndroid} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import CodeInput from 'react-native-confirmation-code-field';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CategoryBackground, Text, Loading} from 'components';
import Container from 'components/Container';
import Button from 'components/Button';
import {Colors} from 'values';
import {Category} from 'types/Category';
import {AlertUtils} from 'utils';
import Bottle from '../bottle';
import {AuthStatus} from '../enums';
type State = {
  verificationCode: string;
  shuffle: boolean;
  categories: Array<Category>;
  isLoading: boolean;
  isVerifyPressed: boolean;
};
type Props = {
  navigation: NavigationScreenProp<
    any,
    {
      email: string;
    }
  >;
};

class VerificationCodeScreen extends Component<Props, State> {
  authenticationManager: any;
  contentManager: any;
  allCategoriesSubscription: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      verificationCode: '',
      shuffle: false,
      categories: [],
      isLoading: false,
      isVerifyPressed: false,
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
      (categories: Category[]) => {
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

  onVerificationCodeInputChanged = (verificationCode: string) => {
    this.setState({
      verificationCode,
    });
  };
  onVerifyCodePressed = async () => {
    const {navigation} = this.props;
    const {verificationCode} = this.state;
    const email = navigation.getParam('email');

    try {
      this.setState({
        isLoading: true,
        isVerifyPressed: true,
      });

      if (!verificationCode) {
        AlertUtils.showSnackBar('That code does not look right');
        return;
      }

      await this.authenticationManager.verifyCode(email, verificationCode);
      this.setState({
        isLoading: false,
        isVerifyPressed: false,
      });
      this.toggleShuffle();
      navigation.navigate({
        routeName: 'SuccessfulSignupScreen',
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        isVerifyPressed: false,
      });

      if (error.name === AuthStatus.COGNITO.EXPIRED_CODE_ERROR) {
        AlertUtils.showSnackBar(
          `Verification code expired, new code sent to ${email}`,
        );
        await this.authenticationManager.resendCode(email);
      } else if (error.name === AuthStatus.COGNITO.CODE_MISMATCH_ERROR) {
        AlertUtils.showSnackBar('Incorrect code provided');
      } else {
        console.log('something wnent wrong');
        AlertUtils.showSnackBar('Something went wrong');
      }
    }
  };
  toggleShuffle = () => {
    this.setState((prevState: State) => ({
      shuffle: !prevState.shuffle,
    }));
  };
  handleBackButton = () => {
    ToastAndroid.show('Cannot go back', ToastAndroid.SHORT);
    return true;
  };

  render() {
    const {shuffle, categories, isLoading, isVerifyPressed} = this.state;
    const {navigation} = this.props;
    const email = navigation.getParam('email');
    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid>
          <CategoryBackground shuffle={shuffle} categories={categories} />
          <Loading isLoading={isLoading} />
          <View style={styles.promptTextContainer}>
            <Text scale={Text.Scale.H4}>We sent you a code</Text>
            <Text style={styles.promptText} scale={Text.Scale.BODY}>
              {`Enter it below to verify ${email}`}
            </Text>
          </View>
          <View style={styles.verificationContainer}>
            <CodeInput
              codeLength={6}
              variant="border-b"
              activeColor={Colors.primary}
              inactiveColor={Colors.secondary}
              onFulfill={this.onVerificationCodeInputChanged}
            />
          </View>
          <View style={styles.verifyBtnContainer}>
            <Button
              title="Verify"
              onPress={() => {
                this.onVerifyCodePressed();
              }}
              isDisabled={isVerifyPressed}
            />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    flexDirection: 'column',
  },
  verificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    shadowColor: Colors.black,
    elevation: 4,
    marginTop: 80,
    marginBottom: 8,
    alignSelf: 'center',
  },
  promptTextContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  promptText: {
    marginTop: 32,
  },
  verifyBtnContainer: {
    marginTop: 32,
  },
});
export default VerificationCodeScreen;
