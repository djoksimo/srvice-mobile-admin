import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {Card, Text, GradientHeader, Loading} from 'components';
import Container from 'components/Container';
import Button from 'components/Button';
import OrDivider from 'components/OrDivider';
import {Colors} from 'values';
import {Agent} from 'types/Agent';
import AgentScreen from './AgentScreen';
import {Service} from 'types/Service';

type State = {
  agent: Agent | any;
  isLoading: boolean;
};
type Props = {
  navigation: NavigationScreenProp<
    any,
    {
      serviceId: string;
    }
  >;
};

class PostServiceSuccessScreen extends AgentScreen {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      isLoading: false,
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.refreshAgent();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  goToPostOfferingScreen = async () => {
    const {navigation} = this.props;
    this.setState({
      isLoading: true,
    });
    await this.refreshAgent();
    const newActiveService = this.getNewActiveService();
    this.setState({
      isLoading: false,
    });
    console.log('newActiveService: ', newActiveService);
    navigation.navigate({
      routeName: 'PostOfferingScreen',
      params: {
        service: newActiveService,
      },
    });
  };
  getNewActiveService = () => {
    const {navigation} = this.props;
    const {
      agent: {services},
    } = this.state;
    const newActiveServiceId = navigation.getParam('serviceId');
    return services.find(
      (service: Service) => service._id === newActiveServiceId,
    );
  };
  viewService = async () => {
    const {navigation} = this.props;
    const newActiveService = this.getNewActiveService();
    console.log('newActiveService: ', newActiveService);
    this.setState({
      isLoading: false,
    });

    if (newActiveService) {
      navigation.navigate({
        routeName: 'ServiceScreen',
        params: {
          service: newActiveService,
        },
      });
    } else {
      navigation.navigate('AccountScreen');
    }
  };

  render() {
    const {isLoading} = this.state;
    return (
      <Container style={styles.container}>
        <GradientHeader>
          <View style={styles.successTitleContainer}>
            <Text scale={Text.Scale.H4} color={Colors.white}>
              Success!
            </Text>
          </View>
          <Card style={styles.successCard}>
            <View style={styles.successMessageContainer}>
              <Text scale={Text.Scale.BUTTON} color={Colors.primary}>
                Your service is active now!
              </Text>
            </View>
            <View style={styles.offeringPromptContainer}>
              <Text scale={Text.Scale.SUBTITLE} color={Colors.primary}>
                Do you have fixed prices and time-slots for your service?
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={this.goToPostOfferingScreen}
                title="Add offerings"
              />
              <OrDivider />
              <Button
                onPress={this.viewService}
                borderColor={Colors.secondary}
                titleColor={Colors.text}
                color={Colors.white}
                title="Exit"
              />
            </View>
            <Loading isLoading={isLoading} />
          </Card>
        </GradientHeader>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  successCard: {
    marginTop: 32,
  },
  successMessageContainer: {
    alignSelf: 'center',
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
  },
  successTitleContainer: {
    alignSelf: 'center',
    marginTop: -152,
  },
  offeringPromptContainer: {
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    alignSelf: 'center',
  },
  buttonContainer: {
    padding: 32,
  },
});
export default PostServiceSuccessScreen;
