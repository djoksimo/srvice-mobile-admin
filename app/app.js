import React, { Component } from "react";
import { YellowBox } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RNRestart from "react-native-restart";

import { Colors } from "values";
import { AlertUtils } from "utils";
import {
  PostServiceScreen,
  RequestListScreen,
  ConversationListScreen,
  ConversationScreen,
  AccountScreen,
  SignupNameScreen,
  SignupCredentialsScreen,
  LoginScreen,
  VerificationCodeScreen,
  ServiceScreen,
  CategorySelectionScreen,
  CalendarScreen,
  PostOfferingScreen,
  PostServiceSuccessScreen,
  OfferingListScreen,
  SuccessfulSignupScreen,
  AvailabilityScreen,
  RequestResponseScreen,
  EditServiceScreen,
  DashboardScreen,
} from "./screens";

const AuthenticationRoutes = {
  SignupNameScreen: {
    screen: SignupNameScreen,
  },
  SignupCredentialsScreen: {
    screen: SignupCredentialsScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
  },
  VerificationCodeScreen: {
    screen: VerificationCodeScreen,
  },
};

const SignupStack = createStackNavigator(AuthenticationRoutes, {
  initialRouteName: "SignupNameScreen",
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false,
    swipeEnabled: false,
  },
});

const LoginStack = createStackNavigator(AuthenticationRoutes, {
  initialRouteName: "LoginScreen",
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false,
    swipeEnabled: false,
  },
});

const renderIcon = (icon, color, active) => {
  // SOLUTION FOR Background circle

  // const iconView = active ? (
  //   <View style={{ backgroundColor: Colors.primary, padding: 6, borderRadius: 16, alignItems: "center", alignContent: "center", justifyContent: "center" }}>
  //     <Icon name={icon} size={24} color={color} />
  //   </View>
  // ) : (
  //   <Icon name={icon} size={24} color={color} />
  // );

  let iconName = icon;

  // TODO fix this
  // hacky but functional because calendar-<x>-outline icons don't work for some reason
  if (icon !== "calendar") {
    iconName = active ? icon : `${icon}-outline`;
  }

  return <Icon name={iconName} size={28} color={color} />;
};

console.disableYellowBox = true;

const RootStack = createStackNavigator(
  {
    MainTabNavigator: {
      screen: createBottomTabNavigator(
        {
          DashboardScreen: {
            screen: DashboardScreen,
            navigationOptions: () => ({
              title: "Dashboard",
              tabBarIcon: ({ tintColor, focused }) =>
                renderIcon("view-dashboard", tintColor, focused),
            }),
          },
          CalendarScreen: {
            screen: CalendarScreen,
            navigationOptions: () => ({
              title: "Schedule",
              tabBarIcon: ({ tintColor, focused }) => renderIcon("calendar", tintColor, focused),
            }),
          },
          ConversationListScreen: {
            screen: ConversationListScreen,
            navigationOptions: () => ({
              title: "Chat",
              tabBarIcon: ({ tintColor, focused }) =>
                renderIcon("message-text", tintColor, focused),
            }),
          },
          AccountScreen: {
            screen: AccountScreen,
            navigationOptions: () => ({
              title: "Profile",
              tabBarIcon: ({ tintColor, focused }) => renderIcon("account", tintColor, focused),
            }),
          },
        },
        {
          tabBarOptions: {
            activeTintColor: Colors.black,
            inactiveTintColor: Colors.blandDark,
            keyboardHidesTabBar: true,
            style: {
              shadowColor: Colors.bland,
              shadowOffset: {
                width: 0,
                height: -4,
              },
              shadowOpacity: 0.4,
              shadowRadius: 4,
              borderTopWidth: 0,
              elevation: 4,
            },
            showLabel: false,
          },
        },
      ),
    },
    CategorySelectionScreen: {
      screen: CategorySelectionScreen,
    },
    PostServiceScreen: {
      screen: PostServiceScreen,
    },
    PostOfferingScreen: {
      screen: PostOfferingScreen,
    },
    PostServiceSuccessScreen: {
      screen: PostServiceSuccessScreen,
    },
    ServiceScreen: {
      screen: ServiceScreen,
    },
    OfferingListScreen: {
      screen: OfferingListScreen,
    },

    LoginStack: {
      screen: LoginStack,
    },
    SignupStack: {
      screen: SignupStack,
    },
    ConversationScreen: {
      screen: ConversationScreen,
    },
    SuccessfulSignupScreen: {
      screen: SuccessfulSignupScreen,
    },
    AvailabilityScreen: {
      screen: AvailabilityScreen,
    },
    RequestListScreen: {
      screen: RequestListScreen,
    },
    RequestResponseScreen: {
      screen: RequestResponseScreen,
    },
    EditServiceScreen: {
      screen: EditServiceScreen,
    },
  },
  {
    initialRouteName: "MainTabNavigator",
    headerMode: "none",
  },
);

const App = createAppContainer(RootStack);

class AppWrapper extends Component {
  componentDidCatch() {
    if (__DEV__) {
      return;
    }

    if (this.errorShown) {
      return;
    }

    this.errorShown = true;

    AlertUtils.showSnackBar("Sorry, an unexpected error has occcured.", Colors.secondary, {
      title: "Reload",
      color: Colors.white,
      onPress: () => RNRestart.Restart(),
    });
  }

  render() {
    return <App />;
  }
}

YellowBox.ignoreWarnings(["Remote debugger"]);

export default AppWrapper;
