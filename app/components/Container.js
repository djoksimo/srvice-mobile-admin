// @flow
import React, { PureComponent } from "react";
import type { Element } from "react";
import { StyleSheet, View, TouchableOpacity, Image, SafeAreaView, StatusBar } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors } from "values";
import SrviceLogoBetaWhite from "../assets/srvice_white_beta_400px.png";
import SrviceLogoBlue from "../assets/srvice_blue_400px.png";

import MenuButton from "./MenuButton";

type Props = {
  navigation?: NavigationScreenProp | any,
  backButtonHandler?: Function,
  glow?: boolean,
  whiteLogo?: boolean,
  blueLogo?: boolean,
  search?: boolean,
  children: any,
  onMenuButtonPressed?: Function,
  menu?: boolean,
};

class Container extends PureComponent<Props> {
  static defaultProps = {
    search: false,
    glow: false,
    navigation: null,
    backButtonHandler: null,
    whiteLogo: false,
    blueLogo: false,
    menu: false,
    onMenuButtonPressed: () => {},
  };

  onBackClicked = () => {
    const { navigation, backButtonHandler } = this.props;
    if (backButtonHandler === null) {
      navigation.goBack();
    } else {
      backButtonHandler();
    }
  };

  render() {
    const {
      navigation,
      glow,
      whiteLogo,
      blueLogo,
      search,
      children,
      backButtonHandler,
      menu,
      onMenuButtonPressed,
      ...props
    } = this.props;

    const backButton: Element<any> = <Icon name="arrow-left" color={Colors.white} size={24} />;
    const backButtonView: Element<any> = navigation ? (
      <TouchableOpacity onPress={this.onBackClicked}>
        {glow ? <View style={styles.glowCircle}>{backButton}</View> : backButton}
      </TouchableOpacity>
    ) : (
      <View style={styles.invisibleIcon} />
    );
    const whiteLogoImage = whiteLogo ? (
      <Image style={styles.logo} source={SrviceLogoBetaWhite} resizeMode="contain" />
    ) : null;

    const blueLogoImage = blueLogo ? (
      <Image style={styles.logo} source={SrviceLogoBlue} resizeMode="contain" />
    ) : null;

    const searchButton: Element<any> = search ? (
      <TouchableOpacity onPress={() => {}}>
        <Icon name="magnify" color={Colors.white} size={24} />
      </TouchableOpacity>
    ) : (
      <View style={styles.invisibleIcon} />
    );

    const sideMenuButton: Element<any> | any = menu ? (
      <View style={styles.menuButtonContainer}>
        <MenuButton onPress={onMenuButtonPressed} />
      </View>
    ) : null;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.blandLight} barStyle="dark-content" hidden={false} />
        <View {...props}>
          {children}
          <View style={styles.topBar}>
            {backButtonView}
            {whiteLogoImage}
            {blueLogoImage}
            {searchButton}
            {sideMenuButton}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
  },
  glowCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 18,
    // opacity: 0.7,
    backgroundColor: Colors.secondary,
  },
  invisibleIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    marginTop: 24,
    width: 128,
    height: 24,
  },
  menuButtonContainer: {
    right: -16,
  },
});

export default Container;
