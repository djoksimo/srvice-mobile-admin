// TODO: Implement login with AWS Amplify
import React, {useEffect, useState} from 'react';
import {Subscription} from 'rxjs'; // eslint-disable-next-line react-native/split-platform-components

import {View, Image, StyleSheet, BackHandler, ToastAndroid} from 'react-native';
import {NavigationScreenProp} from 'react-navigation'; // $FlowFixMe

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CategoryBackground, Loading, TextInput} from 'components';
import Container from 'components/Container';
import Button from 'components/Button';
import OrDivider from 'components/OrDivider';
import {Colors, Dimensions} from 'values';
import {Category} from 'types/CategoryType';
import Bottle from '../bottle';
import SrviceLogoBlue from '../assets/srvice_blue_400px.png';
import {AuthStatus} from '../enums';
import {AlertUtils} from '../utils';
type Props = {
  navigation: NavigationScreenProp;
};

function LoginScreen(props: Props) {
  const authenticationManager = Bottle.AuthenticationManager;
  const contentManager = Bottle.ContentManager;
  let allCategoriesSubscription: Subscription | null = null;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [passwordInputRef, setPasswordInputRef] = useState<TextInput | null>(
    null,
  );
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    if (contentManager.allCategories.length === 0) {
      contentManager.getAllCategories();
    }

    allCategoriesSubscription = contentManager.allCategories$.subscribe(
      (newCategories) => {
        setCategories(newCategories);
      },
    );
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);

      if (allCategoriesSubscription) {
        allCategoriesSubscription.unsubscribe();
      }
    };
  }, []);

  const toggleShuffle = () => {
    setShuffle((prevShuffle) => ({
      shuffle: !prevShuffle,
    }));
  };

  const onEmailInputChanged = (newEmail) => {
    setEmail(newEmail);
  };

  const onPasswordChanged = (newPassword) => {
    setPassword(newPassword);
  };

  const onLoginPressed = async () => {
    const {navigation} = props;

    try {
      setIsLoading(true);
      setIsLoginPressed(true);
      await authenticationManager.login(email, password);
      toggleShuffle();
      navigation.popToTop();
      navigation.pop();
    } catch (error) {
      switch (error.name) {
        case AuthStatus.COGNITO.USER_NOT_CONFIRMED_ERROR:
          navigation.navigate({
            routeName: 'VerificationCodeScreen',
            params: {
              email,
            },
          });
          break;

        case AuthStatus.COGNITO.NOT_AUTHORIZED_ERROR:
          AlertUtils.showSnackBar(
            'Incorrect password & email combination',
            Colors.secondary,
          );
          break;

        case AuthStatus.COGNITO.USER_NOT_FOUND_ERROR:
          AlertUtils.showSnackBar(
            'There are no agents with that email',
            Colors.secondary,
          );
          break;

        default:
          console.log(error);
          AlertUtils.showSnackBar('Something went wrong', Colors.error);
      }
    } finally {
      setIsLoading(false);
      setIsLoginPressed(false);
    }
  };

  const handleBackButton = () => {
    ToastAndroid.show('Cannot go back', ToastAndroid.SHORT);
    return true;
  };

  const {navigation} = props;
  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <Container style={styles.container}>
        <View style={styles.categoryBackgroundContainer}>
          <CategoryBackground shuffle={shuffle} categories={categories} />
        </View>
        <View style={styles.loginContainer}>
          {isLoading ? (
            <Loading isLoading={isLoading} />
          ) : (
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={SrviceLogoBlue}
                resizeMode="contain"
              />
            </View>
          )}
          <View>
            <TextInput
              value={email}
              autoCapitalize="none"
              onChangeText={onEmailInputChanged}
              style={styles.textInput}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                if (passwordInputRef) {
                  passwordInputRef.focus();
                }
              }}
              placeholder="Enter your email..."
              placeholderTextColor={Colors.bland}
              keyboardType="email-address"
            />
            <TextInput
              setRef={(ref) => {
                setPasswordInputRef(ref);
              }}
              value={password}
              secureTextEntry
              blurOnSubmit={false}
              returnKeyType="go"
              autoCapitalize="none"
              onSubmitEditing={onLoginPressed}
              onChangeText={onPasswordChanged}
              style={styles.textInput}
              placeholder="Enter your password..."
              placeholderTextColor={Colors.bland}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              isDisabled={isLoginPressed}
              title="Login"
              onPress={onLoginPressed}
            />
            <OrDivider />
            <Button
              borderColor={Colors.secondary}
              titleColor={Colors.text}
              color={Colors.white}
              onPress={() => {
                BackHandler.removeEventListener(
                  'hardwareBackPress',
                  handleBackButton,
                );
                navigation.navigate('SignupNameScreen');
              }}
              title="Sign Up"
            />
          </View>
        </View>
      </Container>
    </KeyboardAwareScrollView>
  );
}

const {screenWidth, screenHeight} = Dimensions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    flexDirection: 'column',
    alignContent: 'stretch',
    paddingBottom: 64,
  },
  logoContainer: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 128,
    height: 24,
  },
  textInput: {
    alignSelf: 'center',
    width: screenWidth - 104,
    textAlign: 'center',
    marginTop: 24,
  },
  btnContainer: {
    marginTop: 40,
    paddingBottom: 16,
  },
  categoryBackgroundContainer: {
    height: screenHeight / 4,
  },
  loginContainer: {
    marginTop: 104,
    height: screenHeight / 2,
  },
});
export default LoginScreen;
