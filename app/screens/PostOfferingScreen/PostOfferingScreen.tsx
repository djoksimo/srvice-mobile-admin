import React, {createRef} from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation'; // $FlowFixMe

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {Card, GradientHeader, Loading, Text, TextInput} from 'components';
import Container from 'components/Container';
import Button from 'components/Button';
import {Colors} from 'values';
import {Agent} from 'types/Agent';
import {Service} from 'types/Service';
import {Offering} from 'types/Offering';
import {InputValidity} from 'types/InputValidity';
import {AlertUtils, ValidationUtils, FormatUtils} from 'utils';
import AgentScreen from '../AgentScreen';
import {OfferingManager} from '../../managers';
import Bottle from '../../bottle';
import {
  TimeInput,
  PriceInput,
  TimeInputPrompt,
  OfferingTracker,
  CurrentOfferingList,
} from './PostOfferingScreenComponents';
import styles from './styles';
type Props = {
  navigation: NavigationScreenProp<
    any,
    {
      service: Service;
    }
  >;
};
type State = {
  agent: Agent | any;
  currentTitle: string;
  currentDescription: string;
  currentMinutes: number;
  currentHours: number;
  currentPrice: string;
  isLoading: boolean;
  isFinishPressed: boolean;
  isTimeModalVisible: boolean;
  offerings: Offering[];
  isOfferingListModalVisible: boolean;
};

class PostOfferingScreen extends AgentScreen {
  offeringManager: OfferingManager;
  state: State;
  offeringScrollView: KeyboardAwareScrollView | any;

