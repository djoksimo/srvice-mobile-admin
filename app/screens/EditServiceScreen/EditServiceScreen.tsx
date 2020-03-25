import React from 'react';
import {View, SectionList} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import _ from 'lodash';
import {Agent} from 'types/AgentType';
import {GradientHeader, Loading, Text, Card} from 'components';
import Container from 'components/Container';
import {EditModal} from 'components/EditModal';
import {Colors} from 'values';
import {Service} from 'types/ServiceType';
import {ValidationUtils, AlertUtils} from 'utils';
import AgentScreen from '../AgentScreen';
import {ServiceManager} from '../../managers';
import Bottle from '../../bottle';
import {editServiceSections} from './editServiceSections';
import {EditServiceRow} from './EditServiceScreenComponents';
import styles from './styles';
type State = {
  agent: Agent | any;
  isLoading: boolean;
  service: Service | any;
  isModalVisible: boolean;
  currentEditFieldId: string | null;
  currentEditValue: string | boolean;
  originalService: Service | any;
};
type Props = {
  navigation: NavigationScreenProp<any, any>;
};

class EditServiceScreen extends AgentScreen {
  serviceManager: ServiceManager;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      isLoading: false,
      service: undefined,
      isModalVisible: false,
      currentEditValue: '',
      currentEditFieldId: null,
      originalService: undefined,
    };
    this.serviceManager = Bottle.ServiceManager;
  }

  async componentDidMount(): any {
    super.componentDidMount();
    this.setService();
  }

  setService = () => {
    const {navigation} = this.props;
    const service = navigation.getParam('service');
    this.setState({
      service,
      originalService: {...service},
    });
  };

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  getSectionListData = () => {
    const {service} = this.state;
    let sections = [];

    if (service) {
      sections = editServiceSections.map(({field, title, fields}) => {
        let data = [
          {
            fieldId: field,
            text: `${service[field]}`,
          },
        ];

        if (fields) {
          data = fields.map(({fieldTitle, fieldId}) => {
            let fieldValue = service[fieldId];

            if (_.isBoolean(fieldValue)) {
              fieldValue = fieldValue ? 'Yes' : 'No';
            }

            return {
              fieldId,
              text: `${fieldTitle}: ${fieldValue}`,
            };
          });
        }

        return {
          title,
          serviceFieldId: field,
          data,
        };
      });
    }

    return sections;
  };
  toggleEditModal = (editFieldId: string) => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
      currentEditValue: prevState.service[editFieldId],
      currentEditFieldId: editFieldId,
      originalService: prevState.service,
    }));
  };
  onEditText = (newEditValue: string) => {
    this.setState((prevState) => ({
      currentEditValue: newEditValue,
      service: {
        ...prevState.service,
        [prevState.currentEditFieldId]: newEditValue,
      },
    }));
  };
  onChangeSwitchValue = (fieldId: string, newSwitchValue: boolean) => {
    try {
      this.setState(
        (prevState) => ({
          service: {...prevState.service, [fieldId]: newSwitchValue},
        }),
        async () => {
          const {service} = this.state;
          const serviceValidity = ValidationUtils.getServiceValidity(service);

          if (serviceValidity.isValid) {
            await this.serviceManager.updateService(
              fieldId,
              newSwitchValue,
              service._id,
            );
            AlertUtils.showSnackBar('Updated service!', Colors.primaryLight);
            this.refreshAgent();
          } else {
            this.setState((prevState) => ({
              service: {...prevState.service, [fieldId]: !newSwitchValue},
            }));
            AlertUtils.showSnackBar(serviceValidity.reason);
          }
        },
      );
    } catch (error) {
      console.log(error);
      AlertUtils.showSnackBar(error);
    }
  };
  onDismissPressed = () => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
      service: {...prevState.originalService},
    }));
  };
  onSavePressed = async () => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
      isLoading: true,
    }));

    try {
      const {
        service: {_id},
        currentEditFieldId,
        currentEditValue,
        service,
      } = this.state;
      const serviceValidity = ValidationUtils.getServiceValidity(service);

      if (serviceValidity.isValid) {
        await this.serviceManager.updateService(
          currentEditFieldId,
          currentEditValue,
          _id,
        );
        AlertUtils.showSnackBar('Updated service!', Colors.primaryLight);
      } else {
        AlertUtils.showSnackBar(serviceValidity.reason);
      }
    } catch (error) {
      console.log(error);
      AlertUtils.showSnackBar('Something went wrong');
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };
  getPlaceholder = () => {
    const {currentEditFieldId} = this.state;
    const foundSection = editServiceSections.find(
      (section) => currentEditFieldId === section.field,
    );
    return foundSection ? `Edit ${foundSection.title}` : 'Edit field';
  };

  render() {
    const {isLoading, isModalVisible, currentEditValue, service} = this.state;
    return (
      <Container style={styles.container}>
        {isLoading && <Loading />}
        <GradientHeader>
          <View style={styles.screenTitleContainer}>
            <Text scale={Text.Scale.H4} color={Colors.white}>
              Edit Service
            </Text>
          </View>
          <Card style={styles.listCard}>
            <SectionList
              contentContainerStyle={styles.sectionList}
              sections={this.getSectionListData()}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => {
                const {fieldId, text} = item;
                return (
                  <EditServiceRow
                    serviceFieldId={fieldId}
                    serviceFieldText={text}
                    serviceFieldValue={service[fieldId]}
                    fieldSwitchValue={service[fieldId]}
                    onChangeSwitchValue={this.onChangeSwitchValue}
                    toggleEditModal={(newServiceFieldId) => {
                      this.toggleEditModal(newServiceFieldId);
                    }}
                  />
                );
              }}
              renderSectionHeader={({section: {title}}) => (
                <Text scale={Text.Scale.H5}>{title}</Text>
              )}
              SectionSeparatorComponent={() => <View style={styles.line} />}
            />
          </Card>
          <EditModal
            isModalVisible={isModalVisible}
            inputValue={currentEditValue}
            onChangeText={this.onEditText}
            placeholderText={this.getPlaceholder()}
            onDismissPressed={this.onDismissPressed}
            onSavePressed={this.onSavePressed}
          />
        </GradientHeader>
      </Container>
    );
  }
}

export default EditServiceScreen;
