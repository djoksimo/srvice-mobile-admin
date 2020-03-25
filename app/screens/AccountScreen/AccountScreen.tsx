import React from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash'; // $FlowFixMe

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Card, Carousel, Text, Loading, Touchable, TextInput} from 'components';
import Modal from 'react-native-modal';
import {Agent} from 'types/Agent';
import Container from 'components/Container';
import ModalMenu from 'components/ModalMenu';
import InputLocationModal from 'components/InputLocationModal';
import {Colors, Null, Dimensions} from 'values';
import {FormatUtils, AlertUtils} from 'utils';
import Button from 'components/Button';
import {Service} from 'types/Service';
import {MenuButton} from 'types/MenuButton';
import AgentScreen from '../AgentScreen';
import {
  AccountHeader,
  Heading,
  ListInput,
  PublicInfoSection,
  ServiceCard,
} from './AccountScreenComponents';
import {ModalType, PublicInfoSectionType, StatsType} from './types';
import SkillsSection from './AccountScreenComponents/SkillsSection';
import {ProfileListSetting} from '../../enums';
import {AuthenticationManager, ContentManager} from '../../managers';
import Bottle from '../../bottle';
import {ArrayLikeInput} from './AccountScreenValues';
import styles from './styles';
import {Location} from 'types/Location';
type State = {
  agent: Agent | any;
  originalAgent: Agent | any;
  editModalId: ModalType;
  refreshing: boolean;
  isLoading: boolean;
  publicPictureUrls: Array<string>;
  isModalMenuOpen: boolean;
  isInputLocationModalVisible: boolean;
};
type Props = {
  navigation: NavigationScreenProp<
    any,
    {
      shouldSetProfilePicture: boolean;
    }
  >;
};

