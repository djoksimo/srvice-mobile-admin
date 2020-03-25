// @flow
import React, { Component } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { NavigationScreenProp } from "react-navigation";
// $FlowFixMe
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { CategoryBackground } from "components";
import Container from "components/Container";

import { Colors, Dimensions } from "values";
import { AlertUtils } from "utils";
import type { Category } from "types/CategoryType";
import { NameForm } from "./SignupNameComponents";
import Bottle from "../../../bottle";

type Props = {
  navigation: NavigationScreenProp,
};

type State = {
  firstName: string,
  lastName: string,
  categories: Category[],
  shuffle: boolean,
  isSignupPressed: boolean,
};

class SignupNameScreen extends Component<Props, State> {
  authenticationManager: any;
  contentManager: any;
  allCategoriesSubscription: any;
  signupScrollView: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      categories: [],
      shuffle: false,
      isSignupPressed: false,
    };
    this.authenticationManager = Bottle.AuthenticationManager;
    this.contentManager = Bottle.ContentManager;
  }

  componentDidMount() {
    if (this.contentManager.allCategories.length === 0) {
      this.contentManager.getAllCategories();
    }
    this.allCategoriesSubscription = this.contentManager.allCategories$.subscribe(categories => {
      this.setState({ categories });
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    this.allCategoriesSubscription.unsubscribe();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.pop();
    return true;
  }

  onFirstNameChanged = firstName => {
    this.setState({ firstName });
  };

  onLastNameChanged = lastName => {
    this.setState({ lastName });
  };

  onNameEntered = () => {
    const { navigation } = this.props;
    const { firstName, lastName } = this.state;
    if (firstName !== "" && lastName !== "") {
      navigation.navigate({
        routeName: "SignupCredentialsScreen",
        params: {
          firstName,
          lastName,
        },
      });
    } else {
      AlertUtils.showSnackBar("Your name seems to be a bit too short");
    }
  };

  render() {
    const {
      categories,
      shuffle,
      firstName,
      lastName,
    } = this.state;

    return (
      <KeyboardAwareScrollView enableOnAndroid>
        <Container style={styles.container}>
          <View style={styles.categoryBackgroundContainer}>
            <CategoryBackground shuffle={shuffle} categories={categories} />
          </View>
          <View style={styles.signupContainer}>
            <NameForm
              email={firstName}
              lastName={lastName}
              onFirstNameChanged={this.onFirstNameChanged}
              onLastNameChanged={this.onLastNameChanged}
              onNameEntered={this.onNameEntered}
            />
          </View>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}

const { screenHeight } = Dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    flexDirection: "column",
    alignContent: "stretch",
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

export default SignupNameScreen;
