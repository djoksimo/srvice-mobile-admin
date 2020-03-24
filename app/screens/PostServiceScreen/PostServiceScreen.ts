// @flow
import React from "react";
import _ from "lodash";
import { StyleSheet, Alert, KeyboardAvoidingView } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { NavigationScreenProp } from "react-navigation";
import SnapCarousel from "react-native-snap-carousel";

import { GradientHeader, Text, Loading } from "components";
import Container from "components/Container";
import InputLocationModal from "components/InputLocationModal";

import { Colors, Dimensions, MinInput } from "values";
import { FormatUtils, AlertUtils } from "utils";
import type { Location } from "types/LocationType";
import type { Agent } from "types/AgentType";
import { StepCard } from "./StepCard";
import type { Step, TravelSetting } from "./StepCard/StepCardTypes";
import { ContentManager, ServiceManager } from "../../managers";
import { TravelSettingOption } from "../../enums";
import {
  TitleInput,
  DescriptionInput,
  AddressInput,
  ContactInput,
  TravelSettingInput,
} from "./StepCard/StepCardComponents";
import Bottle from "../../bottle";
import AgentScreen from "../AgentScreen";
import StepCardId from "../../enums/StepCardId";

type Props = {
  navigation: NavigationScreenProp<any, {
    previousScreen: string
  }>
};

type State = {
  agent: Agent | any,
  titleText: string,
  descriptionText: string,
  address: string,
  latitude: number | any,
  longitude: number | any,
  inCall: boolean,
  outCall: boolean,
  remoteCall: boolean,
  radius: number,
  email: string,
  phone: string,
  pictures: Array<any>,
  publicPictureUrls: Array<string>,
  stepNumber: number,
  stepId: StepCardId | string,
  isLoading: boolean,
  isPostButtonPressed: boolean,
  isInputLocationModalVisible: boolean,
};