class AccountScreen extends AgentScreen {
  state: State;
  publicPictureUrlsSubscription: any;
  contentManager: ContentManager;
  authenticationManager: AuthenticationManager;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      originalAgent: undefined,
      editModalId: null,
      refreshing: false,
      isLoading: false,
      publicPictureUrls: [],
      isModalMenuOpen: false,
      isInputLocationModalVisible: false,
    };
    this.contentManager = Bottle.ContentManager;
    this.authenticationManager = Bottle.AuthenticationManager;
  }

  async componentDidMount() {
    super.componentDidMount();
    await this.refreshAgent();
    this.setState((prevState: State) => ({
      isLoading: false,
      originalAgent: prevState.agent,
    }));
    this.handleNavigationAction();
    this.publicPictureUrlsSubscription = this.contentManager.publicPictureUrls$.subscribe(
      (publicPictureUrls) => {
        if (publicPictureUrls !== undefined && publicPictureUrls.length > 0) {
          this.setState({
            publicPictureUrls,
          });
        }
      },
      (error) => {
        AlertUtils.showSnackBar('Something went wrong');
        console.log(error);
      },
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.navigation !== prevProps.navigation) {
      this.handleNavigationAction();
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  onRefresh = async () => {
    this.setState({
      refreshing: true,
    });
    await this.refreshAgent();
    this.setState({
      refreshing: false,
    });
  };
  handleNavigationAction = () => {
    const {navigation} = this.props;
    const shouldSetProfilePicture = navigation.getParam(
      'shouldSetProfilePicture',
    );
    const shouldSetBusinessName = navigation.getParam('shouldSetBusinessName');
    const updateAgent = navigation.getParam('updateAgent');

    if (shouldSetProfilePicture) {
      this.onProfilePicturePressed();
    }

    if (shouldSetBusinessName) {
      this.onEditPressed(ProfileListSetting.Company);
    }

    if (updateAgent) {
      this.refreshAgent();
    }
  };
  toggleInputLocationModalVisibility = (onToggleModalDone = () => {}) => {
    this.setState(
      (prevState: State) => ({
        isInputLocationModalVisible: !prevState.isInputLocationModalVisible,
      }),
      () => {
        onToggleModalDone();
      },
    );
  };
  onEditPressed = (modalId: ModalType) => {
    if (modalId === ProfileListSetting.Location) {
      this.toggleInputLocationModalVisibility();
    }

    this.setState({
      editModalId: modalId,
    });
  };
  toggleModalMenuVisibility = (onToggleModalMenuVisibility = () => {}) => {
    this.setState(
      (prevState: State) => ({
        isModalMenuOpen: !prevState.isModalMenuOpen,
      }),
      () => {
        if (onToggleModalMenuVisibility) {
          onToggleModalMenuVisibility();
        }
      },
    );
  };
  alertLogout = () => {
    Alert.alert(
      'Logout',
      'Please confirm logout',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await this.authenticationManager.logout();
            this.toggleInputLocationModalVisibility(() => {
              this.refreshAgent();
            });
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  onCompanyNameChanged = (company: string) => {
    this.setState((prevState: State) => ({
      agent: {...prevState.agent, company},
    }));
  };
  updateAgentLocation = ({address}: Location) => {
    try {
      this.setState(
        (prevState: State) => ({
          agent: {...prevState.agent, location: address},
        }),
        () => {
          this.toggleInputLocationModalVisibility(async () => {
            await this.agentManager.updateAgent('location', address);
            AlertUtils.showSnackBar(
              'Updated location successfully',
              Colors.primaryLight,
            );
          });
        },
      );
    } catch (error) {
      console.log(error);
      AlertUtils.showSnackBar('Something went wrong');
    }
  };
  onListItemChanged = (input: string, index: number) => {
    const {agent, editModalId} = this.state;
    const {certifications, education, languages, skills} = agent;
    const newCertifications = [...certifications];
    const newEducation = [...education];
    const newLanguages = [...languages];
    const newSkills = [...skills];

    switch (editModalId) {
      case ProfileListSetting.Certification:
        newCertifications[index] = input;
        break;

      case ProfileListSetting.Education:
        newEducation[index] = input;
        break;

      case ProfileListSetting.Language:
        newLanguages[index] = input;
        break;

      case ProfileListSetting.Skill:
        newSkills[index] = input;
        break;

      default:
        console.log('Invalid modal title');
    }

    this.updateAgentListStates(
      newCertifications,
      newEducation,
      newLanguages,
      newSkills,
    );
  };
  updateAgentListStates = (
    newCertifications: string[],
    newEducation: string[],
    newLanguages: string[],
    newSkills: string[],
  ) => {
    this.setState((prevState: State) => ({
      agent: {
        ...prevState.agent,
        certifications: newCertifications,
        education: newEducation,
        languages: newLanguages,
        skills: newSkills,
      },
    }));
  };
  addListInput = () => {
    const {agent, editModalId} = this.state;
    const {certifications, education, languages, skills} = agent;
    const newCertifications = [...certifications];
    const newEducation = [...education];
    const newLanguages = [...languages];
    const newSkills = [...skills];

    switch (editModalId) {
      case ProfileListSetting.Certification:
        newCertifications.push('');
        break;

      case ProfileListSetting.Education:
        newEducation.push('');
        break;

      case ProfileListSetting.Language:
        newLanguages.push('');
        break;

      case ProfileListSetting.Skill:
        newSkills.push('');
        break;

      default:
        console.log('Invalid modal title');
    }

    this.updateAgentListStates(
      newCertifications,
      newEducation,
      newLanguages,
      newSkills,
    );
  };
  removeListInput = (index: number) => {
    const {agent, editModalId} = this.state;
    const {certifications, education, languages, skills} = agent;
    const newCertifications = [...certifications];
    const newEducation = [...education];
    const newLanguages = [...languages];
    const newSkills = [...skills];

    switch (editModalId) {
      case ProfileListSetting.Certification:
        newCertifications.splice(index, 1);
        break;

      case ProfileListSetting.Education:
        newEducation.splice(index, 1);
        break;

      case ProfileListSetting.Language:
        newLanguages.splice(index, 1);
        break;

      case ProfileListSetting.Skill:
        newSkills.splice(index, 1);
        break;

      default:
        console.log('Invalid modal title');
    }

    this.updateAgentListStates(
      newCertifications,
      newEducation,
      newLanguages,
      newSkills,
    );
  };
  dismissChanges = () => {
    const {originalAgent} = this.state;
    const {
      certifications,
      education,
      languages,
      skills,
      company,
    } = originalAgent;
    this.setState((prevState: State) => ({
      agent: {...prevState.agent, company},
    }));
    const newCertifications = [...certifications];
    const newEducation = [...education];
    const newLanguages = [...languages];
    const newSkills = [...skills];
    this.updateAgentListStates(
      newCertifications,
      newEducation,
      newLanguages,
      newSkills,
    );
    this.closeModal();
  };
  closeModal = () => {
    this.setState({
      editModalId: null,
    });
  };
  onSaveButtonPressed = async (editModalId: ModalType) => {
    try {
      const {agent} = this.state;
      const {company, certifications, education, languages, skills} = agent;

      switch (editModalId) {
        case ProfileListSetting.Certification:
          await this.agentManager.updateAgent('certifications', certifications);
          break;

        case ProfileListSetting.Education:
          await this.agentManager.updateAgent('education', education);
          break;

        case ProfileListSetting.Language:
          await this.agentManager.updateAgent('languages', languages);
          break;

        case ProfileListSetting.Skill:
          await this.agentManager.updateAgent('skills', skills);
          break;

        case ProfileListSetting.Company:
          await this.agentManager.updateAgent('company', company);
          break;

        default:
          console.error('Invalid modal title');
      }

      this.closeModal();
      AlertUtils.showSnackBar(
        'Updated account successfully!',
        Colors.primaryDark,
      );
    } catch (error) {
      console.log(error);
      AlertUtils.showSnackBar('Something went wrong :(');
    }
  };
  renderPublicInfoSection = ({item: section, index}: any) => (
    <PublicInfoSection
      inputChangeHandler={() => this.onEditPressed(section.modalId)}
      title={section.title}
      info={section.description}
      index={index}
      lastSectionIndex={4}
    />
  );
  onProfilePicturePressed = () => {
    Alert.alert(
      'Edit your profile picture',
      'Clients want to see who they are doing business with!',
      [
        {
          text: 'Camera',
          onPress: this.openCamera,
        },
        {
          text: 'Gallery',
          onPress: this.openPicker,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  openCamera = async () => {
    const picture = await ImagePicker.openCamera({
      width: 800,
      height: 800,
      cropping: false,
      multiple: false,
    });
    await this.saveProfilePicture(picture);
  };
  openPicker = async () => {
    const picture = await ImagePicker.openPicker({
      multiple: false,
      compressImageQuality: 0.8,
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 800,
      maxFiles: 1,
    });
    await this.saveProfilePicture(picture);
  };
  saveProfilePicture = async (picture: any) => {
    this.setState({
      isLoading: true,
    });
    const pictureArr = [picture];
    await this.contentManager.uploadPictures(pictureArr);
    const {publicPictureUrls} = this.state;

    try {
      const newProfilePictureUrl = publicPictureUrls[0];
      await this.agentManager.updateAgent(
        'profilePictureUrl',
        newProfilePictureUrl,
      );
      this.setState((prevState: State) => ({
        agent: {...prevState.agent, profilePictureUrl: newProfilePictureUrl},
      }));
    } catch (error) {
      console.log(error);
      AlertUtils.showSnackBar('Something went wrong');
    }

    this.setState({
      isLoading: false,
    });
  };
  renderServiceCard = ({item: service}: {item: Service}) => {
    const {navigation} = this.props;
    return <ServiceCard service={service} navigation={navigation} />;
  };
  onAddServicePressed = () => {
    const {navigation} = this.props;
    navigation.navigate('CategorySelectionScreen');
  };

  render() {
    const {
      agent,
      editModalId,
      isLoading,
      refreshing,
      isModalMenuOpen,
      isInputLocationModalVisible,
    } = this.state;
    const {screenWidth} = Dimensions;
    let agentInfo = <View />;
    let listInputData = [];
    const modalMenuButtons: Array<MenuButton> = [
      {
        text: 'Logout',
        icon: 'logout',
        action: () => {
          this.alertLogout();
        },
      },
    ];

    if (agent) {
      const {
        services,
        bookings,
        company,
        location,
        education,
        languages,
        certifications,
        profilePictureUrl,
        skills,
        firstName,
        lastName,
      } = agent;
      const stats: StatsType[] = [
        {
          title: 'Services',
          count: services && services.length,
        }, // {
        //   title: "Reviews",
        //   count: 0, // TODO add field for total reviews to agent model in api - Danilox
        // },
        {
          title: 'Past Orders',
          count: services && bookings.length,
        },
      ];
      const publicInfoSections: PublicInfoSectionType[] = [
        {
          title: 'Business Name',
          modalId: ProfileListSetting.Company,
          description: _.isEmpty(company) ? Null.profileSection : company,
        },
        {
          title: 'Business Location',
          modalId: ProfileListSetting.Location,
          description: _.isEmpty(location) ? Null.profileSection : location,
        },
        {
          title: 'Education',
          modalId: ProfileListSetting.Education,
          description: _.isEmpty(education)
            ? Null.profileSection
            : FormatUtils.newLineSeparateArray(education),
        },
        {
          title: 'Languages',
          modalId: ProfileListSetting.Language,
          description: _.isEmpty(languages)
            ? Null.profileSection
            : FormatUtils.commaSeparateArray(languages),
        },
        {
          title: 'Certifications',
          modalId: ProfileListSetting.Certification,
          description: _.isEmpty(certifications)
            ? Null.profileSection
            : FormatUtils.newLineSeparateArray(certifications),
        },
      ];

      switch (editModalId) {
        case ProfileListSetting.Language:
          listInputData = languages;
          break;

        case ProfileListSetting.Certification:
          listInputData = certifications;
          break;

        case ProfileListSetting.Education:
          listInputData = education;
          break;

        case ProfileListSetting.Skill:
          listInputData = skills;
          break;

        default:
          listInputData = [];
          break;
      }

      const inputModal = ArrayLikeInput[editModalId!] ? (
        <ListInput
          title={FormatUtils.pluralToSingular(editModalId!)}
          list={listInputData}
          inputChangeHandler={this.onListItemChanged}
          addInput={this.addListInput}
          removeListInput={this.removeListInput}
        />
      ) : (
        <TextInput
          enablesReturnKeyAutomatically
          value={company}
          placeholder="Company..."
          onChangeText={this.onCompanyNameChanged}
          style={styles.companyInput}
          autoCapitalize="sentences"
          blurOnSubmit={false}
          placeholderTextColor={Colors.bland}
        />
      );
      const serviceCarousel = _.isEmpty(services) ? (
        <View style={styles.nullServiceContainer}>
          <Text style={styles.nullServiceMessage}>
            Looks like you have not yet added any services yet
          </Text>
          <Button title="Add New Service" onPress={this.onAddServicePressed} />
        </View>
      ) : (
        <View style={styles.serviceCarouselContainer}>
          <Carousel
            width={screenWidth - 64}
            slideStyle={{
              marginTop: 16,
              marginBottom: 16,
            }}
            renderItem={this.renderServiceCard}
            list={services}
          />
        </View>
      );
      agentInfo = (
        <>
          <ModalMenu
            isOpen={isModalMenuOpen}
            menuButtons={modalMenuButtons}
            onBackdropPress={() => {
              if (isModalMenuOpen) {
                this.toggleModalMenuVisibility();
              }
            }}
          />
          {isInputLocationModalVisible && (
            <InputLocationModal
              isVisibleModal={isInputLocationModalVisible}
              setLocation={this.updateAgentLocation}
              toggleModalVisibility={() => {
                if (isInputLocationModalVisible) {
                  this.toggleInputLocationModalVisibility();
                }
              }}
            />
          )}
          <AccountHeader
            profilePictureUrl={profilePictureUrl}
            stats={stats}
            firstName={firstName}
            lastName={lastName}
            onProfilePicturePressed={this.onProfilePicturePressed}
          />
          <Loading isLoading={isLoading} />
          <View style={styles.servicesContainer}>
            <View style={styles.servicesHeadingContainer}>
              <Heading
                title="Active Services"
                onAddPressed={this.onAddServicePressed}
              />
            </View>
            {serviceCarousel}
          </View>
          <View style={styles.publicInfoContainer}>
            <Heading title="Public Information" />
            <Card style={styles.publicInfoCard}>
              <FlatList
                scrollEnabled={false}
                data={publicInfoSections}
                renderItem={this.renderPublicInfoSection}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
              />
            </Card>
          </View>
          <SkillsSection
            onEditPressed={() => {
              this.onEditPressed(ProfileListSetting.Skill);
            }}
            skills={skills}
          />
          <Modal
            swipeDirection="down"
            style={styles.bottomModal}
            backdropColor={Colors.screenBackground}
            isVisible={
              editModalId !== null &&
              editModalId !== ProfileListSetting.Location
            }
            onSwipeComplete={this.dismissChanges}
            onBackdropPress={this.dismissChanges}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'position' : undefined}
              keyboardVerticalOffset={0}>
              <Card style={styles.modalCard}>
                <View style={styles.dismissButton}>
                  <Touchable onPress={this.dismissChanges}>
                    <Icon
                      name="minus-circle"
                      size={22}
                      color={Colors.primary}
                    />
                  </Touchable>
                </View>
                {inputModal}
                <View style={styles.saveBtnContainer}>
                  <Button
                    title="Save"
                    onPress={() => {
                      this.onSaveButtonPressed(editModalId);
                    }}
                  />
                </View>
              </Card>
            </KeyboardAvoidingView>
          </Modal>
        </>
      );
    } else {
      agentInfo = <Loading isLoading />;
    }

    return (
      <Container
        style={styles.container}
        menu
        onMenuButtonPressed={() => {
          this.toggleModalMenuVisibility();
        }}>
        <KeyboardAwareScrollView
          enableOnAndroid
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
          contentContainerStyle={styles.srollViewContainer}>
          {agentInfo}
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

export default AccountScreen;