  constructor(props: Props) {
    super(props);
    this.offeringManager = Bottle.OfferingManager;
    this.state = {
      agent: undefined,
      currentTitle: '',
      currentDescription: '',
      currentHours: 0,
      currentMinutes: 0,
      currentPrice: '',
      isLoading: false,
      isFinishPressed: false,
      isTimeModalVisible: false,
      offerings: [],
      isOfferingListModalVisible: false,
    };
    this.offeringScrollView = createRef();
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  onTitleChanged = (newTitle: string) => {
    this.setState({
      currentTitle: newTitle,
    });
  };
  onDescriptionChanged = (newDescription: string) => {
    this.setState({
      currentDescription: newDescription,
    });
  };
  onHoursChanged = (newHours: number) => {
    this.setState({
      currentHours: newHours,
    });
  };
  onMinutesChanged = (newMinutes: number) => {
    this.setState({
      currentMinutes: newMinutes,
    });
  };
  onPriceChanged = (newPrice: string) => {
    this.setState({
      currentPrice: newPrice,
    });
  };
  getInputValidity = (): InputValidity => {
    const {
      currentTitle,
      currentDescription,
      currentHours,
      currentMinutes,
    } = this.state;
    return ValidationUtils.getOfferingValidity({
      currentTitle,
      currentDescription,
      currentHours,
      currentMinutes,
    });
  };
  clearCurrentOffering = () => {
    this.setState({
      currentTitle: '',
      currentDescription: '',
      currentHours: 0,
      currentMinutes: 0,
      currentPrice: '',
    });
    this.offeringScrollView.scrollToPosition(0, 0, true);
  };
  clearOfferingsList = () => {
    this.setState({
      offerings: [],
    });
  };
  saveNewOffering = (postSaveAction?: () => void) => {
    const {
      currentTitle,
      currentDescription,
      currentHours,
      currentMinutes,
      currentPrice,
      offerings,
    } = this.state;
    const {isValid, reason} = this.getInputValidity();

    if (!isValid) {
      AlertUtils.showSnackBar(reason);
      return;
    }

    const newOfferings = [...offerings];
    newOfferings.push({
      title: currentTitle,
      description: currentDescription,
      duration: currentHours * 60 + currentMinutes,
      price: +FormatUtils.enforceNums(currentPrice),
    });
    this.setState(
      {
        offerings: newOfferings,
      },
      () => {
        if (postSaveAction) {
          postSaveAction();
        }
      },
    );
  };
  getCurrentService = () => {
    const {navigation} = this.props;
    return navigation.getParam('service');
  };
  goToScreenWithService = (routeName: string, params?: any) => {
    const {navigation} = this.props;
    const currentService = this.getCurrentService();
    this.refreshAgent();
    navigation.navigate({
      routeName,
      params: {
        service: currentService,
        ...params,
      },
    });
  };
  handleFirstUnfinishedOffering = () => {
    const {offerings} = this.state;
    const {isValid} = this.getInputValidity();

    if (offerings.length || isValid) {
      AlertUtils.showSnackBar('Do you want to go back?', Colors.secondaryDark, {
        title: 'Go back',
        color: Colors.white,
        onPress: () => {
          this.clearOfferingsList();
          this.goToScreenWithService('ServiceScreen');
        },
      });
    } else {
      this.clearOfferingsList();
      this.goToScreenWithService('ServiceScreen');
    }
  };
  postOfferings = async () => {
    try {
      const {agent, offerings} = this.state;
      const service = this.getCurrentService();
      this.setState({
        isLoading: true,
        isFinishPressed: true,
      });
      await Promise.all(
        offerings.map((offering) => {
          const {title, description, duration, price} = offering;
          const newOffering = {
            agent: agent._id,
            serviceId: service._id,
            title,
            description,
            duration,
            price,
          };
          return this.offeringManager.createOffering(newOffering);
        }),
      );
      this.clearOfferingsList();
      AlertUtils.showSnackBar(
        'Posted offerings successfully',
        Colors.primaryLight,
      );
      this.goToScreenWithService('OfferingListScreen');
    } catch (error) {
      console.log(error);
      AlertUtils.showSnackBar('Something went wrong');
    } finally {
      this.setState({
        isLoading: false,
        isFinishPressed: false,
      });
    }
  };
  onFinishPressed = () => {
    const {offerings} = this.state;
    this.toggleOfferingModal();

    if (!offerings.length) {
      this.goToScreenWithService('OfferingListScreen', {
        shouldUpdateAgent: true,
      });
    } else {
      this.postOfferings();
    }
  };
  removeOffering = (offeringIndex: number) => {
    const {offerings} = this.state;
    const newOfferings = [...offerings];
    newOfferings.splice(offeringIndex, 1);
    this.setState({
      offerings: newOfferings,
    });
  };
  toggleTimeModal = () => {
    this.setState((prevState: State) => ({
      isTimeModalVisible: !prevState.isTimeModalVisible,
    }));
  };
  toggleOfferingModal = () => {
    this.setState((prevState: State) => ({
      isOfferingListModalVisible: !prevState.isOfferingListModalVisible,
    }));
  };

  render() {
    const {navigation} = this.props;
    const {
      currentTitle,
      currentDescription,
      currentHours,
      currentMinutes,
      currentPrice,
      isLoading,
      isFinishPressed,
      isTimeModalVisible,
      offerings,
      isOfferingListModalVisible,
    } = this.state;
    return (
      <Container
        navigation={navigation}
        style={styles.container}
        backButtonHandler={() => {
          this.handleFirstUnfinishedOffering();
        }}>
        {isTimeModalVisible && (
          <View>
            <Modal
              isVisible={isTimeModalVisible}
              onBackdropPress={this.toggleTimeModal}>
              <Card>
                <View>
                  <TimeInput
                    currentHours={currentHours}
                    onMinutesChanged={this.onMinutesChanged}
                    onHoursChanged={this.onHoursChanged}
                    currentMinutes={currentMinutes}
                    toggleTimeModal={this.toggleTimeModal}
                  />
                </View>
              </Card>
            </Modal>
          </View>
        )}
        {isOfferingListModalVisible && (
          <CurrentOfferingList
            offerings={offerings}
            isModalVisible={isOfferingListModalVisible}
            onDismissPressed={this.toggleOfferingModal}
            removeOffering={this.removeOffering}
            isFinishPressed={isFinishPressed}
            onFinishPressed={this.onFinishPressed}
            addAnotherOffering={this.clearCurrentOffering}
          />
        )}
        <GradientHeader>
          <View style={styles.screenTitleContainer}>
            <Text scale={Text.Scale.H4} color={Colors.white}>
              Add offerings
            </Text>
          </View>
          <Card style={styles.offeringCard}>
            <OfferingTracker
              numOfferings={offerings.length}
              toggleOfferingModal={this.toggleOfferingModal}
            />
            <KeyboardAwareScrollView
              ref={(ref) => {
                this.offeringScrollView = ref!;
              }}>
              <View style={styles.stepContainer}>
                <Loading isLoading={isLoading} />
                <Text scale={Text.Scale.H5}>Title</Text>
                <TextInput
                  value={currentTitle}
                  autoCapitalize="words"
                  onChangeText={this.onTitleChanged}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  placeholder="Title..."
                  placeholderTextColor={Colors.bland}
                  autoFocus
                />
              </View>
              <TimeInputPrompt
                currentHours={currentHours}
                currentMinutes={currentMinutes}
                toggleTimeModal={this.toggleTimeModal}
              />
              <PriceInput
                currentPrice={currentPrice}
                onPriceChanged={this.onPriceChanged}
              />
              <View style={styles.stepContainer}>
                <Text scale={Text.Scale.H5} withOptionalTag>
                  Description
                </Text>
                <TextInput
                  value={currentDescription}
                  autoCapitalize="sentences"
                  onChangeText={this.onDescriptionChanged}
                  style={[styles.textInput, styles.descriptionInput]}
                  blurOnSubmit={false}
                  placeholder="Description..."
                  placeholderTextColor={Colors.bland}
                  multiline
                />
              </View>
              <View style={styles.confirmationButtonContainer}>
                <Button
                  onPress={() => {
                    this.saveNewOffering(() => {
                      this.clearCurrentOffering();
                      this.toggleOfferingModal();
                    });
                  }}
                  title="Add offering"
                />
              </View>
            </KeyboardAwareScrollView>
          </Card>
        </GradientHeader>
      </Container>
    );
  }
}

export default PostOfferingScreen;