class PostServiceScreen extends AgentScreen {
  state: State;
  serviceManager: ServiceManager;
  contentManager: ContentManager;
  stepCardListRef: any;
  publicPictureUrlsSubscription: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      titleText: "",
      descriptionText: "",
      address: "",
      latitude: 0,
      longitude: 0,
      inCall: false,
      outCall: false,
      remoteCall: false,
      radius: 0,
      email: "",
      phone: "",
      pictures: [],
      publicPictureUrls: [],
      stepNumber: 0,
      stepId: "",
      isLoading: false,
      isPostButtonPressed: false,
      isInputLocationModalVisible: false,
    };
    this.contentManager = Bottle.ContentManager;
    this.serviceManager = Bottle.ServiceManager;
  }

  componentDidMount() {
    super.componentDidMount();

    this.publicPictureUrlsSubscription = this.contentManager.publicPictureUrls$.subscribe(
      publicPictureUrls => {
        if (publicPictureUrls !== undefined && publicPictureUrls.length > 0) {
          this.setState({ publicPictureUrls });
        }
      },
      error => {
        AlertUtils.showSnackBar("Something went wrong");
        console.log(error);
      },
    );
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.publicPictureUrlsSubscription.unsubscribe();
  }

  isValidInput = (stepId: StepCardId): boolean => {
    const {
      titleText,
      descriptionText,
      inCall,
      outCall,
      remoteCall,
      address,
      email,
      phone,
    } = this.state;

    const trimmedTitleText = titleText.trim();
    const trimmedDescriptionText = descriptionText.trim();

    switch (stepId) {
      case StepCardId.TITLE:
        if (trimmedTitleText.length <= MinInput.serviceTitle) {
          AlertUtils.showSnackBar("That title is a bit too short");
          return false;
        }
        break;
      case StepCardId.DESCRIPTION_PICTURES:
        if (trimmedDescriptionText.length <= MinInput.serviceDescription) {
          AlertUtils.showSnackBar("That description is a bit too short");
          return false;
        }
        break;
      case StepCardId.TRAVEL_SETTING:
        if (!inCall && !outCall && !remoteCall) {
          AlertUtils.showSnackBar("Please select at least one option");
          return false;
        }
        break;
      case StepCardId.ADDRESS:
        if (!address.length) {
          AlertUtils.showSnackBar("Please enter your service location", Colors.secondary, null);
          return false;
        }
        break;
      case StepCardId.CONTACT:
        if (!FormatUtils.isValidEmailFormat(email) || phone.length <= 7) {
          AlertUtils.showSnackBar("Please enter a valid email and phone number");
          return false;
        }
        break;
      default:
        console.log("Invalid step id");
    }
    return true;
  };

  onContinuePressed = async (stepId: StepCardId, stepCount: number): void => {
    const { stepNumber } = this.state;

    this.setState(prevState => {
      const { agent } = prevState;
      const { email } = agent;
      return { email, isLoading: true };
    });

    if (!this.isValidInput(stepId)) {
      this.setState({ isLoading: false });
      return;
    }

    if (stepNumber + 1 === stepCount) {
      this.setState({ isPostButtonPressed: true });
      await this.postService();
      this.setState({ isPostButtonPressed: false });
    } else {
      this.setState({ stepNumber: stepNumber + 1 });
      // need setTimeout as workaround for SnapCarousel bug for android
      setTimeout(() => this.stepCardListRef.snapToNext(), 150);
    }
    this.setState({ isLoading: false });
  };

  onTitleChanged = (titleText: string) => {
    this.setState({ titleText });
  };

  onDescriptionChanged = (descriptionText: string) => {
    this.setState({ descriptionText });
  };

  onImagePickerPressed = async () => {
    Alert.alert(
      "Add some photos",
      "A picture says 1000 words. Pick some pictures that relate to your service!",
      [
        { text: "Camera", onPress: this.openCamera },
        { text: "Gallery", onPress: this.openPicker },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: false },
    );
  };

  openCamera = async () => {
    const picture = await ImagePicker.openCamera({
      width: 800,
      height: 800,
      cropping: false,
      multiple: true,
    });
    this.setState(prevState => ({
      pictures: [...prevState.pictures, picture],
    }));
  };

  openPicker = async () => {
    const pictures = await ImagePicker.openPicker({
      multiple: true,
      compressImageQuality: 0.8,
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 800,
      maxFiles: 20,
    });
    this.setState(prevState => ({
      pictures: [...prevState.pictures, ...pictures],
    }));
  };

  toggleInputLocationModalVisibility = (onToggleModalDone?: () => void) => {
    this.setState(
      prevState => ({ isInputLocationModalVisible: !prevState.isInputLocationModalVisible }),
      () => {
        if (onToggleModalDone) {
          onToggleModalDone();
        }
      },
    );
  };

  onLocationInputSelected = () => {
    this.toggleInputLocationModalVisibility();
  };

  setLocation = ({ address, lat, lng }: Location) => {
    this.setState(
      {
        address,
        latitude: lat,
        longitude: lng,
      },
      () => {
        this.toggleInputLocationModalVisibility();
      },
    );
  };

  onTravelSettingSelected = (travelSetting: TravelSetting) => {
    switch (travelSetting.title) {
      case TravelSettingOption.TRAVEL_SETTING_OUTCALL:
        this.setState(
          prevState => ({ outCall: !prevState.outCall }),
          () => {
            if (this.state.outCall) {
              AlertUtils.showSnackBar("You will visit your clients", Colors.primaryDark);
            }
          },
        );
        break;
      case TravelSettingOption.TRAVEL_SETTING_INCALL:
        this.setState(
          prevState => ({ inCall: !prevState.inCall }),
          () => {
            if (this.state.inCall) {
              AlertUtils.showSnackBar("Clients will come to you", Colors.primaryDark);
            }
          },
        );
        break;
      case TravelSettingOption.TRAVEL_SETTING_REMOTE:
        this.setState(
          prevState => ({ remoteCall: !prevState.remoteCall }),
          () => {
            if (this.state.remoteCall) {
              AlertUtils.showSnackBar("You will meet with clients remotely", Colors.primaryDark);
            }
          },
        );
        break;
    }
  };

  onRadiusChanged = (radiusText: string) => {
    const radiusNum = +FormatUtils.enforceNums(radiusText);
    this.setState({ radius: radiusNum });
  };

  onEmailChanged = (email: string) => {
    this.setState({ email });
  };

  onPhoneChanged = (phone: string) => {
    this.setState({ phone });
  };

  postService = async () => {
    try {
      this.setState({ isLoading: true });

      if (!_.isEmpty(this.state.pictures)) {
        await this.contentManager.uploadPictures(this.state.pictures);
      }

      const {
        agent,
        titleText,
        descriptionText,
        address,
        latitude,
        longitude,
        inCall,
        outCall,
        remoteCall,
        radius,
        email,
        phone,
        publicPictureUrls,
      } = this.state;
      const { navigation } = this.props;

      const categoryId = navigation.getParam("category")._id;
      this.setState({
        titleText: FormatUtils.replaceNewlinesWithSpaces(titleText.trim()),
        descriptionText: descriptionText.trim(),
      });

      const newService = {
        agent: agent._id,
        category: categoryId,
        title: titleText,
        description: descriptionText,
        pictureUrls: publicPictureUrls,
        phone,
        email,
        inCall,
        outCall,
        remoteCall,
        address,
        latitude,
        longitude,
        radius,
        averageServiceRating: 0,
        serviceRatings: [],
        proudcts: [],
      };

      const response = await this.serviceManager.postService(newService);

      this.setState({ isLoading: false });
      const { serviceId } = response;
      if (!serviceId) {
        throw new Error("serviceId not valid");
      }

      navigation.navigate({
        routeName: "PostServiceSuccessScreen",
        params: { serviceId },
      });
    } catch (error) {
      console.log(error);
      AlertUtils.showSnackBar("Something went wrong, please try again later");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onBackButtonPresed = () => {
    const { navigation } = this.props;
    const { stepNumber } = this.state;
    const previousScreen = navigation.getParam("previousScreen");
    if (previousScreen && previousScreen === "SuccessfulSignupScreen") {
      return navigation.navigate("DashboardScreen");
    }

    if (stepNumber === 0) {
      return navigation.goBack();
    }
    this.setState({ stepNumber: stepNumber - 1 });
    return setTimeout(() => this.stepCardListRef.snapToPrev(), 150);
  };

  render() {
    const { navigation } = this.props;
    const {
      titleText,
      descriptionText,
      address,
      inCall,
      outCall,
      remoteCall,
      radius,
      email,
      phone,
      pictures,
      isLoading,
      isPostButtonPressed,
      isInputLocationModalVisible,
    } = this.state;

    const steps: Array<Step> = [
      {
        component: <TitleInput titleText={titleText} onTitleChanged={this.onTitleChanged} />,
        id: StepCardId.TITLE,
        stepTitle: "What is your service called?",
      },
      {
        component: (
          <DescriptionInput
            onDescriptionChanged={this.onDescriptionChanged}
            descriptionText={descriptionText}
          />
        ),
        id: StepCardId.DESCRIPTION_PICTURES,
        stepTitle: "Describe your service.",
      },
      {
        component: (
          <TravelSettingInput
            onTravelSettingSelected={this.onTravelSettingSelected}
            onRadiusChanged={this.onRadiusChanged}
            inCall={inCall}
            outCall={outCall}
            remoteCall={remoteCall}
            radius={radius}
          />
        ),
        id: StepCardId.TRAVEL_SETTING,
        stepTitle: "How do you meet with clients?",
      },
      {
        component: (
          <AddressInput onLocationInputSelected={this.onLocationInputSelected} address={address} />
        ),
        id: StepCardId.ADDRESS,
        stepTitle: "Where is your service located?",
      },
      {
        component: (
          <ContactInput
            email={email}
            phone={phone}
            onEmailChanged={this.onEmailChanged}
            onPhoneChanged={this.onPhoneChanged}
          />
        ),
        id: StepCardId.CONTACT,
        stepTitle: "Where do you want your clients to reach you?",
      },
    ];

    const { screenHeight } = Dimensions;

    return (
      <Container
        backButtonHandler={this.onBackButtonPresed}
        navigation={navigation}
        style={styles.container}
      >
        <GradientHeader absolute>
          <Text scale={Text.Scale.H4} style={styles.title} color={Colors.white}>
            List Your Service
          </Text>
          <Loading isLoading={isLoading} />
        </GradientHeader>
        <SnapCarousel
          data={steps}
          vertical
          sliderHeight={screenHeight}
          itemHeight={screenHeight}
          ref={ref => {
            this.stepCardListRef = ref;
          }}
          enableSnap
          enableMomentum
          scrollEnabled={false}
          inactiveSlideScale={0.4}
          inactiveSlideOpacity={0.2}
          renderItem={({ item, index }) => (
            <KeyboardAvoidingView enabled behavior="position">
              <InputLocationModal
                isVisibleModal={isInputLocationModalVisible}
                toggleModalVisibility={this.toggleInputLocationModalVisibility}
                setLocation={this.setLocation}
              />
              <StepCard
                step={item}
                stepNumber={index}
                stepCount={steps.length}
                onContinuePressed={this.onContinuePressed}
                onImagePickerPressed={this.onImagePickerPressed}
                pictures={pictures}
                isPostButtonPressed={isPostButtonPressed}
                isLoading={isLoading}
              />
            </KeyboardAvoidingView>
          )}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blandLight,
  },
  headerContainer: {
    marginTop: -152,
  },
  title: {
    alignSelf: "center",
    marginTop: 16,
  },
});

export default PostServiceScreen;
